import { useBoards } from "../model/boards.store";

type BoardListProps = {
  boardsIds: string[];
};

export function BoardList({ boardsIds }: BoardListProps) {
  const boards = useBoards((s) => new Map(s.boards.map((b) => [b.id, b.name])));

  return (
    <ul className="text-m">
      {boardsIds.map((boardId) => (
        <li key={boardId}>{boards.get(boardId)}</li>
      ))}
    </ul>
  );
}
