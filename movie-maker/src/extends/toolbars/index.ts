import { IExtension } from "@theatre/studio";
import { gs } from "../../globalState";
import { openFile } from "./openFile";
import { addPicture, removePicture } from "./picture";
import { saveFile } from "./saveFile";
import { cleanupUnuseDataFromSavedata } from "../../utils";

export const toolbars: IExtension["toolbars"] = {
  global(set) {
    set([
      {
        type: "Icon",
        title: "新規作成",
        svgSource: "📄",
        onClick: () => window.open("?"),
      },
      openFile,
      saveFile,
      addPicture,
      removePicture,
      {
        type: "Icon",
        title: "変数追加",
        svgSource: "V+",
        onClick: () => alert("ここから変数追加できるようにする予定"),
      },
      {
        type: "Icon",
        title: "変数削除",
        svgSource: "V-",
        onClick: () => alert("ここから変数削除できるようにする予定"),
      },
      {
        type: "Icon",
        title: "デバッグ",
        svgSource: "？",
        onClick: () => {
          const save = gs.studio.createContentOfSaveFile("インスペクタ");
          console.log({
            gs,
            save,
            optimizedSave: cleanupUnuseDataFromSavedata(save),
          });
        },
      },
    ]);
    return () => console.log("toolbar removed!");
  },
};
