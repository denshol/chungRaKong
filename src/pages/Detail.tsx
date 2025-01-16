import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions,
  Linking,
  Platform,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const Detail = ({route, navigation}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const {
    title,
    description,
    poster,
    posters = [],
    curriculum,
    instructors,
    type,
    hasGallery,
  } = route.params;

  const handleCallPress = () => {
    Linking.openURL('tel:01080061715').catch(err => {
      console.error('전화 다이얼 열기 오류:', err);
    });
  };

  const handleImagePress = image => {
    setSelectedImage(image);
    setIsImageModalVisible(true);
  };

  const renderGallery = () => {
    if (!posters || posters.length === 0) {
      return (
        <TouchableOpacity onPress={() => handleImagePress(poster)}>
          <Image
            source={poster}
            style={styles.singlePoster}
            resizeMode="contain"
          />
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.galleryContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
          onScroll={event => {
            const x = event.nativeEvent.contentOffset.x;
            const pageIndex = Math.round(x / (SCREEN_WIDTH - 32));
            setCurrentPage(pageIndex);
          }}
          scrollEventThrottle={16}>
          {posters.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.posterContainer}
              onPress={() => handleImagePress(item)}>
              <Image source={item} style={styles.poster} resizeMode="contain" />
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* 페이지네이션 */}
        <View style={styles.paginationContainer}>
          {posters.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                currentPage === index && styles.activePaginationDot,
              ]}
            />
          ))}
        </View>

        {/* 더 많은 이미지 보기 버튼 */}
        <TouchableOpacity
          style={styles.moreImagesButton}
          onPress={() => {
            console.log('타이틀:', title);
            navigation.navigate('PhotoGallery', {
              title: title,
              type: type,
            });
          }}>
          <Icon name="images-outline" size={20} color="#fff" />
          <Text style={styles.moreImagesButtonText}>더 많은 이미지 보기</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        {renderGallery()}

        <Modal
          animationType="fade"
          transparent={true}
          visible={isImageModalVisible}
          onRequestClose={() => setIsImageModalVisible(false)}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setIsImageModalVisible(false)}
              accessible={true}
              accessibilityLabel="모달 닫기">
              <Icon name="close-circle" size={35} color="#fff" />
            </TouchableOpacity>
            <Image
              source={selectedImage || poster}
              style={styles.modalImage}
              resizeMode="contain"
            />
          </View>
        </Modal>

        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>

          <View style={styles.benefitContainer}>
            <Text style={styles.benefitText}>
              청라콩 문화센터만의 특별한 혜택 - 전문 강사진의 양질의 교육을
              무상으로 만나보세요.
            </Text>
          </View>

          {curriculum && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>수업 소개</Text>
              <Text style={styles.curriculum}>{curriculum}</Text>
            </View>
          )}

          {instructors && instructors.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>강사 소개</Text>
              {instructors.map((instructor, index) => (
                <View key={index} style={styles.instructorContainer}>
                  <Text style={styles.instructorName}>{instructor.name}</Text>
                  {typeof instructor.introduction === 'string' ? (
                    <Text style={styles.instructorIntro}>
                      {instructor.introduction}
                    </Text>
                  ) : instructor.introduction &&
                    instructor.introduction.image ? (
                    <Image
                      source={instructor.introduction.image}
                      style={styles.instructorImage}
                      accessible={true}
                      accessibilityLabel={`${instructor.name} 강사 프로필 이미지`}
                    />
                  ) : null}
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.callButton}
        onPress={handleCallPress}
        accessible={true}
        accessibilityLabel="문의하기"
        accessibilityHint="전화 문의를 시작합니다">
        <Icon name="call" size={24} color="#fff" />
        <Text style={styles.callButtonText}>문의하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 100 : 80,
  },
  scrollViewContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  singlePoster: {
    width: SCREEN_WIDTH - 32,
    height: (SCREEN_WIDTH - 32) * (9 / 16),
    alignSelf: 'center',
    backgroundColor: '#f8f8f8',
  },
  galleryContainer: {
    marginBottom: 16,
  },
  posterContainer: {
    width: SCREEN_WIDTH - 32,
    height: (SCREEN_WIDTH - 32) * (9 / 16),
    marginRight: 16,
    borderRadius: 12,
    backgroundColor: '#f8f8f8',
  },
  poster: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activePaginationDot: {
    backgroundColor: '#333',
    width: 12,
    height: 12,
  },
  moreImagesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(89, 194, 49, 0.8)',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    marginHorizontal: 16,
  },
  moreImagesButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  // 나머지 기존 스타일들은 그대로 유지
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.7,
    resizeMode: 'contain',
  },
  modalCloseButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 40 : 20,
    right: 20,
    zIndex: 1,
    padding: 10,
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
  benefitContainer: {
    backgroundColor: '#f0f8ff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#4169e1',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  benefitText: {
    color: '#4169e1',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 24,
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
  instructorImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginTop: 10,
    borderRadius: 8,
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#04ca5b',
    padding: 15,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  callButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default Detail;
