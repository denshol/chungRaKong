// src/pages/Notice.js

import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';

const notices = [
  {
    id: '1',
    title: '문화와 교육을 한번에 즐기며배울수있는 공간입니다.',
    description: '다양한 문화와 교육을 한번에 즐기며 배울수 있는 공간입니다.',
  },
  // {
  //   id: '2',
  //   title: 'Service Time Change',
  //   description: 'New service times starting next week.',
  // },
  // {
  //   id: '3',
  //   title: 'Volunteer Opportunities',
  //   description: 'Join us in our volunteer programs.',
  // },
];

const Notice = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notices</Text>
      <FlatList
        data={notices}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.notice}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  notice: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default Notice;
