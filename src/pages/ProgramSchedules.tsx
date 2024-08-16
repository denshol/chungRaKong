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
      <ScrollView>
        <Image
          source={require('../assets/programSchedule.jpg')}
          style={styles.image}
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
  image: {
    width: Dimensions.get('window').width,
    height: undefined,
    aspectRatio: 1080 / 1920, // 이미지의 실제 가로 세로 비율로 조정하세요
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
