export type Task = {
  id: string;
  userId: string;
  boardId: string;
  name: string;
  description: string;
};

export type CreateTaskData = Omit<Task, "id">;

export type UpdateTaskData = Partial<CreateTaskData>;
