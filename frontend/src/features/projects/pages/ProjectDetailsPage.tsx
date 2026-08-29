import { projectService } from "../services/project.service";
import { Link, useParams, generatePath } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Project } from "../types/project.types";
import { ROUTES } from "../../../app/routes/routes.constants";


export function ProjectDetailsPage(){
    const { projectId } = useParams();
    const [ project, setProject ] = useState<Project | null>(null);
    const [ errorMessage, setErrorMessage ] = useState<string | null>(null);
    const [ isLoading, setIsLoading] = useState(true);


    useEffect(()=>{

        if(!projectId){
            setErrorMessage("Brak projektu!");
            setIsLoading(false);
            return
        }

        let ignoreResult = false;

        const loadProject = async() => {
            try{
                const loadedProject = await projectService.getById(projectId);
                if (ignoreResult){
                    return
                }
                if(loadedProject === undefined) {
                    setErrorMessage('Nie znaleziono projektu')
                    return
                }
                setProject(loadedProject)
            } catch(e: unknown){
                if(!ignoreResult){
                    console.error(e);
                    setErrorMessage("Nie udało się pobrać projektu, to wywaliło z catch w project pages");
                }
            } finally{
                if(!ignoreResult){
                    setIsLoading(false);
                }
            } 
            
        }
        void loadProject();

        return ()=> {ignoreResult=true;}
    }, [projectId])

    if(isLoading){
        return <p>Ładujemy projekt</p>
    }

    if(errorMessage){
        return <p role="alert">{errorMessage}</p>
    }

    if (!project){
        return <p>„Brak danych projektu”</p>
    }

    return (
        <div>
            <Link
                className="text-sm font-medium text-blue-600 hover:text-green-900" 
                to={ ROUTES.projects}>
                Wróc do Projektów</Link>
            <div>
                <h1>{project.name}</h1>
                <p>{project.description}</p>
                <Link 
                    className="text-sm font-medium text-blue-600 hover:text-green-900" 
                    to={generatePath(ROUTES.storyBoard, {
                        projectId: project.id
                    })}>
                    Historyjki
              </Link>
            </div>

        </div>
)}