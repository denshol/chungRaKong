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
  Image,
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
const ASPECT_RATIO = SCREEN_HEIGHT / SCREEN_WIDTH;

const VideoModal = ({visible, onClose, onSkip}) => {
  const [volume, setVolume] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const contents = [
    {
      type: 'video',
      source: require('./src/assets/video/chungRaFestival.mp4'),
    },
    {
      type: 'poster',
      image: require('./src/assets/poster/chungRaFestival.jpg'),
      text: '청라콩문화센터에 오신 것을 환영합니다!\n\n청라콩 제2회 정기공연\n2024년 4월',
    },
  ];

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <SafeAreaView style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.headerContainer}>
            <Text style={styles.pageIndicator}>
              {currentPage + 1} / {contents.length}
            </Text>
            <View style={styles.dotsContainer}>
              {contents.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    index === currentPage && styles.activeDot,
                  ]}
                />
              ))}
            </View>
            <Text style={styles.swipeGuide}>
              {currentPage === 0 ? '← 옆으로 스와이프하여 더보기' : ''}
            </Text>
          </View>

          <Swiper
            style={styles.wrapper}
            showsButtons={true}
            loop={false}
            dot={<View style={styles.transparentDot} />}
            activeDot={<View style={styles.transparentDot} />}
            onIndexChanged={index => setCurrentPage(index)}
            nextButton={
              <View style={styles.swiperButton}>
                <Icon name="chevron-forward" size={24} color="#FFF" />
              </View>
            }
            prevButton={
              <View style={styles.swiperButton}>
                <Icon name="chevron-back" size={24} color="#FFF" />
              </View>
            }>
            {contents.map((content, index) => (
              <View key={index} style={styles.slideContainer}>
                {content.type === 'video' ? (
                  <View style={styles.videoContainer}>
                    <Video
                      source={content.source}
                      style={styles.video}
                      controls={true}
                      resizeMode="contain"
                      volume={volume}
                      muted={false}
                      ignoreSilentSwitch={'ignore'}
                      playInBackground={false}
                      playWhenInactive={false}
                    />
                  </View>
                ) : (
                  <View style={styles.posterContainer}>
                    <Image source={content.image} style={styles.posterImage} />
                    <Text style={styles.posterText}>{content.text}</Text>
                  </View>
                )}
              </View>
            ))}
          </Swiper>

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

    const timer = setTimeout(checkLastViewedTime, 500);

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
  headerContainer: {
    width: '100%',
    paddingVertical: 10,
    alignItems: 'center',
    flexDirection: 'column',
  },
  pageIndicator: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#04ca5b',
    width: 10,
    height: 10,
  },
  swipeGuide: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  transparentDot: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
  },
  swiperButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
  slideContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  posterContainer: {
    width: '100%',
    height: '90%',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  posterImage: {
    width: '100%',
    height: '70%',
    resizeMode: 'contain',
  },
  posterText: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 24,
    color: '#333',
    fontWeight: 'bold',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15,
    borderRadius: 10,
  },
  wrapper: {},
});

export default App;
