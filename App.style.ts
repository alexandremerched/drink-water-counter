import {StyleSheet} from 'react-native';
import ThemeColors from './src/styles/themeColors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingBottom: 80,
    backgroundColor: ThemeColors.Charcoal,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    color: ThemeColors.White,
  },
  inputsContainer: {
    flexDirection: 'row',
    marginTop: 30,
    width: '100%',
    justifyContent: 'space-evenly',
    marginBottom: 30,
    alignItems: 'flex-end',
  },
  dashboardContainer: {
    width: '100%',
    marginTop: 24,
  },
  dashboard: {
    borderWidth: 2,
    width: '100%',
    alignItems: 'center',
    borderRadius: 6,
    borderColor: ThemeColors.Teal,
    padding: 10,
    paddingBottom: 20,
  },
  amountOfBottlesText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginTop: 20,
  },
});

export default styles;
