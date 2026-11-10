import { useParams } from "@solidjs/router";

import { CardConfigurator } from "../components/card-configurator";
import { CardPreview } from "../components/card-preview";
import { ProjectNavbar } from "../components/navbar";
import { ProjectPanel } from "../components/project-panel";
import { ProvideCurrentProject } from "../services/store";

export function OneProjectView() {
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
