import {StyleSheet} from 'react-native';
import ThemeColors from '../../styles/themeColors';

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: ThemeColors.Teal,
    padding: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    color: ThemeColors.Teal,
  },
});

export default styles;
