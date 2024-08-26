// src/pages/CNE.js
import React from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const data = [
  {
    id: '1',
    title: '미래융합 코딩교육',
    description: '4주 단기 완성!',
    image: require('../assets/coding.png'),
    poster: require('../assets/poster/cne_coding.jpg'),
    timetable: '토요일: 5:00 PM - 6:00 PM',
    curriculum:
      '1주차: 스크래치 코딩\n2주차: 스크래치 + 엔트리 코딩\n3주차: 로봇융합 코딩\n4주차: 프로젝트',
    instructors: [
      {
        name: '김준혁',
        introduction: '코딩 전문가로 2년 경력을 가진 교육 전문가입니다.',
        // profileImage: require('../assets/profiles/splsh.png'),
      },
    ],
  },
  {
    id: '2',
    title: '어린이 체험미술특강',
    description: '여름방학을 맞이한 친구들 모두 환영합니다!',
    image: require('../assets/kidart.png'),
    poster: require('../assets/poster/kidsArt.webp'),
    timetable: '월요일 - 금요일: 2:00 PM - 4:00 PM',
    curriculum: '1주차: 기초\n2주차: 중급\n3주차: 고급\n4주차: 프로젝트',
    instructors: [
      {
        name: 'Jane Smith',
        introduction:
          'Renowned Artist and Art Instructor with a passion for teaching kids.',
        // profileImage: require('../assets/profiles/splsh.png'),
      },
    ],
  },
  {
    id: '3',
    title: 'ENGLISH SPEECH CONTEST',
    description: '실력이 출중한 강사님들과 회화능력을 키워보세요!',
    image: require('../assets/speech.png'),
    poster: require('../assets/poster/cne.speech.jpg'),
    timetable: '토요일: 10:00 AM - 1:00 PM',
    curriculum: '발표 기법, 발음 교정, 무대 연습',
    instructors: [
      {
        name: 'Jay Kang',
        introduction: `학력
West lake girls high school (-2016) 
University of Auckland  (2018-2022)
- Masters of Fine Arts Graduation
- Bachelor of Fine Arts Graduation
Auckland University of Technology (June 2024) 
- Graduate Diploma in Secondary teaching Postgraduate Graduation

경력
Award : University of Auckland Council 2021 First in Course Award in Fine Arts 763 semester 1 (Nov 2021 - writing paper) 
Huia Fine Arts Fund Project (Aug 2021) 
Joy Raynes Scholarship (sep 2021) 
ART NEWS Magazine (2023)

Exhibition 
Room gallery, solo exhibition (2024)
`,
        // profileImage: require('../assets/profiles/splsh.png'),
      },
      {
        name: 'Alice Johnson',
        introduction: `Auckland University of Technology (June 2024) 
- Graduate Diploma in Secondary teaching (Postgraduate) 
University of Auckland (2018-2022)
- Masters of Fine Arts (2022)
- Bachelor of Fine Arts 

West lake girls high school (-2016) 

ART NEWS Magazine (2023)
Award : University of Auckland Council 2021 First in Course Award in Fine Arts 763 semester 1 (Nov 2021 - writing paper) 
Joy Raynes Scholarship (sep 2021) 
Huia Fine Arts Fund Project (Aug 2021) 

Exhibition 
Room gallery, solo exhibition (2024)
`,
        // profileImage: require('../assets/profiles/splsh.png'),
      },
    ],
  },
  // ... other items
];

const Item = ({title, description, image, onPress}) => (
  <View style={styles.item}>
    <Image source={image} style={styles.image} />
    <View style={styles.textContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
        {description}
      </Text>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>수업 자세히 알아보기</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const CNE = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <Item
            title={item.title}
            description={item.description}
            image={item.image}
            onPress={() =>
              navigation.navigate('Detail', {
                title: item.title,
                description: item.description,
                poster: item.poster,
                timetable: item.timetable,
                curriculum: item.curriculum,
                instructors: item.instructors,
              })
            }
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  item: {
    flexDirection: 'row',
    padding: 16,
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  image: {
    width: SCREEN_WIDTH * 0.25,
    height: SCREEN_WIDTH * 0.25,
    borderRadius: (SCREEN_WIDTH * 0.25) / 2,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default CNE;
