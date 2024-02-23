import { ToolConfig } from "@theatre/studio";
import { getProjectList, loadProjectFile } from "../../api";
import { openModal } from "../modal";

export const openFile: ToolConfig = {
  type: "Icon",
  title: "開く",
  svgSource: "📂",
  onClick: () => {
    openModal("開く", async (node) => {
      const res = await getProjectList();
      if (res instanceof Error) {
        node.innerHTML =
          "データが取得できません。<code>npm run api</code> を実行していないか、許可されていません。";
        return;
      }
      const label = document.createElement("p");
      label.innerHTML =
        "<code>movie-maker/projects</code> の中にある <code>*.json</code> ファイルを参照しています。";
      const ul = document.createElement("ul");
      res.forEach(async (filename) => {
        const file = await loadProjectFile(filename);
        const li = document.createElement("li");
        li.onclick = () => {
          window.open(
            `?state=${filename}&width=${file.queries.width ?? 816}&height=${
              file.queries.height ?? 624
            }`
          );
        };
        li.innerHTML = `<u>${filename}</u>`;
        ul.appendChild(li);
      });
      node.append(label, ul);
    });
  },
};
