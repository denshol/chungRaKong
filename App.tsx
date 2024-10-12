import * as React from 'react';
import {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './src/store';
import AppInner from './AppInner';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Platform,
  SafeAreaView,
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
const ASPECT_RATIO = SCREEN_HEIGHT / SCREEN_WIDTH;

const VideoModal = ({visible, onClose, onSkip}) => {
  const [volume, setVolume] = useState(0);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <SafeAreaView style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.videoContainer}>
            <Video
              source={require('./src/assets/video/chungrakong.mp4')}
              style={styles.video}
              controls={true}
              resizeMode="contain"
              onEnd={onClose}
              repeat={false}
              volume={volume}
              muted={false}
              ignoreSilentSwitch={'ignore'}
              playInBackground={false}
              playWhenInactive={false}
            />
          </View>
          <View style={styles.controlsContainer}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => setVolume(v => (v > 0 ? 0 : 1))}>
              <Icon
                name={volume > 0 ? 'volume-high' : 'volume-mute'}
                size={24}
                color="#FFF"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.textButton} onPress={onSkip}>
              <Text style={styles.buttonText}>24시간 동안 보지 않기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={onClose}>
              <Icon name="close" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

function App() {
  const [videoModalVisible, setVideoModalVisible] = useState(false);

  useEffect(() => {
    const checkLastViewedTime = async () => {
      try {
        const lastViewedTime = await AsyncStorage.getItem(
          '@last_video_view_time',
        );
        const currentTime = new Date().getTime();

        if (
          !lastViewedTime ||
          currentTime - parseInt(lastViewedTime) > 24 * 60 * 60 * 1000
        ) {
          SplashScreen.hide();
          setVideoModalVisible(true);
        } else {
          SplashScreen.hide();
        }
      } catch (error) {
        console.error('Error reading last viewed time:', error);
        SplashScreen.hide();
        setVideoModalVisible(true);
      }
    };

    const timer = setTimeout(checkLastViewedTime, 500); // 스플래시 활성화 시간

    return () => clearTimeout(timer);
  }, []);

  const handleSkip = async () => {
    try {
      await AsyncStorage.setItem(
        '@last_video_view_time',
        new Date().getTime().toString(),
      );
      setVideoModalVisible(false);
    } catch (error) {
      console.error('Error saving last viewed time:', error);
    }
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppInner />
        <VideoModal
          visible={videoModalVisible}
          onClose={() => setVideoModalVisible(false)}
          onSkip={handleSkip}
        />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  modalView: {
    width: SCREEN_WIDTH * 0.95,
    height: ASPECT_RATIO > 1.8 ? SCREEN_HEIGHT * 0.7 : SCREEN_HEIGHT * 0.8,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  videoContainer: {
    width: '100%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    overflow: 'hidden',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 15,
  },
  iconButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 25,
    padding: 10,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default App;
