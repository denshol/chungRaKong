import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  Modal,
  Platform,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerContent} from './src/pages/DrawerContent';
import Swiper from 'react-native-swiper';
import SplashScreen from 'react-native-splash-screen';

// 페이지 임포트
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import HomeScreen from './src/pages/HomeScreen';
import CombinedCNECMU from './src/pages/CombinedCNECMU';
import Detail from './src/pages/Detail';
import DirectionsMap from './src/pages/DirectionMaps';
import ProgramSchedule from './src/pages/ProgramSchedules';
import PhotoGallery from './src/pages/PhotoGallery';
import Board from './src/pages/board/Board';
import BoardDetail from './src/pages/board/BoardDetail';
import BoardCreate from './src/pages/board/BoardCreate';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// 커스텀 헤더 왼쪽 구성 요소
const CustomHeaderLeft = ({navigation, emojiSource, title}) => (
  <View style={styles.headerLeftContainer}>
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
      <Icon name="arrow-back-outline" size={25} color="#000" />
    </TouchableOpacity>
    {emojiSource && (
      <Image source={emojiSource} style={styles.headerLeftEmoji} />
    )}
    <Text style={styles.headerLeftTitle}>{title}</Text>
  </View>
);

// 애니메이션 헤더 텍스트 컴포넌트 - 아직 정의되지 않았으므로 빈 컴포넌트로 대체
const AnimatedHeaderText = () => (
  <Text style={styles.headerLogoText}>청라콩문화센터</Text>
);

