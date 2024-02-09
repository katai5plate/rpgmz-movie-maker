const BASE_URL = "http://localhost:3001";

export const getProjectList = async () =>
  await (await fetch(BASE_URL + "/files")).json();
export const loadProjectFile = async (filename: string) =>
  await (await fetch(BASE_URL + "/files/" + filename)).json();
export const saveProjectFile = async (filename: string, data: any) =>
  await fetch(BASE_URL + "/files/" + filename, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
