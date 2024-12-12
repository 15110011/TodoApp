import React, {memo, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icons} from '../utils/Icons';
import {Colors, Radius, Size, Spacing} from '../themes/themes';
import AppIcon from './Icon';
import {ITask} from '../types/task';
import InitTask from './InitTask';
import {calcRemainingTime} from '../utils/timeFormat';
import Checkbox from './Checkbox';
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
} from 'react-native-reanimated';

type Props = {
  item: ITask;
  setTask: (task: ITask) => void;
  handleComplete: (id: number) => void;
  handleDelete: (id: number) => void;
  handleConfirm: (data: ITask) => void;
  onChangeText: (text: string) => void;
  handleUpdate: (data: ITask) => void;
  handleSelect: (item: ITask) => void;
  selected: ITask;
};

const TaskItem: React.FC<Props> = props => {
  const {
    item,
    handleComplete,
    handleDelete,
    handleConfirm,
    onChangeText,
    handleUpdate,
    setTask,
    selected,
    handleSelect,
  } = props || {};
  const heightAnim = useSharedValue<number>(114);
  const opacity = useSharedValue<number>(1);

  useEffect(() => {
    if (selected?.id == item?.id && item.isEditing) {
      heightAnim.value = 340;
      opacity.value = 0;
    } else {
      heightAnim.value = 114;
      opacity.value = 1;
    }
  }, [heightAnim, item?.id, selected?.id, item.isEditing, opacity]);

  const handleAction = (data: ITask) => {
    handleUpdate(data);
    heightAnim.value = 114;
  };

  const animatedStyle = useAnimatedStyle(() => ({
    height: withTiming(heightAnim.value, {duration: 300}),
  }));

  const animatedStyle2 = useAnimatedStyle(() => ({
    opacity: withTiming(opacity.value, {duration: 500}),
  }));

  const renderPriority = (task: ITask) => {
    switch (task.priority) {
      case 3:
        return (
          <Animated.Text
            style={[styles.highPriority, styles.priority, animatedStyle2]}>
            Ưu tiên cao
          </Animated.Text>
        );
      case 2:
        return (
          <Animated.Text
            style={[styles.medPriority, styles.priority, animatedStyle2]}>
            Ưu tiên trung bình
          </Animated.Text>
        );
      case 1:
        return (
          <Animated.Text
            style={[styles.lowPriority, styles.priority, animatedStyle2]}>
            Ưu tiên thấp
          </Animated.Text>
        );
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity
      disabled={item.isEditing}
      onPress={() => handleSelect(item)}>
      <Animated.View style={[styles.container, animatedStyle]}>
        {item?.id == selected?.id && item.isEditing ? (
          <InitTask
            task={item}
            setTask={setTask}
            handleDelete={handleDelete}
            handleConfirm={handleConfirm}
            onChangeText={onChangeText}
            handleUpdate={handleAction}
            item={item}
          />
        ) : (
          <>
            <View style={styles.panel}>
              <View style={styles.flex}>
                <Animated.View style={animatedStyle2}>
                  <Checkbox
                    isChecked={item.isCompleted}
                    onChange={() => handleComplete(item.id)}
                  />
                </Animated.View>
                <Text
                  numberOfLines={2}
                  style={[
                    styles.title,
                    item.isCompleted && {
                      textDecorationLine: 'line-through',
                      textDecorationStyle: 'solid',
                    },
                  ]}>
                  {item.name}
                </Text>
              </View>
              <TouchableOpacity
                disabled={item.isEditing}
                onPress={() => handleSelect(item)}>
                <AppIcon
                  icon={Icons.edit}
                  size={Size.size_36}
                  color={Colors.black}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.subPanel}>
              {renderPriority(item)}
              <Animated.Text style={[styles.count, animatedStyle2]}>
                {calcRemainingTime(item.date)}
              </Animated.Text>
            </View>
          </>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: Radius.L,
    paddingHorizontal: Spacing.L + 2,
    paddingVertical: Spacing.XL,
    marginVertical: Spacing.M,
    overflow: 'hidden',
  },
  flex: {
    flex: 1,
    flexDirection: 'row',
  },
  panel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subPanel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: Spacing.M,
  },
  deleteBtn: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    paddingBottom: Spacing.L,
  },
  priority: {
    marginLeft: Spacing.XL - 2 + Spacing.S,
    fontSize: Size.size_14,
    fontWeight: '400',
  },
  highPriority: {
    color: Colors.green,
  },
  medPriority: {
    color: Colors.orange,
  },
  lowPriority: {
    color: Colors.grey,
  },
  title: {
    color: Colors.black,
    fontWeight: '500',
    fontSize: Size.size_16,
  },
  count: {fontSize: Size.size_12, fontWeight: '400', lineHeight: 20},
});

export default memo(TaskItem);
