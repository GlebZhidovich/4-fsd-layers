import { CreateTaskButton } from "@/features/task/create";
import { UiCetnerContentLayout } from "@/shared/ui/layouts/ui-center-content-layout";

export function TasksPage() {
  return (
    <UiCetnerContentLayout className="py-10">
      <h1 className="text-3xl ">Задачи</h1>
      <div className="flex gap-2 mt-10">
        <CreateTaskButton />
      </div>
    </UiCetnerContentLayout>
  );
}
