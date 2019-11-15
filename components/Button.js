import React from 'react';
import {Button, StyleSheet} from 'react-native';
import Colors from '../constants/themeColor';

export default props => (
  <Button {...props} color={Colors.primary} style={styles.body} />
);

const styles = StyleSheet.create({
  body: {
    borderWidth: 1,
    marginTop: 5,
    marginBottom: 5,
  },
});
