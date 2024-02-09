import { IProject } from "@theatre/core";
import { IExtension, IStudio } from "@theatre/studio";
import { toolbars } from "./toolbars";
import { initModal } from "./modal";

initModal();

export interface ExtensionProps {
  studio: IStudio;
  project: IProject;
}

export const extension: (props: ExtensionProps) => IExtension = (props) => ({
  id: "UI",
  toolbars: toolbars(props),
});
