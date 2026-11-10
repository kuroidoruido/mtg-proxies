import {
  createContext,
  createEffect,
  onMount,
  useContext,
  type ParentProps,
} from "solid-js";
import { createStore } from "solid-js/store";
import { type Project } from "./models";
import {
  readProjectFromStorage,
  saveProjectToStorage,
} from "./localStorage.utils";

type CurrentProjectStoreData = Project;

const projectStore = createStore<CurrentProjectStoreData>(
  { id: "", name: "", cards: [] },
  { name: "current-project" },
);
const CurrentProjectStoreContext = createContext(projectStore);

export function ProvideCurrentProject(
  props: ParentProps & { projectId: string },
) {
  const currentState = () => projectStore[0];
  onMount(() => {
    // restore previous state
    projectStore[1](readProjectFromStorage(props.projectId));
  });

  createEffect(() => {
    // save new state
    saveProjectToStorage(currentState());
  });

  return (
    <CurrentProjectStoreContext.Provider value={projectStore}>
      {props.children}
    </CurrentProjectStoreContext.Provider>
  );
}

export function useCurrentProject() {
  return useContext(CurrentProjectStoreContext);
}
