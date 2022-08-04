import {StyleSheet} from 'react-native';
import ThemeColors from '../../styles/themeColors';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '35%',
    maxWidth: 400,
  },
  label: {
    fontSize: 16,
    textAlign: 'center',
    color: ThemeColors.Teal,
    marginBottom: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: ThemeColors.Teal,
    padding: 10,
    borderRadius: 5,
    width: '100%',
    color: ThemeColors.Charcoal,
    fontSize: 16,
  },
  labelDisabled: {
    color: ThemeColors.LightGray,
  },
  textInputDisabled: {
    backgroundColor: ThemeColors.Gray,
    color: ThemeColors.LightGray,
    borderColor: ThemeColors.LightGray,
  },
});

export default styles;
