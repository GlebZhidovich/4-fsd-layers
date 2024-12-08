import { BoardList } from "@/entities/board/ui/board-list";
import { useTasks } from "@/entities/task";
import { ROUTER_PATHS } from "@/shared/constants/routes";
import { generatePath } from "react-router-dom";

const boardUrl = (boardId: string) =>
  generatePath(ROUTER_PATHS.HOME + ROUTER_PATHS.BOARD, { boardId });

export function TasksList({ className }: { className?: string }) {
  const { tasks } = useTasks();

  return (
    <div className={className}>
      <h2 className="text-lg mb-2 font-semibold">Все доски</h2>
      <table className="w-full">
        <thead>
          <tr>
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
                <span className="text-xl">{task.name}</span>
              </td>
              <td className="p-2">
                <span className="text-xl">{task.description}</span>
              </td>
              <td className="p-2">
                <BoardList boardsIds={task.boardsIds} />
              </td>
              <td className="p-2"></td>

              {/* <td className="p-2">
                <div className="flex gap-2 ml-auto">
                  <UpdateBoardButton boardId={board.id} />
                  <RemoveBoardButton boardId={board.id} />
                </div>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}