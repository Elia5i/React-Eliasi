import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

export default function CoinDetailScreen({ route }) {
  const { coinId } = route.params;
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCoinDetails();
  }, []);

  const fetchCoinDetails = async () => {
    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}`);
      setCoin(response.data);
    } catch (error) {
      console.error('Error fetching coin details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{coin.name} ({coin.symbol.toUpperCase()})</Text>
      <Text style={styles.price}>Current Price: €{coin.market_data.current_price.eur.toFixed(2)}</Text>
      <Text>Market Cap: €{coin.market_data.market_cap.eur.toLocaleString()}</Text>
      <Text>24h Volume: €{coin.market_data.total_volume.eur.toLocaleString()}</Text>
      <Text style={{ marginTop: 12 }}>{coin.description.en ? coin.description.en.split('. ')[0] : 'No description available.'}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff', flex: 1 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  price: { fontSize: 18, marginBottom: 8 },
});
