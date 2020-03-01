import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { PicButton } from './src/components/button';

export default function App() {
  const sice = () => {
    Alert.alert('sice');
  };
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.baseText}>
        <Text style={styles.titleText}>RecycleSort</Text>
      </Text>
      <View style={styles.container}>
        <PicButton title="Load Images"
onPress={sice} />
        <PicButton title="Take Picture"
onPress={sice} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  baseText: {
    fontFamily: 'Cochin',
    marginVertical: 20,
    textAlign: 'center'
  },
  titleText: {
    fontSize: 50,
    fontWeight: 'bold'
  }
});
