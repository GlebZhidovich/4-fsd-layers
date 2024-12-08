import { Session, useSession } from "@/entities/session";
import { Task, useTasks } from "@/entities/task";

function canUpdateTask(task?: Task, session?: Session) {
  if (!task) {
    return false;
  }

  return task.userId === session?.userId;
}

export function useCanUpdateTask(taskId: string) {
  const session = useSession((s) => s.currentSession);
  const task = useTasks((s) => s.tasks.find((t) => t.id === taskId));

  return canUpdateTask(task, session);
}
