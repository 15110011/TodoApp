import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors, Radius, Spacing} from '../themes/themes';

interface CheckboxProps {
  isChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({isChecked = false, onChange}) => {
  const [checked, setChecked] = useState(isChecked);

  const handlePress = () => {
    setChecked(!checked);
    onChange?.(!checked);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handlePress}
        style={[styles.checkbox, checked && styles.checked]}>
        {checked && <View style={styles.checkmark} />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  checkbox: {
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.S,
    borderRadius: Radius.XS + 1,
    backgroundColor: Colors.lightGrey,
  },
  checked: {
    backgroundColor: Colors.green,
    borderColor: Colors.green,
  },
  checkmark: {
    width: 10,
    height: 10,
    backgroundColor: Colors.white,
    borderRadius: Radius.XS - 2,
  },
});

export default Checkbox;
