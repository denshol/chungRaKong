// Detail.js
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Modal,
  Pressable,
  Linking,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {useNavigation} from '@react-navigation/native';

const Detail = ({route}) => {
  const {title, description, poster, timetable, curriculum, instructors} =
    route.params;
  const [isImageModalVisible, setImageModalVisible] = useState(false);
  const navigation = useNavigation();

  const toggleImageModal = () => {
    setImageModalVisible(!isImageModalVisible);
  };

  const handleContactPress = () => {
    Linking.openURL('tel:01068765570');
  };

  const handleBoardPress = () => {
    navigation.navigate('Board', {title});
  };

  return (
    <ScrollView style={styles.container}>
      <Pressable onPress={toggleImageModal}>
        <Image source={poster} style={styles.poster} />
      </Pressable>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.sectionTitle}>강사 소개</Text>
      {instructors.map((instructor, index) => (
        <View key={index} style={styles.instructorContainer}>
          <Image source={instructor.profileImage} style={styles.profileImage} />
          <View style={styles.instructorTextContainer}>
            <Text style={styles.instructorName}>{instructor.name}</Text>
            <Text style={styles.instructorIntroduction}>
              {instructor.introduction}
            </Text>
          </View>
        </View>
      ))}
      <Text style={styles.sectionTitle}>시간표</Text>
      <Text style={styles.content}>{timetable}</Text>
      <Text style={styles.sectionTitle}>커리큘럼</Text>
      <Text style={styles.content}>{curriculum}</Text>

      <Pressable style={styles.contactButton} onPress={handleContactPress}>
        <Text style={styles.contactButtonText}>문의하기</Text>
      </Pressable>

      {/* <Pressable style={styles.boardButton} onPress={handleBoardPress}>
        <Text style={styles.boardButtonText}>게시판으로 이동</Text>
      </Pressable> */}

      <Modal
        visible={isImageModalVisible}
        transparent={true}
        onRequestClose={toggleImageModal}>
        <ImageViewer
          imageUrls={[{url: '', props: {source: poster}}]}
          enableSwipeDown={true}
          onSwipeDown={toggleImageModal}
        />
        <Pressable style={styles.closeButton} onPress={toggleImageModal}>
          <Text style={styles.closeButtonText}>닫기</Text>
        </Pressable>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  poster: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    borderRadius: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  content: {
    fontSize: 16,
    color: '#666',
  },
  instructorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  instructorTextContainer: {
    flex: 1,
  },
  instructorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  instructorIntroduction: {
    fontSize: 16,
    color: '#666',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  contactButton: {
    backgroundColor: '#04ca5b',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  boardButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  boardButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Detail;
