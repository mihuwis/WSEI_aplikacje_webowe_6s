import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../../app/firebase/firebase";
import type { Project, CreateProjectDto, UpdateProjectDto } from "../types/project.types";

const PROJECTS_COLLECTION = "projects";

const getAll = async (): Promise<Project[]> => {
  const snapshot = await getDocs(collection(db, PROJECTS_COLLECTION));

  return snapshot.docs.map((document) => ({
    ...(document.data() as Omit<Project, "id">),
    id: document.id,
  }));
};

const getById = async (id: string): Promise<Project | undefined> => {
  const snapshot = await getDoc(doc(db, PROJECTS_COLLECTION, id));

  if (!snapshot.exists()) {
    return undefined;
  }

  return {
    ...(snapshot.data() as Omit<Project, "id">),
    id: snapshot.id,
  };
};

const create = async (data: CreateProjectDto): Promise<Project> => {
  const projectRef = doc(collection(db, PROJECTS_COLLECTION));
  const newProject: Project = {
    id: projectRef.id,
    name: data.name,
    description: data.description,
  };

  await setDoc(projectRef, newProject);

  return newProject;
};

const update = async (id: string, data: UpdateProjectDto): Promise<Project | undefined> => {
  const currentProject = await getById(id);

  if (!currentProject) {
    return undefined;
  }

  const updatedProject: Project = {
    ...currentProject,
    ...data,
  };

  await setDoc(doc(db, PROJECTS_COLLECTION, id), updatedProject);

  return updatedProject;
};

const deleteById = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, PROJECTS_COLLECTION, id));

};

export const projectService = { getAll, getById, create, update, deleteById };
