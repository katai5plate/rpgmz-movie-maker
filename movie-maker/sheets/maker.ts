import { IProject, ISheet, ISheetObject } from "@theatre/core";
import { Container, Sprite } from "pixi.js";
import { TheatreObjectBase, TheatreObjectPropsBase } from "../objects/maker";

export class TheatreSheetBase<P extends TheatreObjectPropsBase> {
  name: string;
  project: IProject;
  sheet: ISheet;
  children: Map<string, TheatreObjectBase<{}>>;
  container?: Container;
  instantiate: (args: {
    self: TheatreSheetBase<P>;
    props: P;
  }) => TheatreObjectBase<{}>;
}

export const makeSheet = <P extends TheatreObjectPropsBase>(
  name: string,
  instantiate: (args: {
    self: TheatreSheetBase<P>;
    props: P;
  }) => TheatreObjectBase<{}>
) =>
  class TheatreSheet extends TheatreSheetBase<P> {
    constructor({
      project,
      container,
      list,
    }: {
      project: IProject;
      container?: Container;
      list: P[];
    }) {
      super();
      this.name = name;
      this.project = project;
      this.sheet = project.sheet("レイヤー", this.name);
      this.container = container;
      this.children = new Map();
      this.instantiate = instantiate;
      list.forEach((props: P) => {
        this.add(props);
      });
    }
    add(props: P) {
      const target = this.instantiate({ self: this, props });
      this.children.set(props.name, target);
      if (this.container) {
        if (!target.sprite) {
          throw new Error("スプライトが見つかりません: " + props.name);
        }
        this.container.addChild(target.sprite);
      } else {
        if (target.sprite) {
          console.warn(
            "コンテナが指定されているにも関わらずスプライトが設定されています:",
            props.name
          );
        }
      }
    }
    remove(name: string) {
      const target = this.children.get(name);
      if (!target)
        throw new Error(`指定の${this.name}が見つかりません: ${name}`);
      this.sheet.detachObject(target.obj.address.objectKey);
    }
  };
