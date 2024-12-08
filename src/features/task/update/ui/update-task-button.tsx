import { UpdateIcon } from "@/shared/ui/ui-icons";
import { useState } from "react";
import { useCanUpdateTask } from "../model/use-can-update-task";
import { UpdateTaskModal } from "./update-task-modal";

export function UpdateTaskButton({ taskId }: { taskId: string }) {
  const canUpdate = useCanUpdateTask(taskId);
  const [open, setOpen] = useState(false);

  if (!canUpdate) {
    return null;
  }

  return (
    <>
      <button onClick={() => setOpen(true)}>
        <UpdateIcon className="w-8 h-8 text-teal-600" />
      </button>
      {open && (
        <UpdateTaskModal taskId={taskId} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
