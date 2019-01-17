import { StyleSheet } from 'react-native';
import { colors, metrics } from '~/styles';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const styles = StyleSheet.create({
  containerIssues: {
    backgroundColor: colors.white,
    height: 38 + getStatusBarHeight(),
    borderBottomWidth: 1,
    borderBottomColor: colors.white,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: metrics.basePadding,
  },

  containerRepositories: {
    backgroundColor: colors.white,
    height: 38 + getStatusBarHeight(),
    borderBottomWidth: 1,
    borderBottomColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: metrics.basePadding,
  },

  icon: {
    color: colors.darker,
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.darker,
  },
});

export default styles;
