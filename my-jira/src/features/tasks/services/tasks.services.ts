import type { Task, CreateTaskDto, UpdateTaskDto} from "../types/task.types"
import { getAllUsers } from "../../users/services/user.service"
import { storyService } from "../../stories/services/stories.service"
import { v4 as uuidv4 } from 'uuid'; 
import type { User } from "../../users/types/user.types";
import type { Story } from "../../stories/types/story.types";

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

const saveToLS = (listOfTasks: Task[]): void => {
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
        estimatedHours: data.estimatedHours,

        storyId: storyId,
        workedHours: 0,
        status: "todo",
        createdAt: new Date().toISOString()
    }
    currentListOfTasks.push(newTask);
    saveToLS(currentListOfTasks);
    return newTask;
}

const update = (id: string, data: UpdateTaskDto): Task | undefined => {
  const tasks = readFromLS();

  const taskToUpdate = tasks.find((task) => task.id === id);

  if (!taskToUpdate) {
    return undefined;
  }

  if (data.title !== undefined) taskToUpdate.title = data.title;
  if (data.description !== undefined) taskToUpdate.description = data.description;
  if (data.priority !== undefined) taskToUpdate.priority = data.priority;
  if (data.estimatedHours !== undefined) taskToUpdate.estimatedHours = data.estimatedHours;
  if (data.workedHours !== undefined) taskToUpdate.workedHours = data.workedHours;

  saveToLS(tasks);

  return taskToUpdate;
};

const deleteById = (id: string): Task[] => {
  const tasks = readFromLS();

  const tasksAfterDeletion = tasks.filter((task) => task.id !== id);

  saveToLS(tasksAfterDeletion);

  return tasksAfterDeletion;
};


const assignUserToTask = (userId: string, taskId: string  ) : Task | undefined => {
    // przypisanie użytkownika ma automatycznie:

    // status = "doing"
    // startedAt = now
    // assignedUserId = userId
    const tasks = readFromLS();
    const taskToUpdate = tasks.find(t=> t.id === taskId);

    const listOfUsers : User[] = getAllUsers();
    const assignedUsser = listOfUsers.find(u => u.id === userId)

    const listOfStories : Story[] = storyService.getAllStories();
    const currentStory = listOfStories.find(s => s.id === taskToUpdate?.storyId);
    

    if(!taskToUpdate) return undefined;
    if(!assignedUsser) return undefined;

    if(assignedUsser.role === 'admin') return undefined;
    if(!currentStory) return undefined;
    
    taskToUpdate.assignedUserId = userId;
    taskToUpdate.status = 'doing';
    taskToUpdate.startedAt = new Date().toISOString();

    if(currentStory.status === 'todo' || currentStory.status === 'done'){
        storyService.updateStory(currentStory.id, {status: "doing"})
    }

    saveToLS(tasks);
    return taskToUpdate;

};

const markTaskAsDone = (taskId: string ) : Task | undefined => {
    //status = "done"
   // completedAt = now

    const listOfTasks = readFromLS();
    const taskToUpdate = listOfTasks.find(t=>t.id===taskId);

    if(taskToUpdate === undefined) return undefined;

    taskToUpdate.status = 'done';
    taskToUpdate.completedAt = new Date().toISOString();

    saveToLS(listOfTasks);
    return taskToUpdate;
}

export const tasksService = {getAll, getById, getByStoryId, createForStory, update, deleteById, markTaskAsDone, assignUserToTask}