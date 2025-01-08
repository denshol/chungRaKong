// src/pages/VideoBoard.js
import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const DUMMY_VIDEOS = [
  {
    id: '1',
    title: '[통기타 기초] 1강 - 기타 잡는 법과 기본 자세',
    thumbnail: require('../assets/tongguitar.png'),
    instructor: '유준영 강사',
    duration: '15:30',
    uploadDate: '2024-02-15',
    views: 30,
    videoUrl: 'https://www.youtube.com/watch?v=L8imWO5D7_c',
    description: '통기타의 기본적인 자세와 운지법에 대해 알아봅니다.',
  },
  {
    id: '2',
    title: '[보컬 레슨] 1강 - 기초 발성 연습',
    thumbnail: require('../assets/vocallesson.png'),
    instructor: '황지훈 강사',
    duration: '20:45',
    uploadDate: '2024-02-14',
    views: 38,
    videoUrl: 'https://www.youtube.com/watch?v=L8imWO5D7_c',
    description: '올바른 발성을 위한 기초 호흡법과 발성 연습을 진행합니다.',
  },
  // {
  //   id: '3',
  //   title: '[바이올린 레슨] 1강 - 바이올린 기본 자세',
  //   thumbnail: require('../assets/violin.png'),
  //   instructor: '이루리 강사',
  //   duration: '18:20',
  //   uploadDate: '2024-02-13',
  //   views: 756,
  //   videoUrl: 'https://www.youtube.com/watch?v=Pmq9HFzXHYw',
  //   description:
  //     '바이올린을 처음 시작하시는 분들을 위한 기본자세와 활 잡는 법을 배웁니다.',
  // },
  // {
  //   id: '4',
  //   title: '[첼로 레슨] 1강 - 첼로 소개와 기본자세',
  //   thumbnail: require('../assets/chelo.png'),
  //   instructor: '고희민 강사',
  //   duration: '22:15',
  //   uploadDate: '2024-02-12',
  //   views: 632,
  //   videoUrl: 'https://www.youtube.com/watch?v=zF5Qh2N0dFk',
  //   description: '첼로의 특징과 기본적인 연주 자세를 알아봅니다.',
  // },
];

const VideoBoard = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [videos, setVideos] = useState(DUMMY_VIDEOS);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const renderVideoItem = ({item}) => (
    <TouchableOpacity
      style={styles.videoItem}
      onPress={() => navigation.navigate('VideoDetail', {video: item})}>
      <View style={styles.thumbnailContainer}>
        <Image source={item.thumbnail} style={styles.thumbnail} />
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>{item.duration}</Text>
        </View>
      </View>
      <View style={styles.videoInfo}>
        <Text style={styles.videoTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.instructorName}>{item.instructor}</Text>
        <Text style={styles.videoStats}>
          조회수 {item.views.toLocaleString()}회 • {item.uploadDate}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
        renderItem={renderVideoItem}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  listContainer: {
    padding: 16,
  },
  videoItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  thumbnailContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 16 / 9,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 4,
    borderRadius: 4,
  },
  durationText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  videoInfo: {
    padding: 12,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  instructorName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  videoStats: {
    fontSize: 12,
    color: '#888',
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 8,
  },
});

export default VideoBoard;
