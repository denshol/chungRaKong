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

const branch1Data = [
  {
    id: 'cmu1',
    title: '통기타',
    description: `안녕하세요! 통기타 강사 유준영입니다. 통기타의 기초부터 실전까지 체계적으로 배워보세요!`,
    image: require('../assets/poster/chungRaGuitar2.jpg'),
    poster: require('../assets/poster/chungRaGuitar3.jpg'),
    curriculum: `- 통기타를 처음 시작하시는 분\n- 독학으로 배웠지만 기본기를 다시 다지고 싶으신 분\n- 나쁜 자세로 인해 손목이나 어깨가 아프신 분\n- 올바른 기본기로 시작하고 싶으신 분\n\n기초가 탄탄해야 더 높이 성장할 수 있습니다.\n차근차근 기본부터 시작해보시죠!`,
    instructors: [
      {
        name: '유준영',
        introduction: `[교육 철학]\n기본기를 중시하며, 학생 개개인의 수준과 목표에 맞춘 맞춤형 교육을 지향합니다. \n이론과 실습을 균형있게 배우면서 즐겁게 기타를 배울 수 있도록 돕겠습니다.`,
      },
    ],
    type: '청라뮤',
  },
  {
    id: 'cmu2',
    title: '보컬',
    description: `안녕하세요! 보컬 강사 Peter입니다. 올바른 발성과 호흡법으로 여러분의 목소리를 찾아드립니다!`,
    image: require('../assets/poster/chungRaVocal.jpg'),
    poster: require('../assets/poster/chungRaVocal4.jpg'),
    curriculum: `당신만의 목소리로 노래하는 즐거움을 함께 찾아보세요!`,
    instructors: [
      {
        name: '[교육 철학]',
        introduction: `모든 사람은 자신만의 독특한 음색을 가지고 있습니다.\n그 음색을 살리면서 테크닉을 더해 개성 있는 보컬리스트로 성장할 수 있도록 돕겠습니다.`,
      },
      {
        name: '[교육 방식]',
        introduction: `개인의 음역대와 음색을 고려한 맞춤형 교육을 진행합니다.\n기초부터 전문적인 발성까지 체계적으로 지도합니다.`,
      },
    ],
    type: '청라뮤',
  },
  {
    id: 'cmu3',
    title: '바이올린',
    description: '바이올린 레슨입니다!',
    image: require('../assets/violin.png'),
    poster: require('../assets/poster/chungRaViolin.png'),
    instructors: [
      {
        name: '이루리',
        introduction: `덕원예고. 상명대 음대 졸업\n\n전)\n인천간석초등학교 방과후 바이올린 강사\n문래청소년오케스트라 스트링 수석 코치\n맘앤아이오케스트라 바이올린 강사\n하나쳄버오케스트라에서 바이올린 강사\n현대i 어린이집 바이올린 강사\n\n현)\n부천 명성교회 바이올린 강사\n홈플러스 문화센터 바이올린 강사\n뉴코아 문화센터 바이올린 강사\n인천계산초등학교 문화예술 동아리 바이올린 강사\n인천계산초등학교 오케스트라 지휘자 겸 퍼스트 바이올린 강사\n서울예일초등학교 방과후 바이올린 강사\n서울예일초등학교 오케스트라 바이올린 강사\n서울역촌초등학교 방과후 바이올린 강사\n부천부안초등학교 방과후 바이올린 강사\n아마추어 앙상블 지도강사\nUr 오케스트라 지도강사\nFOG연주단 세컨 악장\n강서필 오케스트라 세컨악장`,
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
    instructors: [
      {
        name: '고희민',
        introduction: `인천예고 졸업\n성신여대 학사 졸업\n한양대 석사 졸업\n인천 센트럴심포니 오케스트라 수석단원\nPla-in Ensemble, ForVc Ensemble,\nBom Trio 첼리스트`,
      },
    ],
    type: '청라뮤',
  },
  {
    id: 'cmu5',
    title: '드럼',
    description:
      '안녕하세요! 드럼 강사 Peter입니다. 리듬의 즐거움을 함께 느껴보세요!',
    image: require('../assets/poster/chungRaDrum2.jpg'),
    poster: require('../assets/poster/chungRaDrum3.jpg'),
    curriculum: `[이런 분들께 추천드립니다]\n- 드럼을 처음 시작하시는 분\n- 리듬감을 향상시키고 싶으신 분\n- 밴드 활동을 준비하시는 분\n- 취미로 드럼을 배우고 싶으신 분\n- 스트레스 해소가 필요하신 분\n\n[수업 특징]\n- 개인별 맞춤 커리큘럼 제공\n- 실전 중심의 교육\n- 밴드 합주 기회 제공\n- 다양한 장르의 곡 커버`,
    instructors: [
      {
        name: 'Peter',
        introduction: `[교육 철학]\n드럼은 단순한 타악기가 아닌 음악의 심장입니다.\n기본기를 중시하면서도 학생 개개인의 창의성과 개성을 살리는 교육을 지향합니다.\n\n[교육 방식]\n- 기초부터 차근차근 배우는 체계적인 교육\n- 실전 위주의 실습 교육\n- 개인의 속도와 수준에 맞춘 맞춤형 커리큘럼\n- 밴드 세션 실전 교육 병행`,
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
    curriculum: `[이런 분들께 추천드립니다]\n- 일렉기타를 처음 시작하시는 분\n- 통기타에서 일렉으로 전환하고 싶으신 분\n- 락, 블루스 등 다양한 장르를 배우고 싶으신 분\n- 밴드 활동을 준비하시는 분\n- 본격적인 연주자를 꿈꾸시는 분\n\n열정만 있다면 누구나 일렉 기타리스트가 될 수 있습니다!`,
    instructors: [
      {
        name: '유준영',
        introduction: `[교육 철학]\n일렉기타는 단순한 악기가 아닌 자신을 표현하는 도구입니다.\n기본기를 탄탄히 하면서도 학생 개개인의 개성과 음악성을 살리는 교육을 지향합니다.\n\n[강의 특징]\n- 개인별 맞춤 커리큘럼 제공\n- 실전 중심의 교육 방식\n- 다양한 장르의 곡 커버\n- 실제 밴드 합주 경험 제공`,
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
  ({
    title,
    description,
    image,
    onPress,
    type,
    branch,
    hasGallery,
    onGalleryPress,
  }) => (
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
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                {backgroundColor: branch === 1 ? '#007AFF' : '#4CD964'},
              ]}
              onPress={onPress}>
              <Text style={styles.buttonText}>수업 자세히 알아보기</Text>
            </TouchableOpacity>
            {hasGallery && (
              <TouchableOpacity
                style={[styles.galleryButton, {backgroundColor: '#FF9500'}]}
                onPress={onGalleryPress}>
                <Icon name="images-outline" size={16} color="#fff" />
                <Text style={styles.galleryButtonText}> 수업 사진</Text>
              </TouchableOpacity>
            )}
          </View>
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
  // src/pages/CombinedCNECMU.js
  const renderItem = useCallback(
    ({item}) => (
      <Item
        title={item.title}
        description={item.description}
        image={item.image}
        type={item.type}
        branch={selectedBranch}
        hasGallery={item.title === '통기타' || item.title === '드럼'}
        onPress={() => {
          // 모든 데이터와 hasGallery를 함께 전달
          const itemData = {
            ...item,
            hasGallery: true, // 일단 모든 수업에 대해 true로 설정해서 테스트
          };
          navigation.navigate('Detail', itemData);
        }}
        onGalleryPress={() => navigation.navigate('ClassGallery')}
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
    backgroundColor: '#f8f8f8',
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
    color: '#4CD964',
    marginTop: 20,
    marginBottom: 10,
  },
  preparingDescription: {
    fontSize: 16,
    color: '#666',
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
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
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
  galleryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginLeft: 8,
  },
  galleryButtonText: {
    color: '#fff',
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
