import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import Colors from '../constants/themeColor';

export default props => <TextInput style={styles.body} {...props} />;

const styles = StyleSheet.create({
  body: {
    height: 40,
    borderBottomColor: Colors.primary,
    color: Colors.dark,
    borderBottomWidth: 2,
    width: 200,
    marginTop: 0,
    marginBottom: 20,
    fontSize: 18,
    fontWeight: '400',
  },
});
