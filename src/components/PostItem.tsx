// src/components/PostItem.tsx
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Post} from '../types/board';
import Icon from 'react-native-vector-icons/Ionicons';

interface PostItemProps {
  post: Post;
}

const PostItem = ({post}: PostItemProps) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('PostDetail', {id: post.id})}>
      <View style={styles.header}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.date}>
          {new Date(post.createdAt).toLocaleDateString()}
        </Text>
      </View>

      <Text style={styles.preview} numberOfLines={2}>
        {post.content}
      </Text>

      <View style={styles.footer}>
        <View style={styles.stats}>
          <Icon name="eye-outline" size={16} color="#666" />
          <Text style={styles.statsText}>{post.views}</Text>
          <Icon name="chatbubble-outline" size={16} color="#666" />
          <Text style={styles.statsText}>{post.comments.length}</Text>
          <Icon name="heart-outline" size={16} color="#666" />
          <Text style={styles.statsText}>{post.likes}</Text>
        </View>
        <Text style={styles.author}>{post.author}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
  preview: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
    marginRight: 12,
  },
  author: {
    fontSize: 12,
    color: '#666',
  },
});

export default PostItem;
