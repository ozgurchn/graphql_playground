import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Callout } from 'react-native-maps';
import MapMarker from '../components/map_marker';
import constant from '../utils/constant';
import CustomCallout from '../components/custom_callout';

const LATITUDE_DELTA = 0.1522;
const LONGITUTE_DELTA = 0.1521;

export default class Map extends Component {
  async addBookmark(item) {
    this.props.addBookmark(item);
  }

  render() {
    const { latitude, longitude, searchData } = this.props;
  
    return (
      <MapView
        ref="map"
        style={styles.map}
        showsUserLocation
        region={{
          latitude,
          longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUTE_DELTA,
        }}
      >
        {
          searchData.map((item, index) => {
            const { latitude, longitude } = item.coordinates;

            if (latitude !== undefined && longitude !== undefined) {
              return (
                <MapMarker
                  ref={ref => { this.mark = ref; }}
                  key={ `marker_${item.id}` }
                  coordinate={ { longitude: parseFloat(longitude), latitude: parseFloat(latitude) } }
                >
                  <Callout>
                    <CustomCallout data={item} onPress={() => { this.addBookmark(item) }} />
                  </Callout>
                </MapMarker>
              );
            } else {
              return null;
            }
          })
        }
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    height: constant.screenHeight - 120, // Height + Footer heigs,
    width: constant.screenWidth,
  },
 });