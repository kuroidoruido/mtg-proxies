import { deleteProjectFromStorage } from "./localStorage.utils";

export function useDeleteProject() {
  return (projectId: string) => {
    deleteProjectFromStorage(projectId);
  };
}
