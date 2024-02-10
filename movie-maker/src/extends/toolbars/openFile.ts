import { ToolConfig } from "@theatre/studio";
import { getProjectList } from "../../api";
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
      node.innerHTML = `
      <p><code>movie-maker/projects</code> の中にある <code>*.json</code> ファイルを参照しています。</p>
      <ul>
        ${res
          .map(
            (filename: string) =>
              `<li><a href="?state=${filename}" target="_blank" rel="noopener noreferrer" style="color: white;">${filename}</a></li>`
          )
          .join("")}
      </ul>
`;
    });
  },
};
