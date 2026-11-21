import {
  createContext,
  createEffect,
  onSettled,
  useContext,
  type ParentProps,
} from "solid-js";
import { createStore } from "solid-js";
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
  onSettled(() => {
    // restore previous state
    projectStore[1](() => readProjectFromStorage(props.projectId));
  });

  // save new state
  createEffect(
    () => currentState(),
    (state) => saveProjectToStorage(state),
  );

  return (
    <CurrentProjectStoreContext value={projectStore}>
      {props.children}
    </CurrentProjectStoreContext>
  );
}

export function useCurrentProject() {
  return useContext(CurrentProjectStoreContext);
}
