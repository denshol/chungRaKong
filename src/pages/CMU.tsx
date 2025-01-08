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
import {post} from 'axios/index.cjs';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const data = [
  {
    id: '1',
    title: '통기타',
    description: '통기타 배워보세요!',
    image: require('../assets/tongguitar.png'),
    poster: require('../assets/poster/tongguitar.webp'),
    timetable: '토요일: 10:00 AM - 11:00 AM',
    curriculum:
      '1개월차 : 통기타 기초\n2개월차: 가요곡으로 실습\n2개월차: 통기타 고급\n3개월차 : 버스킹',
    instructors: [
      {
        name: '유준영',
        introduction: '일렉기타 전문가로 10년 경력을 가진 교육 전문가입니다.',
      },
      {
        name: '김준혁',
        introduction: '통기타 5년 경력을 가진 교육 강사입니다',
      },
    ],
  },
  {
    id: '2',
    title: '보컬',
    description: '노래 배워보세요!',
    image: require('../assets/vocallesson.png'),
    poster: require('../assets/vocallesson.png'),
    timetable: '토요일: 11:30 AM - 12:30 AM',
    curriculum:
      '1개월차 : 발성 연습\n2개월차: 맞춤곡으로 실습\n3개월차 : 버스킹',
    instructors: [
      {
        name: '황지훈',
        introduction: '보컬 전문가로 5년 경력을 가진 교육 전문가입니다.',
      },
      {
        name: '황채욱',
        introduction: 'feel 음악학원 원장, heaven 뮤직 엔터테인먼트 대표',
      },
    ],
  },
  {
    id: '3',
    title: '바이올린',
    description: '바이올린 레슨입니다!',
    image: require('../assets/violin.png'),
    poster: require('../assets/poster/violin_lesson.png'),
    timetable: '토요일: 12:30 AM - 01:30 PM',
    instructors: [
      {
        name: '이루리',
        introduction: `덕원예고. 상명대 음대 졸업\n\n전)\n인천간석초등학교 방과후 바이올린 강사\n문래청소년오케스트라 스트링 수석 코치\n맘앤아이오케스트라 바이올린 강사\n하나쳄버오케스트라에서 바이올린 강사\n현대i 어린이집 바이올린 강사\n\n현)\n부천 명성교회 바이올린 강사\n홈플러스 문화센터 바이올린 강사\n뉴코아 문화센터 바이올린 강사`,
      },
    ],
  },
  {
    id: '4',
    title: '첼로',
    description: '첼로 레슨입니다!',
    image: require('../assets/chelo.png'),
    poster: require('../assets/poster/chelo_teacher.jpg'),
    timetable: '토요일: 11:00 AM - 12:00 AM',
    instructors: [
      {
        name: '고희민',
        introduction: `인천예고 졸업\n성신여대 학사 졸업\n한양대 석사 졸업\n인천 센트럴심포니 오케스트라 수석단원\nPla-in Ensemble, ForVc Ensemble,\nBom Trio 첼리스트`,
      },
    ],
  },
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

const CMU = () => {
  const navigation = useNavigation();

  const ListHeader = () => (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={styles.videoButton}
        onPress={() => navigation.navigate('VideoBoard')}>
        <Text style={styles.videoButtonText}>강의 영상 보러가기</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={<ListHeader />}
        ListHeaderComponentStyle={styles.headerComponentStyle}
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
                image: item.image,
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
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: '#f8f8f8',
  },
  headerComponentStyle: {
    marginBottom: 8,
  },
  listContainer: {
    paddingBottom: 20,
  },
  item: {
    flexDirection: 'row',
    padding: 16,
    marginHorizontal: 16,
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
  videoButton: {
    backgroundColor: '#FF6B6B',
    padding: 15,
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
  videoButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CMU;
