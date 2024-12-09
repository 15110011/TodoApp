import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Platform,
} from 'react-native';
import {Colors, Radius, Size, Spacing} from '../themes/themes';
import {ITask} from '../types/task';
import dayjs from 'dayjs';
import DatePicker from 'react-native-date-picker';
import RNPickerSelect from 'react-native-picker-select';
import AppIcon from './Icon';
import {Icons} from '../utils/Icons';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from 'react-native-reanimated';

type Props = {
  task: ITask;
  setTask: (task: ITask) => void;
  onChangeText: (text: string) => void;
  handleConfirm: (data: ITask) => void;
  handleDelete?: (id: number) => void;
  handleUpdate?: (data: ITask) => void;
};

const InitTask: React.FC<Props> = props => {
  const boucingValue = useSharedValue<number>(0);
  const {task, handleConfirm, handleDelete, handleUpdate} = props || {};
  const {isEditing} = task;
  const [newData, setNewData] = useState({...task, date: new Date()});
  const [open, setOpen] = useState<boolean>(false);
  const [focus, setFocus] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    boucingValue.value = 1;
  }, [boucingValue, task]);

  const handleAction = useCallback(() => {
    setFocus(false);
    //TODO: Using react native form to handle input
    if (!newData.name) {
      setError(true);
      return;
    }
    if (task.isEditing) {
      handleUpdate?.(newData);
    } else {
      handleConfirm(newData);
    }
  }, [handleConfirm, handleUpdate, newData, task.isEditing]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withSpring(boucingValue.value, {
          duration: 700,
        }),
      },
    ],
  }));

  return (
    <Animated.View style={[styles.modalWrap, animatedStyle]}>
      {isEditing ? (
        <TouchableOpacity
          onPress={() => handleDelete?.(task.id)}
          style={styles.deleteBtn}>
          <AppIcon
            icon={Icons.delete}
            size={Size.size_12}
            color={Colors.black}
          />
          <Text style={{paddingLeft: Spacing.S}}>Xoá</Text>
        </TouchableOpacity>
      ) : null}
      <>
        <View
          style={[
            styles.inputWrap,
            {
              borderColor: focus
                ? Colors.black
                : error
                ? Colors.red
                : Colors.borderGrey,
            },
            styles.iosStyle,
          ]}>
          {isEditing ? (
            <TextInput
              placeholder="Tên công việc"
              value={newData.name}
              onChangeText={txt => {
                if (error) {
                  setError(false);
                }
                setNewData({...newData, name: txt});
              }}
              onFocus={() => {
                setFocus(true);
              }}
              onBlur={() => {
                setFocus(false);
              }}
            />
          ) : (
            <TextInput
              placeholder="Tên công việc"
              value={newData.name}
              onChangeText={txt => {
                if (error) {
                  setError(false);
                }
                setNewData({...newData, name: txt});
              }}
              onFocus={() => {
                setFocus(true);
              }}
              onBlur={() => {
                setFocus(false);
              }}
            />
          )}
        </View>
        <View style={[styles.inputWrap, styles.iosStyle]}>
          <Text style={styles.title}>Thời hạn</Text>
          <TouchableOpacity
            hitSlop={{top: 10, bottom: 10, left: 20, right: 10}}
            onPress={() => {
              setOpen(true);
            }}>
            <Text style={styles.subTitle}>
              {dayjs(newData.date).format('DD-MM-YYYY')}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={[styles.inputWrap, Platform.OS == 'ios' && styles.iosStyle]}>
          <Text style={styles.title}>Mức độ ưu tiên</Text>
          <RNPickerSelect
            useNativeAndroidPickerStyle
            placeholder={{
              label: 'Chọn mức độ',
              value: null,
            }}
            onValueChange={value => setNewData({...newData, priority: value})}
            items={[
              {label: 'Cao', value: 3},
              {label: 'Trung bình', value: 2},
              {label: 'Thấp', value: 1},
            ]}
            value={newData.priority}
          />
        </View>
        <TouchableOpacity style={styles.confirmBtn} onPress={handleAction}>
          <Text>Xong</Text>
        </TouchableOpacity>
      </>
      <DatePicker
        modal
        mode="date"
        open={open}
        date={newData.date}
        onConfirm={date => {
          setOpen(false);
          setNewData({...newData, date});
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  modalWrap: {
    backgroundColor: Colors.white,
    borderRadius: Radius.L,
    paddingHorizontal: Spacing.XL,
    paddingVertical: Spacing.XXL,
  },
  inputWrap: {
    borderBottomWidth: 1,
    borderColor: Colors.borderGrey,
    paddingBottom: Spacing.S,
    marginBottom: Spacing.XL,
  },
  title: {
    fontWeight: '500',
    fontSize: Size.size_16,
  },
  confirmBtn: {
    alignSelf: 'center',
    backgroundColor: Colors.green,
    marginTop: Spacing.S,
    paddingVertical: Spacing.S,
    paddingHorizontal: Spacing.XL,
    borderRadius: Radius.XL,
  },
  subTitle: {
    fontSize: Size.size_14,
    fontWeight: '400',
  },
  deleteBtn: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  iosStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default InitTask;
