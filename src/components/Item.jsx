// Item.jsx
import React from 'react';
import {View, Text, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import Reanimated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from 'react-native-reanimated';

const Item = ({title, description, image, onPress, type, branch, isNew}) => {
  // 기존 Item 컴포넌트 코드

  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
      opacity: opacity.value,
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
              color={selectedBranch === 1 ? 'white' : COLORS.primary.main}
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
              color={selectedBranch === 2 ? 'white' : COLORS.secondary.main}
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
  });
};

export default Item;
