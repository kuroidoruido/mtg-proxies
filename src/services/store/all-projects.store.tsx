import {
  createContext,
  onSettled,
  useContext,
  type ParentProps,
} from "solid-js";
import { createStore } from "solid-js";
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
  allProjectsStore[1](() => ({ projects: findAllProjectMetadata() }));
}

export function ProvideAllProjects(props: ParentProps) {
  onSettled(() => {
    // restore previous state
    refreshProjects();
    onStoreChanges(() => refreshProjects());
  });

  return (
    <AllProjectsStoreContext value={allProjectsStore[0]}>
      {props.children}
    </AllProjectsStoreContext>
  );
}

export function useAllProjects() {
  return [useContext(AllProjectsStoreContext), refreshProjects] as const;
}
