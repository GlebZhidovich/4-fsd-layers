import { useGetConfirmation } from "@/shared/lib/confirmation";
import { useCanRemoveTask } from "./use-can-remove-task";
import { useTasks } from "@/entities/task";

export function useRemoveTask(taskId: string) {
  const canRemove = useCanRemoveTask(taskId);
  const getConfirmation = useGetConfirmation();
  const removeTaskFn = useTasks((s) => s.removeTask);

  const removeTask = async () => {
    if (!canRemove) {
      return;
    }
    const confirmation = await getConfirmation({
      description:
        "Вы действительно хотите передать доску другому пользователю?",
    });

    if (!confirmation) {
      return;
    }

    await removeTaskFn(taskId);
  };

  return { removeTask };
}
