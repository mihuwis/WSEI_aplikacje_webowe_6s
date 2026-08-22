// połącz z Firebase
// stwórz projekty
const projects = [
  {
    name: "Nauka React",
    description: "Nauczyc sie React",
    stories: [
      {
        name: "Podstawy komponentow",
        description: "Zrozumiec komponenty, propsy i renderowanie list.",
        priority: "high",
        tasks: [
          {
            title: "Stworzyc pierwszy komponent strony",
            description: "Przygotowac prosty komponent funkcyjny i wyrenderowac go w aplikacji.",
            priority: "high",
            status: "todo",
            estimatedHours: 2,
          },
          {
            title: "Przekazac dane przez propsy",
            description: "Zrobic komponent, ktory dostaje tekst i wyswietla go w JSX.",
            priority: "medium",
            status: "todo",
            estimatedHours: 2,
          },
          {
            title: "Wyrenderowac liste elementow",
            description: "Uzyc map i key do pokazania listy prostych elementow.",
            priority: "medium",
            status: "todo",
            estimatedHours: 3,
          },
          {
            title: "Przecwiczyc warunkowe renderowanie",
            description: "Pokazac inny tekst, gdy lista jest pusta.",
            priority: "medium",
            status: "doing",
            estimatedHours: 2,
            assignedUserId: "129",
            startedAt: "2026-07-30T09:00:00.000Z",
          },
          {
            title: "Uporzadkowac nazwy komponentow",
            description: "Sprawdzic, czy nazwy plikow i komponentow sa spojne.",
            priority: "low",
            status: "doing",
            estimatedHours: 1,
            assignedUserId: "127",
            startedAt: "2026-07-30T10:00:00.000Z",
          },
          {
            title: "Uruchomic pierwszy widok React",
            description: "Sprawdzic, czy aplikacja pokazuje pierwszy komponent w przegladarce.",
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
        name: "Stan i efekty",
        description: "Nauczyc sie useState i useEffect na realnym widoku tablicy.",
        priority: "high",
        tasks: [
          {
            title: "Dodac stan listy taskow",
            description: "Uzyc useState do przechowywania tablicy Task[].",
            priority: "high",
            status: "todo",
            estimatedHours: 2,
          },
          {
            title: "Dodac stan wybranego taska",
            description: "Uzyc selectedTask do pokazania panelu podgladu.",
            priority: "medium",
            status: "todo",
            estimatedHours: 2,
          },
          {
            title: "Obsluzyc brak wybranego taska",
            description: "Nie pokazywac panelu detali przed kliknieciem taska.",
            priority: "low",
            status: "todo",
            estimatedHours: 1,
          },
          {
            title: "Pobrac taski w useEffect",
            description: "Po zmianie projectId pobrac taski z Firestore.",
            priority: "high",
            status: "doing",
            estimatedHours: 3,
            assignedUserId: "129",
            startedAt: "2026-07-31T08:30:00.000Z",
          },
          {
            title: "Pobrac nazwe projektu",
            description: "Uzyc projectService.getById, zeby w naglowku nie pokazywac ID.",
            priority: "medium",
            status: "doing",
            estimatedHours: 2,
            assignedUserId: "127",
            startedAt: "2026-07-31T10:00:00.000Z",
          },
          {
            title: "Zrozumiec Promise",
            description: "Rozdzielic await od zwyklego renderowania JSX.",
            priority: "high",
            status: "done",
            estimatedHours: 2,
            workedHours: 2,
            assignedUserId: "129",
            startedAt: "2026-07-30T11:00:00.000Z",
            completedAt: "2026-07-30T13:00:00.000Z",
          },
        ],
      },
      {
        name: "Routing aplikacji",
        description: "Przechodzic miedzy projektami, tablica i szczegolami zadania.",
        priority: "medium",
        tasks: [
          {
            title: "Dodac trase tablicy projektu",
            description: "Podpiac /projects/:projectId/board w AppRouter.",
            priority: "high",
            status: "todo",
            estimatedHours: 1,
          },
          {
            title: "Dodac trase szczegolow taska",
            description: "Przygotowac URL dla pelnego widoku zadania.",
            priority: "medium",
            status: "todo",
            estimatedHours: 2,
          },
          {
            title: "Poprawic link z panelu taska",
            description: "Link ma prowadzic do poprawnej trasy szczegolow zadania.",
            priority: "medium",
            status: "todo",
            estimatedHours: 1,
          },
          {
            title: "Przecwiczyc useParams",
            description: "Wyciagnac projectId i taskId z adresu strony.",
            priority: "high",
            status: "doing",
            estimatedHours: 2,
            assignedUserId: "129",
            startedAt: "2026-07-31T12:00:00.000Z",
          },
          {
            title: "Usunac zdublowana trase",
            description: "Sprawdzic AppRouter i zostawic pojedyncza trase dla story.",
            priority: "low",
            status: "doing",
            estimatedHours: 1,
            assignedUserId: "127",
            startedAt: "2026-07-31T13:00:00.000Z",
          },
          {
            title: "Dodac przekierowanie z home",
            description: "Wejscie na / ma prowadzic do listy projektow.",
            priority: "low",
            status: "done",
            estimatedHours: 1,
            workedHours: 1,
            assignedUserId: "129",
            startedAt: "2026-07-28T09:00:00.000Z",
            completedAt: "2026-07-28T10:00:00.000Z",
          },
        ],
      },
    ],
  },
  {
    name: "Nauka JavaScript",
    description: "Ogarnac JavaScript w koncu!",
    stories: [
      {
        name: "Podstawy jezyka",
        description: "Utrwalic zmienne, funkcje, tablice i obiekty.",
        priority: "high",
        tasks: [
          {
            title: "Powtorzyc const i let",
            description: "Zrozumiec kiedy uzywac const, a kiedy let.",
            priority: "high",
            status: "todo",
            estimatedHours: 1,
          },
          {
            title: "Napisac kilka funkcji",
            description: "Przecwiczyc parametry, return i funkcje strzalkowe.",
            priority: "medium",
            status: "todo",
            estimatedHours: 2,
          },
          {
            title: "Zrobic cwiczenia z obiektow",
            description: "Tworzyc obiekty i odczytywac ich pola.",
            priority: "medium",
            status: "todo",
            estimatedHours: 2,
          },
          {
            title: "Przerobic destrukturyzacje",
            description: "Wyciagac pola z obiektow i elementy z tablic.",
            priority: "medium",
            status: "doing",
            estimatedHours: 2,
            assignedUserId: "129",
            startedAt: "2026-07-31T09:00:00.000Z",
          },
          {
            title: "Zrozumiec truthy i falsy",
            description: "Sprawdzic jak dzialaja warunki z pustym stringiem, null i undefined.",
            priority: "low",
            status: "doing",
            estimatedHours: 1,
            assignedUserId: "127",
            startedAt: "2026-07-31T10:30:00.000Z",
          },
          {
            title: "Uruchomic pierwszy skrypt JS",
            description: "Odpalic prosty plik JS w Node.",
            priority: "low",
            status: "done",
            estimatedHours: 1,
            workedHours: 1,
            assignedUserId: "129",
            startedAt: "2026-07-29T12:00:00.000Z",
            completedAt: "2026-07-29T13:00:00.000Z",
          },
        ],
      },
      {
        name: "Praca z tablicami",
        description: "Cwiczyc map, filter, find i some na praktycznych danych.",
        priority: "high",
        tasks: [
          {
            title: "Przecwiczyc map",
            description: "Zamienic tablice obiektow na tablice tytulow.",
            priority: "high",
            status: "todo",
            estimatedHours: 2,
          },
          {
            title: "Przecwiczyc filter",
            description: "Filtrowac taski po statusie todo, doing i done.",
            priority: "high",
            status: "todo",
            estimatedHours: 2,
          },
          {
            title: "Przecwiczyc find",
            description: "Znajdowac pojedynczy element po ID.",
            priority: "medium",
            status: "todo",
            estimatedHours: 1,
          },
          {
            title: "Przecwiczyc some",
            description: "Sprawdzac, czy lista zawiera element spelniajacy warunek.",
            priority: "medium",
            status: "doing",
            estimatedHours: 1,
            assignedUserId: "129",
            startedAt: "2026-07-31T11:00:00.000Z",
          },
          {
            title: "Nazwac poprawnie zmienne w callbackach",
            description: "Uzywac task zamiast tasks dla pojedynczego elementu.",
            priority: "low",
            status: "doing",
            estimatedHours: 1,
            assignedUserId: "127",
            startedAt: "2026-07-31T12:00:00.000Z",
          },
          {
            title: "Zrobic pierwsze filtrowanie statusow",
            description: "Podzielic liste taskow na trzy statusy.",
            priority: "medium",
            status: "done",
            estimatedHours: 2,
            workedHours: 2,
            assignedUserId: "129",
            startedAt: "2026-07-30T09:00:00.000Z",
            completedAt: "2026-07-30T11:00:00.000Z",
          },
        ],
      },
      {
        name: "Async i Promise",
        description: "Zrozumiec asynchroniczne pobieranie danych.",
        priority: "medium",
        tasks: [
          {
            title: "Rozpoznac Promise w typach",
            description: "Zobaczyc roznice miedzy Task[] i Promise<Task[]>.",
            priority: "high",
            status: "todo",
            estimatedHours: 2,
          },
          {
            title: "Napisac funkcje async",
            description: "Uzyc async i await w prostym przykladzie.",
            priority: "high",
            status: "todo",
            estimatedHours: 2,
          },
          {
            title: "Obsluzyc await przed .name",
            description: "Najpierw pobrac projekt, potem odczytac project.name.",
            priority: "medium",
            status: "todo",
            estimatedHours: 1,
          },
          {
            title: "Nie mieszac await i then",
            description: "Wybrac jeden styl obslugi Promise w komponencie.",
            priority: "medium",
            status: "doing",
            estimatedHours: 1,
            assignedUserId: "129",
            startedAt: "2026-07-31T13:00:00.000Z",
          },
          {
            title: "Zrozumiec kiedy uzyc useEffect",
            description: "Uzyc useEffect do pobrania danych z bazy po renderze.",
            priority: "high",
            status: "doing",
            estimatedHours: 3,
            assignedUserId: "127",
            startedAt: "2026-07-31T14:00:00.000Z",
          },
          {
            title: "Naprawic pierwszy blad Promise",
            description: "Poprawic kod, ktory probowal zrobic .name na Promise.",
            priority: "medium",
            status: "done",
            estimatedHours: 1,
            workedHours: 1,
            assignedUserId: "129",
            startedAt: "2026-07-30T14:00:00.000Z",
            completedAt: "2026-07-30T15:00:00.000Z",
          },
        ],
      },
    ],
  },
  {
    name: "PSprzatanie na chacie",
    description: "Zrobic porzadki",
    stories: [
      {
        name: "Kuchnia",
        description: "Ogarniac kuchnie tak, zeby dalo sie normalnie gotowac.",
        priority: "high",
        tasks: [
          {
            title: "Wyrzucic stare rzeczy z lodowki",
            description: "Przejrzec terminy i wyrzucic wszystko, co juz nie powinno tam mieszkac.",
            priority: "high",
            status: "todo",
            estimatedHours: 1,
          },
          {
            title: "Umyc blat i kuchenke",
            description: "Doczyscic blat, kuchenke i okolice zlewu.",
            priority: "medium",
            status: "todo",
            estimatedHours: 1,
          },
          {
            title: "Poukladac przyprawy",
            description: "Zrobic jeden sensowny koszyk albo polke na przyprawy.",
            priority: "low",
            status: "todo",
            estimatedHours: 1,
          },
          {
            title: "Oproznic zmywarke",
            description: "Wyjac czyste naczynia i schowac je na miejsce.",
            priority: "medium",
            status: "doing",
            estimatedHours: 1,
            assignedUserId: "129",
            startedAt: "2026-07-31T08:00:00.000Z",
          },
          {
            title: "Zrobic liste zakupow",
            description: "Spisac brakujace rzeczy po sprzataniu lodowki.",
            priority: "low",
            status: "doing",
            estimatedHours: 1,
            assignedUserId: "127",
            startedAt: "2026-07-31T08:30:00.000Z",
          },
          {
            title: "Wyniesc smieci",
            description: "Wyniesc zmieszane, plastik i papier.",
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
        name: "Salon",
        description: "Przywrocic salon do stanu, w ktorym mozna odpoczac.",
        priority: "medium",
        tasks: [
          {
            title: "Odkurzyc podloge",
            description: "Odkurzyc salon razem z miejscem pod kanapa.",
            priority: "medium",
            status: "todo",
            estimatedHours: 1,
          },
          {
            title: "Poukladac rzeczy na polkach",
            description: "Odlozyc ksiazki, kable i drobiazgi na swoje miejsce.",
            priority: "medium",
            status: "todo",
            estimatedHours: 1,
          },
          {
            title: "Przetrzec stolik",
            description: "Umyc stolik i wyrzucic stare paragony.",
            priority: "low",
            status: "todo",
            estimatedHours: 1,
          },
          {
            title: "Poskladac koce",
            description: "Zlozyc koce i poprawic poduszki.",
            priority: "low",
            status: "doing",
            estimatedHours: 1,
            assignedUserId: "129",
            startedAt: "2026-07-31T09:00:00.000Z",
          },
          {
            title: "Podlaczyc ladowarki",
            description: "Zebrac ladowarki w jedno miejsce i rozplatac kable.",
            priority: "low",
            status: "doing",
            estimatedHours: 1,
            assignedUserId: "127",
            startedAt: "2026-07-31T09:30:00.000Z",
          },
          {
            title: "Wyrzucic puste pudelka",
            description: "Usunac opakowania, ktore zostaly po zakupach.",
            priority: "low",
            status: "done",
            estimatedHours: 1,
            workedHours: 1,
            assignedUserId: "127",
            startedAt: "2026-07-30T16:00:00.000Z",
            completedAt: "2026-07-30T17:00:00.000Z",
          },
        ],
      },
      {
        name: "Lazienka",
        description: "Posprzatac lazienke i uzupelnic podstawowe rzeczy.",
        priority: "high",
        tasks: [
          {
            title: "Umyc umywalke",
            description: "Doczyscic umywalke, kran i okolice lustra.",
            priority: "medium",
            status: "todo",
            estimatedHours: 1,
          },
          {
            title: "Umyc prysznic",
            description: "Umyc kabine, brodzik i sluchawke prysznicowa.",
            priority: "high",
            status: "todo",
            estimatedHours: 2,
          },
          {
            title: "Uzupelnic papier i mydlo",
            description: "Sprawdzic zapasy i uzupelnic brakujace rzeczy.",
            priority: "low",
            status: "todo",
            estimatedHours: 1,
          },
          {
            title: "Wstawic pranie recznikow",
            description: "Wrzucic reczniki do pralki i ustawic odpowiedni program.",
            priority: "medium",
            status: "doing",
            estimatedHours: 1,
            assignedUserId: "129",
            startedAt: "2026-07-31T10:00:00.000Z",
          },
          {
            title: "Przejrzec kosmetyki",
            description: "Wyrzucic puste opakowania i stare kosmetyki.",
            priority: "low",
            status: "doing",
            estimatedHours: 1,
            assignedUserId: "127",
            startedAt: "2026-07-31T10:30:00.000Z",
          },
          {
            title: "Wyczyscic lustro",
            description: "Umyc lustro i przetrzec polke pod nim.",
            priority: "low",
            status: "done",
            estimatedHours: 1,
            workedHours: 0.5,
            assignedUserId: "129",
            startedAt: "2026-07-30T19:00:00.000Z",
            completedAt: "2026-07-30T19:30:00.000Z",
          },
        ],
      },
    ],
  },
];

import { initializeApp } from "firebase/app";
import { collection, doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";


const PROJECTS_COLLECTION = "projects";
const STORIES_COLLECTION = "stories";
const TASKS_COLLECTION = "tasks";

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
        status: "todo",
        ownerId: "125",
        createdAt: new Date().toISOString(),
    };
    await setDoc(storyRef, newStory);
    return storyRef.id;
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
      const storyId = await createStory(projectId, story);
      console.log(`  Created story: ${story.name}`);

      for (const task of story.tasks) {
      await createTask(projectId, storyId, task);
      }
    }
  }

  console.log("Seed finished.");
}

await seedDatabase();
