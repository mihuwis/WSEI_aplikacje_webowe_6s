import { userService } from "../../users/services/user.service";
import type { Story, CreateStoryDto, UpdateStoryDto} from "../types/story.types"
import { v4 as uuidv4 } from 'uuid'; 

const STORY_STORAGE_KEY : string = "little-jira-stories";

const readFromLS = () :Story[] => {
    const storedStories = localStorage.getItem(STORY_STORAGE_KEY);
    if (!storedStories){
        return []
    } else{
        const parsedStories : Story[] = JSON.parse(storedStories);
        return parsedStories
    }

}

const saveToLS = (listOfStories: Story[]) => {
    localStorage.setItem(STORY_STORAGE_KEY, JSON.stringify(listOfStories))
}

const getAll = () : Story[] =>{
    return readFromLS();
}

const getById = (id : string) : Story | undefined => { 
    const listOfStories = readFromLS();
    const returnedStory = listOfStories.find(o => o.id === id);
    return returnedStory;
}

const getByProjectId = (projectId: string) : Story[]=> {
    const listOfStories : Story[]  = getAll();
    const listOfStoriesInProject = listOfStories.filter(s => s.projectId === projectId);
    return listOfStoriesInProject;
}

const createForProject = (projectId: string, data: CreateStoryDto) : Story => {

    const currentListOfStories = getAll();
    const newStory : Story = {
        id: uuidv4(),
        name: data.name,
        description: data.description,
        projectId: projectId,
        priority: data.priority,
        createdAt: new Date().toISOString(),
        status: "todo",
        ownerId: userService.getCurrentUser().id
    }
    currentListOfStories.push(newStory);
    saveToLS(currentListOfStories);
    return newStory;
}

const update = (id:string, data: UpdateStoryDto) : Story | undefined=> {
    // pobranie z LS calosci 
    const currentListOfStories : Story[] = getAll();

    const storyToUpdate = getById(id);
    if(storyToUpdate === undefined) return undefined;
    if(data.name) storyToUpdate.name = data.name;
    if(data.description) storyToUpdate.description = data.description;
    saveToLS(currentListOfStories)
    return storyToUpdate;
}

const deleteById = (id: string) :Story[] => {
    const currentListOfStories : Story[] = getAll();
    const newListAfterDeletion =  currentListOfStories.filter(o => o.id !== id);
    saveToLS(newListAfterDeletion);
    return newListAfterDeletion;
}

export const storyService = {getAll, getById, getByProjectId, createForProject, update, deleteById}