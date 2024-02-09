import {
  ISheet,
  ISheetObject,
  UnknownShorthandCompoundProps,
  types,
} from "@theatre/core";
import { Sprite } from "pixi.js";

export interface TheatreObjectPropsBase {
  name: string;
  href?: string;
}

export class TheatreObjectBase<O extends {}> {
  name: string;
  sheet: ISheet;
  sprite?: Sprite;
  obj: ISheetObject<O>;
  unsubscribe: () => void;
}

export const makeObject = <P extends TheatreObjectPropsBase, O extends {}>(
  name: string,
  define: (args: { props: P; self: TheatreObjectBase<O> }) => {
    obj: O;
    onChange: Parameters<ISheetObject<O>["onValuesChange"]>[0];
  }
) =>
  class TheatreObject extends TheatreObjectBase<O> {
    constructor({ sheet, props }: { sheet: ISheet; props: P }) {
      super();
      const { obj, onChange } = define({ props, self: this });
      this.name = name;
      this.sheet = sheet;
      if (props.href) {
        this.sprite = Sprite.from(props.href);
      }
      this.obj = this.sheet.object(props.name, obj);
      this.unsubscribe = this.obj.onValuesChange(onChange);
    }
  };

export type TypeNumber = ReturnType<typeof types.number> | number;
export type TypeString = ReturnType<typeof types.string> | string;
export type TypeColor = ReturnType<typeof types.rgba>;

export const createStringLiteralType =
  <T extends string>(name: string, modes: Record<T, string>, defaultValue: T) =>
  (origin?: T) => {
    const test = modes[origin?.toLowerCase() || ""];
    if (origin && !test)
      throw new Error(`無効な${name}が指定されました: ${origin}`);
    return types.stringLiteral(test ?? defaultValue, modes, { label: name });
  };

export const compoundType = <T extends UnknownShorthandCompoundProps>(
  label: string,
  obj: T
): T => types.compound(obj, { label }) as object as T;
