import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { tasksService } from "../services/tasks.services";
import type { Task } from "../types/task.types";

export function TaskDetailsPage() {

  const { taskId } = useParams();
  const [task, setTask] = useState<Task>({} as Task);


  useEffect(() => {
    const fetchTask = async () => {
            const taskData = await tasksService.getById(taskId as string);
            setTask(taskData as Task);
    };
    if (!taskId) { return; }
      else { fetchTask(); }
  }, [taskId]);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold tracking-tight text-slate-950">{task.title}</h2>
      <p className="text-sm text-slate-500">{task.description}</p>
      <div className="flex items-center gap-4">
        <span className="rounded-full bg-amber-100 px-2 py-1 font-medium text-amber-700">{task.priority}</span>
        <span>{task.estimatedHours ?? "-"}h</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="rounded-full bg-slate-100 px-2 py-1 font-medium text-slate-700">{task.status}</span>
        <span>Przypisany użytkownik: {task.assignedUserId ?? "Brak"}</span>
      </div>
      <Link to={`/projects/${task.projectId}/board`} className="text-blue-600 hover:underline">Powrót do tablicy zadań</Link>
    </div>
  );
}