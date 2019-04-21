import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Query } from 'react-apollo'
import gql from 'graphql-tag';

const CATEGORIES = gql`
  {
    categories {
      total
      category {
          title
          alias
          parent_categories {
              title
          }
      }
    }
  }
`;

export default class Home extends Component {
  render() {
    return (
      <Query
        query={CATEGORIES}
      >
        {
          ({data, error, loading}) => {
            if (error || loading) {
              console.log('error', error)
              console.log('loading', loading)
              console.log('data', data);
              return (<View /> )
            }
            return (
              <View style={styles.container}>
                <Text>KEK</Text>
              </View>
            )
          }
        }
      </Query>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})