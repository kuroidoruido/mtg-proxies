import { Route, Router } from "@solidjs/router";

import { CardConfigurator } from "./components/card-configurator";
import { CardPreview } from "./components/card-preview";
import { ProjectNavbar } from "./components/navbar";
import { ProjectPanel } from "./components/project-panel";
import { ProvideStore } from "./services/store";

export function App() {
  return (
    <ProvideStore>
      <Router>
        <Route path="/" component={ProjectList} />
        <Route path="/project/:projectId" component={OneProjectView} />
        <Route path="*paramName" component={NotFound} />
      </Router>
    </ProvideStore>
  );
}

function ProjectList() {
  return (
    <div id="project-list">
      <ul>
        <li>
          <a href="/project/1">Vito deck</a>
        </li>
      </ul>
    </div>
  );
}

function OneProjectView() {
  return (
    <div id="one-project-view">
      <ProjectNavbar />
      <CardPreview />
      <CardConfigurator />
      <ProjectPanel />
    </div>
  );
}

function NotFound() {
  return (
    <div id="not-found">
      <h1>Not found</h1>
      <a href="/">Back to home</a>
    </div>
  );
}
