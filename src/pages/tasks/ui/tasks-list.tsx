import { BoardList } from "@/entities/board/ui/board-list";
import { useTasks } from "@/entities/task";
import { UserPreview, useUsers } from "@/entities/user";
import { RemoveTaskButton } from "@/features/task/remove";
import { UpdateTaskButton } from "@/features/task/update";

export function TasksList({ className }: { className?: string }) {
  const { tasks } = useTasks();
  const users = useUsers((s) => s.usersMap());

  return (
    <div className={className}>
      <h2 className="text-lg mb-2 font-semibold">Все доски</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-start">Автор:</th>
            <th className="text-start">Название:</th>
            <th className="text-start">Описание:</th>
            <th className="text-start">Доски:</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="px-5 py-2 border-b border-b-slate-3 ">
              <td className="p-2">
                <UserPreview size="md" {...users[task.userId]} />
              </td>
              <td className="p-2">
                <span className="text-xl">{task.name}</span>
              </td>
              <td className="p-2">
                <span className="text-xl">{task.description}</span>
              </td>
              <td className="p-2">
                <BoardList boardsIds={task.boardsIds} />
              </td>
              <td className="p-2"></td>

              <td className="p-2">
                <div className="flex gap-2 ml-auto">
                  <UpdateTaskButton taskId={task.id} />
                  <RemoveTaskButton taskId={task.id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
