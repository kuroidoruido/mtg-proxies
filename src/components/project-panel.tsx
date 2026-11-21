import { Slugger } from "@anthonypena/slugger";
import { useCurrentProject, useDeleteProject } from "../services/store";
import { InputField } from "./fields/input-field";

import "./project-panel.css";
import { useNavigate } from "@solidjs/router";

export function ProjectPanel() {
  return (
    <section class="project-panel hidden-on-print">
      <fieldset>
        <legend>Project configuration</legend>
        <ProjectNameInput />
      </fieldset>
      <fieldset>
        <legend>State</legend>
        <ExportButton />
        <DeleteButton />
      </fieldset>
    </section>
  );
}

function ProjectNameInput() {
  const [store, setStore] = useCurrentProject();

  return (
    <InputField
      label="Project name"
      value={store.name ?? ""}
      onChange={(e) => setStore(() => ({ ...store, name: e.target.value }))}
    />
  );
}

function ExportButton() {
  const [store] = useCurrentProject();

  const exportLink = () =>
    `data:application/json;charset=utf-8,${encodeURI(JSON.stringify(store, undefined, 2))}`;
  const exportFileName = () => {
    const slugger = new Slugger("mtg-proxies_");
    const now = new Date();
    const exportDate = `${now.getFullYear()}-${now.getMonth() < 9 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1}-${now.getDate()}`;
    return `${slugger.slug(store.name)}_${exportDate}.json`;
  };

  return (
    <a role="button" href={exportLink()} download={exportFileName()}>
      Export project
    </a>
  );
}

function DeleteButton() {
  const [currentProject] = useCurrentProject();
  const deleteProject = useDeleteProject();
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        deleteProject(currentProject.id);
        navigate("/");
      }}
    >
      Delete project
    </button>
  );
}
