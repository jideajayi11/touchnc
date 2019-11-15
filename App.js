import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, StatusBar} from 'react-native';
import {PERMISSIONS} from 'react-native-permissions';
import Colors from './constants/themeColor';
import HeaderBar from './components/HeaderBar';
import AccountScreen from './screens/AccountScreen';
import QrCodeScanner from './screens/QrCodeScanner';

PERMISSIONS.ANDROID.CAMERA;

const App: () => React$Node = () => {
  const [showScanner, setShowScanner] = useState(false);
  const lauchScanner = () => setShowScanner(true);
  const gotoHome = () => setShowScanner(false);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <HeaderBar title="TouchNConnect" />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          {showScanner ? (
            <QrCodeScanner gotoHome={gotoHome} />
          ) : (
            <AccountScreen lauchScanner={lauchScanner} />
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.white,
  },
});

export default App;
