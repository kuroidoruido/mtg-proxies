import { Route, Router } from "@solidjs/router";

import { ProvideAllProjects } from "./services/store/all-projects.store";
import { ProjectList } from "./pages/project-list";
import { NotFound } from "./pages/not-found";
import { OneProjectView } from "./pages/one-project-view";
import { CreateProject } from "./pages/create-project";
import { ImportProject } from "./pages/import-project";

export function App() {
  return (
    <ProvideAllProjects>
      <Router>
        <Route path="/" component={ProjectList} />
        <Route path="/project/new" component={CreateProject} />
        <Route path="/project/import" component={ImportProject} />
        <Route path="/project/:projectId" component={OneProjectView} />
        <Route path="*paramName" component={NotFound} />
      </Router>
    </ProvideAllProjects>
  );
}
