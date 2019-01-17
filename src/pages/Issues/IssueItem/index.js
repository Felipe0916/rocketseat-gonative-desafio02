import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';

import {
  View, Text, Image, TouchableOpacity, Linking,
} from 'react-native';

import '~/config/ReactotronConfig';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

class IssueItem extends Component {
  static propTypes = {
    issue: PropTypes.shape({
      title: PropTypes.string,
      number: PropTypes.number,
      user: PropTypes.shape({
        login: PropTypes.string,
        avatar_url: PropTypes.string,
      }),
    }).isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  goToIssuesLink = () => {
    const { issue, navigation } = this.props;
    const repository = navigation.getParam('repositoryData', []);

    Linking.openURL(
      `https://github.com/${repository.organization.login}/${repository.name}/issues/${
        issue.number
      }`,
    );
  };

  render() {
    const { issue } = this.props;

    return (
      <View style={styles.container}>
        <Image style={styles.avatar} source={{ uri: issue.user.avatar_url }} />
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle} numberOfLines={1} ellipsizeMode="tail">
            {issue.title}
          </Text>
          <Text style={styles.infoText}>{issue.user.login}</Text>
        </View>
        <TouchableOpacity onPress={this.goToIssuesLink}>
          <Icon name="forward" size={20} style={styles.infoIcon} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default withNavigation(IssueItem);
