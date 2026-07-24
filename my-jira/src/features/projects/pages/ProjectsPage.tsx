import { ProjectDetailsPage } from "./ProjectDetailsPage";

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
                {demoProjects.map((project, index) => (
                    <li key={index}><a href={project.id}> {project.name}</a></li>
                ))}
            </ul>
    </div>
)}