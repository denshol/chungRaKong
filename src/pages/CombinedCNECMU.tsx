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

// Combine the data from both components
const combinedData = [
  {
    id: 'cmu1',
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
    type: '청라뮤',
  },
  {
    id: 'cmu2',
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
    type: '청라뮤',
  },
  {
    id: 'cmu3',
    title: '바이올린',
    description: '바이올린 레슨입니다!',
    image: require('../assets/violin.png'),
    poster: require('../assets/poster/violin_lesson.png'),
    timetable: '토요일: 12:30 AM - 01:30 PM',
    // curriculum:
    //   '1개월차 : 발성 연습\n2개월차: 맞춤곡으로 실습\n3개월차 : 버스킹',
    instructors: [
      {
        name: '이루리',
        introduction: `
덕원예고. 상명대 음대 졸업

전)
인천간석초등학교 방과후 바이올린 강사
문래청소년오케스트라 스트링 수석 코치
맘앤아이오케스트라 바이올린 강사
하나쳄버오케스트라에서 바이올린 강사
현대i 어린이집 바이올린 강사

현)
부천 명성교회 바이올린 강사
홈플러스 문화센터 바이올린 강사
뉴코아 문화센터 바이올린 강사
인천계산초등학교 문화예술 동아리 바이올린 강사
인천계산초등학교 오케스트라 지휘자 겸 퍼스트 바이올린 강사
서울예일초등학교 방과후 바이올린 강사
서울예일초등학교 오케스트라 바이올린 강사
서울역촌초등학교 방과후 바이올린 강사
부천부안초등학교 방과후 바이올린 강사
아마추어 앙상블 지도강사
Ur 오케스트라 지도강사
FOG연주단 세컨 악장
강서필 오케스트라 세컨악장`,
        // profileImage: require('../assets/profiles/splsh.png'),
      },
    ],
    type: '청라뮤',
  },
  {
    id: 'cmu4',
    title: '첼로',
    description: '첼로 레슨입니다!',
    image: require('../assets/chelo.png'),
    poster: require('../assets/poster/chelo_teacher.jpg'),
    timetable: '토요일: 11:00 AM - 12:00 AM',
    // curriculum:
    //   '1개월차 : 발성 연습\n2개월차: 맞춤곡으로 실습\n3개월차 : 버스킹',
    instructors: [
      {
        name: '고희민',
        introduction: `
인천예고 졸업
성신여대 학사 졸업
한양대 석사 졸업
인천 센트럴심포니 오케스트라 수석단원
Pla-in Ensemble, ForVc Ensemble,
Bom Trio 첼리스트`,
        // profileImage: require('../assets/profiles/splsh.png'),
      },
    ],
    type: '청라뮤',
  },
  {
    id: 'cne1',
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
        profileImage: require('../assets/profiles/splsh.png'),
      },
    ],
    type: '청라NE',
  },
  {
    id: 'cne2',
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
        profileImage: require('../assets/profiles/splsh.png'),
      },
    ],
    type: '청라NE',
  },
  {
    id: '3',
    title: 'ENGLISH SPEECH',
    description: '실력이 출중한 강사님들과 회화능력을 키워보세요!',
    image: require('../assets/speech.png'),
    poster: require('../assets/poster/englishSpeech.jpg'),
    timetable: '토요일: 03:00 PM - 05:00 PM',
    curriculum: '발표 기법, 발음 교정',
    instructors: [
      {
        name: 'Jay Kang',
        introduction: {
          image: require('../assets/profiles/jayKangTeacher.png.jpg'),
        }, // 소개용 이미지,
        // profileImage: require('../assets/profiles/jayKangTeacher.png'),
      },
      {
        name: 'Alice Johnson',
        introduction: {
          image: require('../assets/profiles/hoonKangTeacher.png.jpg'),
        }, // 소개용 이미지,
        // profileImage: require('../assets/profiles/splsh.png'),
      },
    ],
    type: '청라NE',
  },
];

const Item = ({title, description, image, onPress, type}) => (
  <View style={styles.item}>
    <Image source={image} style={styles.image} />
    <View style={styles.textContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
        {description}
      </Text>
      <View style={styles.bottomRow}>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>수업 자세히 알아보기</Text>
        </TouchableOpacity>
        <View
          style={[
            styles.badge,
            {backgroundColor: type === '청라뮤' ? '#007AFF' : '#FF9500'},
          ]}>
          <Text style={styles.badgeText}>{type}</Text>
        </View>
      </View>
    </View>
  </View>
);

const CombinedCNECMU = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={combinedData}
        renderItem={({item}) => (
          <Item
            title={item.title}
            description={item.description}
            image={item.image}
            type={item.type}
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
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default CombinedCNECMU;
