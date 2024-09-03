import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Modal,
} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const Detail = ({route}) => {
  const {title, description, poster, timetable, curriculum, instructors} =
    route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const openModal = image => {
    setCurrentImage(image);
    setModalVisible(true);
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => openModal(poster)}>
        <Image source={poster} style={styles.poster} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.sectionTitle}>강사 소개</Text>
      {instructors.map((instructor, index) => (
        <View key={index} style={styles.instructorContainer}>
          <Image source={instructor.profileImage} style={styles.profileImage} />
          <View style={styles.instructorTextContainer}>
            <Text style={styles.instructorName}>{instructor.name}</Text>
            {typeof instructor.introduction === 'string' ? (
              <Text style={styles.instructorIntroduction}>
                {instructor.introduction}
              </Text>
            ) : (
              <View>
                <Text style={styles.instructorIntroduction}>
                  {instructor.introduction.text}
                </Text>
                {instructor.introduction.image && (
                  <TouchableOpacity
                    onPress={() => openModal(instructor.introduction.image)}>
                    <Image
                      source={instructor.introduction.image}
                      style={styles.introductionImage}
                    />
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        </View>
      ))}
      <Text style={styles.sectionTitle}>시간표</Text>
      <Text style={styles.content}>{timetable}</Text>
      <Text style={styles.sectionTitle}>커리큘럼</Text>
      <Text style={styles.content}>{curriculum}</Text>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.centeredView}>
          <TouchableOpacity
            style={styles.modalBackground}
            onPress={() => setModalVisible(false)}>
            <Image
              source={currentImage}
              style={styles.fullScreenImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    padding: 16,
    color: '#333',
  },
  description: {
    fontSize: 16,
    padding: 16,
    paddingTop: 0,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 16,
    paddingBottom: 8,
    color: '#333',
  },
  content: {
    fontSize: 16,
    padding: 16,
    paddingTop: 0,
    color: '#666',
  },
  instructorContainer: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'flex-start',
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
    marginBottom: 8,
    color: '#333',
  },
  instructorIntroduction: {
    fontSize: 14,
    color: '#666',
  },
  introductionImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginTop: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  fullScreenImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
});

export default Detail;
