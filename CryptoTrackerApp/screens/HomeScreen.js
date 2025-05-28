import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

export default function HomeScreen({ navigation }) {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchCoins();
  }, []);

  const fetchCoins = async () => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
        params: {
          vs_currency: 'eur', // Using EUR
          order: 'market_cap_desc',
          per_page: 50,
          page: 1,
          sparkline: false,
        },
      });
      setCoins(response.data);
    } catch (error) {
      console.error('Error fetching coins:', error);
    }
  };

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.coin}
      onPress={() => navigation.navigate('CoinDetail', { coinId: item.id })}
    >
      <Text style={styles.name}>{item.name} ({item.symbol.toUpperCase()})</Text>
      <Text style={styles.price}>€{item.current_price.toFixed(2)} ({item.price_change_percentage_24h.toFixed(2)}%)</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Search crypto..."
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredCoins}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  search: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 12,
    borderRadius: 8,
  },
  coin: {
    padding: 12,
    backgroundColor: '#f0f0f0',
    marginBottom: 8,
    borderRadius: 8,
  },
  name: { fontSize: 16, fontWeight: 'bold' },
  price: { fontSize: 14 },
});
