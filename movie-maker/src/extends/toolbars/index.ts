import { IExtension } from "@theatre/studio";
import { ExtensionProps } from "..";
import { openFile } from "./openFile";
import { saveProjectFile } from "../../api";
import { saveFile } from "./saveFile";

export const toolbars: (props: ExtensionProps) => IExtension["toolbars"] = (
  props
) => ({
  global(set, studio) {
    set([
      openFile(props),
      saveFile(props),
      {
        type: "Icon",
        title: "ピクチャ追加",
        svgSource: "P+",
        onClick: () => console.log("ここからピクチャ追加"),
      },
      {
        type: "Icon",
        title: "ピクチャ削除",
        svgSource: "P-",
        onClick: () => console.log("ここからピクチャ削除"),
      },
      {
        type: "Icon",
        title: "変数追加",
        svgSource: "V+",
        onClick: () => console.log("ここから変数追加"),
      },
      {
        type: "Icon",
        title: "変数削除",
        svgSource: "V-",
        onClick: () => console.log("ここから変数削除"),
      },
      {
        type: "Icon",
        title: "Example Button",
        svgSource: "？",
        onClick: () => {
          console.log(props.project);
        },
      },
    ]);
    return () => console.log("toolbar removed!");
  },
});
