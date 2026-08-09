import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { tasksService } from "../services/tasks.services";
import { storyService } from "../../stories/services/stories.service";
import { projectService } from "../../projects/services/project.service";
import type { Task } from "../types/task.types";
import type { Story } from "../../stories/types/story.types";


export function AddTaskPage() {
  const { projectId } = useParams();
  const [projectName, setProjectName] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low");
  const [estimatedHours, setEstimatedHours] = useState<number>(0);
  const [status, setStatus] = useState<"todo" | "inprogress" | "done">("todo");
  const [storyList, setStoryList] = useState<Story[]>([]);
  const [storyId, setStoryId] = useState<string>("");
  const [assignedUserId, setAssignedUserId] = useState<string>("");

  useEffect(() => {
    // Fetch any necessary data for the form, such as stories or users, if needed
    const fetchData = async () => {
    const storyList = await storyService.getByProjectId(projectId as string);
    const nameOfProject = await projectService.getById(projectId as string);
    setStoryList(storyList);
    setProjectName(nameOfProject?.name || "Nieznany projekt");
    }

    if (!projectId) { return; }
    else { fetchData(); }
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium uppercase tracking-wide text-slate-500">Dodaj zadanie</p>
        <h1 className="text-3xl font-semibold py-3 tracking-tight text-slate-950">Nowe zadanie</h1>
        <p className="text-sm font-medium py-3 uppercase tracking-wide text-slate-500">Utwórz zadanie dla projektu: {projectName}</p>
      </div>
      <div>
        <form className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium leading-6 text-slate-950">Tytuł</label>
            <div className="mt-2">
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-slate-950 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}