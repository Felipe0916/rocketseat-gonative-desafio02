import { StyleSheet } from 'react-native';
import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },

  buttonContainer: {
    backgroundColor: colors.regular,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignContent: 'center',
    margin: metrics.baseMargin * 2,
    padding: metrics.basePadding / 2,
    borderRadius: metrics.baseRadius,
  },

  button: {
    color: colors.whiteTransparent,
  },

  textButton: {
    fontWeight: 'bold',
    fontSize: 14,
  },

  flatlist: {
    flex: 1,
  },
});

export default styles;
