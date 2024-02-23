import { IProject } from "@theatre/core";
import { IStudio } from "@theatre/studio";
import { Application, Container } from "pixi.js";
import { PictureProps } from "./objects/Picture";
import { VariableProps } from "./objects/Variable";
import { TheatreSheetBase } from "./sheets/maker";

interface State {
  app: Application;
  project: IProject;
  projectState?: any;
  studio: IStudio;
  container: Container;
  pictures: TheatreSheetBase<PictureProps>;
  variables: TheatreSheetBase<VariableProps>;
  modal: HTMLDivElement;
}

export const gs: State = {} as State;
