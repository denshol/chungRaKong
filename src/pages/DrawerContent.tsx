import React from 'react';
import {View, StyleSheet} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../slices/user';
import {RootState} from '../store/reducer';
import EncryptedStorage from 'react-native-encrypted-storage';

export function DrawerContent(props) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => !!state.user.email);

  const handleLogout = async () => {
    dispatch(logout());
    await EncryptedStorage.removeItem('refreshToken');
    await EncryptedStorage.removeItem('accessToken');
    props.navigation.navigate('Home'); // Navigate to the home screen
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="home-outline" color={color} size={size} />
          )}
          label="홈"
          onPress={() => {
            props.navigation.navigate('Home');
          }}
        />
        {!isLoggedIn && (
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="log-in-outline" color={color} size={size} />
            )}
            label="로그인"
            onPress={() => {
              props.navigation.navigate('SignIn');
            }}
          />
        )}
        {!isLoggedIn && (
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="person-add-outline" color={color} size={size} />
            )}
            label="회원가입"
            onPress={() => {
              props.navigation.navigate('SignUp');
            }}
          />
        )}
        {isLoggedIn && (
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="log-out-outline" color={color} size={size} />
            )}
            label="로그아웃"
            onPress={handleLogout}
          />
        )}
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
});

export default DrawerContent;
