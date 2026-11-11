import { useNavigate } from "@solidjs/router";
import { BasicNavbar } from "../components/navbar";
import { useImportProject } from "../services/store";

import "./import-project.css";

export function ImportProject() {
  const importProject = useImportProject();
  const navigate = useNavigate();
  return (
    <div id="import-project">
      <BasicNavbar title="Import project" />
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formState = grabFormState<{ config: File }>(e.currentTarget);
          importProject(await formState.config.text());
          navigate("/");
        }}
      >
        <label>
          Project file:
          <input type="file" accept="application/json" name="config" />
        </label>
        <button>Import project</button>
      </form>
    </div>
  );
}

function grabFormState<T>(formElement: HTMLFormElement): T {
  return Object.fromEntries(new FormData(formElement).entries()) as T;
}
