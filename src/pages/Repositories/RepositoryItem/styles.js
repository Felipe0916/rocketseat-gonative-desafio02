import { StyleSheet } from 'react-native';
import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius,
    padding: metrics.basePadding,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: metrics.baseMargin * 2,
    marginTop: metrics.baseMargin,
  },

  avatar: {
    width: 50,
    height: 50,
  },

  infoContainer: {
    flexDirection: 'column',
    marginHorizontal: metrics.baseMargin,
    flex: 1,
  },

  infoTitle: {
    color: colors.dark,
    fontSize: 18,
    fontWeight: 'bold',
  },

  infoText: {
    color: colors.dark,
    fontSize: 14,
  },

  infoIcon: {
    color: colors.dark,
  },
});

export default styles;
