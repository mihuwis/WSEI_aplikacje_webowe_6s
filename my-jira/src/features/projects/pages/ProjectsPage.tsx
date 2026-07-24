import { Link } from "react-router-dom";
import type { Project } from "../types/project.types";

const demoProjects: Project[] = [
  {
    id: "project-1",
    name: "Aplikacja CRM",
    description: "System do obsługi klientów",
  },
  {
    id: "project-2",
    name: "Panel e-commerce",
    description: "Zarządzanie produktami i zamówieniami",
  },
];

export function ProjectsPage(){
    return (<div> Project list 
            <ul>
                {demoProjects.map((project) => (
                    <li key={project.id}><Link to={`/projects/${project.id}/board`}> {project.name}</Link></li>
                ))}
            </ul>
    </div>
)}