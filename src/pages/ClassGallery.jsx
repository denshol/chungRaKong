// src/pages/ClassGallery.js
import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ClassGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const photosPerPage = 4;

  // 통기타와 드럼 수업 이미지만 포함
  const galleryImages = [
    {
      id: 'guitar1',
      image: require('../assets/class/classGuitar1.jpg'),
      title: '통기타',
      description: '통기타 중급반 수업중 한 컷 ~!@',
    },
    {
      id: 'guitar2',
      image: require('../assets/class/classGuitar2.jpg'),
      title: '통기타',
      description:
        '통기타 수업에 집중하시는 유종환선생님이십니다. 꾸준히 와주셔서 대단히 감사드려요 ^^',
    },
    {
      id: 'guitar3',
      image: require('../assets/class/classGuitar3.jpg'),
      title: '통기타',
      description:
        '통기타 초급반 수업중 집중하시는 김현미 선생님이십니다. 열심히 집중하시는 모습이 보기 좋습니다. :D',
    },
    {
      id: 'drum1',
      image: require('../assets/class/classDrum1.jpg'),
      title: '드럼',
      description: '',
    },
    {
      id: 'drum2',
      image: require('../assets/class/classDrum2.jpg'),
      title: '드럼',
      description: '',
    },
    {
      id: 'drum3',
      image: require('../assets/class/classDrum3.jpg'),
      title: '드럼',
      description: '',
    },
    {
      id: 'drum4',
      image: require('../assets/class/classDrum4.jpg'),
      title: '드럼',
      description: '',
    },
  ];

  const totalPages = Math.ceil(galleryImages.length / photosPerPage);

  const currentImages = galleryImages.slice(
    (currentPage - 1) * photosPerPage,
    currentPage * photosPerPage,
  );

  const goToPage = pageNumber => {
    setCurrentPage(pageNumber);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.galleryGrid}>
          {currentImages.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.photoContainer}
              onPress={() => setSelectedImage(item)}>
              <Image
                source={item.image}
                style={styles.photo}
                resizeMode="cover"
              />
              <View style={styles.labelContainer}>
                <Text style={styles.label}>{item.title}</Text>
              </View>
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
        visible={selectedImage !== null}
        transparent={true}
        onRequestClose={() => setSelectedImage(null)}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={() => setSelectedImage(null)}>
            <Icon name="close" size={30} color="#fff" />
          </TouchableOpacity>
          {selectedImage && (
            <View style={styles.modalContent}>
              <Image
                source={selectedImage.image}
                style={styles.modalImage}
                resizeMode="contain"
              />
              <View style={styles.modalTextContainer}>
                <Text style={styles.modalTitle}>{selectedImage.title}</Text>
                <Text style={styles.modalDescription}>
                  {selectedImage.description}
                </Text>
              </View>
            </View>
          )}
        </View>
      </Modal>
    </SafeAreaView>
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
  },
  galleryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  photoContainer: {
    width: imageSize,
    height: imageSize,
    margin: 5,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
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
    height: '100%',
  },
  labelContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 8,
  },
  label: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
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
  modalTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalDescription: {
    color: '#ddd',
    fontSize: 14,
  },
});

export default ClassGallery;
