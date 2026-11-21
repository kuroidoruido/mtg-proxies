import { createRouter } from "@solidjs/router";

import { ProvideAllProjects } from "./services/store/all-projects.store";
import { ProjectList } from "./pages/project-list";
import { NotFound } from "./pages/not-found";
import { OneProjectView } from "./pages/one-project-view";
import { CreateProject } from "./pages/create-project";
import { ImportProject } from "./pages/import-project";

const Router = createRouter({
  routes: [
    { path: "/", component: ProjectList },
    { path: "/project/new", component: CreateProject },
    { path: "/project/import", component: ImportProject },
    { path: "/project/:projectId", component: OneProjectView },
    { path: "*404", component: NotFound },
  ],
});

export function App() {
  return (
    <ProvideAllProjects>
      <Router />
    </ProvideAllProjects>
  );
}
