const BASE_URL = "http://localhost:3001";

const tryit = async <R>(fn: () => Promise<R> | Error) => {
  try {
    return await fn();
  } catch (e) {
    console.warn(e);
    return new Error(e);
  }
};

export const getProjectList = async () =>
  tryit<string[]>(async () => await (await fetch(BASE_URL + "/files")).json());
export const loadProjectFile = async (filename: string) =>
  tryit(
    async () => await (await fetch(BASE_URL + "/files/" + filename)).json()
  );
export const saveProjectFile = async (filename: string, data: any) =>
  tryit(
    async () =>
      await fetch(BASE_URL + "/files/" + filename, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
  );

export const getPictureList = async () =>
  tryit<string[]>(
    async () => await (await fetch(BASE_URL + "/pictures")).json()
  );
