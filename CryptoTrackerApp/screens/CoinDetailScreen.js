import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import axios from 'axios';
import { PortfolioContext } from '../context/PortfolioContext';
import PriceChart from '../components/PriceChart';

import { db, auth } from '../firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function CoinDetailScreen({ route }) {
  const { coin } = route.params || {};
  const { addToPortfolio, sellFromPortfolio, balance } = useContext(PortfolioContext);

  const [quantity, setQuantity] = useState('');
  const [action, setAction] = useState('buy');
  const [priceHistory, setPriceHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!coin || !coin.id) {
      console.warn('❌ No coin data provided in route.params');
      return;
    }

    const fetchPriceHistory = async () => {
      try {
        const res = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart`,
          {
            params: {
              vs_currency: 'eur',
              days: 7,
            },
          }
        );

        const prices = res.data.prices.map((p) => p[1]);
        setPriceHistory(prices);
      } catch (err) {
        console.error('Failed to fetch chart data', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPriceHistory();
  }, [coin?.id]);

  const handleTrade = async () => {
    const qty = parseFloat(quantity);
    if (!qty || qty <= 0) {
      Alert.alert('Invalid Quantity', 'Please enter a valid quantity greater than zero.');
      return;
    }

    const totalCost = qty * coin.current_price;

    if (action === 'buy') {
      if (totalCost > balance) {
        Alert.alert('Insufficient Balance', 'You do not have enough balance to buy this amount.');
        return;
      }
    } else if (action === 'sell') {
      // Optional: You can add checks to not sell more than owned
    }

    try {
      if (action === 'buy') {
        addToPortfolio(coin.id, qty, coin.current_price, coin.name);
      } else {
        sellFromPortfolio(coin.id, qty, coin.current_price);
      }

      await addDoc(collection(db, 'tradeHistory'), {
        userId: auth.currentUser.uid,
        symbol: coin.symbol.toUpperCase(),
        amount: qty,
        price: coin.current_price,
        type: action,
        timestamp: Timestamp.now(),
      });

      Alert.alert(
        'Trade Successful',
        `${action === 'buy' ? 'Bought' : 'Sold'} ${qty} ${coin.symbol.toUpperCase()}!`
      );
      setQuantity('');
    } catch (error) {
      console.error('Error saving trade:', error);
      Alert.alert('Trade Failed', 'Failed to save trade. Please try again.');
    }
  };

  if (!coin || !coin.name) {
    return (
      <View style={styles.errorContainer}>
        <Text style={{ color: 'white', fontSize: 18 }}>🚫 Coin data is missing</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.name}>{coin.name}</Text>
      <Text style={styles.price}>Current Price: €{coin.current_price?.toFixed(2)}</Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Quantity"
        placeholderTextColor="#888"
        value={quantity}
        onChangeText={setQuantity}
      />

      {quantity !== '' && !isNaN(quantity) && (
        <Text style={styles.total}>
          Total: €{(parseFloat(quantity) * coin.current_price).toFixed(2)}
        </Text>
      )}

      <View style={styles.switchContainer}>
        <Button
          title="Buy"
          onPress={() => setAction('buy')}
          color={action === 'buy' ? '#58a6ff' : '#444'}
        />
        <Button
          title="Sell"
          onPress={() => setAction('sell')}
          color={action === 'sell' ? '#ff5858' : '#444'}
        />
      </View>

      <Button
        title={action === 'buy' ? 'Buy Now' : 'Sell Now'}
        onPress={handleTrade}
        color="#58a6ff"
      />

      <Text style={styles.chartTitle}>7-Day Price Chart</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#58a6ff" />
      ) : (
        <PriceChart coinName={coin.name} prices={priceHistory} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#0d1117',
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#0d1117',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 32,
    color: 'white',
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    color: '#58a6ff',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#161b22',
    color: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 18,
  },
  total: {
    color: '#c9d1d9',
    fontSize: 16,
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  chartTitle: {
    color: 'white',
    fontSize: 20,
    marginTop: 30,
    marginBottom: 10,
    textAlign: 'center',
  },
});
