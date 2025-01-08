// src/pages/VideoDetail.js
import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const VideoDetail = ({route}) => {
  const {video} = route.params;
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(true);

  // 16:9 비율 계산
  const playerHeight = SCREEN_WIDTH * (9 / 16);

  // YouTube URL에서 비디오 ID 추출
  const getYoutubeVideoId = url => {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : false;
  };

  const videoId = getYoutubeVideoId(video.videoUrl);

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.videoContainer}>
          {loading && (
            <View style={[styles.loadingContainer, {height: playerHeight}]}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}
          <YoutubePlayer
            height={playerHeight}
            videoId={videoId}
            play={playing}
            onChangeState={onStateChange}
            onReady={() => setLoading(false)}
            initialPlayerParams={{
              preventFullScreen: false,
              cc_lang_pref: 'ko',
              showClosedCaptions: true,
            }}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{video.title}</Text>
          <Text style={styles.stats}>
            조회수 {video.views.toLocaleString()}회 • {video.uploadDate}
          </Text>
          <View style={styles.divider} />
          <View style={styles.instructorInfo}>
            <Text style={styles.instructorName}>{video.instructor}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>강의 소개</Text>
            <Text style={styles.description}>{video.description}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  videoContainer: {
    width: SCREEN_WIDTH,
    backgroundColor: '#000',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    zIndex: 1,
  },
  infoContainer: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
    lineHeight: 28,
  },
  stats: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 16,
  },
  instructorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  instructorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  descriptionContainer: {
    marginTop: 8,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
});

export default VideoDetail;
