import React, {useState, useMemo, useCallback} from 'react';
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
import Icon from 'react-native-vector-icons/Ionicons'; // 아이콘을 위해 추가

const {width: SCREEN_WIDTH} = Dimensions.get('window');

// 1호점 데이터 (기존 데이터)
const branch1Data = [
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
        },
      },
      {
        name: 'Alice Johnson',
        introduction: {
          image: require('../assets/profiles/hoonKangTeacher.png.jpg'),
        },
      },
    ],
    type: '청라NE',
  },
];

// 2호점 데이터 (새로 추가)
const branch2Data = [
  {
    id: '2_cmu1',
    title: '피아노',
    description: '클래식부터 재즈까지 다양한 장르의 피아노를 배워보세요!',
    image: require('../assets/lordslove.png'),
    poster: require('../assets/poster/cne.speech.jpg'),
    timetable: '월, 수, 금: 3:00 PM - 5:00 PM',
    curriculum:
      '1개월: 기초 이론 및 연습\n2개월: 클래식 곡 연습\n3개월: 재즈 및 즉흥 연주',
    instructors: [
      {
        name: '김피아노',
        introduction: '줄리아드 음대 졸업, 10년 경력의 피아노 교육 전문가',
      },
    ],
    type: '청라뮤',
  },
  {
    id: '2_cne1',
    title: '로봇 공학',
    description: '미래 기술의 핵심, 로봇 공학을 배워보세요!',
    image: require('../assets/bigbeans.png'),
    poster: require('../assets/poster/cne_coding.jpg'),
    timetable: '화, 목: 4:00 PM - 6:00 PM',
    curriculum:
      '1개월: 기초 로봇 이론\n2개월: 간단한 로봇 제작\n3개월: 프로그래밍 및 고급 로봇 제작',
    instructors: [
      {
        name: '박로봇',
        introduction: 'MIT 로봇공학과 박사, 로봇 올림피아드 수상 경력',
      },
    ],
    type: '청라NE',
  },
];

const Item = React.memo(
  ({title, description, image, onPress, type, branch}) => (
    <View
      style={[
        styles.item,
        {borderColor: branch === 1 ? '#007AFF' : '#4CD964'},
      ]}>
      <Image source={image} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
          {description}
        </Text>
        <View style={styles.bottomRow}>
          <TouchableOpacity
            style={[
              styles.button,
              {backgroundColor: branch === 1 ? '#007AFF' : '#4CD964'},
            ]}
            onPress={onPress}>
            <Text style={styles.buttonText}>수업 자세히 알아보기</Text>
          </TouchableOpacity>
          <View style={[styles.badge, {backgroundColor: getBadgeColor(type)}]}>
            <Text style={styles.badgeText}>{type}</Text>
          </View>
        </View>
      </View>
      <Icon
        name={branch === 1 ? 'home-outline' : 'business-outline'}
        size={24}
        color={branch === 1 ? '#007AFF' : '#4CD964'}
        style={styles.branchIcon}
      />
    </View>
  ),
);

const getBadgeColor = type => {
  switch (type) {
    case '청라뮤':
      return '#FF9500';
    case '청라NE':
      return '#5856D6';
    default:
      return '#8E8E93';
  }
};

const CombinedCNECMU = () => {
  const navigation = useNavigation();
  const [selectedBranch, setSelectedBranch] = useState(1);

  const data = useMemo(
    () => (selectedBranch === 1 ? branch1Data : branch2Data),
    [selectedBranch],
  );

  const renderItem = useCallback(
    ({item}) => (
      <Item
        title={item.title}
        description={item.description}
        image={item.image}
        type={item.type}
        branch={selectedBranch}
        onPress={() => navigation.navigate('Detail', {...item})}
      />
    ),
    [navigation, selectedBranch],
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedBranch === 1 && styles.selectedTab1]}
          onPress={() => setSelectedBranch(1)}>
          <Icon
            name="home-outline"
            size={24}
            color={selectedBranch === 1 ? 'white' : '#007AFF'}
          />
          <Text
            style={[
              styles.tabText,
              selectedBranch === 1 && styles.selectedTabText,
            ]}>
            1호점
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedBranch === 2 && styles.selectedTab2]}
          onPress={() => setSelectedBranch(2)}>
          <Icon
            name="business-outline"
            size={24}
            color={selectedBranch === 2 ? 'white' : '#4CD964'}
          />
          <Text
            style={[
              styles.tabText,
              selectedBranch === 2 && styles.selectedTabText,
            ]}>
            2호점
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
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
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: '#e0e0e0',
  },
  selectedTab1: {
    backgroundColor: '#007AFF',
  },
  selectedTab2: {
    backgroundColor: '#4CD964',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
    color: '#333',
  },
  selectedTabText: {
    color: 'white',
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
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
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
  branchIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default CombinedCNECMU;
