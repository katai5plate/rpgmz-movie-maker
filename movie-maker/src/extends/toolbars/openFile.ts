import { ToolConfig } from "@theatre/studio";
import { ExtensionProps } from "..";
import { openModal } from "../modal";
import { getProjectList } from "../../api";

export const openFile: (props: ExtensionProps) => ToolConfig = () => ({
  type: "Icon",
  title: "開く",
  svgSource: "📂",
  onClick: () => {
    openModal("開く", async (node) => {
      const res = await getProjectList();
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
});
