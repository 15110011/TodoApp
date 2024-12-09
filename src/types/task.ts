export interface ITask {
  id: number;
  name: string;
  priority: number;
  date: Date;
  isEditing: boolean;
  isCompleted: boolean;
}

export interface ITaskState {
  todoList: ITask[];
}
