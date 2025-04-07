import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Text,
  Linking,
} from 'react-native';

const ProgramSchedule = () => {
  const handleCall = () => {
    Linking.openURL('tel:01080061715');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* <Image
          source={require('../assets/poster/programHead.png')}
          style={styles.headerImage}
          resizeMode="cover"
        /> */}
        <Image
          source={require('../assets/poster/program.jpg')}
          style={styles.contentImage}
          resizeMode="contain"
        />
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={handleCall}>
        <Text style={styles.buttonText}>문의하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  headerImage: {
    width: Dimensions.get('window').width,
    height: 130, // 헤더 이미지의 높이를 고정 값으로 설정
    marginBottom: -50,
    marginTop: 50,
  },
  contentImage: {
    width: Dimensions.get('window').width,
    height: undefined,
    aspectRatio: 1080 / 1920, // 콘텐츠 이미지의 가로 세로 비율 설정
    marginTop: 0,
  },
  button: {
    backgroundColor: '#04ca5b',
    padding: 15,
    borderRadius: 5,
    margin: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProgramSchedule;
