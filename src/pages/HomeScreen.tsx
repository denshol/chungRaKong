import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [isMuted, setIsMuted] = useState(false);
  const scaleValue = useState(new Animated.Value(1))[0];

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

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
      <View style={styles.buttonContainer}>
        <AnimatedTouchableOpacity
          style={[styles.iconButton, {transform: [{scale: scaleValue}]}]}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={() => setIsMuted(!isMuted)}>
          <LinearGradient
            colors={['#FF6B6B', '#FF8E53']}
            style={styles.gradientButton}>
            <Icon
              name={isMuted ? 'volume-mute' : 'volume-high'}
              size={28}
              color="#FFF"
            />
          </LinearGradient>
        </AnimatedTouchableOpacity>
        <AnimatedTouchableOpacity
          style={[styles.textButton, {transform: [{scale: scaleValue}]}]}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}>
          <LinearGradient
            colors={['#36D1DC', '#5B86E5']}
            style={styles.gradientButton}>
            <Text style={styles.buttonText}>24시간 동안 보지 않기</Text>
          </LinearGradient>
        </AnimatedTouchableOpacity>
        <AnimatedTouchableOpacity
          style={[styles.iconButton, {transform: [{scale: scaleValue}]}]}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}>
          <LinearGradient
            colors={['#FF416C', '#FF4B2B']}
            style={styles.gradientButton}>
            <Icon name="close" size={28} color="#FFF" />
          </LinearGradient>
        </AnimatedTouchableOpacity>
      </View>
    </View>
  );
};

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 20,
  },
  titleContainer: {
    flexDirection: 'column',
  },
  authButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  authButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  logoContainer: {
    marginVertical: 50,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 40,
  },
  iconButton: {
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },
  textButton: {
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },
  gradientButton: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

export default HomeScreen;
