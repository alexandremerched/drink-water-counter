import React from 'react';
import {Text, View, TextInput} from 'react-native';

import styles from './styles';

interface InputProps extends React.ComponentProps<typeof TextInput> {
  label: string;
}

export default function Input({label, editable, ...props}: InputProps) {
  return (
    <View style={styles.container}>
      <Text style={[styles.label, !editable && styles.labelDisabled]}>
        {label}
      </Text>
      <TextInput
        style={[styles.textInput, !editable && styles.textInputDisabled]}
        editable={editable}
        {...props}
      />
    </View>
  );
}
