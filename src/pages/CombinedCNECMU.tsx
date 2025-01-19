import React, {useState, useCallback} from 'react';
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
import Icon from 'react-native-vector-icons/Ionicons';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const COLORS = {
  primary: 'rgb(92, 197, 52)', // 인디고
  secondary: '#6366F1', // 에메랄드
  accent: '#FF4500 ', // 노란 오렌지
  text: {
    primary: '#1F2937',
    secondary: '#4B5563',
  },
  background: {
    primary: '#F9FAFB',
    card: '#FFFFFF',
  },
  border: {
    light: '#E5E7EB',
  },
};
const branch1Data = [
  {
    id: 'cmu1',
    title: '통기타',
    description: `안녕하세요! 통기타 강사 유준영입니다. 통기타의 기초부터 실전까지 체계적으로 배워보세요!`,
    image: require('../assets/thumbnail/chungRaGuitarThumb.jpg'),

    posters: [
      require('../assets/poster/chungRaGuitar4.jpg'),
      require('../assets/poster/chungRaGuitar2.jpg'),
      require('../assets/poster/chungRaGuitar.jpg'),
    ],
    curriculum: `\n- 통기타를 처음 시작하시는 분\n- 독학으로 배웠지만 기본기를 다시 다지고 싶으신 분\n- 나쁜 자세로 인해 손목이나 어깨가 아프신 분\n- 올바른 기본기로 시작하고 싶으신 분\n\n기초가 탄탄해야 더 높이 성장할 수 있습니다.\n차근차근 기본부터 시작해보시죠!`,
    instructors: [
      {
        name: '유준영',
        introduction: `\n[교육 철학]\n기본기를 중시하며, 학생 개개인의 수준과 목표에 맞춘 맞춤형 교육을 지향합니다. \n이론과 실습을 균형있게 배우면서 즐겁게 기타를 배울 수 있도록 돕겠습니다.`,
      },
    ],
    type: '청라뮤',
  },
  {
    id: 'cmu2',
    title: '보컬',
    description: `안녕하세요! 보컬 강사 Peter입니다. 올바른 발성과 호흡법으로 여러분의 목소리를 찾아드립니다!`,
    image: require('../assets/thumbnail/chungRaVocalThumb.jpg'),
    posters: [
      require('../assets/poster/chungRaVocal4.jpg'),
      require('../assets/poster/chungRaVocal.jpg'),
      require('../assets/poster/chungRaVocal2.jpg'),
      require('../assets/poster/chungRaVocal3.jpg'),
    ],
    curriculum: `\n- 보컬을 처음 시작하시는 분\n- 노래를 좋아하지만 부담스러워하시는 분\n- 노래를 더 잘 부르고 싶으신 분\n- 노래를 통해 감정을 표현하고 싶으신 분\n\n수업특징: \n- 기초부터 체계적인 교육\n- 다양한 장르의 노래 커버\n- 노래를 통한 감정 표현법\n- 무대 경험 제공`,
    instructors: [
      {
        name: 'Peter',
        introduction: `\n[교육 철학]\n보컬은 목소리를 통해 감정을 표현하는 것입니다.\n기본기를 중시하면서도 학생 개개인의 음악적 취향과 개성을 살리는 교육을 지향합니다.\n\n`,
      },
    ],
    type: '청라뮤',
  },
  {
    id: 'cmu3',
    title: '바이올린',
    description: '바이올린 레슨입니다!',
    image: require('../assets/thumbnail/chungRaViolinThumb.jpg'),

    instructors: [
      {
        name: '이루리',
        introduction: `\n덕원예고. 상명대 음대 졸업\n\n전)\n인천간석초등학교 방과후 바이올린 강사\n문래청소년오케스트라 스트링 수석 코치\n맘앤아이오케스트라 바이올린 강사\n하나쳄버오케스트라에서 바이올린 강사\n현대i 어린이집 바이올린 강사\n\n현)\n부천 명성교회 바이올린 강사\n홈플러스 문화센터 바이올린 강사\n뉴코아 문화센터 바이올린 강사\n인천계산초등학교 문화예술 동아리 바이올린 강사\n인천계산초등학교 오케스트라 지휘자 겸 퍼스트 바이올린 강사\n서울예일초등학교 방과후 바이올린 강사\n서울예일초등학교 오케스트라 바이올린 강사\n서울역촌초등학교 방과후 바이올린 강사\n부천부안초등학교 방과후 바이올린 강사\n아마추어 앙상블 지도강사\nUr 오케스트라 지도강사\nFOG연주단 세컨 악장\n강서필 오케스트라 세컨악장`,
      },
    ],
    type: '청라뮤',
  },
  {
    id: 'cmu4',
    title: '첼로',
    description: '첼로 레슨입니다!',
    image: require('../assets/thumbnail/chungRaCheloThumb.jpg'),
    posters: [require('../assets/poster/chelo_teacher.jpg')],
    instructors: [
      {
        name: '고희민',
        introduction: `\n인천예고 졸업\n성신여대 학사 졸업\n한양대 석사 졸업\n인천 센트럴심포니 오케스트라 수석단원\nPla-in Ensemble, ForVc Ensemble,\nBom Trio 첼리스트`,
      },
    ],
    type: '청라뮤',
  },
  {
    id: 'cmu5',
    title: '드럼',
    description:
      '안녕하세요! 드럼 강사 Peter입니다. 리듬의 즐거움을 함께 느껴보세요!',
    image: require('../assets/thumbnail/chungRaDrumThumb.jpg'),
    poster: require('../assets/poster/chungRaDrum3.jpg'),
    curriculum: `\n[이런 분들께 추천드립니다]\n- 드럼을 처음 시작하시는 분\n- 리듬감을 향상시키고 싶으신 분\n- 밴드 활동을 준비하시는 분\n- 취미로 드럼을 배우고 싶으신 분\n- 스트레스 해소가 필요하신 분\n\n[수업 특징]\n- 개인별 맞춤 커리큘럼 제공\n- 실전 중심의 교육\n- 밴드 합주 기회 제공\n- 다양한 장르의 곡 커버`,
    instructors: [
      {
        name: 'Peter',
        introduction: `\n[교육 철학]\n드럼은 단순한 타악기가 아닌 음악의 심장입니다.\n기본기를 중시하면서도 학생 개개인의 창의성과 개성을 살리는 교육을 지향합니다.\n\n[교육 방식]\n- 기초부터 차근차근 배우는 체계적인 교육\n- 실전 위주의 실습 교육\n- 개인의 속도와 수준에 맞춘 맞춤형 커리큘럼\n- 밴드 세션 실전 교육 병행`,
      },
    ],
    type: '청라뮤',
  },
  {
    id: 'cmu6',
    title: '일렉기타',
    description: `안녕하세요! 일렉기타 강사 유준영입니다. 락부터 블루스까지, 일렉기타의 모든 것을 배워보세요!`,
    image: require('../assets/poster/chungRaElec5.jpg'),
    poster: require('../assets/poster/chungRaElec4.jpg'),
    curriculum: `\n[이런 분들께 추천드립니다]\n- 일렉기타를 처음 시작하시는 분\n- 통기타에서 일렉으로 전환하고 싶으신 분\n- 락, 블루스 등 다양한 장르를 배우고 싶으신 분\n- 밴드 활동을 준비하시는 분\n- 본격적인 연주자를 꿈꾸시는 분\n\n열정만 있다면 누구나 일렉 기타리스트가 될 수 있습니다!`,
    instructors: [
      {
        name: '유준영',
        introduction: `\n[교육 철학]\n일렉기타는 단순한 악기가 아닌 자신을 표현하는 도구입니다.\n기본기를 탄탄히 하면서도 학생 개개인의 개성과 음악성을 살리는 교육을 지향합니다.\n\n[강의 특징]\n- 개인별 맞춤 커리큘럼 제공\n- 실전 중심의 교육 방식\n- 다양한 장르의 곡 커버\n- 실제 밴드 합주 경험 제공`,
      },
    ],
    type: '청라뮤',
  },
  {
    id: 'cmu7',
    title: '피아노',
    description: '피아노 레슨입니다! 기초부터 실전까지 배워보세요! ',
    image: require('../assets/thumbnail/piano.jpg'),
    poster: require('../assets/poster/chungRaPiano.jpg'),
    curriculum: `\n[이런 분들께 추천드립니다]\n- 피아노를 처음 시작하시는 분\n- 피아노를 다시 시작하고 싶으신 분\n- 클래식, 팝, 재즈 등 다양한 장르를 배우고 싶으신 분\n- 피아노로 연주하며 감정을 표현하고 싶으신 분\n- 본격적인 연주자를 꿈꾸시는 분\n\n피아노는 음악의 기본이자 핵심입니다. 기본기를 중시하면서도 학생 개개인의 음악적 취향과 개성을 살리는 교육을 지향합니다.`,
    instructors: [
      {
        name: '나은정',
        introduction: `\n[교육 철학]\n 피아노는 음악의 기본이자 핵심입니다.\n기본기를 중시하면서도 학생 개개인의 음악적 취향과 개성을 살리는 교육을 지향합니다.\n\n[강의 특징]\n- 개인별 맞춤 커리큘럼 제공\n- 실전 중심의 교육 방식\n- 다양한 장르의 곡 커버\n- 실제 연주 기회 제공`,
      },
    ],
    type: '청라뮤',
  },

  {
    id: 'cmu8',
    title: '베이스기타',
    description: '베이스기타 레슨입니다.',
    image: require('../assets/thumbnail/bass.jpg'),
    poster: require('../assets/poster/chungRaBass.jpg'),
    curriculum: `\n[이런 분들께 추천드립니다]\n- 베이스기타를 처음 시작하시는 분\n- 베이스기타를 다시 시작하고 싶으신 분\n- 다양한 장르의 곡을 배우고 싶으신 분\n- 밴드 활동을 준비하시는 분\n- 본격적인 연주자를 꿈꾸시는 분\n\n베이스기타는 밴드의 중심이자 기반입니다. 기본기를 중시하면서도 학생 개개인의 음악적 취향과 개성을 살리는 교육을 지향합니다.`,
    instructors: [
      {
        name: '유준영',
        introduction:
          '\n[교육철학] \n베이스기타는 밴드의 중심이자 기반입니다.\n기본기를 중시하면서도 학생 개개인의 음악적 취향과 개성을 살리는 교육을 지향합니다.\n\n[강의특징]\n- 개인별 맞춤 커리큘럼 제공\n- 실전 중심의 교육 방식\n- 다양한 장르의 곡 커버\n- 실제 밴드 합주 경험 제공',
      },
    ],
    type: '청라뮤',
  },
  {
    id: 'cmu10',
    title: '카혼',
    description: '카혼 레슨입니다!',
    image: require('../assets/thumbnail/chungRaCajonThumb.png'),
    poster: require('../assets/poster/chungRaCajon.jpg'),
    curriculum: `\n[이런 분들께 추천드립니다]\n- 카혼을 처음 시작하시는 분\n- 밴드 활동을 준비하시는 분\n- 다양한 리듬을 배우고 싶으신 분\n- 본격적인 연주자를 꿈꾸시는 분\n\n카혼은 밴드의 중심이자 기반입니다. 기본기를 중시하면서도 학생 개개인의 음악적 취향과 개성을 살리는 교육을 지향합니다.`,
    instructors: [
      {
        name: 'peter',
        introduction:
          '\n[교육철학] \n카혼은 밴드의 중심이자 기반입니다.\n기본기를 중시하면서도 학생 개개인의 음악적 취향과 개성을 살리는 교육을 지향합니다.',
      },
    ],
    type: '청라뮤',
  },
  {
    id: 'cmu11',
    title: '우쿨렐레',
    description: '우쿨렐레 레슨입니다! 가벼운마음으로 도전해보세요!',
    image: require('../assets/thumbnail/chungRaUkeleleThumb.jpg'),
    poster: require('../assets/poster/chungRaUkulele.jpg'),
    curriculum: `\n[이런 분들께 추천드립니다]\n- 우쿨렐레를 처음 시작하시는 분\n- 다양한 장르의 곡을 배우고 싶으신 분\n- 본격적인 연주자를 꿈꾸시는 분\n\n우쿨렐레는 가벼운 마음으로 즐길 수 있는 악기입니다. 기본기를 중시하면서도 학생 개개인의 음악적 취향과 개성을 살리는 교육을 지향합니다.`,
    instructors: [
      {
        name: 'peter',
        introduction:
          '\n[교육철학] \n우쿨렐레는 가벼운 마음으로 즐길 수 있는 악기입니다.\n기본기를 중시하면서도 학생 개개인의 음악적 취향과 개성을 살리는 교육을 지향합니다.',
      },
    ],
    type: '청라뮤',
  },
  {
    id: 'cmu9',
    title: '합창',
    description: '합창 레슨입니다!',
    image: require('../assets/thumbnail/chorus.png'),
    poster: require('../assets/poster/chungRaChorus.jpg'),
    curriculum: `\n[이런 분들께 추천드립니다]\n- 합창을 처음 시작하시는 분\n- 다양한 장르의 노래를 배우고 싶으신 분\n- 노래를 통해 감정을 표현하고 싶으신 분\n- 본격적인 연주자를 꿈꾸시는 분\n\n합창은 음악의 기본이자 핵심입니다. 기본기를 중시하면서도 학생 개개인의 음악적 취향과 개성을 살리는 교육을 지향합니다.`,
    instructors: [
      {
        name: 'peter',
        introduction: `\n[교육철학] \n모든 사람은 자신만의 독특한 음색을 가지고 있습니다.\n그 음색을 살리면서 테크닉을 더해 개성 있는 합창단원으로 성장할 수 있도록 돕겠습니다.`,
      },
    ],
    type: '청라뮤',
  },
  {
    id: 'cmu12',
    title: '밴드',
    description:
      '밴드 레슨입니다! 함께 음악을 만들어보세요! 누구나 밴드를 할 수 있습니다!',
    image: require('../assets/thumbnail/chungRaBandThumb.jpg'),
    poster: require('../assets/poster/chungRaBand.jpg'),
    curriculum: `\n[이런 분들께 추천드립니다]\n- 밴드를 처음 시작하시는 분\n- 다양한 장르의 곡을 연주하고 싶으신 분\n- 밴드 활동을 준비하시는 분\n- 본격적인 연주자를 꿈꾸시는 분\n\n밴드는 음악을 함께 만들어가는 과정입니다. 기본기를 중시하면서도 학생 개개인의 음악적 취향과 개성을 살리는 교육을 지향합니다.`,
    instructors: [
      {
        name: 'peter',
        introduction: `\n[교육철학] \n밴드는 음악을 함께 만들어가는 과정입니다.\n기본기를 중시하면서도 학생 개개인의 음악적 취향과 개성을 살리는 교육을 지향합니다.`,
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
    image: require('../assets/poster/chungRaEng.jpg'),
    poster: require('../assets/poster/chungRaEng3.jpg'),
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

const Item = React.memo(
  ({title, description, image, onPress, type, branch}) => (
    <View
      style={[
        styles.item,
        {
          borderColor: branch === 1 ? COLORS.primary : COLORS.secondary,
          backgroundColor: COLORS.background.card,
        },
      ]}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} resizeMode="cover" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
          {description}
        </Text>
        <View style={styles.bottomRow}>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor:
                  branch === 1 ? COLORS.primary : COLORS.secondary,
              },
            ]}
            onPress={onPress}>
            <Text style={styles.buttonText}>자세히 보기</Text>
            <Icon
              name="chevron-forward-outline"
              size={16}
              color="#fff"
              style={{marginLeft: 4}}
            />
          </TouchableOpacity>
          <View
            style={[
              styles.badge,
              {
                backgroundColor:
                  type === '청라뮤' ? COLORS.primary : COLORS.secondary,
              },
            ]}>
            <Text style={styles.badgeText}>{type}</Text>
          </View>
        </View>
      </View>
    </View>
  ),
);

