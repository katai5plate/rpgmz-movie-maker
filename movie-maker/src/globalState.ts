import { Application, Container } from "pixi.js";
import { TheatreSheetBase } from "./sheets/maker";
import { IProject } from "@theatre/core";
import { IStudio } from "@theatre/studio";
import { TheatreObjectPropsBase } from "./objects/maker";
import { PictureProps } from "./objects/Picture";
import { VariableProps } from "./objects/Variable";

interface State {
  app: Application;
  project: IProject;
  projectState?: any;
  studio: IStudio;
  container: Container;
  pictures: TheatreSheetBase<PictureProps>;
  variables: TheatreSheetBase<VariableProps>;
}

export const gs: State = {} as State;
