import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = () => {
    // 여기서 실제 API 호출을 통해 알림을 가져와야 합니다.
    // 아래는 예시 데이터입니다.
    const mockNotifications = [
      {
        id: '1',
        type: 'info',
        message: '새로운 강좌가 오픈되었습니다!',
        time: '방금 전',
      },
      {
        id: '2',
        type: 'success',
        message: '수강신청이 완료되었습니다.',
        time: '1시간 전',
      },
      {
        id: '3',
        type: 'warning',
        message: '강의 시작 30분 전입니다.',
        time: '3시간 전',
      },
    ];
    setNotifications(mockNotifications);
    setRefreshing(false);
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchNotifications();
  };

  const renderNotificationItem = ({item}) => (
    <TouchableOpacity style={styles.notificationItem}>
      <Icon
        name={
          item.type === 'info'
            ? 'information-circle'
            : item.type === 'success'
            ? 'checkmark-circle'
            : 'warning'
        }
        size={24}
        color={
          item.type === 'info'
            ? '#3498db'
            : item.type === 'success'
            ? '#2ecc71'
            : '#f39c12'
        }
      />
      <View style={styles.notificationContent}>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>알림이 없습니다.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
  },
  notificationContent: {
    marginLeft: 15,
    flex: 1,
  },
  notificationMessage: {
    fontSize: 16,
    color: '#333',
  },
  notificationTime: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888',
  },
});

export default Notifications;
