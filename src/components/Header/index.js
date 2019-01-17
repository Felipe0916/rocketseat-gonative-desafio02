import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';

import {
  View, Text, TouchableOpacity, StatusBar,
} from 'react-native';

import '~/config//ReactotronConfig';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';

class Header extends Component {
  static propTypes = {
    title: PropTypes.string,
    issueScreen: PropTypes.bool.isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  static defaultProps = {
    title: 'Sem Título',
  };

  goBack = () => {
    const { navigation } = this.props;
    navigation.navigate('Repositories');
  };

  render() {
    const { title, issueScreen, navigation } = this.props;
    const titleIssues = navigation.getParam('repositoryName', 'Sem título');

    return issueScreen ? (
      <View style={styles.containerIssues}>
        <StatusBar barStyle="light-content" />
        <View style={styles.left} />
        <Text style={styles.title}>{titleIssues}</Text>
        <TouchableOpacity onPress={this.goBack}>
          <Icon name="keyboard-backspace" size={20} style={styles.icon} />
        </TouchableOpacity>
      </View>
    ) : (
      <View style={styles.containerRepositories}>
        <StatusBar barStyle="light-content" />
        <View style={styles.left} />
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  }
}

export default withNavigation(Header);
