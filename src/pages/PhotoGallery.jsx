// src/pages/PhotoGallery.js
import React, {useState, useRef} from 'react';
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const PhotoGallery = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const photosPerPage = 4; // 한 페이지당 사진 개수를 4개로 수정
  const scrollViewRef = useRef(null);

  const photos = [
    {
      id: '1',
      image: require('../assets/gallery/concert1.jpg'),
      description:
        '드디어 대망의 설레이는 첫번째 청라콩 공연무대입니다. 모두에게 잊지못할 크리스마스 추억이 되길 소망하며.',
      date: '2024.12.27',
    },
    {
      id: '2',
      image: require('../assets/gallery/concert2.jpg'),
      description:
        '청라콩 통기타 초급반 선생님들의 멋있었던 공연이었습니다. 노래도 잘 부르시고 기타소리도 너무 듣기좋았어요. 감명깊게봤습니다 감사합니다 선생님들.',
      date: '2024.12.27',
    },
    {
      id: '3',
      image: require('../assets/gallery/concert3.jpg'),
      description:
        '유종환 선생님의 가족과 함께하는 공연입니다, 너무 보기 좋았어요. 정말 귀여운 가을하늘이였습니다. ',
      date: '2024.12.27',
    },
    {
      id: '4',
      image: require('../assets/gallery/concert4.jpg'),
      description:
        '열정적으로 연습하시던 청라콩 통기타 중급반 선생님들의 실력에 놀랐었던 공연이었어요. 정말 멋있었어요~.',
      date: '2024.12.27',
    },
    {
      id: '5',
      image: require('../assets/gallery/concert10.jpg'),
      description:
        '한찬호 선생님의 연륜이 느껴지는 공연이었습니다. 오페라 공연을 보는 기분이었어요.목소리가 웅장한 느낌으로 좋으세요.',
      date: '2024.12.27',
    },
    {
      id: '6',
      image: require('../assets/gallery/concert11.jpg'),
      description:
        '유종환 선생님의 "못다핀 꽃 한송이" 공연입니다. 노래실력이 굉장히 일취월장하셨어요. 엄청나게 노력하셨다는게 느껴졌습니다.',
      date: '2024.12.27',
    },
    {
      id: '7',
      image: require('../assets/gallery/concert5.jpg'),
      description:
        '콩밴드! 청라콩의 자랑스러운 밴드입니다. 악기소리들이 너무 듣기 좋았고, 많이 인상적인 무대였어요. 열심히 연습하시던 모습을 봐왔기에 더욱 감동적이었습니다.',
      date: '2024.12.27',
    },
    {
      id: '8',
      image: require('../assets/gallery/concert8.jpg'),
      description:
        '마지막 포토타임! 제1회 청라콩공연을 위해 힘써주신 선생님들과 함께 찍은 사진입니다. 행복한 느낌이 들었던 순간입니다. 모두가 행복해보였어요. 다음에도 또 만나요~',
      date: '2024.12.27',
    },
    {
      id: '9',
      image: require('../assets/gallery/concert12.jpg'),
      description: '청라콩 통기타 수업이 끝난 후 한 컷~!@',
      date: '2024.11',
    },

    {
      id: '10',
      image: require('../assets/gallery/gaelhanl.jpg'),
      description:
        '청라콩 공연에서 마스코트 같은 역할을 해준 고마운 가을하늘이. 너무 귀여웠어. 수고했어 고마워 :D ',
      date: '2024.12.27',
    },
  ];

  const totalPages = Math.ceil(photos.length / photosPerPage);

  const currentPhotos = photos.slice(
    (currentPage - 1) * photosPerPage,
    currentPage * photosPerPage,
  );

  const goToPage = pageNumber => {
    setCurrentPage(pageNumber);
    scrollViewRef.current?.scrollTo({y: 0, animated: true});
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        showsVerticalScrollIndicator={true}
        indicatorStyle="black"
        contentContainerStyle={styles.scrollViewContent}
        persistentScrollbar={true}>
        <View style={styles.galleryGrid}>
          {currentPhotos.map(photo => (
            <TouchableOpacity
              key={photo.id}
              style={styles.photoContainer}
              onPress={() => setSelectedPhoto(photo)}>
              <Image
                source={photo.image}
                style={styles.photo}
                resizeMode="cover"
              />
              <Text style={styles.description}>{photo.description}</Text>
              <Text style={styles.date}>{photo.date}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 페이지네이션 */}
        <View style={styles.pagination}>
          <TouchableOpacity
            style={[
              styles.pageButton,
              currentPage === 1 && styles.pageButtonDisabled,
            ]}
            onPress={() => currentPage > 1 && goToPage(currentPage - 1)}
            disabled={currentPage === 1}>
            <Icon
              name="chevron-back-outline"
              size={24}
              color={currentPage === 1 ? '#ccc' : '#04ca5b'}
            />
          </TouchableOpacity>

          {[...Array(totalPages)].map((_, index) => (
            <TouchableOpacity
              key={index + 1}
              style={[
                styles.pageNumberButton,
                currentPage === index + 1 && styles.currentPageButton,
              ]}
              onPress={() => goToPage(index + 1)}>
              <Text
                style={[
                  styles.pageNumberText,
                  currentPage === index + 1 && styles.currentPageText,
                ]}>
                {index + 1}
              </Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={[
              styles.pageButton,
              currentPage === totalPages && styles.pageButtonDisabled,
            ]}
            onPress={() =>
              currentPage < totalPages && goToPage(currentPage + 1)
            }
            disabled={currentPage === totalPages}>
            <Icon
              name="chevron-forward-outline"
              size={24}
              color={currentPage === totalPages ? '#ccc' : '#04ca5b'}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* 이미지 확대 모달 */}
      <Modal
        visible={selectedPhoto !== null}
        transparent={true}
        onRequestClose={() => setSelectedPhoto(null)}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={() => setSelectedPhoto(null)}>
            <Icon name="close" size={30} color="#fff" />
          </TouchableOpacity>
          {selectedPhoto && (
            <View style={styles.modalContent}>
              <Image
                source={selectedPhoto.image}
                style={styles.modalImage}
                resizeMode="contain"
              />
              <View style={styles.modalTextContainer}>
                <Text style={styles.modalDescription}>
                  {selectedPhoto.description}
                </Text>
                <Text style={styles.modalDate}>{selectedPhoto.date}</Text>
              </View>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const imageSize = (windowWidth - 45) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
    paddingRight: 3,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  galleryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    paddingRight: 7,
  },
  photoContainer: {
    width: imageSize,
    margin: 5,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  photo: {
    width: '100%',
    height: imageSize,
    borderRadius: 10,
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginTop: 8,
    marginHorizontal: 5,
    textAlign: 'center',
    fontWeight: '500',
  },
  date: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 8,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingBottom: 30,
  },
  pageButton: {
    padding: 10,
  },
  pageButtonDisabled: {
    opacity: 0.5,
  },
  pageNumberButton: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  currentPageButton: {
    backgroundColor: '#04ca5b',
  },
  pageNumberText: {
    fontSize: 16,
    color: '#666',
  },
  currentPageText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  // 모달 관련 스타일
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    alignItems: 'center',
  },
  modalImage: {
    width: windowWidth,
    height: windowHeight * 0.7,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
    padding: 10,
  },
  modalTextContainer: {
    padding: 20,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalDescription: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  modalDate: {
    color: '#ddd',
    fontSize: 14,
  },
});

export default PhotoGallery;
