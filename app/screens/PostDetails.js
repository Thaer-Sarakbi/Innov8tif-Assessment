import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, LogBox, TextInput } from 'react-native'
import Header from '../components/Header';
import { useSelector, useDispatch } from 'react-redux';
import { getPostDetails } from '../store/actions/getPosts';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

const TextBox = ({
  onEndEditing,
  onChangeText,
}) => {
  return (
    <View style={styles.header}>
      <View
        style={styles.searchGroup}
      >
        <Icon name="search" style={styles.searchIcon} />
        <TextInput
          placeholder= 'Search Box'
          style={styles.searchField}
          onEndEditing={() => onEndEditing()}
          onChangeText={(keyword) => onChangeText(keyword)}
        />
      </View>
    </View>
  );
};

const PostDetails = ({ navigation, route }) => {
  const [keyword, setKeyword] = useState('');

  let posts  = useSelector((state) => state.postsReducer.posts) 
  const [filteredPosts, setFilteredPosts] = useState(posts);

const handleSearch = () => {
  let value = keyword?.toLowerCase()
  let result = [];

  if(value){
    result = posts.filter((data) => {
     return data.title.search(value) != -1;
  
    });
  } else {
    result = posts.filter((data) => {
      return data.title
     });
  }
 
  setFilteredPosts(result);
  }

  const userId = route.params.userId
  let dispatch = useDispatch();
  const get = () => dispatch(getPostDetails(userId))
  
  const onChangeText = (keyword) => {
    handleSearch()
    
    setTimeout(() => {
      setKeyword(keyword);
    }, 0);
  }
  

  const _onEndEditing = () => {
    handleSearch()
  }

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    get()
  },[keyword])

  return (
    <View style={styles.container}>
      <Header 
        title = 'List of Posts'
        navigation={navigation}
        bottom={() => <TextBox
          keyword={keyword}
          navigation={navigation}
          onChangeText={(keyword) => onChangeText(keyword)}
          onEndEditing={() => _onEndEditing()}
        />}
      />
    
         <ScrollView>
        {filteredPosts?.map(post => (
           
          <View style={styles.cardContainer} key={post.id}>
            <View style={styles.content}>
              <View>
                <Text style={styles.title} numberOfLines={1}>
                  {post.title}
                </Text>

               <Text style={styles.text} numberOfLines={4}>
                 {post.body}
               </Text>
              </View>
            </View>
          </View>
       
        ))}
         </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: -40
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
  searchGroup: {
    flexDirection: 'row',
    marginHorizontal: 15,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginVertical: 15,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
  },
  searchField: {
    fontSize: 15,
    paddingLeft: 10,
    paddingVertical: 10,
    flex: 1
  },
  searchIcon: {
    fontSize: 15,
  },
  searchField: {
    fontSize: 15,
    paddingLeft: 10,
    paddingVertical: 10,
    flex: 1
  },
})

export default PostDetails