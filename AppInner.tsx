// AppInner.js
import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  Animated,
  TouchableOpacity,
  Linking,
  Modal,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerContent} from './src/pages/DrawerContent';
import Swiper from 'react-native-swiper';
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import HomeScreen from './src/pages/HomeScreen';
import CombinedCNECMU from './src/pages/CombinedCNECMU';
import Notifications from './src/pages/Notifications';
import Settings from './src/pages/Settings';
import Detail from './src/pages/Detail';
import SplashScreen from 'react-native-splash-screen';
import KeyboardAvoidingComponent from './src/components/KeyboardAvoidingComponent';
import DirectionsMap from './src/pages/DirectionMaps';
import ProgramSchedule from './src/pages/ProgramSchedules';
import PhotoGallery from './src/pages/PhotoGallery';
import ClassGallery from './src/pages/ClassGallery';
import BoardScreen from './src/pages/board/BoardScreen';
import PostDetail from './src/pages/board/PostDetail';
import WritePost from './src/pages/board/WritePost';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const CustomHeaderLeft = ({navigation, emojiSource, title}) => (
  <View style={styles.headerLeftContainer}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Icon name="arrow-back-outline" size={25} color="#000" />
    </TouchableOpacity>
    <Image source={emojiSource} style={styles.headerLeftEmoji} />
    <Text style={styles.headerLeftTitle}>{title}</Text>
  </View>
);

const AnimatedHeaderText = () => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <TouchableOpacity
      onPress={() =>
        Linking.openURL('https://lordslove125.wixsite.com/church-site')
      }>
      <Animated.Text style={[styles.headerLogoText, {opacity: fadeAnim}]}>
        주님의사랑교회
      </Animated.Text>
    </TouchableOpacity>
  );
};

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
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="close" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

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
      options={({navigation}) => ({
        title: '청라콩문화센터',
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{marginRight: 10}}>
            <Icon name="arrow-back-outline" size={25} color="#000" />
          </TouchableOpacity>
        ),
        headerTitle: () => (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('./src/assets/profiles/chungRaKong.png')} // 로고 이미지 경로를 실제 경로로 변경
              style={{
                width: 80,
                height: 60,
                resizeMode: 'contain',
                marginRight: 0,
                marginLeft: 0,
              }}
            />
            <Text style={{fontSize: 24, fontWeight: 'bold'}}>
              청라콩문화센터
            </Text>
          </View>
        ),
      })}
    />

    <Stack.Screen
      name="Notifications"
      component={Notifications}
      options={{title: '알림'}}
    />
    <Stack.Screen
      name="Settings"
      component={Settings}
      options={{title: '설정'}}
    />
    <Stack.Screen
      name="Detail"
      component={Detail}
      options={{title: '상세 정보'}}
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
      name="ClassGallery"
      component={ClassGallery}
      options={({navigation}) => ({
        headerLeft: () => (
          <CustomHeaderLeft
            navigation={navigation}
            emojiSource={require('./src/assets/imoticon/camera.png')}
            title="수업 사진"
          />
        ),
        headerTitle: '',
      })}
    />
    <Stack.Screen
      name="Board"
      component={BoardScreen}
      options={({navigation}) => ({
        title: '게시판',
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
      name="PostDetail"
      component={PostDetail}
      options={({navigation}) => ({
        title: '게시글 상세',
        headerLeft: () => (
          <CustomHeaderLeft
            navigation={navigation}
            emojiSource={require('./src/assets/imoticon/post.png')}
            title="게시글"
          />
        ),
        headerTitle: '',
      })}
    />
    <Stack.Screen
      name="WritePost"
      component={WritePost}
      options={({navigation}) => ({
        title: '글쓰기',
        headerLeft: () => (
          <CustomHeaderLeft
            navigation={navigation}
            emojiSource={require('./src/assets/imoticon/write.png')}
            title="글쓰기"
          />
        ),
        headerTitle: '',
      })}
    />
  </Stack.Navigator>
);

const TabBarCustomButton = ({children, onPress}) => (
  <TouchableOpacity
    style={styles.tabBarCustomButton}
    activeOpacity={0.8}
    onPress={onPress}>
    {children}
  </TouchableOpacity>
);

const LoggedInTabs = () => {
  const [newsModalVisible, setNewsModalVisible] = useState(false);
  const [showBadges, setShowBadges] = useState({
    program: true,
    gallery: true,
    youtube: true,
  });

  const hideBadge = tabName => {
    setShowBadges(prev => ({
      ...prev,
      [tabName]: false,
    }));
  };

  // LoggedInTabs 컴포넌트 내부의 Tab.Navigator 부분을 수정

  return (
    <>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({color, size}) => {
            let iconName;
            if (route.name === 'MainHome') {
              iconName = 'home-outline';
              return <Icon name={iconName} color={color} size={size} />;
            } else if (route.name === 'Notice') {
              iconName = 'megaphone-outline';
              return <Icon name={iconName} color={color} size={size} />;
            } else if (route.name === 'ProgramSchedule') {
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
            } else if (route.name === 'PhotoGallery') {
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
            } else if (route.name === 'YouTube') {
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
            } else if (route.name === 'Directions') {
              iconName = 'map-outline';
              return <Icon name={iconName} color={color} size={size} />;
            }
            return <Icon name={iconName} color={color} size={size} />;
          },
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
          component={() => null}
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
        <Tab.Screen
          name="Board"
          component={BoardScreen}
          options={{
            title: '게시판',
            tabBarIcon: ({color, size}) => (
              <Icon name="newspaper-outline" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
      <NewsModal
        visible={newsModalVisible}
        onClose={() => setNewsModalVisible(false)}
      />
    </>
  );
};

function AppInner() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <KeyboardAvoidingComponent>
      <Drawer.Navigator
        drawerContent={props => <DrawerContent {...props} />}
        screenOptions={{
          drawerPosition: 'right',
          headerShown: false,
        }}>
        <Drawer.Screen name="Main" component={LoggedInTabs} />
      </Drawer.Navigator>
    </KeyboardAvoidingComponent>
  );
}

const styles = StyleSheet.create({
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
  video: {
    width: '100%',
    height: '100%',
  },
  posterContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
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
});

export default AppInner;
