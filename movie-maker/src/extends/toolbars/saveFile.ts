import { ToolConfig } from "@theatre/studio";
import { ExtensionProps } from "..";
import { saveProjectFile } from "../../api";

export const saveFile: (props: ExtensionProps) => ToolConfig = ({
  studio,
}) => ({
  type: "Icon",
  title: "保存",
  svgSource: "💾",
  onClick: async () => {
    const filename = prompt(
      "ファイル名を入力してください",
      Date.now().toString()
    );
    await saveProjectFile(
      filename + ".json",
      studio.createContentOfSaveFile("インスペクタ")
    );
    alert("完了！");
  },
});
