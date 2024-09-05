import React, {useEffect, useRef, useMemo} from 'react';
import {
  Alert,
  Pressable,
  View,
  Image,
  StyleSheet,
  Text,
  Animated,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerContent} from './src/pages/DrawerContent';
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import HomeScreen from './src/pages/HomeScreen';
import MyPage from './src/pages/MyPage';
import Settings from './src/pages/Settings';
import CNE from './src/pages/CNE';
import CMU from './src/pages/CMU';
import Notifications from './src/pages/Notifications';
import Chat from './src/pages/Chat';
import Notice from './src/pages/Notice';
import Detail from './src/pages/Detail';
import SplashScreen from 'react-native-splash-screen';
import KeyboardAvoidingComponent from './src/components/KeyboardAvoidingComponent';
import {useCallback} from 'react';
import {useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/core';
import DirectionsMap from './src/pages/DirectionMaps';
import ProgramSchedule from './src/pages/ProgramSchedules';
import CombinedCNECMU from './src/pages/CombinedCNECMU';

export type LoggedInParamList = {
  MainHome: undefined;
  MyPage: undefined;
  YouTube: undefined;
  Chat: undefined;
  Notice: undefined;
  Directions: undefined;
  ProgramSchedule: undefined;
};

export type RootStackParamList = {
  Home: undefined;
  SignIn: undefined;
  SignUp: undefined;
  CNE: undefined;
  CMU: undefined;
  Notifications: undefined;
  Settings: undefined;
  Detail: undefined;
  CombinedCNECMU: undefined;
};

const Tab = createBottomTabNavigator<LoggedInParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

const TabIcon = ({name, color, size}) => (
  <Icon name={name} color={color} size={size} />
);

const HeaderRight = ({navigation}) => (
  <View style={{flexDirection: 'row'}}>
    <Pressable
      onPress={() => navigation.navigate('Notifications')}
      style={{marginRight: 15}}>
      <Icon name="notifications-outline" size={25} color="#000" />
    </Pressable>
  </View>
);

const CustomHeaderLeft = ({navigation, emojiSource, title}) => {
  return (
    <View style={styles.headerLeftContainer}>
      <Pressable onPress={() => navigation.goBack()}>
        <Icon name="arrow-back-outline" size={25} color="#000" />
      </Pressable>
      <Image source={emojiSource} style={styles.headerLeftEmoji} />
      <Text style={styles.headerLeftTitle}>{title}</Text>
    </View>
  );
};

const AnimatedHeaderText = React.memo(() => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const moveAnim = useRef(new Animated.Value(20)).current;

  const startAnimation = useCallback(() => {
    fadeAnim.setValue(0);
    moveAnim.setValue(20);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(moveAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, moveAnim]);

  useEffect(() => {
    startAnimation();
  }, [startAnimation]);

  const openLink = () => {
    Linking.openURL('https://lordslove125.wixsite.com/church-site');
  };

  const animatedStyle = useMemo(() => {
    return {
      opacity: fadeAnim,
      transform: [{translateY: moveAnim}],
    };
  }, [fadeAnim, moveAnim]);

  return (
    <TouchableOpacity onPress={openLink}>
      <Animated.Text style={[styles.headerLogoText, animatedStyle]}>
        주님의사랑교회
      </Animated.Text>
    </TouchableOpacity>
  );
});

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
});

const MainStack = () => {
  const [animationKey, setAnimationKey] = useState(0);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setAnimationKey(prev => prev + 1);
    }
  }, [isFocused]);

  return (
    <Stack.Navigator
      initialRouteName="CombinedCNECMU"
      screenOptions={({navigation}) => ({
        // headerRight: () => <HeaderRight navigation={navigation} />,
      })}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerLeft: () => (
            <View style={styles.headerLogoContainer}>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    'https://lordslove125.wixsite.com/church-site',
                  )
                }>
                <Image
                  source={require('./src/assets/lordslove.png')}
                  style={styles.headerLogo}
                />
              </TouchableOpacity>
              <AnimatedHeaderText key={animationKey} />
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
        options={{title: '청라콩문화센터'}}
      />
      <Stack.Screen
        name="CNE"
        component={CNE}
        options={({navigation}) => ({
          headerLeft: () => (
            <CustomHeaderLeft
              navigation={navigation}
              emojiSource={require('./src/assets/imoticon/openBook.png')}
              title="청라 NE"
            />
          ),
          headerTitle: '',
        })}
      />
      <Stack.Screen
        name="CMU"
        component={CMU}
        options={({navigation}) => ({
          headerLeft: () => (
            <CustomHeaderLeft
              navigation={navigation}
              emojiSource={require('./src/assets/imoticon/guitar.png')}
              title="청라뮤"
            />
          ),
          headerTitle: '',
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
    </Stack.Navigator>
  );
};

const TabBarCustomButton = ({accessibilityState, children, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      activeOpacity={0.8}
      onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

const EmptyComponent = () => null;

const LoggedInTabs = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({color, size}) => {
        let iconName;

        if (route.name === 'MainHome') {
          iconName = 'home-outline';
        } else if (route.name === 'MyPage') {
          iconName = 'person-outline';
        } else if (route.name === 'YouTube') {
          return <FontAwesome name="youtube-play" color={color} size={size} />;
        } else if (route.name === 'Chat') {
          iconName = 'chatbubble-ellipses-outline';
        } else if (route.name === 'Notice') {
          iconName = 'megaphone-outline';
        } else if (route.name === 'Directions') {
          iconName = 'map-outline';
        } else if (route.name === 'ProgramSchedule') {
          iconName = 'calendar-outline';
        }

        return <Icon name={iconName} color={color} size={size} />;
      },
      tabBarActiveTintColor: '#04ca5b',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: {backgroundColor: '#f8f8f8'},
    })}>
    <Tab.Screen
      name="MainHome"
      component={MainStack}
      options={{headerShown: false, title: '홈'}}
    />
    <Tab.Screen
      name="Notice"
      component={Notice}
      options={{title: '공지사항'}}
    />
    <Tab.Screen
      name="ProgramSchedule"
      component={ProgramSchedule}
      options={{
        title: '프로그램',
        tabBarIcon: ({color, size}) => (
          <Icon name="calendar-outline" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="YouTube"
      component={EmptyComponent}
      options={{
        title: '콩튜브',
        tabBarButton: props => (
          <TabBarCustomButton
            {...props}
            onPress={() =>
              Linking.openURL(
                'https://www.youtube.com/@%EC%B2%AD%EB%9D%BC%EC%BD%A9',
              )
            }
          />
        ),
      }}
    />
    <Tab.Screen
      name="Directions"
      component={DirectionsMap}
      options={{
        title: '오시는 길',
        tabBarIcon: ({color, size}) => (
          <Icon name="map-outline" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

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

export default AppInner;
