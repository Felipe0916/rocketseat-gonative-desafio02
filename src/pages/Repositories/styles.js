import { StyleSheet } from 'react-native';
import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },

  newReposContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: metrics.baseMargin,
    paddingBottom: metrics.basePadding / 2,
    marginHorizontal: metrics.baseMargin * 2,
    borderBottomWidth: 1,
    borderBottomColor: colors.white,
  },

  input: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius,
    height: 36,
    paddingHorizontal: metrics.basePadding,
  },

  icon: {
    color: colors.darker,
  },

  error: {
    color: colors.danger,
    textAlign: 'center',
    marginTop: metrics.baseMargin,
  },
});

export default styles;