// 뉴스 모달 컴포넌트
const NewsModal = ({visible, onClose}) => {
  const images = [
    require('./src/assets/news/modal1.jpg'),
    require('./src/assets/news/modal2.jpg'),
    require('./src/assets/news/modal3.jpg'),
    require('./src/assets/news/modal4.jpg'),
    require('./src/assets/news/modal5.jpg'),
    require('./src/assets/news/modal6.jpg'),
    require('./src/assets/news/modal7.jpg'),
    require('./src/assets/news/modal8.jpg'),
  ];

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Swiper style={styles.wrapper} showsButtons={true} loop={false}>
            {images.map((image, index) => (
              <View style={styles.slide} key={index}>
                <Image source={image} style={styles.image} />
              </View>
            ))}
          </Swiper>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <Icon name="close" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// 메인 스택 네비게이터
const MainStack = () => (
  <Stack.Navigator initialRouteName="CombinedCNECMU">
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        headerLeft: () => (
          <View style={styles.headerLogoContainer}>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL('https://lordslove125.wixsite.com/church-site')
              }>
              <Image
                source={require('./src/assets/lordslove.png')}
                style={styles.headerLogo}
              />
            </TouchableOpacity>
            <AnimatedHeaderText />
          </View>
        ),
        headerTitle: '',
      }}
    />
    <Stack.Screen
      name="SignIn"
      component={SignIn}
      options={{title: '로그인'}}
    />
    <Stack.Screen
      name="SignUp"
      component={SignUp}
      options={{title: '회원가입'}}
    />
    <Stack.Screen
      name="CombinedCNECMU"
      component={CombinedCNECMU}
      options={{
        title: '청라콩문화센터',
        headerTitle: () => (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('./src/assets/chungRaKong.png')}
              style={styles.headerMainLogo}
            />
            <Text style={styles.headerMainTitle}>청라콩문화센터</Text>
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="PhotoGallery"
      component={PhotoGallery}
      options={({navigation}) => ({
        headerLeft: () => (
          <CustomHeaderLeft
            navigation={navigation}
            emojiSource={require('./src/assets/imoticon/camera.png')}
            title="갤러리"
          />
        ),
        headerTitle: '',
      })}
    />
    <Stack.Screen
      name="Detail"
      component={Detail}
      options={({route, navigation}) => ({
        headerLeft: () => (
          <CustomHeaderLeft
            navigation={navigation}
            title={route.params?.title || '상세정보'}
          />
        ),
        headerTitle: '',
      })}
    />
    <Stack.Screen
      name="Board"
      component={Board}
      options={({navigation}) => ({
        headerLeft: () => (
          <CustomHeaderLeft
            navigation={navigation}
            emojiSource={require('./src/assets/imoticon/board.png')}
            title="게시판"
          />
        ),
        headerTitle: '',
      })}
    />
    <Stack.Screen
      name="BoardDetail"
      component={BoardDetail}
      options={{
        title: '게시글',
      }}
    />
    <Stack.Screen
      name="BoardCreate"
      component={BoardCreate}
      options={{
        title: '글쓰기',
      }}
    />
  </Stack.Navigator>
);

// 커스텀 탭 버튼
const TabBarCustomButton = ({children, onPress}) => (
  <TouchableOpacity style={styles.tabBarCustomButton} onPress={onPress}>
    {children}
  </TouchableOpacity>
);

// 로그인 후 탭 네비게이터
const LoggedInTabs = () => {
  const [newsModalVisible, setNewsModalVisible] = useState(false);
  const [showBadges, setShowBadges] = useState({
    program: true,
    gallery: true,
    youtube: true,
    board: true,
  });

  // 배지 숨기기 함수
  const hideBadge = useCallback(tabName => {
    setShowBadges(prev => ({
      ...prev,
      [tabName]: false,
    }));
  }, []);

  // 탭 아이콘 렌더링 함수
  const renderTabIcon = useCallback(
    (route, color, size) => {
      switch (route.name) {
        case 'MainHome':
          return <Icon name="home-outline" color={color} size={size} />;
        case 'ProgramSchedule':
          return (
            <View>
              <Icon name="calendar-outline" color={color} size={size} />
              {showBadges.program && (
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeText}>N</Text>
                </View>
              )}
            </View>
          );
        case 'PhotoGallery':
          return (
            <View>
              <Icon name="images-outline" color={color} size={size} />
              {showBadges.gallery && (
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeText}>N</Text>
                </View>
              )}
            </View>
          );
        case 'YouTube':
          return (
            <View>
              <FontAwesome name="youtube-play" color={color} size={size} />
              {showBadges.youtube && (
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeText}>N</Text>
                </View>
              )}
            </View>
          );
        case 'Board':
          return (
            <View>
              <Icon name="clipboard-outline" color={color} size={size} />
              {showBadges.board && (
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeText}>N</Text>
                </View>
              )}
            </View>
          );
        case 'Directions':
          return <Icon name="map-outline" color={color} size={size} />;
        default:
          return <Icon name="help-outline" color={color} size={size} />;
      }
    },
    [showBadges],
  );

  return (
    <>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({color, size}) => renderTabIcon(route, color, size),
          tabBarActiveTintColor: '#04ca5b',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {backgroundColor: '#f8f8f8'},
        })}>
        <Tab.Screen name="MainHome" options={{headerShown: false, title: '홈'}}>
          {props => <MainStack {...props} />}
        </Tab.Screen>
        <Tab.Screen
          name="ProgramSchedule"
          component={ProgramSchedule}
          options={{title: '프로그램'}}
          listeners={{
            tabPress: () => hideBadge('program'),
          }}
        />
        {/* <Tab.Screen
          name="Board"
          component={Board}
          options={{
            title: '게시판',
          }}
          listeners={{
            tabPress: () => hideBadge('board'),
          }}
        /> */}
        <Tab.Screen
          name="PhotoGallery"
          component={PhotoGallery}
          options={{title: '갤러리'}}
          listeners={{
            tabPress: () => hideBadge('gallery'),
          }}
        />
        <Tab.Screen
          name="YouTube"
          children={() => null}
          options={{
            title: '콩튜브',
            tabBarButton: props => (
              <TabBarCustomButton
                {...props}
                onPress={() => {
                  hideBadge('youtube');
                  Linking.openURL(
                    'https://www.youtube.com/@%EC%B2%AD%EB%9D%BC%EC%BD%A9',
                  );
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Directions"
          component={DirectionsMap}
          options={{title: '오시는 길'}}
        />
      </Tab.Navigator>
      <NewsModal
        visible={newsModalVisible}
        onClose={() => setNewsModalVisible(false)}
      />
    </>
  );
};

// 메인 앱 컴포넌트
function AppInner() {
  useEffect(() => {
    // 스플래시 스크린 숨기기
    SplashScreen.hide();
  }, []);

  return (
    <View style={styles.container}>
      <Drawer.Navigator
        drawerContent={props => <DrawerContent {...props} />}
        screenOptions={{
          drawerPosition: 'right',
          headerShown: false,
        }}>
        <Drawer.Screen name="Main" component={LoggedInTabs} />
      </Drawer.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  headerLeftEmoji: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginLeft: 10,
    marginRight: 8,
  },
  headerLeftTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  headerLogoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 0,
  },
  headerLogo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  headerMainLogo: {
    width: 80,
    height: 60,
    resizeMode: 'contain',
    marginRight: 0,
    marginLeft: 0,
  },
  headerMainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerLogoText: {
    fontSize: 18,
    color: '#000',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    height: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15,
    padding: 5,
  },
  tabBarCustomButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeContainer: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    zIndex: 1,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    paddingHorizontal: 3,
  },
  wrapper: {},
});

export default AppInner;
