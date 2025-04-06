import {Platform} from 'react-native';

export const BASE_URL =
  Platform.OS === 'android' ? 'http://10.0.2.2:4000' : 'http://localhost:4000';

// We have to use our own IP if we are using real device or hosted url
// export const BASE_URL = 'http://237.84.2.178:4000';  <- example if we have hosted
