import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { db, auth } from '../firebaseConfig';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';

export default function TradeHistoryScreen() {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!auth.currentUser) {
      setError('No user logged in');
      setLoading(false);
      return;
    }

    const userId = auth.currentUser.uid;
    console.log('Fetching trades for user:', userId);

    const q = query(
      collection(db, 'tradeHistory'),
      where('userId', '==', userId),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q,
      (snapshot) => {
        const tradeList = snapshot.docs.map(doc => {
          const data = doc.data();
          // Debug log each trade doc
          console.log('Trade doc:', doc.id, data);
          return {
            id: doc.id,
            ...data,
          };
        });
        setTrades(tradeList);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error('Error fetching trades:', err);
        setError('Failed to load trades');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#58a6ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (trades.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>No trade history yet.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={trades}
      keyExtractor={item => item.id}
      contentContainerStyle={{ padding: 20 }}
      renderItem={({ item }) => (
        <View style={styles.tradeItem}>
          <Text style={styles.tradeText}>
            {item.type.toUpperCase()} {item.amount} {item.symbol} @ €{item.price.toFixed(2)}
          </Text>
          <Text style={styles.dateText}>
            {item.timestamp?.toDate ? item.timestamp.toDate().toLocaleString() : 'No date'}
          </Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  tradeItem: {
    backgroundColor: '#161b22',
    borderRadius: 8,
    padding: 15,
    marginBottom: 12,
  },
  tradeText: {
    color: '#58a6ff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  dateText: {
    color: '#8b949e',
    fontSize: 12,
    marginTop: 6,
  },
  emptyText: {
    color: '#8b949e',
    fontSize: 18,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0d1117',
  },
});
