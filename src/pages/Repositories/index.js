import React, { Component } from 'react';
import api from '~/services/api';

import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  AsyncStorage,
  ActivityIndicator,
  Text,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import '~/config/ReactotronConfig';
import RepositoryItem from './RepositoryItem';
import Header from '~/components/Header';
import styles from './styles';

export default class Repositories extends Component {
  state = {
    repositoryPath: '',
    refreshing: false,
    loading: true,
    dataArr: [],
    error: false,
  };

  componentDidMount() {
    console.tron.clear();
    this.loadRepositories();
  }

  loadRepositories = async () => {
    this.setState({ refreshing: true });
    const response = JSON.parse(await AsyncStorage.getItem('@Githuber:repositories'));
    this.setState({ refreshing: false, loading: false, dataArr: response });
  };

  addNewRepository = async () => {
    try {
      const { repositoryPath } = this.state;
      const { data } = await api.get(`/repos/${repositoryPath}`);
      const response = JSON.parse(await AsyncStorage.getItem('@Githuber:repositories'));

      let reposArr = [];

      if (response !== null) {
        reposArr = response.map(item => item);
      }

      reposArr.push(data);

      this.setState({ refreshing: true, loading: true });

      await AsyncStorage.setItem('@Githuber:repositories', JSON.stringify(reposArr));

      this.setState({
        repositoryPath: '',
        refreshing: false,
        loading: false,
        dataArr: reposArr,
        error: false,
      });
    } catch (err) {
      this.setState({ loading: false, error: true });
    }
  };

  renderListItem = ({ item }) => <RepositoryItem repository={item} />;

  renderList = () => {
    const { refreshing, dataArr } = this.state;

    return (
      <FlatList
        data={dataArr}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderListItem}
        onRefresh={this.loadRepositories}
        refreshing={refreshing}
      />
    );
  };

  render() {
    const { repositoryPath, loading, error } = this.state;

    return (
      <View style={styles.container}>
        <Header title="GitIssues" issueScreen={false} />
        <View style={styles.newReposContainer}>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Adicionar novo repositório"
            underlineColorAndroid="transparent"
            value={repositoryPath}
            onChangeText={text => this.setState({ repositoryPath: text })}
          />
          <TouchableOpacity onPress={this.addNewRepository}>
            <Icon name="plus" size={32} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <View>{loading ? <ActivityIndicator style={styles.loading} /> : this.renderList()}</View>
        {error && <Text style={styles.error}>Repositório inválido ou inexistente.</Text>}
      </View>
    );
  }
}
