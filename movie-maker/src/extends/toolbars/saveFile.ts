import { ToolConfig } from "@theatre/studio";
import { saveProjectFile } from "../../api";
import { gs } from "../../globalState";
import { cleanupUnuseDataFromSavedata } from "../../utils";

export const saveFile: ToolConfig = {
  type: "Icon",
  title: "保存",
  svgSource: "💾",
  onClick: async () => {
    const filename = prompt(
      "ファイル名を入力してください",
      Date.now().toString()
    );
    if (!filename) return;
    const res = await saveProjectFile(
      filename + ".json",
      cleanupUnuseDataFromSavedata(
        gs.studio.createContentOfSaveFile("インスペクタ")
      )
    );
    if (res instanceof Error) {
      return alert(
        "エラーが発生しました。`npm run api` を実行していない可能性があります。"
      );
    }
    alert("完了！");
  },
};
