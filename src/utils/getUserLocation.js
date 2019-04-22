import { Platform, PermissionsAndroid, Linking } from 'react-native';

export function getUserLocation(onError, onSuccess) {
  let latitude;
  let longitude;

  navigator.geolocation.getCurrentPosition(
    (position) => {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;

      if (typeof onSuccess === 'function') {
        onSuccess(latitude, longitude);
      }
    },
    (error) => {
      if (typeof onError === 'function') {
        onError();
      }
    },
  { enableHighAccuracy: false, timeout: 750, maximumAge: 999999 }
  );
}