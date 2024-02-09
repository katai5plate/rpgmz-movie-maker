import { ToolConfig } from "@theatre/studio";
import { ExtensionProps } from "..";
import { openModal } from "../modal";

export const openFile: (props: ExtensionProps) => ToolConfig = ({
  project,
  studio,
}) => ({
  type: "Icon",
  title: "開く",
  svgSource: "📂",
  onClick: () => {
    openModal("開く", (node) => {
      node.innerText = "リストから選ぶ";
    });
  },
});
