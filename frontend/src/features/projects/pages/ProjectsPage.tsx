import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { projectService } from "../services/project.service";
import type { Project } from "../types/project.types";

export function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let ignoreResult = false;

    const loadProjects = async () => {
      try {
        const loadedProjects = await projectService.getAll();

        if (!ignoreResult) {
          setProjects(loadedProjects);
        }
      } catch {
        if (!ignoreResult) {
          setErrorMessage("Nie udało się pobrać projektów.");
        }
      } finally {
        if (!ignoreResult) {
          setIsLoading(false);
        }
      }
    };

    void loadProjects();

    return () => {
      ignoreResult = true;
    };
  }, []);

  if (isLoading) {
    return <div className="rounded-lg border border-slate-200 bg-white p-6 text-slate-600">Ładowanie projektów...</div>;
  }

  if (errorMessage) {
    return <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-700">{errorMessage}</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium uppercase tracking-wide text-slate-500">Workspace</p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950">Projekty</h1>
      </div>

      {projects.length === 0 ? (
        <p className="rounded-lg border border-slate-200 bg-white p-6 text-slate-600">Brak projektów w bazie.</p>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <li key={project.id}>
              <Link
                className="block min-h-36 rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
                to={`/projects/${project.id}/stories`}
              >
                <h2 className="text-lg font-semibold text-slate-950">{project.name}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{project.description}</p>
                <p className="mt-5 text-sm font-medium text-blue-600">Otwórz tablicę</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
