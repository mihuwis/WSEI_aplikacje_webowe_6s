import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Task } from "../types/task.types";
import { projectService } from "../../projects/services/project.service";
import { tasksService } from "../services/tasks.services";

export function TasksBoardPage() {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projectName, setProjectName] = useState<string>("");
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();

  useEffect(() => {
    const fetchTasks = async () => {
      const tasksData = await tasksService.getByProjectId(projectId as string);
      const nameOfProject = await projectService.getById(projectId as string);
      setProjectName(nameOfProject?.name || "Nieznany projekt" );
      setTasks(tasksData);
    };
    if (!projectId) { return; }
    else { fetchTasks(); }
  }, [projectId]);



  return (
    <div>
      <h1>Tablica projektu: {projectName}</h1>
      <section>TO DO
        <ul>
          { tasks.filter(task => task.status === "todo").map(task => (
            <li key={task.id}>
              <button onClick={() => setSelectedTask(task)}> {task.title}</button>
              <p>{task.description}</p>
            </li>
          ))}
        </ul>
      </section>
      <section>DOING
                <ul>
          { tasks.filter(task => task.status === "doing").map(task => (
            <li key={task.id}>
              <Link to={`/projects/${projectId}/tasks/${task.id}`}>{task.title}</Link>
              <p>{task.description}</p>
            </li>
          ))}
        </ul>
      </section>
      <section>DONE
                <ul>
          { tasks.filter(task => task.status === "done").map(task => (
            <li key={task.id}>
              <Link to={`/projects/${projectId}/tasks/${task.id}`}>{task.title}</Link>
              <p>{task.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        {selectedTask &&(
          <div className="task-window">
          <Link to={`/projects/${projectId}/tasks/${selectedTask.id}`}>{selectedTask.title}</Link>
            <div>{selectedTask.description}</div>
            <div>{selectedTask.status}</div>
            <div>{selectedTask.estimatedHours}</div>
            <div>{selectedTask.workedHours}</div>

          </div>
        )}
      </section>
    </div>
  );
}
