import React, {memo} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors, Radius, Size, Spacing} from '../themes/themes';
import AppIcon from './Icon';

interface IButtons {
  title?: string;
  icon?: string;
  style?: any;
  onPress?: () => void;
  disabled?: boolean;
  iconSize?: number;
  iconColor?: string;
}

const AppButton: React.FC<IButtons> = props => {
  const {
    title = '',
    icon = '',
    style = {},
    onPress = () => null,
    disabled = false,
    iconSize = Size.size_20,
    iconColor = Colors.black,
  } = props || {};

  const handleAction = () => {
    onPress?.();
  };

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.container, style]}
      onPress={handleAction}>
      <Text style={styles.title}>{title}</Text>
      {icon ? <AppIcon icon={icon} size={iconSize} color={iconColor} /> : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: Radius.XL + 2,
    padding: Spacing.XS,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.primaryPink,
    paddingVertical: Spacing.M + 2,
  },
  title: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: Size.size_16,
    paddingRight: Size.size_10,
  },
  iconStyle: {paddingRight: Spacing.XS},
});

export default memo(AppButton);
