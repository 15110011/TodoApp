import {createSlice} from '@reduxjs/toolkit';
import {ITask, ITaskState} from '../../types/task';

const initialState: ITaskState = {
  todoList: [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const {name, priority, date} = action.payload;
      const newTodo: ITask = {
        id: Date.now(),
        name,
        priority,
        date,
        isEditing: false,
        isCompleted: false,
      };
      state.todoList.push(newTodo);
    },
    completeTodo: (state, action) => {
      const todo = state.todoList.find(
        (item: ITask) => item.id === action.payload,
      );
      if (todo) {
        todo.isCompleted = !todo.isCompleted;
      }
    },
    editTodo: (state, action) => {
      const todo = state.todoList.find((el: ITask) => el.id === action.payload);
      if (todo) {
        todo.isEditing = !todo.isEditing;
      }
    },
    updateTodo: (state, action) => {
      const data = action.payload;
      const todo = state.todoList.find(item => item.id == data.id);
      if (todo) {
        Object.assign(todo, {...data, isEditing: false});
      }
    },
    deleteTodo: (state, action) => {
      const index = state.todoList.findIndex(
        todo => todo.id === action.payload,
      );
      if (index !== -1) {
        state.todoList.splice(index, 1);
      }
    },
  },
});
export const {addTodo, completeTodo, editTodo, deleteTodo, updateTodo} =
  todoSlice.actions;

export default todoSlice.reducer;
