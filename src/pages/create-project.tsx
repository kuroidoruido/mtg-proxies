import { onSettled } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { useProjectCreator } from "../services/store";

export function CreateProject() {
  const navigate = useNavigate();
  const createProject = useProjectCreator();
  onSettled(() => navigate(`/project/${createProject()}`));
  return <></>;
}
