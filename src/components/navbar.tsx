import { useCurrentProject } from "../services/store";

import "./navbar.css";

export function BasicNavbar(props: { title: string }) {
  return (
    <nav class="navbar hidden-on-print">
      <ul>
        <li>
          <a href="/">↖ Back to project selection</a>
        </li>
      </ul>
      <h1>{props.title}</h1>
    </nav>
  );
}

export function ProjectNavbar() {
  const [currentProject] = useCurrentProject();
  return <BasicNavbar title={currentProject.name} />;
}
