import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Task } from "../types/task.types";
import type { Story } from "../../stories/types/story.types";
import { projectService } from "../../projects/services/project.service";
import { tasksService } from "../services/tasks.services";
import { storyService } from "../../stories/services/stories.service";

export function TasksBoardPage() {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stories, setStory] = useState<Story[]>([]);
  const [projectName, setProjectName] = useState<string>("");
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();

  useEffect(() => {
    const fetchTasks = async () => {
      const tasksData = await tasksService.getByProjectId(projectId as string);
      const nameOfProject = await projectService.getById(projectId as string);
      const storiesData = await storyService.getByProjectId(projectId as string);
      setStory(storiesData);
      setProjectName(nameOfProject?.name || "Nieznany projekt" );
      setTasks(tasksData);
    };
    if (!projectId) { return; }
    else { fetchTasks(); }
  }, [projectId]);

  const getStoryNameByID = (storyId: string) => {
    const storyToFind = stories.find(story => story.id === storyId);
    return storyToFind ? storyToFind.name : "Nieznana historia";
  }


  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium uppercase tracking-wide text-slate-500">Tablica projektu</p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950">{projectName}</h1>
        <Link className="mt-1 block text-xl font-semibold leading-7 text-slate-950 hover:text-blue-600"
                  to={`/projects/${projectId}/tasks/new`}
                >Add Task
        </Link>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="grid gap-4 lg:grid-cols-3">
          <section className="min-h-96 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">TO DO</h2>
              <ul className="space-y-3">
                { tasks.filter(task => task.status === "todo").map(task => (
                  <li className="rounded-md border border-slate-200 bg-white p-3 shadow-sm" key={task.id}>
                    <button
                      className="block w-full text-left text-sm font-semibold text-slate-950 hover:text-blue-600"
                      onClick={() => setSelectedTask(task)}
                    >
                      {task.title}
                    </button>
                    <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-600">{task.description}</p>
                    <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                      <span className="rounded-full bg-amber-100 px-2 py-1 font-medium text-amber-700">{task.priority}</span>
                      <span className="rounded-full bg-slate-100 px-2 py-1 font-medium text-slate-700">{getStoryNameByID(task.storyId)}</span>
                      <span>{task.estimatedHours ?? "-"}h</span>
                    </div>
                  </li>
                ))}
              </ul>
          </section>

          <section className="min-h-96 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">DOING</h2>
              <ul className="space-y-3">
                { tasks.filter(task => task.status === "doing").map(task => (
                <li className="rounded-md border border-slate-200 bg-white p-3 shadow-sm" key={task.id}>
                    <button
                      className="block w-full text-left text-sm font-semibold text-slate-950 hover:text-blue-600"
                      onClick={() => setSelectedTask(task)}
                    >
                      {task.title}
                    </button>
                    <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-600">{task.description}</p>
                    <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                      <span className="rounded-full bg-blue-100 px-2 py-1 font-medium text-blue-700">{task.priority}</span>
                      <span className="rounded-full bg-slate-100 px-2 py-1 font-medium text-slate-700">{getStoryNameByID(task.storyId)}</span>
                      <span>{task.estimatedHours ?? "-"}h</span>
                    </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="min-h-96 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">DONE</h2>
                    <ul className="space-y-3">
              { tasks.filter(task => task.status === "done").map(task => (
                <li className="rounded-md border border-slate-200 bg-white p-3 shadow-sm" key={task.id}>
                  <button
                    className="block w-full text-left text-sm font-semibold text-slate-950 hover:text-blue-600"
                    onClick={() => setSelectedTask(task)}
                  >
                    {task.title}
                  </button>
                  <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-600">{task.description}</p>
                  <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                    <span className="rounded-full bg-emerald-100 px-2 py-1 font-medium text-emerald-700">{task.priority}</span>
                    <span className="rounded-full bg-slate-100 px-2 py-1 font-medium text-slate-700">{getStoryNameByID(task.storyId)}</span>
                    <span>{task.workedHours ?? 0}h done</span>
                  </div>
                </li>
              ))}
            </ul>
        </section>
        </div>

        <aside className="min-h-96 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          {selectedTask ? (
            <div className="space-y-5">
              <div>
                <p className="text-sm font-medium uppercase tracking-wide text-slate-500">Wybrane zadanie</p>
                <Link
                  className="mt-1 block text-xl font-semibold leading-7 text-slate-950 hover:text-blue-600"
                  to={`/projects/${projectId}/tasks/${selectedTask.id}`}
                >
                  {selectedTask.title}
                </Link>
              </div>

              <p className="text-sm leading-6 text-slate-600">{selectedTask.description}</p>

              <dl className="grid gap-3 text-sm">
                <div className="flex justify-between border-t border-slate-100 pt-3">
                  <dt className="text-slate-500">Status</dt>
                  <dd className="font-medium text-slate-900">{selectedTask.status}</dd>
                </div>
                <div className="flex justify-between border-t border-slate-100 pt-3">
                  <dt className="text-slate-500">Priorytet</dt>
                  <dd className="font-medium text-slate-900">{selectedTask.priority}</dd>
                </div>
                <div className="flex justify-between border-t border-slate-100 pt-3">
                  <dt className="text-slate-500">Estymacja</dt>
                  <dd className="font-medium text-slate-900">{selectedTask.estimatedHours ?? "-"}h</dd>
                </div>
                <div className="flex justify-between border-t border-slate-100 pt-3">
                  <dt className="text-slate-500">Przepracowane</dt>
                  <dd className="font-medium text-slate-900">{selectedTask.workedHours ?? 0}h</dd>
                </div>
              </dl>
            </div>
          ) : (
            <div className="flex min-h-80 items-center justify-center text-center">
              <div>
                <p className="text-lg font-semibold text-slate-800">Wybierz zadanie</p>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Kliknij kartę na tablicy, żeby zobaczyć jej szczegóły.
                </p>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
