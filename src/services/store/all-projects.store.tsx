import { createContext, onMount, useContext, type ParentProps } from "solid-js";
import { createStore } from "solid-js/store";
import { findAllProjectMetadata, onStoreChanges } from "./localStorage.utils";

export interface AllProjectsStoreData {
  projects: ProjectMetadata[];
}

export interface ProjectMetadata {
  id: string;
  name: string;
}

const allProjectsStore = createStore<AllProjectsStoreData>(
  { projects: [] },
  { name: "config" },
);
const AllProjectsStoreContext = createContext(allProjectsStore[0]);

function refreshProjects() {
  allProjectsStore[1]({ projects: findAllProjectMetadata() });
}

export function ProvideAllProjects(props: ParentProps) {
  onMount(() => {
    // restore previous state
    refreshProjects();
    onStoreChanges(() => refreshProjects());
  });

  return (
    <AllProjectsStoreContext.Provider value={allProjectsStore[0]}>
      {props.children}
    </AllProjectsStoreContext.Provider>
  );
}

export function useAllProjects() {
  return [useContext(AllProjectsStoreContext), refreshProjects] as const;
}
