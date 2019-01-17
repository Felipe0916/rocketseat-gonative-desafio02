import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '~/services/api';
import '~/config/ReactotronConfig';
import Header from '~/components/Header';

import { Segment } from 'native-base';
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { withNavigation } from 'react-navigation';

import styles from './styles';
import IssueItem from './IssueItem';

class Issues extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    refreshing: false,
    loading: true,
    dataArr: [],
  };

  componentDidMount() {
    this.loadIssues();
  }

  concatAllIssues = async () => {
    const { navigation } = this.props;
    const { dataArr } = this.state;

    const repository = navigation.getParam('repositoryData', []);
    const { data } = await api.get(`/repositories/${repository.id}/issues?state=closed`);

    this.setState({ dataArr: dataArr.concat(data) });
  };

  loadIssues = async () => {
    this.setState({ refreshing: true });
    const { navigation } = this.props;

    const repository = navigation.getParam('repositoryData', []);
    const { data } = await api.get(`/repositories/${repository.id}/issues`);

    this.setState({ dataArr: data });
    this.concatAllIssues();
    this.setState({ loading: false, refreshing: false });
  };

  loadOpenedIssues = async () => {
    this.setState({ refreshing: true });
    const { navigation } = this.props;

    const repository = navigation.getParam('repositoryData', []);
    const { data } = await api.get(`/repositories/${repository.id}/issues`);

    this.setState({ dataArr: data, loading: false, refreshing: false });
  };

  loadClosedIssues = async () => {
    this.setState({ refreshing: true });
    const { navigation } = this.props;

    const repository = navigation.getParam('repositoryData', []);
    const { data } = await api.get(`/repositories/${repository.id}/issues?state=closed`);

    this.setState({ dataArr: data, loading: false, refreshing: false });
  };

  renderListItem = ({ item }) => <IssueItem issue={item} />;

  renderList = () => {
    const { dataArr, refreshing } = this.state;

    return (
      <FlatList
        data={dataArr}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderListItem}
        onRefresh={this.loadIssues}
        refreshing={refreshing}
      />
    );
  };

  render() {
    const { loading } = this.state;

    return (
      <View style={styles.container}>
        <Header issueScreen />
        <Segment style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={this.loadIssues}>
            <Text style={styles.textButton}>Todas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.loadOpenedIssues}>
            <Text style={styles.textButton}>Abertas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.loadClosedIssues}>
            <Text style={styles.textButton}>Fechadas</Text>
          </TouchableOpacity>
        </Segment>
        <ScrollView>
          <View>{loading ? <ActivityIndicator style={styles.loading} /> : this.renderList()}</View>
        </ScrollView>
      </View>
    );
  }
}

export default withNavigation(Issues);
