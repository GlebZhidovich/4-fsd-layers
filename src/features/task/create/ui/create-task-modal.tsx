import { UiModal } from "@/shared/ui/ui-modal";
import { UiButton } from "@/shared/ui/ui-button";
import { Controller, useForm } from "react-hook-form";
import { UiTextField } from "@/shared/ui/ui-text-field";
import { useCreateTask } from "../model/use-create-task";
import { CreateTaskData } from "@/entities/task";
import { BoardMultiSelect } from "@/entities/board";
import { useSession } from "@/entities/session";

type CreateTaskModalProps = {
  onClose: () => void;
};

export function CreateTaskModal({ onClose }: CreateTaskModalProps) {
  const session = useSession((s) => s.currentSession);
  const { control, handleSubmit } = useForm<CreateTaskData>({
    defaultValues: {
      name: "",
      description: "",
      boardsIds: [],
    },
  });

  const { createTask } = useCreateTask();

  const onSubmit = handleSubmit((data) => createTask(data, onClose));

  return (
    <UiModal isOpen onClose={onClose} width="md">
      <form onSubmit={onSubmit}>
        <UiModal.Header>
          <h1>Создание задачи</h1>
        </UiModal.Header>
        <UiModal.Body className="flex flex-col gap-4">
          Задача
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
          {session?.userId && (
            <Controller
              control={control}
              name="boardsIds"
              render={({ field: { value, onChange }, fieldState }) => (
                <BoardMultiSelect
                  label="Выберете редакторов"
                  boardIds={value}
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
            Создать
          </UiButton>
        </UiModal.Footer>
      </form>
    </UiModal>
  );
}
