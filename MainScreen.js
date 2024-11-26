import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const MainScreen = () => {
  const [baseCurrency, setBaseCurrency] = useState('CAD'); // Default to CAD
  const [destinationCurrency, setDestinationCurrency] = useState('USD'); // Default to USD
  const [amount, setAmount] = useState('1'); // Default to 1
  const [convertedAmount, setConvertedAmount] = useState('');
  const [error, setError] = useState(null);

  const handleConvert = async () => {
    const API_KEY = 'fca_live_1EjclNBUlYymaE1lxtGYX1n84RSWwdtW5w2k8aTf';
    const url = `https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY}&base_currency=${baseCurrency}`;

    try {
      setError(null); // Clear any previous errors
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch exchange rates.');
      }

      const rate = data.data[destinationCurrency.toUpperCase()];
      if (!rate) {
        throw new Error('Invalid destination currency code.');
      }

      const result = (parseFloat(amount) * rate).toFixed(2);
      setConvertedAmount(result);
    } catch (err) {
      setError(err.message);
      setConvertedAmount(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Currency Converter</Text>

      {/* Base Currency Input */}
      <TextInput
        style={styles.input}
        placeholder="Base Currency (e.g., CAD)"
        value={baseCurrency}
        onChangeText={setBaseCurrency}
      />

      {/* Destination Currency Input */}
      <TextInput
        style={styles.input}
        placeholder="Destination Currency (e.g., USD)"
        value={destinationCurrency}
        onChangeText={setDestinationCurrency}
      />

      {/* Amount Input */}
      <TextInput
        style={styles.input}
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      {/* Convert Button */}
      <Button title="Convert" onPress={handleConvert} />

      {/* Display Results */}
      {convertedAmount && (
        <Text style={styles.result}>
          Converted Amount: {convertedAmount} {destinationCurrency.toUpperCase()}
        </Text>
      )}

      {/* Display Errors */}
      {error && <Text style={styles.error}>Error: {error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  error: {
    marginTop: 20,
    fontSize: 16,
    color: 'red',
  },
});

export default MainScreen;
