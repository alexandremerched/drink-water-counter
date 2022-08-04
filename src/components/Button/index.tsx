import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

import styles from './styles';

interface InputProps extends React.ComponentProps<typeof TouchableOpacity> {
  title: string;
}

export default function Button({title, ...props}: InputProps) {
  return (
    <TouchableOpacity style={styles.container} {...props}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}
