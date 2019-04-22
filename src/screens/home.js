// import React, { Component } from 'react';
// import { StyleSheet, View, Text } from 'react-native';
// import { Query } from 'react-apollo'
// import gql from 'graphql-tag';

// const CATEGORIES = gql`
//   {
//     categories {
//       total
//       category {
//           title
//           alias
//           parent_categories {
//               title
//           }
//       }
//     }
//   }
// `;

// export default class Home extends Component {
//   render() {
//     return (
//       <Query
//         query={CATEGORIES}
//       >
//         {
//           ({data, error, loading}) => {
//             if (error || loading) {
//               console.log('error', error)
//               console.log('loading', loading)
//               console.log('data', data);
//               return (<View /> )
//             }
//             return (
//               <View style={styles.container}>
//                 <Text>KEK</Text>
//               </View>
//             )
//           }
//         }
//       </Query>
//     )
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   }
// })
import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Title, Icon, Badge, Text } from 'native-base';
import Permissions from 'react-native-permissions'
import { getUserLocation } from '../utils/getUserLocation';
import { searchBusiness } from '../utils/network/networkService';
import Map from '../screens/map';
import Bookmarks from '../screens/bookmarks';
import { getStoreData } from '../utils/localStorage';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabName: 'Home',
      activeTab: true,
      searchData: [],
      latitude: 0,
      longitude: 0,
      bookmarks: []
    }
  }
  async componentDidMount() {
    const self = this;

    const bookmarks = await getStoreData('bookmarkData');
    this.setState({bookmarks});
  
    Permissions.check('location').then(response => {
      if (response === 'denied') {
        Alert.alert(
          'Warning',
          'FOTD',
          [{ text: 'Okay'}], 
          { cancelable: true })
      } else {
        getUserLocation(
          () => Alert.alert(
            'Warning',
            'Open bro',
            [{ text: 'Okay'}], 
            { cancelable: true }),
          (lat, long) => {
            self.fetch(lat, long)
          },
        );
      }
    });
  }

  async fetch (latitude, longitude) {
    const postData = {
      latitude,
      longitude,
      limit: 50,
    }
    const response = await searchBusiness(postData);
    this.setState({
      searchData: response.businesses,
      latitude,
      longitude
    });
  }

  addBookmark(item) {
    const joined = this.state.bookmarks.concat(item);
    this.setState({ bookmarks: joined })
  }

  navigateTo(type) {
    if (type !== this.state.tabName) {
      this.setState({
        tabName: type,
        activeTab: !this.state.activeTab,
      });
    }
  }

  renderTabs() {
    const { searchData, tabName, latitude, longitude, bookmarks } = this.state;
  
    if(tabName === 'Home') { 
      return (
        <Map 
          latitude={latitude} 
          longitude={longitude}
          searchData={searchData}
          addBookmark={(item) => this.addBookmark(item)}
        />
      )
    } else {
      return (
        <Bookmarks bookmarkData={bookmarks} />
      )
    }
  }

  render() {
    const { activeTab, tabName, bookmarks } = this.state;
    const badgeCount = bookmarks ? bookmarks.length : 0;
  
    return (
      <Container>
        <Header>
          <Title>{tabName}</Title>
        </Header>
        <Content>
          {this.renderTabs()}
        </Content>
        <Footer>
          <FooterTab>
            <Button 
              active={activeTab} 
              vertical 
              onPress={() => this.navigateTo('Home')}
            >
              <Icon name="home" />
              <Text>Home</Text>
            </Button>
            <Button 
              active={!activeTab}
              badge 
              vertical 
              onPress={() => this.navigateTo('Bookmarks')}
            >
              {badgeCount > 0 ? <Badge ><Text>{badgeCount}</Text></Badge> : null} 
              <Icon active name="navigate" />
              <Text>Bookmarks</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}