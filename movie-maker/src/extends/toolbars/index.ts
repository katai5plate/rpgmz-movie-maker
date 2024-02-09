import { IExtension } from "@theatre/studio";
import { ExtensionProps } from "..";
import { openFile } from "./openFile";

export const toolbars: (props: ExtensionProps) => IExtension["toolbars"] = (
  props
) => ({
  global(set, studio) {
    set([
      openFile(props),
      {
        type: "Icon",
        title: "保存",
        svgSource: "💾",
        onClick: () => {
          console.log(studio.createContentOfSaveFile("ムービーメーカー"));
        },
      },
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