const CombinedCNECMU = () => {
  const navigation = useNavigation();
  const [selectedBranch, setSelectedBranch] = useState(1);
  // src/pages/CombinedCNECMU.js
  const renderItem = useCallback(
    ({item}) => (
      <Item
        title={item.title}
        description={item.description}
        image={item.image}
        type={item.type}
        branch={selectedBranch}
        onPress={() => {
          const itemData = {
            ...item,
          };
          navigation.navigate('Detail', itemData);
        }}
      />
    ),
    [navigation, selectedBranch],
  );

  const renderContent = () => {
    if (selectedBranch === 2) {
      return (
        <View style={styles.preparingContainer}>
          <Icon name="construct-outline" size={80} color="#4CD964" />
          <Text style={styles.preparingTitle}>준비 중입니다</Text>
          <Text style={styles.preparingDescription}>
            더 나은 서비스로 찾아뵙겠습니다{'\n'}조금만 기다려주세요!
          </Text>
        </View>
      );
    }

    return (
      <FlatList
        data={branch1Data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    );
  };

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
            본점
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
      {renderContent()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  item: {
    flexDirection: 'row',
    padding: 16,
    marginBottom: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border.light,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3,
    backgroundColor: COLORS.background.card,
  },
  imageContainer: {
    width: SCREEN_WIDTH * 0.22,
    height: SCREEN_WIDTH * 0.22, // aspectRatio 대신 명시적 height 설정
    borderRadius: SCREEN_WIDTH * 0.11,
    overflow: 'hidden',
    marginRight: 16,
    backgroundColor: COLORS.background.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // 이미지가 컨테이너를 꽉 채우도록
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text.primary,
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: COLORS.text.secondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: -0.3,
  },
  badge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  preparingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  preparingTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 20,
    marginBottom: 10,
  },
  preparingDescription: {
    fontSize: 16,
    color: COLORS.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
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
    backgroundColor: COLORS.primary,
  },
  selectedTab2: {
    backgroundColor: COLORS.secondary,
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
    color: COLORS.text.primary,
  },
  selectedTabText: {
    color: 'white',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
export default CombinedCNECMU;
