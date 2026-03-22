const ACTIVE_PROJECT_KEY : string = "active-project-key"

const readFromLS =() : string | null => {
    const storedKey = localStorage.getItem(ACTIVE_PROJECT_KEY);
    return storedKey;
}

const saveToLS = (currentProjectId : string) =>{
    localStorage.setItem(ACTIVE_PROJECT_KEY, currentProjectId);
}


const setActiveProject = (projectId: string) : void => {
    saveToLS(projectId);
}

const getActiveProjectId = () : string | null => {
    return readFromLS();
}

const clearActiveProject = () => {
    localStorage.removeItem(ACTIVE_PROJECT_KEY);
}

export const activeProjectService = {setActiveProject, getActiveProjectId, clearActiveProject}