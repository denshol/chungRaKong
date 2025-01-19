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
  FlatList,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const Detail = ({route, navigation}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentModalIndex, setCurrentModalIndex] = useState(0);
  const [isInstructorImage, setIsInstructorImage] = useState(false);

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

  const handleImagePress = (image, index, isInstructorImage = false) => {
    setSelectedImage(image);
    setCurrentModalIndex(index);
    setIsInstructorImage(isInstructorImage);
    setIsImageModalVisible(true);
  };

  const renderGallery = () => {
    if (!posters || posters.length === 0) {
      return (
        <TouchableOpacity onPress={() => handleImagePress(poster, 0)}>
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
              onPress={() => handleImagePress(item, index)}>
              <Image source={item} style={styles.poster} resizeMode="contain" />
            </TouchableOpacity>
          ))}
        </ScrollView>

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

        <TouchableOpacity
          style={styles.moreImagesButton}
          onPress={() => {
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

            {isInstructorImage ? (
              <View style={styles.modalImageContainer}>
                <Image
                  source={selectedImage}
                  style={styles.modalImage}
                  resizeMode="contain"
                />
              </View>
            ) : (
              <>
                <FlatList
                  data={posters}
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  initialScrollIndex={currentModalIndex}
                  getItemLayout={(data, index) => ({
                    length: SCREEN_WIDTH,
                    offset: SCREEN_WIDTH * index,
                    index,
                  })}
                  renderItem={({item}) => (
                    <View style={styles.modalImageContainer}>
                      <Image
                        source={item}
                        style={styles.modalImage}
                        resizeMode="contain"
                      />
                    </View>
                  )}
                  keyExtractor={(_, index) => index.toString()}
                  onMomentumScrollEnd={event => {
                    const newIndex = Math.round(
                      event.nativeEvent.contentOffset.x / SCREEN_WIDTH,
                    );
                    setCurrentModalIndex(newIndex);
                  }}
                />

                {posters && posters.length > 1 && (
                  <View style={styles.modalPaginationContainer}>
                    {posters.map((_, index) => (
                      <View
                        key={index}
                        style={[
                          styles.modalPaginationDot,
                          currentModalIndex === index &&
                            styles.modalActivePaginationDot,
                        ]}
                      />
                    ))}
                  </View>
                )}
              </>
            )}
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
                    <TouchableOpacity
                      onPress={() =>
                        handleImagePress(instructor.introduction.image, 0, true)
                      }>
                      <Image
                        source={instructor.introduction.image}
                        style={styles.instructorImage}
                        accessible={true}
                        accessibilityLabel={`${instructor.name} 강사 프로필 이미지`}
                      />
                    </TouchableOpacity>
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
    backgroundColor: '#FFFFFF',
  },
  content: {
    paddingBottom: Platform.OS === 'ios' ? 100 : 80,
  },
  scrollViewContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  galleryContainer: {
    marginBottom: 24,
    backgroundColor: '#F8F9FA',
    borderRadius: 20,
    padding: 16,
    overflow: 'hidden',
  },
  posterContainer: {
    width: SCREEN_WIDTH - 32,
    height: (SCREEN_WIDTH - 32) * (9 / 16),
    marginRight: 16,
    borderRadius: 12,
    backgroundColor: '#f8f8f8',
    overflow: 'hidden',
  },
  singlePoster: {
    width: SCREEN_WIDTH - 32,
    height: (SCREEN_WIDTH - 32) * (9 / 16),
    borderRadius: 12,
    overflow: 'hidden',
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
    marginTop: 16,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DDD',
    marginHorizontal: 4,
  },
  activePaginationDot: {
    width: 12,
    height: 12,
    backgroundColor: '#59C231',
  },
  moreImagesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#59C231',
    padding: 12,
    borderRadius: 12,
    marginTop: 16,
  },
  moreImagesButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  modalImageContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.7,
    resizeMode: 'contain',
  },
  modalCloseButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 30,
    right: 20,
    zIndex: 2,
    padding: 10,
  },
  modalPaginationContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalPaginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  modalActivePaginationDot: {
    backgroundColor: '#fff',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  textContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -4},
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1A1A1A',
    letterSpacing: -0.8,
    marginBottom: 16,
    lineHeight: 38,
  },
  description: {
    fontSize: 18,
    color: '#4A4A4A',
    lineHeight: 28,
    marginBottom: 24,
    fontWeight: '400',
  },
  benefitContainer: {
    backgroundColor: 'rgba(89, 194, 49, 0.08)',
    borderRadius: 20,
    padding: 24,
    marginVertical: 24,
    borderWidth: 1,
    borderColor: 'rgba(89, 194, 49, 0.15)',
  },
  benefitText: {
    color: '#2E7D32',
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 26,
    textAlign: 'left',
  },
  section: {
    marginTop: 36,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    letterSpacing: -0.5,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#59C231',
    paddingLeft: 12,
  },
  curriculum: {
    fontSize: 17,
    color: '#4A4A4A',
    lineHeight: 28,
    fontWeight: '400',
  },
  instructorContainer: {
    marginBottom: 28,
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#59C231',
  },
  instructorName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    letterSpacing: -0.3,
    marginBottom: 12,
  },
  instructorIntro: {
    fontSize: 16,
    color: '#4A4A4A',
    lineHeight: 26,
    fontWeight: '400',
  },
  instructorImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 16 / 9,
    resizeMode: 'contain',
    borderRadius: 12,
    marginTop: 16,
    marginBottom: 16,
    backgroundColor: '#f8f8f8',
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#59C231',
    padding: 20,
    margin: 16,
    borderRadius: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  callButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 10,
    letterSpacing: -0.3,
  },
});

export default Detail;
