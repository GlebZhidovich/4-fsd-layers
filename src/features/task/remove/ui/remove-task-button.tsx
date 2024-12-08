import { RemoveIcon } from "@/shared/ui/ui-icons";
import { useCanRemoveTask } from "../model/use-can-remove-task";
import { useRemoveTask } from "../model/use-remove-task";

export function RemoveTaskButton({
  taskId,
}: {
  className?: string;
  taskId: string;
}) {
  const canRemove = useCanRemoveTask(taskId);
  const { removeTask } = useRemoveTask(taskId);

  if (!canRemove) {
    return null;
  }

  return (
    <button onClick={removeTask}>
      <RemoveIcon className="w-8 h-8 text-rose-500" />
    </button>
  );
}
