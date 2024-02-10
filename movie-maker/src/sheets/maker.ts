import { IProject, ISheet } from "@theatre/core";
import { Container } from "pixi.js";
import { gs } from "../globalState";
import { TheatreObjectBase, TheatreObjectPropsBase } from "../objects/maker";

export class TheatreSheetBase<P extends TheatreObjectPropsBase> {
  name: string;
  project: IProject;
  sheet: ISheet;
  children: Map<string, TheatreObjectBase<{}>>;
  container: Container;
  instantiate: (args: {
    self: TheatreSheetBase<P>;
    props: P;
  }) => TheatreObjectBase<{}>;
  add(_props: P) {}
  remove(_name: string) {}
}

export const makeSheet = <P extends TheatreObjectPropsBase>(
  name: string,
  instantiate: (args: {
    self: TheatreSheetBase<P>;
    props: P;
  }) => TheatreObjectBase<{}>
) =>
  class TheatreSheet extends TheatreSheetBase<P> {
    constructor({ list }: { list: P[] }) {
      super();
      this.name = name;
      this.project = gs.project;
      this.sheet = gs.project.sheet("シート", this.name);
      this.container = gs.container;
      this.children = new Map();
      this.instantiate = instantiate;
      list.forEach((props: P) => {
        this.add(props);
      });
    }
    add(props: P) {
      const target = this.instantiate({ self: this, props });
      this.children.set(props.name, target);
      if (target.sprite) {
        this.container.addChild(target.sprite);
      }
    }
    remove(name: string) {
      const target = this.children.get(name);
      if (!target)
        throw new Error(`指定の${this.name}が見つかりません: ${name}`);
      this.sheet.detachObject(name);
      target.unsubscribe();
      if (target.sprite) gs.container.removeChild(target.sprite);
      this.children.delete(name);
    }
  };
