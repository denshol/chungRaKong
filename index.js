/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

if (module.hot) {
  module.hot.accept();
}

AppRegistry.registerComponent(appName, () => App);
