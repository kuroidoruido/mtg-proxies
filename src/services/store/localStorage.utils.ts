import { isDefined, isNotDefinedOrEmpty } from "@anthonypena/fp";
import type { ProjectMetadata } from "./all-projects.store";
import {
    buildEmptyCardConfig,
    buildEmptyProject,
    type Project,
} from "./models";

const STORAGE_PREFIX = "__MTG_PROXIES__";
const PROJECT_STORAGE_PREFIX = `${STORAGE_PREFIX}projects__`;

export function findAllProjectMetadata(): ProjectMetadata[] {
    return new Array(localStorage.length)
        .fill(null)
        .map((_, i) => localStorage.key(i))
        .filter((k) => k?.startsWith(PROJECT_STORAGE_PREFIX))
        .map((k) => k?.substring(PROJECT_STORAGE_PREFIX.length))
        .map(readProjectFromStorage)
        .filter(isDefined)
        .map(({ cards: _, ...pm }): ProjectMetadata => pm);
}

function buildProjectKey(projectId: string): string {
    return `${PROJECT_STORAGE_PREFIX}${projectId}`;
}

export function readProjectFromStorage(
    projectId: string | undefined | null,
): Project {
    if (isNotDefinedOrEmpty(projectId)) {
        console.error(`Invalid projectId ('${projectId}')`);
        return buildEmptyProject();
    }
    const str = localStorage.getItem(buildProjectKey(projectId));
    if (isNotDefinedOrEmpty(str)) {
        console.error(`Failed to read '${buildProjectKey(projectId)}'`);
        return buildEmptyProject();
    }
    const raw: Project = JSON.parse(str);
    console.log({ raw });
    return {
        ...buildEmptyProject(),
        ...raw,
        cards: (raw.cards ?? []).map((cc) => ({
            ...buildEmptyCardConfig(),
            ...cc,
        })),
    };
}

export function saveProjectToStorage(project: Project) {
    localStorage.setItem(buildProjectKey(project.id), JSON.stringify(project));
    STORE_CHANGES_LISTENERS.forEach((f) => f?.());
}

const STORE_CHANGES_LISTENERS: VoidFunction[] = [];
export function onStoreChanges(fn: VoidFunction): VoidFunction {
    window.addEventListener("storage", fn);
    STORE_CHANGES_LISTENERS.push(fn);
    return () => {
        window.removeEventListener("storage", fn);
        STORE_CHANGES_LISTENERS.splice(
            STORE_CHANGES_LISTENERS.findIndex(fn),
            1,
        );
    };
}
