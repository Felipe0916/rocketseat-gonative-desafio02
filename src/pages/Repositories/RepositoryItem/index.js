import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
// import api from '~/services/api';

import {
  View, Text, Image, TouchableOpacity,
} from 'react-native';

import '~/config/ReactotronConfig';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

class RepositoryItem extends Component {
  static propTypes = {
    repository: PropTypes.shape({
      name: PropTypes.string,
      owner: PropTypes.shape({
        avatar_url: PropTypes.string,
      }),
      organization: PropTypes.shape({
        login: PropTypes.string,
      }),
    }).isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  goToRepositoryIssues = async () => {
    const { repository, navigation } = this.props;
    navigation.navigate('Issues', { repositoryName: repository.name, repositoryData: repository });
  };

  render() {
    const { repository } = this.props;

    return (
      <View style={styles.container}>
        <Image style={styles.avatar} source={{ uri: repository.owner.avatar_url }} />
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>{repository.name}</Text>
          <Text style={styles.infoText}>{repository.organization.login}</Text>
        </View>
        <TouchableOpacity onPress={this.goToRepositoryIssues}>
          <Icon name="forward" size={20} style={styles.infoIcon} />
        </TouchableOpacity>
      </View>
    );
  }
}
export default withNavigation(RepositoryItem);
