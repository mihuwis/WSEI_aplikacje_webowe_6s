import { userService } from "../../users/services/user.service";
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
    const taskToUpdate = tasks.find(t=> t.id == taskId);
    if(!taskToUpdate) return undefined;
    taskToUpdate.assignedUserId = userId;
    taskToUpdate.status = 'doing';
    taskToUpdate.startedAt = new Date().toISOString();
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

    return taskToUpdate;
}

export const tasksService = {getAll, getById, getByStoryId, createForStory, update, deleteById, markTaskAsDone, assignUserToTask}