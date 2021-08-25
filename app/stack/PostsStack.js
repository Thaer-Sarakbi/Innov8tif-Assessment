import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import PostDetails from '../screens/PostDetails';
import Posts from '../screens/Posts';

const PostsStack = () => {
  const PostsStack = createStackNavigator()

  return (
    <PostsStack.Navigator>
      <PostsStack.Screen name='Posts' component={Posts} />
      <PostsStack.Screen 
        name='PostDetails' 
        component={PostDetails} 
        options={() => ({
          headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#f9fafd',
              shadowColor: '#f9fafd',
              elevation: 0,
            }
          })}
      />
    </PostsStack.Navigator>
  )
}

export default PostsStack