import { For, onMount } from "solid-js";

import { useAllProjects } from "../services/store/all-projects.store";

import "./project-list.css";

export function ProjectList() {
  const [allProject, refresh] = useAllProjects();

  onMount(() => refresh());
  return (
    <div id="project-list">
      <ul>
        <For each={allProject.projects}>
          {(p) => (
            <li>
              <a href={"/project/" + p.id}>{p.name}</a>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
}
