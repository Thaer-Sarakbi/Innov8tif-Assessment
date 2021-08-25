import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import PostsStack from './stack/PostsStack';
import { View, Text } from 'react-native'

const AppContainer = (props) => {

  return (
    <NavigationContainer>
      <PostsStack />
    </NavigationContainer>
  )
}

export default AppContainer