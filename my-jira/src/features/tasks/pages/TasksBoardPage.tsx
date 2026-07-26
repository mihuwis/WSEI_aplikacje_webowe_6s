import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { tasksService } from "../services/tasks.services";
import type { Task } from "../types/task.types";

const boardColumns: Array<{ status: Task["status"]; label: string }> = [
  { status: "todo", label: "TO DO" },
  { status: "doing", label: "DOING" },
  { status: "done", label: "DONE" },
];

export function TasksBoardPage() {
  const { projectId } = useParams();
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId) {
      setIsLoading(false);
      return;
    }

    let ignoreResult = false;

    const loadTasks = async () => {
      try {
        const loadedTasks = await tasksService.getByProjectId(projectId);

        if (!ignoreResult) {
          setTaskList(loadedTasks);
        }
      } catch {
        if (!ignoreResult) {
          setErrorMessage("Nie udało się pobrać zadań projektu.");
        }
      } finally {
        if (!ignoreResult) {
          setIsLoading(false);
        }
      }
    };

    void loadTasks();

    return () => {
      ignoreResult = true;
    };
  }, [projectId]);

  if (!projectId) {
    return <div>Brakuje ID projektu w adresie.</div>;
  }

  if (isLoading) {
    return <div>Ładowanie tablicy...</div>;
  }

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  return (
    <div>
      <h1>Tablica projektu: {projectId}</h1>

      {boardColumns.map((column) => {
        const tasksInColumn = taskList.filter((task) => task.status === column.status);

        return (
          <section key={column.status}>
            <h2>{column.label}</h2>
            {tasksInColumn.length === 0 ? (
              <p>Brak zadań.</p>
            ) : (
              <ul>
                {tasksInColumn.map((task) => (
                  <li key={task.id}>
                    <Link to={`/projects/${projectId}/stories/${task.storyId}/tasks/${task.id}`}>
                      {task.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        );
      })}
    </div>
  );
}
