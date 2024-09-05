import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          {/* <Text style={styles.subtitle}>교육과 문화를 한번에</Text>
          <Text style={styles.title}>청라콩</Text> */}
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('SignIn')}
          style={styles.authButton}>
          <Text style={styles.authButtonText}>로그인</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.logoContainer}
        onPress={() => navigation.navigate('CombinedCNECMU')}>
        <Image source={require('../assets/bigbeans.png')} style={styles.logo} />
      </TouchableOpacity>
      {/* <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('CNE')}>
          <Text style={styles.optionText}>
            청라<Text style={styles.ne}>NE</Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('CMU')}>
          <Text style={styles.optionText}>
            청라<Text style={styles.ne}>뮤</Text>
          </Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  ne: {
    color: '#FFD700',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: 20,
    position: 'absolute',
    top: 20,
  },
  titleContainer: {
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#f9ef80',
  },
  subtitle: {
    fontSize: 16,
    color: '#FFF',
    marginTop: 5,
  },
  authButton: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 20,
  },
  authButtonText: {
    color: '#363636',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginLeft: 40,
  },
  logo: {
    width: 270,
    height: 270,
    resizeMode: 'contain',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 150,
  },
  option: {
    alignItems: 'center',
    backgroundColor: '#04ca5b',
    borderRadius: 15,
    padding: 20,
    width: 130,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  optionText: {
    fontSize: 27,
    color: '#FFF',
    marginTop: 10,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
