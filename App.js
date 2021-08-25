import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux'
import AppContainer from './app/AppContainer';
import thunk from 'redux-thunk';
import rootReducer from './app/store/reducers/rootReducer' 

const App = (props) => {

  const store = createStore(rootReducer, compose(applyMiddleware(thunk)))
  
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {}
})

export default App