import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';

import './config/ReactotronConfig';
import createNavigator from './routes';

export default class App extends Component {
  async componentDidMount() {
    const repositories = await AsyncStorage.getItem('@Githuber:repositories');

    console.tron.log(repositories);
  }

  render() {
    const Routes = createNavigator();

    return <Routes />;
  }
}
