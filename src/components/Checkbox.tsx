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
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={[styles.checkbox, checked && styles.checked]}>
        {checked && <View style={styles.checkmark} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.S,
  },
  checkbox: {
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
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
