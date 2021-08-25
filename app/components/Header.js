import React from 'react';
import { View, StyleSheet, TouchableOpacity, StatusBar, Text, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

let height = Dimensions.get('screen').height;

const Header = ({
  title,
  navigation,
  extraButton,
  onBack,
  bottom
}) => {
  return (
    <>
      <StatusBar transparent={false} styles={{ position: 'absolute' }} />
      <View style={styles.container}>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => {
            if (onBack) {
              onBack()
            }
            else {
              navigation.goBack()

            }
          }}>
            <Icon name="arrow-left" style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
        </View>
        {extraButton && extraButton.title && (
          <TouchableOpacity
            style={extraButton.buttonStyle}
            onPress={() => extraButton.onPress()}>
            <Text style={[styles.link, extraButton.textStyle]}>
              {extraButton.title}
            </Text>
          </TouchableOpacity>
        )}
        
      </View>
      {bottom && bottom()}
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 80 * (height / 812),
    elevation: 8,
    shadowColor: "rgb(0,0,0)",
    shadowOffset: {
        width: 0,
        height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    zIndex: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    marginTop: 40,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    paddingRight: 15,
    color: '#333333',
    fontSize: 15,
  },
  title: {
    fontSize: 15,
    color: '#333333',
    fontWeight: 'bold',
  },
  link: {
    fontSize: 15,
    color: '#14BEF1',
    textDecorationLine: 'underline',
  },
});
