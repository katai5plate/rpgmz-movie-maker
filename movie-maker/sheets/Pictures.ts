import { Container } from "pixi.js";
import { Picture, PictureProps } from "../objects/Picture";
import { IProject, ISheet } from "@theatre/core";

export class Pictures {
  project: IProject;
  sheet: ISheet;
  children: Map<string, Picture>;
  container: Container;
  constructor(project: IProject, container: Container, list: PictureProps[]) {
    this.project = project;
    this.sheet = project.sheet("レイヤー", "ピクチャ");
    this.container = container;
    this.children = new Map();
    list.forEach((props) => {
      this.addPicture(props);
    });
  }
  addPicture(props: PictureProps) {
    const picture = new Picture(this.sheet, props);
    this.children.set(props.name, picture);
    this.container.addChild(picture.sprite);
  }
  removePicture(name: string) {
    const picture = this.children.get(name);
    if (!picture) throw new Error("指定のピクチャが見つかりません");
    this.sheet.detachObject(picture.obj.address.objectKey);
  }
}
