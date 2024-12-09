// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors, Size} from '../themes/themes';
import {View, Image, StyleSheet} from 'react-native';
import {Icons} from '../utils/Icons';

const AppIcon: React.FC<IIcons> = props => {
  const {
    color = Colors.white,
    size = Size.size_16,
    style,
    icon = Icons.edit,
  } = props || {};

  // using Icon lib instead
  return (
    <View style={[styles.container, style]}>
      <Image
        source={icon}
        style={{
          height: size,
          width: size,
          tintColor: color,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppIcon;

export interface IIcons {
  style?: any;
  size?: number;
  color?: string;
  icon?: string;
}
