import { projectService } from "../services/project.service";
import { Link, useParams, generatePath, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Project } from "../types/project.types";
import { ROUTES } from "../../../app/routes/routes.constants";


export function ProjectDetailsPage(){
    const { projectId } = useParams();
    const [ project, setProject ] = useState<Project | null>(null);
    const [ errorMessage, setErrorMessage ] = useState<string | null>(null);
    const [ isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [ isDeleting, setIsDeleting] = useState(false);
    const [ deleteErrorMessage, setDeleteErrorMessage ] = useState<string | null>(null);


    useEffect(()=>{

        if(!projectId){
            setErrorMessage("Brak projektu!");
            setIsLoading(false);
            return
        }

        let ignoreResult = false;
        setIsLoading(true);
        setErrorMessage(null);
        setProject(null);

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

    const handleDelete = async() => {
        const confirmed = window.confirm("Wywalamy?");

        if (!confirmed) {
        return;
        }

        try {
            setIsDeleting(true);
            setDeleteErrorMessage(null);

            await projectService.deleteById(project.id);
            navigate(ROUTES.projects, {replace: true});

        } catch (error: unknown){
            console.error(error);
            setDeleteErrorMessage(
                "Nie udało się usunąć projektu.",
            );
        } finally {
            setIsDeleting(false);
        }



        
    }

    return (
        <div className="space-y-12">
            <Link
                className="text-sm font-medium text-blue-600 hover:text-green-900" 
                to={ ROUTES.projects}>
                Wróc do Projektów
            </Link>

            <div>
                <h1>{project.name}</h1>
                <p>{project.description}</p>
                <Link
                    className="text-sm font-medium text-blue-600 hover:text-green-900"
                    to={generatePath(ROUTES.editProject, {
                        projectId: project.id,
                    })}
                >
                    Edytuj projekt
                </Link>
                <Link 
                    className="text-sm font-medium text-blue-600 hover:text-green-900" 
                    to={generatePath(ROUTES.storyBoard, {
                        projectId: project.id
                    })}>
                    Historyjki
              </Link>
            </div>
            <button
                type="button"
                disabled={isDeleting}
                onClick={() => void handleDelete()}
                className="cursor-pointer rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {isDeleting ? "Usuwanie..." : "Usuń projekt"}
            </button>

            {deleteErrorMessage && (<p role="alert" className="text-sm text-red-600" >{deleteErrorMessage}</p>)}



        </div>
)}
