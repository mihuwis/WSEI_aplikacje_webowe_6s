import type { Task, CreateTaskDto, UpdateTaskDto} from "../types/task.types"
import { v4 as uuidv4 } from 'uuid'; 

const TASK_STORAGE_KEY : string = "little-jira-tasks";

const readFromLS = () :Task[] => {
    const storedTasks = localStorage.getItem(TASK_STORAGE_KEY);
    if (!storedTasks){
        return []
    } else{
        const parsedTasks : Task[] = JSON.parse(storedTasks);
        return parsedTasks;
    }

}

const saveToLS = (listOfTasks: Task[]) => {
    localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(listOfTasks))
}

const getAll = () : Task[] =>{
    return readFromLS();
}

const getById = (id : string) : Task | undefined => { 
    const listOfTasks = readFromLS();
    const returnedTask = listOfTasks.find(o => o.id === id);
    return returnedTask;
}

const getByStoryId = (storyId: string) : Task[] => {
    const listOfTasks : Task[]  = getAll();
    const listOfTasksInStory = listOfTasks.filter(s => s.storyId === storyId);
    return listOfTasksInStory;
}

const createForStory = (storyId: string, data: CreateTaskDto) : Task => {

    const currentListOfTasks = getAll();
    const newTask : Task = {
        id: uuidv4(),
        title: data.title,
        description: data.description,
        priority: data.priority,

        storyId: storyId,

        status: "todo",
        createdAt: new Date().toISOString()
    }
    currentListOfTasks.push(newTask);
    saveToLS(currentListOfTasks);
    return newTask;
}

const update = (id:string, data: UpdateTaskDto) : Task | undefined=> {
    // pobranie z LS calosci 
    const currentListOfTasks : Task[] = getAll();

    const taskToUpdate = currentListOfTasks.find(o => o.id === id);
    if(taskToUpdate === undefined) return undefined;
    if(data.title != undefined) taskToUpdate.title = data.title;
    if(data.description != undefined) taskToUpdate.description = data.description;
    if(data.priority != undefined) taskToUpdate.priority = data.priority;
    if(data.status != undefined) taskToUpdate.status = data.status;
    if(data.estimatedHours != undefined) taskToUpdate.estimatedHours = data.estimatedHours;
    if(data.workedHours != undefined) taskToUpdate.workedHours = data.workedHours;
    if(data.assignedUserId != undefined) taskToUpdate.assignedUserId = data.assignedUserId;
    if(data.createdAt != undefined) taskToUpdate.createdAt = data.createdAt;
    if(data.completedAt != undefined) taskToUpdate.completedAt = data.completedAt;
    saveToLS(currentListOfTasks)
    return taskToUpdate;
}

const deleteById = (id: string) :Task[] => {
    const currentListOfTasks : Task[] = getAll();
    const newListAfterDeletion =  currentListOfTasks.filter(o => o.id !== id);
    saveToLS(newListAfterDeletion);
    return newListAfterDeletion;
}

export const tasksService = {getAll, getById, getByStoryId, createForStory, update, deleteById}