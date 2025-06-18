import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { PortfolioContext } from '../context/PortfolioContext';
import axios from 'axios';

export default function PortfolioScreen() {
  const { portfolio, balance } = useContext(PortfolioContext);
  const [prices, setPrices] = useState({});

  useEffect(() => {
    if (
      (Array.isArray(portfolio) && portfolio.length > 0) ||
      (portfolio && typeof portfolio === 'object' && Object.keys(portfolio).length > 0)
    ) {
      fetchPrices();
    } else {
      setPrices({});
    }
  }, [portfolio]);

  const fetchPrices = async () => {
    try {
      const portfolioArray = Array.isArray(portfolio)
        ? portfolio
        : Object.entries(portfolio || {}).map(([coinId, data]) => ({
            coinId,
            ...data,
          }));

      const ids = portfolioArray.map(p => p.coinId).join(',');
      if (!ids) return;

      const res = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=eur`
      );
      setPrices(res.data);
    } catch (e) {
      console.log('Error fetching prices:', e);
    }
  };

  // Transform portfolio to array with coinId included
  const portfolioArray = Array.isArray(portfolio)
    ? portfolio
    : Object.entries(portfolio || {}).map(([coinId, data]) => ({
        coinId,
        ...data,
      }));

  const renderItem = ({ item }) => {
    const currentPrice = prices[item.coinId]?.eur || 0;
    const value = currentPrice * item.quantity;

    return (
      <View style={styles.itemContainer}>
        <Text style={styles.coinName}>{item.coinName}</Text>
        <Text style={styles.quantity}>Qty: {item.quantity.toFixed(6)}</Text>
        <Text style={styles.value}>Value: €{value.toFixed(2)}</Text>
      </View>
    );
  };

  const totalValue = portfolioArray.reduce((sum, item) => {
    const price = prices[item.coinId]?.eur || 0;
    return sum + price * item.quantity;
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.balance}>Balance: €{balance?.toFixed(2) ?? '0.00'}</Text>
      <Text style={styles.totalValue}>Portfolio Value: €{totalValue.toFixed(2)}</Text>

      {portfolioArray.length === 0 ? (
        <Text style={styles.emptyText}>Your portfolio is empty. Start buying crypto!</Text>
      ) : (
        <FlatList
          data={portfolioArray}
          keyExtractor={item => item.coinId}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1117',
    padding: 16,
  },
  balance: {
    color: '#58a6ff',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
  },
  totalValue: {
    color: '#4ade80',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 16,
  },
  itemContainer: {
    backgroundColor: '#161b22',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  coinName: {
    color: '#c9d1d9',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantity: {
    color: '#8b949e',
  },
  value: {
    color: '#58a6ff',
    marginTop: 4,
  },
  emptyText: {
    color: '#8b949e',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },
});
