import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import Colors from '../constants/themeColor';

export default props => (
  <View style={styles.body}>
    <Image source={require('../assets/images/icon.png')} style={styles.icon} />
    <Text style={styles.text}>{props.title}</Text>
  </View>
);

const styles = StyleSheet.create({
  body: {
    height: 60,
    borderBottomColor: Colors.primary,
    borderBottomWidth: 2,
    padding: 5,
    flex: 0,
    flexDirection: 'row',
  },
  icon: {
    height: 50,
    width: 50,
    marginRight: 10,
  },
  text: {
    marginTop: 8,
    fontSize: 28,
    fontWeight: 'bold',
  },
});
