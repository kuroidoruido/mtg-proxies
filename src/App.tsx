import { Route, Router, useParams } from "@solidjs/router";

import { CardConfigurator } from "./components/card-configurator";
import { CardPreview } from "./components/card-preview";
import { ProjectNavbar } from "./components/navbar";
import { ProjectPanel } from "./components/project-panel";
import { ProvideCurrentProject } from "./services/store";

export function App() {
  return (
    <Router>
      <Route path="/" component={ProjectList} />
      <Route path="/project/:projectId" component={OneProjectView} />
      <Route path="*paramName" component={NotFound} />
    </Router>
  );
}

function ProjectList() {
  return (
    <div id="project-list">
      <ul>
        <li>
          <a href="/project/3b1f7323-efc0-40b5-a273-adc59b2ba4dc">Vito deck</a>
        </li>
      </ul>
    </div>
  );
}

function OneProjectView() {
  const params = useParams<{ projectId: string }>();
  return (
    <ProvideCurrentProject projectId={params.projectId}>
      <div id="one-project-view">
        <ProjectNavbar />
        <CardPreview />
        <CardConfigurator />
        <ProjectPanel />
      </div>
    </ProvideCurrentProject>
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
