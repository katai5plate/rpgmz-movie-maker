import { ISheet, ISheetObject, types } from "@theatre/core";
import { BLEND_MODES, Sprite } from "pixi.js";
import { rgbToHex } from "../utils";

type PICTURE_ORIGIN = "q" | "w" | "e" | "a" | "s" | "d" | "z" | "x" | "c";
type PICTURE_BLEND_MODE = "NORMAL" | "ADD" | "MUL" | "SCREEN";

export interface PictureProps {
  name: string;
  href: string;
  origin?: PICTURE_ORIGIN;
  pos?: {
    grid?: number;
    x: number;
    y: number;
    ofs?: {
      x?: number;
      y?: number;
    };
  };
  scale?: {
    zoom: number;
    per?: {
      x?: number;
      y?: number;
    };
  };
  blend?: PICTURE_BLEND_MODE;
  angle?: number;
  tint?: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
}

const pictureOriginType = (origin?: PICTURE_ORIGIN) => {
  const modes = {
    q: "┌ top left",
    w: "↑ top center",
    e: "┐ top right",
    a: "← center left",
    s: "・ center",
    d: "→ center right",
    z: "└ bottom left",
    x: "↓ bottom center",
    c: "┘ bottom right",
  } as const;
  const test = modes[origin?.toLowerCase() || ""];
  if (origin && !test) console.warn("無効な原点が指定されました:", origin);
  const value: PICTURE_ORIGIN = test ?? "q";
  return types.stringLiteral(value, modes);
};
const pictureBlendType = (blend?: PICTURE_BLEND_MODE) => {
  const modes = {
    NORMAL: "NORMAL",
    ADD: "ADD",
    MUL: "MUL",
    SCREEN: "SCREEN",
  } as const;
  const test = modes[blend?.toUpperCase() || ""];
  if (blend && !test)
    console.warn("無効なブレンドモードが指定されました:", blend);
  const value: PICTURE_BLEND_MODE = test ?? "NORMAL";
  return types.stringLiteral(value, modes);
};

export class Picture {
  sheet: ISheet;
  sprite: Sprite;
  obj: ISheetObject<{
    origin: ReturnType<typeof pictureOriginType>;
    pos: {
      grid: number;
      x: number;
      y: number;
      ofs: {
        x: number;
        y: number;
      };
    };
    scale: {
      zoom: number;
      per: {
        x: number;
        y: number;
      };
    };
    blend: ReturnType<typeof pictureBlendType>;
    angle: number;
    tint: {
      r: number;
      g: number;
      b: number;
      a: number;
    };
  }>;
  unsubscribe: () => void;
  constructor(sheet: ISheet, props: PictureProps) {
    this.sheet = sheet;
    this.sprite = Sprite.from(props.href);

    this.obj = this.sheet.object(props.name, {
      origin: pictureOriginType(props.origin),
      pos: {
        grid: types.number(props.pos?.grid ?? 1, {
          range: [0, Infinity],
          nudgeMultiplier: 1,
        }),
        x: types.number(props.pos?.x ?? 200, { nudgeMultiplier: 1 }),
        y: types.number(props.pos?.y ?? 200, { nudgeMultiplier: 1 }),
        ofs: {
          x: types.number(props.pos?.ofs?.x ?? 0, { nudgeMultiplier: 1 }),
          y: types.number(props.pos?.ofs?.y ?? 0, { nudgeMultiplier: 1 }),
        },
      },
      scale: {
        zoom: types.number(props.scale?.zoom ?? 1, { range: [0, 10] }),
        per: {
          x: types.number(props.scale?.per?.x ?? 1, { range: [0, 1] }),
          y: types.number(props.scale?.per?.y ?? 1, { range: [0, 1] }),
        },
      },
      blend: pictureBlendType(props.blend),
      angle: props.angle ?? 0,
      tint: types.rgba({
        r: props.tint?.r ?? 1,
        g: props.tint?.g ?? 1,
        b: props.tint?.b ?? 1,
        a: props.tint?.a ?? 1,
      }),
    });
    this.obj.onValuesChange((v) => {
      switch (v.origin) {
        case "q":
          this.sprite.anchor.set(0, 0);
          break;
        case "w":
          this.sprite.anchor.set(0.5, 0);
          break;
        case "e":
          this.sprite.anchor.set(1, 0);
          break;
        case "a":
          this.sprite.anchor.set(0, 0.5);
          break;
        case "s":
          this.sprite.anchor.set(0.5, 0.5);
          break;
        case "d":
          this.sprite.anchor.set(1, 0.5);
          break;
        case "z":
          this.sprite.anchor.set(0, 1);
          break;
        case "x":
          this.sprite.anchor.set(0.5, 1);
          break;
        case "c":
          this.sprite.anchor.set(1, 1);
          break;
        default:
          break;
      }
      this.sprite.x = v.pos.grid * v.pos.x + v.pos.ofs.x;
      this.sprite.y = v.pos.grid * v.pos.y + v.pos.ofs.y;
      this.sprite.scale.set(
        v.scale.zoom * v.scale.per.x,
        v.scale.zoom * v.scale.per.y
      );
      switch (v.blend) {
        case "ADD":
          this.sprite.blendMode = BLEND_MODES.ADD;
          break;
        case "MUL":
          this.sprite.blendMode = BLEND_MODES.MULTIPLY;
          break;
        case "SCREEN":
          this.sprite.blendMode = BLEND_MODES.SCREEN;
          break;
        default:
          this.sprite.blendMode = BLEND_MODES.NORMAL;
          break;
      }
      this.sprite.angle = v.angle;
      this.sprite.tint = rgbToHex(v.tint);
      this.sprite.alpha = v.tint.a;
    });
  }
}
