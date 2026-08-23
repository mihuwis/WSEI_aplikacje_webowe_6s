import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Status, Story } from "../../stories/types/story.types";
import type { Task } from "../../tasks/types/task.types"
import { projectService } from "../../projects/services/project.service";
import { storyService } from "../../stories/services/stories.service";
import { tasksService } from "../../tasks/services/tasks.services";

const STORY_COLUMNS: Array<{
    status: Status;
    title: string;
}> = [
    {status: "todo", title: "TO DO"},
    {status: "doing", title: "DOING"},
    {status: "done", title: "DONE"},
];

export function StoryBoardPage() {
    const { projectId } = useParams();
    const [stories, setStory] = useState<Story[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [projectName, setProjectName] = useState<string>("");
    const [selectedStory, setSelectedStory] = useState<Story>();

    useEffect(() => {
        const fetchStories = async () => {
            const storiesData = await storyService.getByProjectId(projectId as string);
            const tasksData = await tasksService.getByProjectId(projectId as string);
            const nameOfProject = await projectService.getById(projectId as string);
            setStory(storiesData);
            setTasks(tasksData);
            setProjectName(nameOfProject?.name || "Nieznany projekt" );
        };
        if (!projectId) { return; }
        else { fetchStories(); }
    }, [projectId]);

    
    return (
        <div className="space-y-7">
            <header>
                <p className="text-xl font-medium uppercase tracking-wide text-slate-500">Tablica Story dla projektu: </p>
                <h1 className="text-3xl font-semibold tracking-tight text-slate-950">{projectName}</h1>
            </header>
            <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
                <div className="grid gap-4 lg:grid-cols-3">
                    {STORY_COLUMNS.map((column) => {
                        const storiesInColumn = stories.filter(
                            (story) => story.status === column.status
                        );
                        return (
                            <section
                                key={column.status}
                                className="min-h-96 rounded-lg border border-slate-200 bg-slate-50 p-4">
                                <h2 className="mb-4 text-sm font-semibold uppercase text-slate-500">Story status:  {column.status} </h2>
                                <ul className="space-y-3">
                                    {storiesInColumn.map((story) =>(
                                        <li 
                                            key={story.id}
                                            className="rounded-md border border-slate-200 bg-white p-3 shadow-sm">
                                            <button
                                                className="block w-full text-left text-sm font-semibold text-slate-950 hover:text-blue-600"
                                                onClick={()=> setSelectedStory(story)}>
                                                {story.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )
                    })}
                </div>
                <aside className="min-h-96 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                    {selectedStory ? (
                        <div className="space-y-3">
                            <p className="text-sm font-medium uppercase tracking-wide text-slate-500">Lista tasków do podjęcia</p>
                            <ul>
                                {tasks
                                    .filter(t => 
                                        t.storyId === selectedStory.id &&
                                        t.status === 'todo'
                                    )
                                    .map(t=>(
                                    <li 
                                        key={t.id}
                                        className="rounded-md border border-slate-200 bg-white p-3 shadow-sm">
                                            <Link className=""
                                                to={`/projects/${projectId}/tasks/${t.id}`}>
                                                    {t.title}
                                                </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ): (
                    <div className="flex min-h-80 items-center justify-center text-center">
              <div>
                <p className="text-lg font-semibold text-slate-800">Wybierz historyjkę</p>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Kliknij kartę na tablicy, żeby zobaczyć jej szczegóły.
                </p>
              </div>
            </div>
                    )}
                </aside>
            </div>
            
        </div>
    )
}