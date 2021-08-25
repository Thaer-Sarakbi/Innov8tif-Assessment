import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, LogBox, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { getPosts } from '../store/actions/getPosts';

const Posts = ({ navigation }) => {
  let dispatch = useDispatch();
  const get = (loading, page) => dispatch(getPosts(loading, page))
  let posts  = useSelector((state) => state.postsReducer.posts) 
  let page = useSelector((state) => state.postsReducer.page) 
  let isLoading = useSelector((state) => state.postsReducer.isLoading) 

  const handleLoadMore = () => {
    let Newpage = page + 1
    get(false, Newpage)
  }

  const footer = () => {
      return(
        isLoading ? 
          <View style={styles.loader}>
            <ActivityIndicator size='large' />
          </View> : null
      )
  }

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    get(true, 1)
  },[])
 
  return (
    <View style={styles.container}>
        <FlatList
          style={styles.scrollView}
          data={posts}
          keyExtractor={(item) =>  item.id}
          renderItem={({ item, index }) => {
            return(
              <TouchableOpacity onPress={() => navigation.navigate('PostDetails', { userId: item.userId })}>
                <View style={styles.cardContainer}>
                  <View style={styles.content}>
                    <View>
                      <Text style={styles.title} numberOfLines={1}>
                        {item.title}
                      </Text>

                     <Text style={styles.text} numberOfLines={4}>
                       {item.body}
                     </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )
          }}
          onEndReached={handleLoadMore}
          ListFooterComponent={footer}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    paddingHorizontal: 15,
    paddingTop: 10,
    marginBottom: 10
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  cardContainer:{
    flex: 1,
    flexDirection: 'row',
    marginBottom: 15,
    borderRadius: 8,
    elevation: 5,
        shadowColor: "rgb(0,0,0)",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,

    backgroundColor: 'white',
    borderRightWidth: 8,
  },
  title: {
    fontSize: 20,
    color: '#333333',
    fontWeight: 'bold',
  },
  text: {
    color: '#606060',
  },
  loader:{
    marginTop: 10,
    alignItems: 'center'
  }
})

export default Posts