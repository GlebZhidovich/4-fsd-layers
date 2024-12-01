import { CreateTaskData, useTasks } from "@/entities/task";
import { useCanCreateTask } from "./use-can-create-task";
import { useSession } from "@/entities/session";

export function useCreateTask() {
  const session = useSession((s) => s.currentSession);
  const canCreate = useCanCreateTask();
  const createTaskRow = useTasks((s) => s.createTask);

  const createTask = async (data: CreateTaskData, onCreate: () => void) => {
    if (!canCreate || !session?.userId) return;

    await createTaskRow({ ...data, userId: session.userId });

    onCreate();
  };

  return { createTask };
}
