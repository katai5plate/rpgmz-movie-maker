import { IExtension } from "@theatre/studio";
import { initModal } from "./modal";
import { toolbars } from "./toolbars";

initModal();

export interface ExtensionProps {}

export const extension: IExtension = {
  id: "UI",
  toolbars,
};
