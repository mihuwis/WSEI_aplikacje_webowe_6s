import { initializeApp } from "firebase/app";
import { collection, doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const PROJECTS_COLLECTION = "projects";
const STORIES_COLLECTION = "stories";
const TASKS_COLLECTION = "tasks";

const projects = [
  {
    name: "Nauka React",
    description: "Nauczyć się Reacta na przykładzie aplikacji Mini-Jira.",
    stories: [
      {
        name: "Pierwsze uruchomienie aplikacji",
        description: "Przygotować i uruchomić podstawową aplikację React.",
        priority: "low",
        tasks: [
          {
            title: "Uruchomić pierwszy widok React",
            description: "Uruchomić aplikację i sprawdzić renderowanie głównego komponentu.",
            priority: "low",
            status: "done",
            estimatedHours: 1,
            workedHours: 1,
            assignedUserId: "129",
            startedAt: "2026-07-29T09:00:00.000Z",
            completedAt: "2026-07-29T10:00:00.000Z",
          },
        ],
      },
      {
        name: "Podstawy komponentów",
        description: "Zrozumieć komponenty, propsy i renderowanie list.",
        priority: "high",
        tasks: [
          {
            title: "Stworzyć komponent karty",
            description: "Przygotować komponent funkcyjny wyświetlający podstawowe dane.",
            priority: "high",
            status: "doing",
            estimatedHours: 2,
            assignedUserId: "129",
            startedAt: "2026-08-20T09:00:00.000Z",
          },
          {
            title: "Przekazać dane przez propsy",
            description: "Przekazać do komponentu nazwę i opis przez propsy.",
            priority: "medium",
            status: "todo",
            estimatedHours: 2,
          },
          {
            title: "Wyrenderować listę komponentów",
            description: "Użyć map oraz stabilnego key do pokazania listy kart.",
            priority: "medium",
            status: "todo",
            estimatedHours: 2,
          },
        ],
      },
      {
        name: "Routing aplikacji",
        description: "Połączyć projekty, story i taski czytelnymi trasami.",
        priority: "high",
        tasks: [
          {
            title: "Dodać StoryBoard projektu",
            description: "Podłączyć tablicę story pod trasę wybranego projektu.",
            priority: "high",
            status: "doing",
            estimatedHours: 3,
            assignedUserId: "127",
            startedAt: "2026-08-21T10:00:00.000Z",
          },
          {
            title: "Dodać tablicę tasków story",
            description: "Przygotować trasę Kanbanu dla jednej story.",
            priority: "medium",
            status: "todo",
            estimatedHours: 3,
          },
          {
            title: "Dodać stronę 404",
            description: "Obsłużyć wejście pod nieznany adres.",
            priority: "low",
            status: "todo",
            estimatedHours: 1,
          },
        ],
      },
      {
        name: "Formularze",
        description: "Przygotować formularze CRUD dla danych aplikacji.",
        priority: "medium",
        tasks: [
          {
            title: "Formularz dodawania projektu",
            description: "Dodać pola nazwy i opisu projektu.",
            priority: "medium",
            status: "todo",
            estimatedHours: 2,
          },
          {
            title: "Formularz dodawania story",
            description: "Dodać pola wymagane do utworzenia story.",
            priority: "medium",
            status: "todo",
            estimatedHours: 2,
          },
          {
            title: "Komunikaty walidacji",
            description: "Pokazać użytkownikowi czytelne błędy formularza.",
            priority: "low",
            status: "todo",
            estimatedHours: 2,
          },
        ],
      },
      {
        name: "Testy komponentów",
        description: "Sprawdzić najważniejsze zachowania interfejsu.",
        priority: "low",
        tasks: [
          {
            title: "Test renderowania StoryBoard",
            description: "Sprawdzić wyświetlanie kolumn story.",
            priority: "low",
            status: "todo",
            estimatedHours: 2,
          },
          {
            title: "Test wyboru story",
            description: "Sprawdzić podgląd tasków po kliknięciu story.",
            priority: "medium",
            status: "todo",
            estimatedHours: 2,
          },
        ],
      },
    ],
  },
  {
    name: "Nauka JavaScript",
    description: "Utrwalić JavaScript potrzebny do pracy z Reactem.",
    stories: [
      {
        name: "Pierwszy skrypt JavaScript",
        description: "Uruchomić pierwszy samodzielny skrypt w Node.js.",
        priority: "low",
        tasks: [
          {
            title: "Uruchomić skrypt w Node.js",
            description: "Napisać i uruchomić prosty plik JavaScript.",
            priority: "low",
            status: "done",
            estimatedHours: 1,
            workedHours: 1,
            assignedUserId: "127",
            startedAt: "2026-07-29T12:00:00.000Z",
            completedAt: "2026-07-29T13:00:00.000Z",
          },
        ],
      },
      {
        name: "Praca z tablicami",
        description: "Ćwiczyć map, filter i find na danych aplikacji.",
        priority: "high",
        tasks: [
          {
            title: "Przećwiczyć map",
            description: "Zamienić listę obiektów na elementy widoku.",
            priority: "high",
            status: "doing",
            estimatedHours: 2,
            assignedUserId: "129",
            startedAt: "2026-08-20T11:00:00.000Z",
          },
          {
            title: "Przećwiczyć filter",
            description: "Filtrować elementy po statusie.",
            priority: "high",
            status: "todo",
            estimatedHours: 2,
          },
          {
            title: "Przećwiczyć find",
            description: "Znajdować pojedynczy element po ID.",
            priority: "medium",
            status: "todo",
            estimatedHours: 1,
          },
        ],
      },
      {
        name: "Async i Promise",
        description: "Zrozumieć asynchroniczne pobieranie danych.",
        priority: "high",
        tasks: [
          {
            title: "Napisać funkcję async",
            description: "Użyć async i await w prostym przykładzie.",
            priority: "high",
            status: "doing",
            estimatedHours: 2,
            assignedUserId: "127",
            startedAt: "2026-08-21T13:00:00.000Z",
          },
          {
            title: "Obsłużyć Promise",
            description: "Rozpoznać różnicę między wartością a Promise.",
            priority: "medium",
            status: "todo",
            estimatedHours: 2,
          },
          {
            title: "Obsłużyć błąd zapytania",
            description: "Dodać try/catch do operacji asynchronicznej.",
            priority: "medium",
            status: "todo",
            estimatedHours: 2,
          },
        ],
      },
      {
        name: "Obiekty i destrukturyzacja",
        description: "Utrwalić pracę z obiektami JavaScript.",
        priority: "medium",
        tasks: [
          {
            title: "Odczytywanie pól obiektu",
            description: "Odczytać dane projektu i story z obiektów.",
            priority: "medium",
            status: "todo",
            estimatedHours: 1,
          },
          {
            title: "Destrukturyzacja obiektu",
            description: "Wyciągnąć wybrane pola do osobnych zmiennych.",
            priority: "medium",
            status: "todo",
            estimatedHours: 1,
          },
          {
            title: "Operator spread",
            description: "Utworzyć nowy obiekt bez mutowania starego.",
            priority: "low",
            status: "todo",
            estimatedHours: 1,
          },
        ],
      },
      {
        name: "Moduły JavaScript",
        description: "Nauczyć się importowania i eksportowania kodu.",
        priority: "low",
        tasks: [
          {
            title: "Eksport funkcji",
            description: "Wyeksportować funkcję z osobnego modułu.",
            priority: "low",
            status: "todo",
            estimatedHours: 1,
          },
          {
            title: "Import typów i funkcji",
            description: "Rozdzielić zwykłe importy od import type.",
            priority: "medium",
            status: "todo",
            estimatedHours: 2,
          },
        ],
      },
    ],
  },
  {
    name: "Sprzątanie mieszkania",
    description: "Zaplanować i wykonać domowe porządki.",
    stories: [
      {
        name: "Wyniesienie śmieci",
        description: "Usunąć posegregowane odpady z mieszkania.",
        priority: "low",
        tasks: [
          {
            title: "Wynieść posegregowane śmieci",
            description: "Wynieść papier, plastik i odpady zmieszane.",
            priority: "low",
            status: "done",
            estimatedHours: 1,
            workedHours: 0.5,
            assignedUserId: "129",
            startedAt: "2026-07-30T18:00:00.000Z",
            completedAt: "2026-07-30T18:30:00.000Z",
          },
        ],
      },
      {
        name: "Kuchnia",
        description: "Posprzątać kuchnię i przygotować ją do gotowania.",
        priority: "high",
        tasks: [
          {
            title: "Opróżnić zmywarkę",
            description: "Wyjąć czyste naczynia i odłożyć je na miejsce.",
            priority: "medium",
            status: "doing",
            estimatedHours: 1,
            assignedUserId: "129",
            startedAt: "2026-08-20T08:00:00.000Z",
          },
          {
            title: "Umyć blat i kuchenkę",
            description: "Doczyścić blat, kuchenkę i okolice zlewu.",
            priority: "high",
            status: "todo",
            estimatedHours: 1,
          },
          {
            title: "Pouładać przyprawy",
            description: "Przygotować jedno miejsce na wszystkie przyprawy.",
            priority: "low",
            status: "todo",
            estimatedHours: 1,
          },
        ],
      },
      {
        name: "Łazienka",
        description: "Posprzątać łazienkę i uzupełnić podstawowe rzeczy.",
        priority: "high",
        tasks: [
          {
            title: "Wstawić pranie ręczników",
            description: "Wrzucić ręczniki do pralki i uruchomić program.",
            priority: "medium",
            status: "doing",
            estimatedHours: 1,
            assignedUserId: "127",
            startedAt: "2026-08-21T10:00:00.000Z",
          },
          {
            title: "Umyć prysznic",
            description: "Umyć kabinę, brodzik i słuchawkę prysznicową.",
            priority: "high",
            status: "todo",
            estimatedHours: 2,
          },
          {
            title: "Przejrzeć kosmetyki",
            description: "Wyrzucić puste opakowania i stare kosmetyki.",
            priority: "low",
            status: "todo",
            estimatedHours: 1,
          },
        ],
      },
      {
        name: "Salon",
        description: "Przywrócić porządek w salonie.",
        priority: "medium",
        tasks: [
          {
            title: "Odkurzyć podłogę",
            description: "Odkurzyć salon razem z miejscem pod kanapą.",
            priority: "medium",
            status: "todo",
            estimatedHours: 1,
          },
          {
            title: "Pouładać rzeczy na półkach",
            description: "Odłożyć książki, kable i drobiazgi na miejsce.",
            priority: "medium",
            status: "todo",
            estimatedHours: 1,
          },
          {
            title: "Przetrzeć stolik",
            description: "Umyć stolik i wyrzucić stare paragony.",
            priority: "low",
            status: "todo",
            estimatedHours: 1,
          },
        ],
      },
      {
        name: "Sypialnia",
        description: "Uporządkować sypialnię i przygotować świeżą pościel.",
        priority: "low",
        tasks: [
          {
            title: "Zmienić pościel",
            description: "Założyć czystą pościel i odłożyć starą do prania.",
            priority: "medium",
            status: "todo",
            estimatedHours: 1,
          },
          {
            title: "Odłożyć ubrania",
            description: "Pouładać czyste ubrania i przygotować rzeczy do prania.",
            priority: "low",
            status: "todo",
            estimatedHours: 1,
          },
        ],
      },
    ],
  },
];

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function calculateStoryStatus(tasks) {
  if (tasks.length > 0 && tasks.every((task) => task.status === "done")) {
    return "done";
  }

  if (tasks.some((task) => task.status === "doing" || task.status === "done")) {
    return "doing";
  }

  return "todo";
}

async function createProject(project) {
  const projectRef = doc(collection(db, PROJECTS_COLLECTION));
  const newProject = {
    id: projectRef.id,
    name: project.name,
    description: project.description,
  };

  await setDoc(projectRef, newProject);
  return projectRef.id;
}

async function createStory(projectId, story) {
  const storyRef = doc(collection(db, STORIES_COLLECTION));
  const newStory = {
    id: storyRef.id,
    name: story.name,
    description: story.description,
    priority: story.priority,
    projectId,
    status: calculateStoryStatus(story.tasks),
    ownerId: "125",
    createdAt: new Date().toISOString(),
  };

  await setDoc(storyRef, newStory);
  return { id: storyRef.id, status: newStory.status };
}

async function createTask(projectId, storyId, task) {
  const taskRef = doc(collection(db, TASKS_COLLECTION));
  const newTask = {
    ...task,
    id: taskRef.id,
    projectId,
    storyId,
    workedHours: task.workedHours ?? 0,
    createdAt: task.createdAt ?? new Date().toISOString(),
  };

  await setDoc(taskRef, newTask);
  return taskRef.id;
}

async function seedDatabase() {
  for (const project of projects) {
    const projectId = await createProject(project);
    console.log(`Created project: ${project.name}`);

    for (const story of project.stories) {
      const createdStory = await createStory(projectId, story);
      console.log(`  Created story: ${story.name} [${createdStory.status}]`);

      for (const task of story.tasks) {
        await createTask(projectId, createdStory.id, task);
      }
    }
  }

  console.log("Seed finished.");
}

await seedDatabase();
