import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <View style={styles.mainContainer}>
        <Text style={styles.signInLabel}>Home screen</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 30,
  },
  signInLabel: {fontSize: 30, textAlign: 'center', marginBottom: '20%'},
  inputFieldStyle: {
    padding: 20,
    marginBottom: 20,
    borderColor: '#ccc',
    borderWidth: 2,
    width: '100%',
  },
});
