import { createMemo, For, onSettled } from "solid-js";

import { useAllProjects } from "../services/store/all-projects.store";

import "./project-list.css";

export function ProjectList() {
  const [allProject, refresh] = useAllProjects();

  const projects = createMemo(() =>
    allProject.projects.toSorted((a, b) =>
      (a.name ?? "").localeCompare(b.name ?? ""),
    ),
  );

  onSettled(() => refresh());
  return (
    <div id="project-list">
      <ul>
        <For each={projects()}>
          {(p) => (
            <li>
              <a href={"/project/" + p.id}>{p.name}</a>
            </li>
          )}
        </For>
      </ul>
      <ul>
        <li>
          <a href="/project/new">
            <span title="New project" aria-label="New project">
              +
            </span>
          </a>
        </li>
        <li>
          <a href="/project/import">Import project</a>
        </li>
      </ul>
    </div>
  );
}
