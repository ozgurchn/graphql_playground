import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, CardItem, Text, Body } from 'native-base';
import constant from '../utils/constant';

export default class Bookmarks extends Component {
  render() {
    const { bookmarkData } = this.props;

    return(
      <View style={styles.container}>
        {bookmarkData.map((item) => {
          return (
          <Card>
            <CardItem header button onPress={() => alert("This is Card Header")}>
              <Text>NativeBase</Text>
            </CardItem>
            <CardItem button onPress={() => alert("This is Card Body")}>
              <Body>
                <Text>
                  Click on any carditem
                </Text>
              </Body>
            </CardItem>
            <CardItem footer button onPress={() => alert("This is Card Footer")}>
              <Text>GeekyAnts</Text>
            </CardItem>
          </Card>
          )
        })}
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
});