import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Detail = ({route, navigation}) => {
  const {
    title,
    description,
    poster,
    curriculum,
    instructors,
    type,
    hasGallery,
  } = route.params;

  console.log('Detail Screen - route.params:', route.params);
  console.log('Detail Screen - title:', title);
  console.log('Detail Screen - hasGallery:', hasGallery);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* 디버그용 텍스트 추가 */}
        <Text style={{color: 'red', fontSize: 16}}>수업명: {title}</Text>
        <Text style={{color: 'red', fontSize: 16}}>
          갤러리 버튼 표시 여부: {hasGallery ? '예' : '아니오'}
        </Text>

        <Image source={poster} style={styles.poster} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>

          {/* 갤러리 버튼 - 조건 변경해서 테스트 */}
          <TouchableOpacity
            style={styles.galleryButton}
            onPress={() => navigation.navigate('ClassGallery')}>
            <Icon name="images-outline" size={20} color="#fff" />
            <Text style={styles.galleryButtonText}>수업 사진 보기</Text>
          </TouchableOpacity>

          {curriculum && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>커리큘럼</Text>
              <Text style={styles.curriculum}>{curriculum}</Text>
            </View>
          )}

          {instructors && instructors.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>강사 소개</Text>
              {instructors.map((instructor, index) => (
                <View key={index} style={styles.instructorContainer}>
                  <Text style={styles.instructorName}>{instructor.name}</Text>
                  <Text style={styles.instructorIntro}>
                    {instructor.introduction}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
  },
  poster: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    borderRadius: 12,
    marginBottom: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
    lineHeight: 24,
  },
  // Detail.js의 styles에서
  galleryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF9500',
    padding: 15,
    borderRadius: 8,
    marginVertical: 20,
    justifyContent: 'center',
    // 버튼을 더 눈에 띄게 만듦
    borderWidth: 2,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  galleryButtonText: {
    color: '#fff',
    fontSize: 20, // 글자 크기 증가
    fontWeight: 'bold',
    marginLeft: 8,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  curriculum: {
    fontSize: 15,
    color: '#666',
    lineHeight: 24,
  },
  instructorContainer: {
    marginBottom: 16,
  },
  instructorName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  instructorIntro: {
    fontSize: 15,
    color: '#666',
    lineHeight: 24,
  },
});

export default Detail;
