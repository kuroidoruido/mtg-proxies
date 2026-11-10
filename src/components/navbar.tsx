import { useCurrentProject } from "../services/store";

import "./navbar.css";

export function ProjectNavbar() {
  const [store] = useCurrentProject();
  return (
    <nav class="project-navbar hidden-on-print">
      <ul>
        <li>
          <a href="/">↖ Back to project selection</a>
        </li>
      </ul>
      <h1>{store.name}</h1>
    </nav>
  );
}
