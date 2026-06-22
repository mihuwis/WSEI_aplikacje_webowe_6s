import type { Task, CreateTaskDto, UpdateTaskDto, TaskActionResult} from "../types/task.types"
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


const assignUserToTask = (userId: string, taskId: string  ) : TaskActionResult => {
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
    

    if(!taskToUpdate) return { success: false, reason: "task-not-found"}
    if(!assignedUsser) return { success: false, reason: "user-not-assigned" };
    if(assignedUsser.role !== 'developer' && assignedUsser.role !== 'devops' ) return { success: false, reason: "user-role-not-allowed" };
    if(!currentStory) return { success: false, reason: "story-not-found" }
    
    taskToUpdate.assignedUserId = userId;
    taskToUpdate.status = 'doing';
    if(! taskToUpdate.startedAt){
        taskToUpdate.startedAt = new Date().toISOString();
    }

    if(currentStory.status === 'todo'){
        storyService.updateStory(currentStory.id, {status: "doing"})
    }

    saveToLS(tasks);
    return {success: true, task: taskToUpdate}

};

const markTaskAsDone = (taskId: string ) : TaskActionResult => {
    //status = "done"
   // completedAt = now

    const listOfTasks = readFromLS();
    const taskToUpdate = listOfTasks.find(t=>t.id===taskId);

    if(taskToUpdate === undefined) return { success: false, reason: "task-not-found"};
    if(!taskToUpdate.assignedUserId) return { success: false, reason: "user-not-assigned" };

    taskToUpdate.status = 'done';
    taskToUpdate.completedAt = new Date().toISOString();
    if (taskToUpdate.startedAt){
        const miliseconds =  Date.parse(taskToUpdate.completedAt) -  Date.parse(taskToUpdate.startedAt)
        taskToUpdate.workedHours = Math.round((miliseconds / 3600000) *100)/100; 
    } else{
        taskToUpdate.workedHours = 0;
    }

    const listOfTasksFromCurrentStory : Task[] = listOfTasks.filter(task=> task.storyId === taskToUpdate.storyId);
    const allTaskinStoryDone = listOfTasksFromCurrentStory.every(t=> t.status = 'done');

    if(allTaskinStoryDone){
        storyService.updateStory(taskToUpdate.storyId, {status: "done"})
    }

    saveToLS(listOfTasks);
    return {success: true, task: taskToUpdate};
}

export const tasksService = {getAll, getById, getByStoryId, createForStory, update, deleteById, markTaskAsDone, assignUserToTask}