import React, {useCallback, useMemo, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import Button from '../components/Button';
import {Icons} from '../utils/Icons';
import {Colors, Radius, Size, Spacing} from '../themes/themes';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ITask} from '../types/task';
import TaskItem from '../components/TaskItem';
import Modal from 'react-native-modal';
import {useSelector, useDispatch} from 'react-redux';
import {
  addTodo,
  completeTodo,
  deleteTodo,
  editTodo,
  updateTodo,
} from '../redux/reducers/todoReducer';
import {RootState} from '../redux/store';
import InitTask from '../components/InitTask';

const Home = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [task, setTask] = useState<ITask>({
    id: Date.now(),
    name: '',
    priority: 3,
    date: new Date(),
    isEditing: false,
    isCompleted: false,
  });
  const insets = useSafeAreaInsets();
  const todoList = useSelector((state: RootState) => state.todoList);
  const dispatch = useDispatch();

  const data = useMemo(() => {
    let newData = [...todoList];
    return newData.sort((a: ITask, b: ITask) => b.priority - a.priority);
  }, [todoList]);

  const onChangeText = useCallback(
    (text: string) => {
      setTask({...task, name: text});
    },
    [task],
  );

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleUpdate = useCallback(
    (newData: ITask) => {
      dispatch(updateTodo(newData));
    },
    [dispatch],
  );

  const handleConfirm = useCallback(
    (newData: ITask) => {
      if (!newData.name) {
        setModalVisible(false);
        return;
      }

      setModalVisible(false);
      dispatch(addTodo(newData));
      setTask({
        id: Date.now(),
        name: '',
        priority: 3,
        date: new Date(),
        isEditing: false,
        isCompleted: false,
      });
    },
    [dispatch],
  );

  const handleEdit = useCallback(
    (id: number) => {
      dispatch(editTodo(id));
    },
    [dispatch],
  );

  const handleDelete = useCallback(
    (id: number) => {
      dispatch(deleteTodo(id));
    },
    [dispatch],
  );

  const handleComplete = useCallback(
    (id: number) => {
      dispatch(completeTodo(id));
    },
    [dispatch],
  );

  const renderItem = useCallback(
    ({item, index}: {item: ITask; index: number}) => {
      return (
        <TaskItem
          item={item}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleConfirm={handleConfirm}
          onChangeText={onChangeText}
          handleUpdate={handleUpdate}
          setTask={setTask}
          handleComplete={handleComplete}
        />
      );
    },
    [
      handleConfirm,
      handleDelete,
      onChangeText,
      handleEdit,
      handleUpdate,
      handleComplete,
    ],
  );

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>To-do list</Text>
        <FlatList
          style={styles.list}
          showsVerticalScrollIndicator={false}
          data={data}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${index}`}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          removeClippedSubviews
        />
      </ScrollView>
      <View style={styles.btnWrap}>
        <Button
          title="Tạo task mới"
          icon={Icons.plus}
          iconSize={Size.size_12}
          iconColor={Colors.white}
          onPress={handleOpenModal}
        />
      </View>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}>
        <InitTask
          task={task}
          handleConfirm={handleConfirm}
          onChangeText={onChangeText}
          setTask={setTask}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.yellow,
    padding: Spacing.L,
  },
  header: {
    fontWeight: '500',
    fontSize: Size.size_16,
    color: Colors.white,
    textAlign: 'center',
    paddingTop: Spacing.M,
  },
  btnWrap: {
    paddingHorizontal: Spacing.L,
    paddingVertical: Spacing.L,
  },
  title: {
    fontWeight: '500',
    fontSize: Size.size_16,
  },
  confirmBtn: {
    alignSelf: 'center',
    backgroundColor: Colors.green,
    marginTop: Spacing.XXL,
    paddingVertical: Spacing.S,
    paddingHorizontal: Spacing.XL,
    borderRadius: Radius.XL,
  },
  inputWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: Colors.borderGrey,
    paddingBottom: Spacing.S,
    marginTop: Spacing.XL,
  },
  subTitle: {
    fontSize: Size.size_14,
    fontWeight: '400',
  },
  modalWrap: {
    backgroundColor: Colors.white,
    padding: Spacing.M,
    borderRadius: Radius.M,
  },
  list: {
    marginTop: Spacing.XXL,
  },
});

export default Home;
