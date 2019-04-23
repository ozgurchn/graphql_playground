import { Linking, Platform, Alert, PermissionsAndroid } from 'react-native';
import AndroidOpenSettings from 'react-native-android-open-settings';
import { getUserLocation } from '../utils/getUserLocation';

export function openSettings() {
  if (Platform.OS === 'ios') {
    Linking.canOpenURL('app-settings:').then(supported => {
      if (supported) {
        return Linking.openURL('app-settings:');
      }
      return false;
    });
  } else {
    AndroidOpenSettings.appDetailsSettings();
  }
}

export async function requestMapPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Yelp',
        'message': 'Yelp wants to use your location to find business'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      getUserLocation();
    } else {
      showPopupAndOpenSettings('You need to let location permission to see business on map')
    }
  } catch (err) {
    console.warn(err)
  }
}

export function showPopupAndOpenSettings(message) {
  Alert.alert(
    'Permission Warning',
    message,
    [
      {
        text: 'Open Settings',
        onPress: () => {
          return openSettings();
        },
      },
      { text: 'Cancel' },
    ],
    { cancelable: false }
  );
}
