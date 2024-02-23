import { getQueries } from "./utils";

const BASE_URL = "http://localhost:3001";

const tryit = async <R>(fn: () => Promise<R> | Error) => {
  try {
    return await fn();
  } catch (e) {
    console.warn(e);
    return new Error(e);
  }
};

interface ProjectJSON {
  queries: {
    width: number;
    height: number;
  };
  data: object;
}

export const getProjectList = async () =>
  tryit<string[]>(async () => await (await fetch(BASE_URL + "/files")).json());
export const loadProjectFile = async (filename: string): Promise<ProjectJSON> =>
  tryit(
    async () => await (await fetch(BASE_URL + "/files/" + filename)).json()
  );
export const saveProjectFile = async (filename: string, data: any) => {
  const q = getQueries("width", "height");
  const json: ProjectJSON = {
    queries: {
      width: Number(q.width) || 816,
      height: Number(q.height) || 624,
    },
    data,
  };
  return tryit(
    async () =>
      await fetch(BASE_URL + "/files/" + filename, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(json),
      })
  );
};

export const getPictureList = async () =>
  tryit<string[]>(
    async () => await (await fetch(BASE_URL + "/pictures")).json()
  );
