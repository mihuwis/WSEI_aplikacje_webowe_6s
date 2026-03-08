import type { Project, CreateProjectDto, UpdateProjectDto } from "../types/project.types";
import { v4 as uuidv4 } from 'uuid'; // decyduje sie na uuid a nie na recznei dopisywane wymyślane pseudo randomowe stringi. chyba nie będzi epotrzebny util do generwoania tego tylko dam w projekice npm i uuid


const PROJECTS_STORAGE_KEY : string = "little-jira-projects";

const readFromLS  = () : Project[] => {
    const storedProjects = localStorage.getItem(PROJECTS_STORAGE_KEY);
    if(!storedProjects){
        return []
    } else {
        const parsedProjects : Project[] = JSON.parse(storedProjects);
        return parsedProjects ;
    }
    
}

const saveToLS = (listOfProjects : Project[]) : void => { 
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(listOfProjects))
}


// CRUD 

const getAll = () : Project[] =>{
    return readFromLS();
}

const getById = (id : string) : Project | undefined => { 
    const listOfProjects = readFromLS();
    const returnedProject = listOfProjects.find(o => o.id === id);

    return returnedProject;


}

const create = (data: CreateProjectDto) : Project => {
    
    // pobranie z LS calosci 
    const currentListOfProjects : Project[] = getAll();
    // Tworzenie nowego obiektu
    const newProject : Project = { id : uuidv4(), name: data.name, description: data.description}
    // dodanei do starej listy projektow
    currentListOfProjects.push(newProject);
    // save do LS
    saveToLS(currentListOfProjects);

    return newProject;

}

const update = (id:string, data: UpdateProjectDto) : Project | undefined=> {
    // pobranie z LS calosci 
    const currentListOfProjects : Project[] = getAll();

    const projectToUpdate = getById(id);
    if(projectToUpdate === undefined) return undefined;

    if(data.name) projectToUpdate.name = data.name;
    if(data.description) projectToUpdate.description = data.description;

    saveToLS(currentListOfProjects)



    return projectToUpdate;
}

const deleteById = (id: string) :Project[] => {
        // pobranie z LS calosci 
    const currentListOfProjects : Project[] = getAll();

    const newListAfterDeletion =  currentListOfProjects.filter(o => o.id !== id);

    saveToLS(newListAfterDeletion);

    return newListAfterDeletion;
}

export const projectService = {getAll, getById, create, update, deleteById}