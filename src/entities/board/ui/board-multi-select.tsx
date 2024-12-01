import { BoardPreview, useBoards, BoardPartial } from "@/entities/board";
import { UiMultipleSelect } from "@/shared/ui/ui-multiple-select";

export function BoardMultiSelect({
  userId,
  className,
  boardIds,
  onChangeBoardIds,
  label,
  error,
}: {
  userId: string;
  error?: string;
  className?: string;
  boardIds: string[];
  label?: string;
  onChangeBoardIds: (ids: string[]) => void;
}) {
  const boards = useBoards((s) => s.boards.filter((b) => b.ownerId === userId));
  const selectedBoards = boards.filter((b) => boardIds.includes(b.id));
  const onChangeBoards = (boards: BoardPartial[]) => {
    onChangeBoardIds(boards.map((b) => b.id));
  };

  return (
    <UiMultipleSelect
      error={error}
      className={className}
      label={label}
      options={boards}
      value={selectedBoards}
      onChange={onChangeBoards}
      getLabel={(board) => board.name}
      renderPreview={(boards) =>
        boards?.map((board) => (
          <BoardPreview className="shrink-0 px-1" size="sm" name={board.name} />
        ))
      }
      renderOption={(board) => <BoardPreview size="sm" name={board.name} />}
    />
  );
}
