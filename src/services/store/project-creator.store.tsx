import { saveProjectToStorage } from "./localStorage.utils";
import { buildEmptyProject } from "./models";

export function useProjectCreator() {
  return () => {
    const newProject = buildEmptyProject();
    saveProjectToStorage(newProject);
    return newProject.id;
  };
}
