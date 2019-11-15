import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import fetchRequest from '../helperFunctons/fetchRequest';
import Colors from '../constants/themeColor';

export default props => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [showErr, setShowErr] = useState(false);
  const [loginData, setLoginData] = useState('{}');
  const [shouldLogout, setShouldLogout] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('loginData')
      .then(value => {
        if (value) {
          setLoginData(value);
        }
      })
      .catch(err => {});
  });
  const loginDataObj = JSON.parse(loginData);

  const handleLogout = async () => {
    await AsyncStorage.setItem('loginData', '{}');
    setShouldLogout(true);
  };

  const handleLogin = async () => {
    try {
      const responseJson = await fetchRequest({
        url: 'http://kingspay@www.kingspay.live/tnc/exec_return_api.php',
        method: 'POST',
        body: {user, password},
      });

      if (responseJson.status === 'error') {
        setShowErr(true);
      } else {
        await AsyncStorage.setItem('loginData', JSON.stringify(responseJson));
        setLoginData(JSON.stringify(responseJson));
        setShouldLogout(false);
      }
    } catch (err) {
      setShowErr(true);
    }
  };

  const LoginView = () => (
    <View style={styles.container}>
      <Text style={{...styles.sectionTitle, marginBottom: 70}}>
        Please Login to TouchNConnect to access the full functionality!
      </Text>
      <InputBox
        textContentType="username"
        value={user}
        onChangeText={text => {
          setUser(text);
        }}
        placeholder="Username"
      />
      <InputBox
        textContentType="password"
        value={password}
        onChangeText={text => {
          setPassword(text);
        }}
        placeholder="Password"
      />
      <Button
        onPress={handleLogin}
        title="Login"
        accessibilityLabel="Login to your account"
      />
      {showErr && <Text style={styles.errorText}>Login Failed</Text>}
    </View>
  );

  const ProfileView = () => (
    <View style={styles.container}>
      <Image source={{uri: loginDataObj.logoURL}} style={styles.logo} />
      <Text style={styles.sectionTitle}>{loginDataObj.exhibitorName}</Text>
      <Text style={styles.sectionDescription}>{loginDataObj.address}</Text>
      <View style={styles.sectionBox}>
        <Text style={styles.contactTextBold}>Contact:</Text>
        <Text style={styles.contactText}>{loginDataObj.contactName}</Text>
        <Text style={styles.contactText}>{loginDataObj.contactPhone}</Text>
        <Text style={styles.contactText}>{loginDataObj.contactEmail}</Text>
      </View>
      <TouchableOpacity onPress={props.lauchScanner} style={styles.scanButton}>
        <Text style={styles.scanButtonText}>
          Click here to start scanning...
        </Text>
      </TouchableOpacity>
    </View>
  );

  return loginDataObj && loginDataObj.status === 'success' ? (
    <>
      <TouchableOpacity onPress={handleLogout} style={styles.logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
      <ProfileView />
    </>
  ) : (
    <LoginView />
  );
};

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
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
    textAlign: 'center',
  },
  sectionDescription: {
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
    textAlign: 'center',
  },
  sectionBox: {
    borderRadius: 5,
    padding: 10,
    backgroundColor: Colors.dark,
    color: Colors.white,
    marginTop: 20,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  errorText: {
    marginTop: 10,
    color: Colors.red,
  },
  contactText: {
    color: Colors.white,
  },
  contactTextBold: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  logo: {
    height: 100,
    width: 100,
  },
  scanButton: {
    marginTop: 70,
    backgroundColor: Colors.primary,
    width: 700,
    height: 300,
    alignItems: 'center',
  },
  scanButtonText: {
    color: Colors.white,
    fontSize: 32,
    lineHeight: 332,
    fontWeight: 'bold',
  },
  logout: {
    backgroundColor: Colors.primary,
    width: 70,
    marginTop: 10,
    marginLeft: 12,
    paddingLeft: 5,
    borderRadius: 5,
  },
  logoutText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 18,
  },
});
