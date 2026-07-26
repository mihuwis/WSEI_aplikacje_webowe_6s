import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from "../../../app/firebase/firebase";
import { userService } from "../../users/services/user.service";
import type { Story, CreateStoryDto, UpdateStoryDto } from "../types/story.types";

const STORIES_COLLECTION = "stories";

const mapStoryDocument = (documentId: string, data: unknown): Story => ({
  ...(data as Omit<Story, "id">),
  id: documentId,
});

export const getAllStories = async (): Promise<Story[]> => {
  const snapshot = await getDocs(collection(db, STORIES_COLLECTION));

  return snapshot.docs.map((document) => mapStoryDocument(document.id, document.data()));
};

const getById = async (id: string): Promise<Story | undefined> => {
  const snapshot = await getDoc(doc(db, STORIES_COLLECTION, id));

  if (!snapshot.exists()) {
    return undefined;
  }

  return mapStoryDocument(snapshot.id, snapshot.data());
};

const getByProjectId = async (projectId: string): Promise<Story[]> => {
  const storiesQuery = query(
    collection(db, STORIES_COLLECTION),
    where("projectId", "==", projectId),
  );
  const snapshot = await getDocs(storiesQuery);

  return snapshot.docs.map((document) => mapStoryDocument(document.id, document.data()));
};

const createForProject = async (projectId: string, data: CreateStoryDto): Promise<Story> => {
  const storyRef = doc(collection(db, STORIES_COLLECTION));
  const newStory: Story = {
    id: storyRef.id,
    name: data.name,
    description: data.description,
    projectId,
    priority: data.priority,
    createdAt: new Date().toISOString(),
    status: "todo",
    ownerId: userService.getCurrentUser().id,
  };

  await setDoc(storyRef, newStory);

  return newStory;
};

const updateStory = async (id: string, data: UpdateStoryDto): Promise<Story | undefined> => {
  const currentStory = await getById(id);

  if (!currentStory) {
    return undefined;
  }

  const updatedStory: Story = {
    ...currentStory,
    ...data,
  };

  await setDoc(doc(db, STORIES_COLLECTION, id), updatedStory);

  return updatedStory;
};

const deleteById = async (id: string): Promise<Story[]> => {
  await deleteDoc(doc(db, STORIES_COLLECTION, id));

  return getAllStories();
};

export const storyService = {
  getAllStories,
  getById,
  getByProjectId,
  createForProject,
  updateStory,
  deleteById,
};
