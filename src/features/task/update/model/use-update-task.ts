import { UpdateTaskData, useTasks } from "@/entities/task";

export function useUpdateTask(taskId: string) {
  const updateTaskFn = useTasks((s) => s.updateTask);

  const updateTask = async (data: UpdateTaskData, onClose?: () => void) => {
    await updateTaskFn(taskId, data);
    onClose?.();
  };

  return { updateTask };
}
