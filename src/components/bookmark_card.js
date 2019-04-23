import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Icon } from 'native-base';

const BookmarkCard = (props) => {
  const { name, rating, categories, onPress } = props;

  const categoryNames = categories.map((item, index) => {return <Text key={index}>{item.title} </Text>})

  return (
    <View style={styles.container}>
      <View style={styles.info_container}>
        <Text>Name: {name}</Text>
        <Text>Rating: {rating}</Text>
        <View style={styles.categories}>
          <Text>Categories: </Text>
          {categoryNames}
        </View>
      </View>
      <TouchableOpacity 
        style={styles.delete_container}
        onPress={onPress}
      >
        <Icon name="trash" style={{color: 'red'}} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    margin: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'gray'
  },
  info_container: {
    flex: 6
  },
  delete_container: {
    flex: 1
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  }
})

BookmarkCard.propTypes = {
  name: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  categories: PropTypes.array.isRequired,
}

export default BookmarkCard;