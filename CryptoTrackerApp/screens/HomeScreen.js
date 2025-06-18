import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

export default function HomeScreen({ navigation }) {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filteredCoins, setFilteredCoins] = useState([]);

  useEffect(() => {
    fetchCoins();
  }, []);

  useEffect(() => {
    const filtered = coins.filter(coin =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCoins(filtered);
  }, [search, coins]);

  const fetchCoins = async () => {
    try {
      const res = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=50&page=1&sparkline=false'
      );
      setCoins(res.data);
      setFilteredCoins(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.coinContainer}
      onPress={() => navigation.navigate('CoinDetail', { coin: item })} 
    >
      <Text style={styles.coinName}>{item.name} ({item.symbol.toUpperCase()})</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.coinPrice}>€{item.current_price.toFixed(2)}</Text>
        <Text
          style={[
            styles.priceChange,
            { color: item.price_change_percentage_24h >= 0 ? '#4caf50' : '#f44336' },
          ]}
        >
          {item.price_change_percentage_24h.toFixed(2)}%
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b5bdb" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search by name or symbol..."
        placeholderTextColor="#8b949e"
        style={styles.searchInput}
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredCoins}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1117',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#0d1117',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    height: 40,
    backgroundColor: '#161b22',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    color: '#c9d1d9',
  },
  listContent: {
    paddingBottom: 40,
  },
  coinContainer: {
    backgroundColor: '#161b22',
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  coinName: {
    color: '#f0f6fc',
    fontWeight: 'bold',
    fontSize: 16,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  coinPrice: {
    color: '#c9d1d9',
    fontSize: 14,
  },
  priceChange: {
    marginTop: 4,
    fontWeight: '600',
  },
});
