import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  AppRegistry,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import QRCodeScanner from 'react-native-qrcode-scanner';
import fetchRequest from '../helperFunctons/fetchRequest';
import timeFormat from '../helperFunctons/timeFormat';
import Button from '../components/Button';
import Colors from '../constants/themeColor';

const QRCodeScannerComponent = props => {
  const [reportText, setReportText] = useState('');
  const [showQr, setShowQr] = useState(true);
  const [isReportSuccess, setIsReportSuccess] = useState(null);
  let scanner;

  useEffect(() => {
    if (reportText) {
      setTimeout(() => setReportText(''), 2000);
    }
  });

  const syncToCloud = async () => {
    setShowQr(false);
    const value1 = await AsyncStorage.getItem('delegate');
    const value2 = await AsyncStorage.getItem('loginData');
    const responseJson = await fetchRequest({
      url: 'http://kingspay@www.kingspay.live/tnc/cloudSync.php',
      method: 'POST',
      body: {
        exhibitorID: JSON.parse(value2).exhibitorID,
        delegate: JSON.parse(value1),
      },
    });
    if (responseJson.status === 'success') {
      await AsyncStorage.setItem('delegate', '[]');
      setIsReportSuccess(true);
      setReportText('Cloud sync successful');
    }
    setTimeout(() => setShowQr(true), 1000);

    return responseJson;
  };

  const readQrCode = async ({data}) => {
    try {
      let value = await AsyncStorage.getItem('delegate');
      if (!value) {
        value = '[]';
      }
      if (!value.toString().match(data)) {
        const updatedValue = JSON.parse(value);
        updatedValue.push({
          id: data,
          time: timeFormat(new Date()),
        });
        await AsyncStorage.setItem('delegate', JSON.stringify(updatedValue));
        setIsReportSuccess(true);
        setReportText('Scanned Successfully');
      } else {
        setIsReportSuccess(false);
        setReportText('Scanned before');
      }
    } catch (err) {
      setIsReportSuccess(false);
      setReportText('Scan failed');
    }
    // scanner.reactivate();
  };

  const QRCodeScannerView = () => (
    <QRCodeScanner
      onRead={readQrCode}
      topContent={
        <Text>Set the QR Code in the box that is on the camera view.</Text>
      }
      bottomContent={
        <Text style={isReportSuccess ? styles.textSuccess : styles.textFail}>
          {reportText}
        </Text>
      }
      containerStyle={styles.scannerContainer}
      cameraStyle={styles.scannerCamera}
      reactivate={true}
      reactivateTimeout={4000}
      showMarker
      markerStyle={styles.marker}
      bottomViewStyle={isReportSuccess ? styles.textSuccess : styles.textFail}
    />
  );

  const CloudSyncView = () => (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/sync_on.png')}
        style={styles.logo}
      />
      <Text style={styles.sectionTitle}>Cloud Syncing in progress...</Text>
    </View>
  );

  return (
    <>
      {showQr && (
        <TouchableOpacity onPress={props.gotoHome} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      )}
      <View style={styles.container}>
        {showQr ? <QRCodeScannerView /> : <CloudSyncView />}
        {showQr && (
          <Button
            onPress={syncToCloud}
            title="Sync to cloud now."
            accessibilityLabel="Sync to cloud now."
          />
        )}
      </View>
    </>
  );
};

AppRegistry.registerComponent('default', () => QRCodeScannerComponent);
export default QRCodeScannerComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 20,
  },
  sectionTitle: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
    textAlign: 'center',
  },
  logo: {
    marginTop: 100,
    height: 130,
    width: 130,
  },
  scannerContainer: {
    marginBottom: 20,
  },
  scannerCamera: {
    width: 200,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  marker: {
    borderColor: Colors.primary,
    borderRadius: 10,
    borderWidth: 1,
  },
  textSuccess: {
    color: Colors.green,
    fontSize: 23,
  },
  textFail: {
    color: Colors.red,
    fontSize: 23,
  },
  backButton: {
    backgroundColor: Colors.primary,
    width: 52,
    marginTop: 10,
    marginLeft: 12,
    paddingLeft: 5,
    borderRadius: 5,
  },
  backButtonText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 18,
  },
});
