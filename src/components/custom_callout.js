import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import constant from '../utils/constant';

const CustomCallout = (props) => {
  const { name, rating, distance, image_url } = props.data;

  return (
    <View style={styles.container}>
      <View style={styles.image_container}>
        <Image source={{uri: image_url}} style={styles.image_style} />
      </View>
      <View style={styles.info_container}>
        <Text numberOfLines={1}>{name}</Text>
        <Text>Rating: {rating}</Text>
        <Text>Distance: {Math.floor(distance)}</Text>
      </View>
      <TouchableOpacity 
        style={styles.bookmark_container}
        onPress={props.onPress}
      >
        <Icon name="navigate" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent:'flex-start',
    alignItems: 'center',
    margin: 10,
    width: constant.screenWidth - 50,
  },
  image_container: {
    flex: 2,
  },
  info_container: {
    flex: 5,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  bookmark_container: {
    flex: 2,
    alignItems: 'flex-end',
    paddingRight: 10
  },
  image_style: {
    width: 50,
    height: 50,
  },
})

export default CustomCallout;