import { BoardMultiSelect } from "@/entities/board";
import { useSession } from "@/entities/session";
import { UpdateTaskData, useTasks } from "@/entities/task";
import { UiButton } from "@/shared/ui/ui-button";
import { UiModal } from "@/shared/ui/ui-modal";
import { UiTextField } from "@/shared/ui/ui-text-field";
import { Controller, useForm } from "react-hook-form";
import { useUpdateTask } from "../model/use-update-task";

export function UpdateTaskModal({
  onClose,
  taskId,
}: {
  onClose: () => void;
  taskId: string;
}) {
  const task = useTasks((s) => s.getTaskById(taskId));
  const session = useSession((s) => s.currentSession);

  const { control, handleSubmit } = useForm<UpdateTaskData>({
    defaultValues: task,
  });

  const { updateTask } = useUpdateTask(taskId);

  const onSubmit = handleSubmit((data) => updateTask(data, onClose));

  return (
    <UiModal isOpen onClose={onClose} width="md">
      <form onSubmit={onSubmit}>
        <UiModal.Header>
          <h1>Редактирование задачи</h1>
        </UiModal.Header>
        <UiModal.Body className="flex flex-col gap-4">
          <Controller
            control={control}
            name="name"
            rules={{ required: "Название задачи - обязательное поле" }}
            render={({ field, fieldState }) => (
              <UiTextField
                label="Название"
                inputProps={{ ...field }}
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="description"
            rules={{ required: "Описание задачи - обязательное поле" }}
            render={({ field, fieldState }) => (
              <UiTextField
                label="Описание"
                inputProps={{ ...field }}
                error={fieldState.error?.message}
              />
            )}
          />
          {session && (
            <Controller
              control={control}
              name="boardsIds"
              render={({ field: { value, onChange }, fieldState }) => (
                <BoardMultiSelect
                  label="Доски"
                  boardIds={value ?? []}
                  userId={session.userId}
                  onChangeBoardIds={onChange}
                  error={fieldState.error?.message}
                  className="w-full"
                />
              )}
            />
          )}
        </UiModal.Body>
        <UiModal.Footer>
          <UiButton type="button" variant="outlined" onClick={onClose}>
            Отмена
          </UiButton>
          <UiButton type="submit" variant="primary">
            Обновить
          </UiButton>
        </UiModal.Footer>
      </form>
    </UiModal>
  );
}
