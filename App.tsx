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
    // {
    //   type: 'video',
    //   source: require('./src/assets/video/chungRaKongLoGo.mov'),
    // },
    {
      type: 'poster',
      image: require('./src/assets/poster/chungRaFestival.jpg'),
      text: '청라콩문화센터에 오신 것을 환영합니다!\n\n청라콩 제2회 정기공연\n2024년 4월 26일',
    },
    {
      type: 'poster',
      image: require('./src/assets/poster/chungRaElecHan.jpg'),
      text: '청라콩문화센터에 전기기능교육강좌가 신설되었습니다!',
    },
    {
      type: 'poster',
      image: require('./src/assets/poster/chungRaUkelelePoster.jpg'),
      text: '청라콩문화센터에 우쿨렐레강좌가 신설되었습니다.',
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
              {currentPage === 0 ? '← 옆으로 스와이프하여 공지사항 더보기' : ''}
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
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        // 앱 최초 실행 또는 24시간 지났는지 확인
        const firstLaunchValue = await AsyncStorage.getItem('@first_launch');
        const lastViewedTime = await AsyncStorage.getItem(
          '@last_video_view_time',
        );
        const currentTime = new Date().getTime();

        console.log('First launch value:', firstLaunchValue);
        console.log('Last viewed time:', lastViewedTime);
        console.log('Current time:', currentTime);

        if (!firstLaunchValue) {
          // 앱 최초 실행
          await AsyncStorage.setItem('@first_launch', 'false');
          setVideoModalVisible(true);
        } else if (
          !lastViewedTime ||
          currentTime - parseInt(lastViewedTime) >= 24 * 60 * 60 * 1000
        ) {
          // 24시간 이상 지났을 때
          setVideoModalVisible(true);
        }
      } catch (error) {
        console.error('모달 표시 중 오류:', error);
        setVideoModalVisible(true);
      } finally {
        SplashScreen.hide();
        setIsFirstLaunch(false);
      }
    };

    checkFirstLaunch();
  }, []);

  const handleSkip = async () => {
    try {
      // 24시간 후 다시 보이도록 설정
      await AsyncStorage.setItem(
        '@last_video_view_time',
        new Date().getTime().toString(),
      );
      setVideoModalVisible(false);
    } catch (error) {
      console.error('마지막 시청 시간 저장 중 오류:', error);
    }
  };

  // 모달을 강제로 다시 보이게 하는 함수 추가 (개발/테스트용)
  const forceShowModal = async () => {
    try {
      // AsyncStorage의 마지막 시간을 24시간 이전으로 설정
      await AsyncStorage.setItem(
        '@last_video_view_time',
        (new Date().getTime() - 25 * 60 * 60 * 1000).toString(),
      );

      // 모달 상태 강제 변경
      setVideoModalVisible(true);
    } catch (error) {
      console.error('모달 강제 표시 중 오류:', error);
    }
  };

  // 앱 최초 실행 또는 로딩 중일 때는 아무것도 렌더링하지 않음
  if (isFirstLaunch) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppInner />
        <VideoModal
          visible={videoModalVisible}
          onClose={() => setVideoModalVisible(false)}
          onSkip={handleSkip}
        />
        {/* 개발 중 디버깅용 버튼 (필요시 주석 해제) */}
        {__DEV__ && (
          <TouchableOpacity
            onPress={forceShowModal}
            style={{
              position: 'absolute',
              top: 50,
              right: 20,
              backgroundColor: 'red',
              padding: 10,
              borderRadius: 5,
            }}>
            <Text style={{color: 'white'}}>공지사항 다시 보기</Text>
          </TouchableOpacity>
        )}
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
