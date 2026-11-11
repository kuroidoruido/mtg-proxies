import { useAllProjects } from "./all-projects.store";
import { saveProjectToStorage } from "./localStorage.utils";
import {
  buildEmptyCardConfig,
  buildEmptyProject,
  type Project,
} from "./models";

export function useImportProject() {
  const [allProjects] = useAllProjects();
  const allProjectsName = () => allProjects.projects.map((p) => p.name);

  return (projectAsStr: string) => {
    const baseProject = buildEmptyProject();
    const parsed: Project = JSON.parse(projectAsStr);
    const newProject: Project = {
      ...parsed,
      id: baseProject.id,
      cards: parsed.cards.map((c) => ({ ...buildEmptyCardConfig(), ...c })),
    };
    if (allProjectsName().includes(newProject.name)) {
      const nameStartingWith = allProjectsName().filter((pn) =>
        pn.startsWith(newProject.name),
      );
      newProject.name = `${parsed.name} (${nameStartingWith.length + 1})`;
    }

    saveProjectToStorage(newProject);
    return newProject.id;
  };
}
