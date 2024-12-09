import React, {useEffect} from 'react';
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
  handleEdit: (id: number) => void;
  handleComplete: (id: number) => void;
  handleDelete: (id: number) => void;
  handleConfirm: (data: ITask) => void;
  onChangeText: (text: string) => void;
  handleUpdate: (data: ITask) => void;
};

const TaskItem: React.FC<Props> = props => {
  const {
    item,
    handleEdit,
    handleComplete,
    handleDelete,
    handleConfirm,
    onChangeText,
    handleUpdate,
    setTask,
  } = props || {};
  const {isEditing} = item;
  const translate = useSharedValue(200);

  useEffect(() => {
    translate.value = withTiming(0, {duration: 300});
  });

  const renderPriority = (task: ITask) => {
    switch (task.priority) {
      case 3:
        return <Text style={styles.highPriority}>Ưu tiên cao</Text>;
      case 2:
        return <Text style={styles.medPriority}>Ưu tiên trung bình</Text>;
      case 1:
        return <Text style={styles.lowPriority}>Ưu tiên thấp</Text>;
      default:
        return null;
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: -translate.value,
        },
      ],
    };
  });

  if (isEditing) {
    return (
      <InitTask
        task={item}
        setTask={setTask}
        handleDelete={handleDelete}
        handleConfirm={handleConfirm}
        onChangeText={onChangeText}
        handleUpdate={handleUpdate}
      />
    );
  }

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.panel}>
        <Checkbox
          isChecked={item.isCompleted}
          onChange={() => handleComplete(item.id)}
        />
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
        <TouchableOpacity onPress={() => handleEdit(item.id)}>
          <Animated.View style={animatedStyle}>
            <AppIcon
              icon={Icons.edit}
              size={Size.size_36}
              color={Colors.black}
            />
          </Animated.View>
        </TouchableOpacity>
      </View>
      <View style={styles.subPanel}>
        {renderPriority(item)}
        <Text>{calcRemainingTime(item.date)}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: Radius.L,
    paddingHorizontal: Spacing.L + 2,
    paddingVertical: Spacing.XXL,
    marginVertical: Spacing.M,
  },
  panel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subPanel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: Spacing.L,
  },
  deleteBtn: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    paddingBottom: Spacing.L,
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
    flex: 1,
    color: Colors.black,
    fontWeight: '500',
  },
});

export default TaskItem;
