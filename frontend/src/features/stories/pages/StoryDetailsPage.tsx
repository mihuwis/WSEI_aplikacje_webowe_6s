import { storyService } from "../services/stories.service"
import { Link, useParams, generatePath, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Story } from "../types/story.types";
import { ROUTES } from "../../../app/routes/routes.constants";

export function StoryDetailsPage(){
    const { projectId, storyId } = useParams();
    const [ story, setStory ] = useState<Story | null>(null)
    const [ errorMessage, setErrorMessage ] = useState<string | null>(null);
    const [ isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [ isDeleting, setIsDeleting] = useState(false);
    const [ deleteErrorMessage, setDeleteErrorMessage ] = useState<string | null>(null);

    useEffect(()=> {
        if(!projectId){
            setErrorMessage("Brak projektu!");
            setIsLoading(false);
            return
        }

        if(!storyId){
            setErrorMessage("Brak projektu!");
            setIsLoading(false);
            return
        }
        
        let ignoreResult = false;
        setIsLoading(true);
        setErrorMessage(null);
        setStory(null);

        const loadStory = async ()=> {
            try{
                const loadedStory = await storyService.getById(storyId);
                if (ignoreResult){
                    return
                }
                if(loadedStory === undefined) {
                    setErrorMessage('Nie znaleziono projektu')
                    return
                }

                if (loadedStory.projectId !== projectId) {
                    setErrorMessage("Nie ma historyjki w tym projekcie.");
                    return;
                }
                setStory(loadedStory)

            } catch(error: unknown){
                if(!ignoreResult){
                    console.error(error);
                    setErrorMessage("Nie udało się pobrać historyjki");
                }
            } finally {
                if(!ignoreResult){
                    setIsLoading(false);
                }
            }
        }

        void loadStory();

    }, [storyId, projectId])


if(isLoading){
    return <p>Ładujemy historyjke</p>
}

if(errorMessage){
    return <p role="alert">{errorMessage}</p>
}

if (!story){
    return <p>„Brak danych historyjki</p>
}


const handleDelete = async() => {
        const confirmed = window.confirm("Wywalamy historyjkę?");

        if (!confirmed) {
            return;
        }

                try {
                    setIsDeleting(true);
                    setDeleteErrorMessage(null);
        
                    await storyService.deleteById(story.id);
                    navigate(
                        generatePath(ROUTES.storyBoard,{
                            projectId: story.projectId
                        }), {replace: true});
        
                } catch (error: unknown){
                    console.error(error);
                    setDeleteErrorMessage(
                        "Nie udało się usunąć historyjki.",
                    );
                } finally {
                    setIsDeleting(false);
                }

}

    return (
        <div className="space-y-12">
            <Link
                className="text-sm font-medium text-blue-600 hover:text-green-900" 
                    to={generatePath(ROUTES.storyBoard, {
                        projectId: story.projectId,
                    })}>
                &larr; Wróc do Historyjek
            </Link>



        </div>

    )

}
