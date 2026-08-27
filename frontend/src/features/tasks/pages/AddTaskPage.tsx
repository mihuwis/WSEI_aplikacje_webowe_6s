import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { tasksService } from "../services/tasks.services";
import { storyService } from "../../stories/services/stories.service";
import { projectService } from "../../projects/services/project.service";
import type { Story } from "../../stories/types/story.types";

export function AddTaskPage() {
  const { projectId } = useParams();
  const [projectName, setProjectName] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low");
  const [estimatedHours, setEstimatedHours] = useState<number>(0);
  const [storyList, setStoryList] = useState<Story[]>([]);
  const [storyId, setStoryId] = useState<string>("");
  const navigate = useNavigate();

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
  }, [projectId]);

  const handleSubmit =  async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
      if (!storyId) {
    return;
  }
  const result = await tasksService.createForStory(storyId as string, {
      title,
      description,
      priority,
      estimatedHours
    });

    if (result.success) {
      navigate(`/projects/${projectId}/board`);
    } else {
      // sprawdz dlaczego nei mozna stworzyć. zostać na tablicy add task i wyświetlić komunikat o błędzie
      
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium uppercase tracking-wide text-slate-500">Dodaj zadanie</p>
        <h1 className="text-3xl font-semibold py-3 tracking-tight text-slate-950">Nowe zadanie</h1>
        <p className="text-sm font-medium py-3 uppercase tracking-wide text-slate-500">Utwórz zadanie dla projektu: {projectName}</p>
      </div>
      <div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title" className="block text-sm font-medium leading-6 text-slate-950">Tytuł</label>
            <div className="mt-2">
              <input
                type="text" id="title" value={title} required
                onChange={(e) => setTitle(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-slate-950 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600"
              />
            </div>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium leading-6 text-slate-950">Opis</label>
            <div className="mt-2">
              <input
                type="text" id="description" value={description} required
                onChange={(e) => setDescription(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-slate-950 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600"
              />
            </div>
          </div>
          <div>
            <label htmlFor="priority" className="block text-sm font-medium leading-6 text-slate-950">Priorytet</label>
            <div className="mt-2">
              <select
                id="priority" value={priority} required
                onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}
                className="block w-full rounded-md border-0 py-1.5 text-slate-950 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600"
              >
                <option value="low">Niska</option>
                <option value="medium">Średnia</option>
                <option value="high">Wysoka</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="estimatedHours" className="block text-sm font-medium leading-6 text-slate-950">Estymowany czas (godziny)</label>
            <div className="mt-2">
              <input
                type="number" min={0.5} step={0.5} id="estimatedHours" value={estimatedHours} required
                onChange={(e) => setEstimatedHours(Number(e.target.value))}
                className="block w-full rounded-md border-0 py-1.5 text-slate-950 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600"
              />
            </div>
          </div>
          <div>
            <label htmlFor="storyId" className="block text-sm font-medium leading-6 text-slate-950">Story</label>
            <div className="mt-2">
              <select
                id="storyId" value={storyId} required
                onChange={(e) => setStoryId(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-slate-950 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600"
              >
                <option value="">Wybierz historię</option>
                {storyList.map((story) => (
                  <option key={story.id} value={story.id}>
                    {story.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div >
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" 
            >
              Dodaj zadanie
            </button>
            <button
              type="button"
              onClick={() => navigate(`/projects/${projectId}/board`)}
              className="ml-3 rounded-md bg-slate-200 px-3 py-2 text-sm font-semibold text-slate-950 shadow-sm hover:bg-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
            >
              Anuluj
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}