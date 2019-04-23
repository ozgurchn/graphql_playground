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

export async function requestMapPermission(onSuccess) {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Yelp',
        'message': 'Yelp wants to use your location to find businesses'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      getUserLocation(
        () => Alert.alert(
          'Warning',
          'To open the map, you must allow the app location from setting',
          [
            {text: 'Settings', onPress: () => openSettings(), style: 'cancel'},
            {text: 'Cancel'},
          ],
          { cancelable: true }),
        (lat, long) => {
          onSuccess(lat, long);
        },
      );
    } else {
      showPopupAndOpenSettings('To open the map, you must allow the app location from setting',)
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
