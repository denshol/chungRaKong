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
        headerTitle: () => (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('./src/assets/profiles/chungRaKong.png')}
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
        // navigation을 여기서 받아옵니다
        headerLeft: () => (
          // 함수 형태로 변경
          <CustomHeaderLeft
            navigation={navigation} // navigation을 직접 전달
            title={route.params?.title || '상세정보'}
          />
        ),
        headerTitle: '',
      })}
    />
  </Stack.Navigator>
);

const TabBarCustomButton = ({children, onPress}) => (
  <TouchableOpacity
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}
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
    board: true,
  });

  const hideBadge = tabName => {
    setShowBadges(prev => ({
      ...prev,
      [tabName]: false,
    }));
  };

  return (
    <>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({color, size}) => {
            let iconName;
            if (route.name === 'MainHome') {
              iconName = 'home-outline';
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
            } else if (route.name === 'Board') {
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
            } else if (route.name === 'Directions') {
              iconName = 'map-outline';
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
    <View style={{flex: 1}}>
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
  wrapper: {},
});

export default AppInner;
