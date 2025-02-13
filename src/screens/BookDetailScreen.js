import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

export default function BookDetailScreen({ route, navigation }) {
  const { book } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {book.imageLinks?.thumbnail && (
        <Image source={{ uri: book.imageLinks.thumbnail }} style={styles.image} />
      )}
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>Autor(es): {book.authors?.join(', ')}</Text>
      <Text style={styles.description}>{book.description || 'Sin descripción disponible'}</Text>

      <Button title="Volver a la Librería" onPress={() => navigation.goBack()} containerStyle={styles.button} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 200,
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  author: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    textAlign: 'justify',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    marginTop: 20,
  },
});
