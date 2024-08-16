import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const MyPage = ({navigation}) => {
  const [userInfo, setUserInfo] = useState({
    name: '홍길동',
    email: 'hong@example.com',
    profileImage: 'https://via.placeholder.com/150',
    enrolledCourses: 3,
    completedCourses: 1,
  });

  useEffect(() => {
    // 여기서 실제 API 호출을 통해 사용자 정보를 가져와야 합니다.
  }, []);

  const menuItems = [
    {
      icon: 'book-outline',
      title: '내 강좌',
      onPress: () => navigation.navigate('MyCourses'),
    },
    {
      icon: 'card-outline',
      title: '결제 내역',
      onPress: () => navigation.navigate('PaymentHistory'),
    },
    {
      icon: 'star-outline',
      title: '즐겨찾기',
      onPress: () => navigation.navigate('Favorites'),
    },
    {
      icon: 'help-circle-outline',
      title: '고객 지원',
      onPress: () => navigation.navigate('Support'),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileSection}>
        <Image
          source={{uri: userInfo.profileImage}}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>{userInfo.name}</Text>
        <Text style={styles.userEmail}>{userInfo.email}</Text>
      </View>

      <View style={styles.statsSection}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{userInfo.enrolledCourses}</Text>
          <Text style={styles.statLabel}>수강 중인 강좌</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{userInfo.completedCourses}</Text>
          <Text style={styles.statLabel}>완료한 강좌</Text>
        </View>
      </View>

      <View style={styles.menuSection}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={item.onPress}>
            <Icon name={item.icon} size={24} color="#04ca5b" />
            <Text style={styles.menuTitle}>{item.title}</Text>
            <Icon name="chevron-forward-outline" size={24} color="#888" />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#04ca5b',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  menuSection: {
    marginTop: 10,
    backgroundColor: '#fff',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  menuTitle: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
  },
});

export default MyPage;
