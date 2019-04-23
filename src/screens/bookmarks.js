import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import constant from '../utils/constant';
import BookmarkCard from '../components/bookmark_card';

export default class Bookmarks extends Component {
  constructor(props) {
    super(props);
		this.state = {};
    this._renderItem = this._renderItem.bind(this);
  }

  deleteBookmark(id) {
    this.props.onPress(id)
  }

  _renderItem ({item, index}) {
    return (
      <View key={item.id}>
        <BookmarkCard 
          name={item.name}
          rating={item.rating}
          categories={item.categories}
          onPress={() => this.deleteBookmark(item.id)}
        />
      </View>
    )
  }

  render() {
    const { bookmarkData } = this.props;

    if (bookmarkData && bookmarkData.length < 1) {
      return (
        <View style={styles.container}>
          <View style={styles.center_container}>
            <Text>There are no bookmars to show</Text>
          </View>
        </View>
      )
    }

    return(
      <View style={styles.container}>
        <FlatList
          style={ styles.flat_list }
          showsVerticalScrollIndicator={ false }
          data={ bookmarkData }
          keyExtractor={ (item, index) => `bookmark#${index}` }
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute', 
    left: 0, 
    right: 0,  
    height: constant.screenHeight - 120, // Height + Footer heigs,
    backgroundColor: 'white'
  },
  center_container: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center',
  }
});