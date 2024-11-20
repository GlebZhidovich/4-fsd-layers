import { UiModal } from "@/shared/ui/ui-modal";
import { UiButton } from "@/shared/ui/ui-button";
import { Controller, useForm } from "react-hook-form";
import { UiTextField } from "@/shared/ui/ui-text-field";
import { useCreateBoard } from "../model/use-create-board";

export function CreateTaskModal({ onClose }: { onClose: () => void }) {
  const { control, handleSubmit } = useForm<any>({
    defaultValues: {
      name: "",
      editorsIds: [],
    },
  });

  const { createBoard } = useCreateBoard();

  const onSubmit = handleSubmit((data) => createBoard(data, onClose));

  return (
    <UiModal isOpen onClose={onClose} width="md">
      <form onSubmit={onSubmit}>
        <UiModal.Header>
          <h1>Создание задачи</h1>
        </UiModal.Header>
        <UiModal.Body className="flex flex-col gap-4">
          Задача
          {/* <Controller
            control={control}
            name="name"
            rules={{ required: "Название доски - обязательное поле" }}
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
            name="editorsIds"
            render={({ field: { value, onChange }, fieldState }) => (
              <UserMultiSelect
                label="Выберете редакторов"
                userIds={value}
                onChangeUserIds={onChange}
                error={fieldState.error?.message}
                className="w-full"
              />
            )}
          /> */}
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
