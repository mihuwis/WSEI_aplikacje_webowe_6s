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
    return <div>Ładowanie projektów...</div>;
  }

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  return (
    <div>
      <h1>Projekty</h1>

      {projects.length === 0 ? (
        <p>Brak projektów w bazie.</p>
      ) : (
        <ul>
          {projects.map((project) => (
            <li key={project.id}>
              <Link to={`/projects/${project.id}/board`}>{project.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
