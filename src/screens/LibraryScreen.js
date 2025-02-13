import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { fetchBooks } from '../config/api';

export default function LibraryScreen({ navigation }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    const data = await fetchBooks();
    setBooks(data.books || []);
    setLoading(false);
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Button 
        title="Ir a Perfil" 
        onPress={() => navigation.navigate('Home')} 
        containerStyle={{ marginBottom: 10 }}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ListItem bottomDivider onPress={() => navigation.navigate('BookDetail', { book: item })}>
              <ListItem.Content>
                <ListItem.Title>{item.title}</ListItem.Title>
                <ListItem.Subtitle>{item.authors?.join(', ')}</ListItem.Subtitle>
              </ListItem.Content>
              <Button title="Ver Detalles" onPress={() => navigation.navigate('BookDetail', { book: item })} />
            </ListItem>
          )}
        />
      )}
    </View>
  );
}
