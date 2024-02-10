import { types } from "@theatre/core";
import { BLEND_MODES } from "pixi.js";
import { rgbToHex } from "../utils";
import {
  TypeColor,
  TypeNumber,
  compoundType,
  createStringLiteralType,
  makeObject,
} from "./maker";

type PICTURE_ORIGIN = "q" | "w" | "e" | "a" | "s" | "d" | "z" | "x" | "c";
type PICTURE_BLEND_MODE = "NORMAL" | "ADD" | "MUL" | "SCREEN";

export interface PictureProps {
  name: string;
  href: string;
  origin?: PICTURE_ORIGIN;
  pos?: {
    grid?: number;
    set?: {
      x: number;
      y: number;
      z: number;
    };
    ofs?: {
      x?: number;
      y?: number;
      z: number;
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

const pictureOriginType = createStringLiteralType<PICTURE_ORIGIN>(
  "原点",
  {
    q: "┌ 左上",
    w: "↑ 上端",
    e: "┐ 右上",
    a: "← 左端",
    s: "・ 中央",
    d: "→ 右端",
    z: "└ 左下",
    x: "↓ 下端",
    c: "┘ 右下",
  },
  "q"
);
const pictureBlendType = createStringLiteralType<PICTURE_BLEND_MODE>(
  "合成",
  {
    NORMAL: "NORMAL",
    ADD: "ADD",
    MUL: "MUL",
    SCREEN: "SCREEN",
  },
  "NORMAL"
);

export const Picture = makeObject<
  PictureProps,
  {
    origin: ReturnType<typeof pictureOriginType>;
    pos: {
      grid: TypeNumber;
      set: {
        x: TypeNumber;
        y: TypeNumber;
        z: TypeNumber;
      };
      ofs: {
        x: TypeNumber;
        y: TypeNumber;
        z: TypeNumber;
      };
    };
    scale: {
      zoom: TypeNumber;
      per: {
        x: TypeNumber;
        y: TypeNumber;
      };
    };
    blend: ReturnType<typeof pictureBlendType>;
    angle: TypeNumber;
    tint: TypeColor;
  }
>("Picture", ({ props, self }) => ({
  obj: {
    origin: pictureOriginType(props.origin),
    pos: compoundType("位置", {
      grid: types.number(props.pos?.grid ?? 1, {
        range: [0, Infinity],
        nudgeMultiplier: 1,
        label: "□",
      }),
      set: compoundType("＝", {
        x: types.number(props.pos?.set?.x ?? 0, { nudgeMultiplier: 1 }),
        y: types.number(props.pos?.set?.y ?? 0, { nudgeMultiplier: 1 }),
        z: types.number(props.pos?.set?.z ?? 0, { nudgeMultiplier: 1 }),
      }),
      ofs: compoundType("＋", {
        x: types.number(props.pos?.ofs?.x ?? 0, { nudgeMultiplier: 1 }),
        y: types.number(props.pos?.ofs?.y ?? 0, { nudgeMultiplier: 1 }),
        z: types.number(props.pos?.ofs?.z ?? 0, { nudgeMultiplier: 1 }),
      }),
    }),
    scale: compoundType("拡大", {
      zoom: types.number(props.scale?.zoom ?? 1, {
        range: [0, 10],
        label: "率",
      }),
      per: compoundType("×", {
        x: types.number(props.scale?.per?.x ?? 1, { range: [0, 1] }),
        y: types.number(props.scale?.per?.y ?? 1, { range: [0, 1] }),
      }),
    }),
    blend: pictureBlendType(props.blend),
    angle: types.number(props.angle ?? 0, { label: "角度" }),
    tint: types.rgba(
      {
        r: props.tint?.r ?? 1,
        g: props.tint?.g ?? 1,
        b: props.tint?.b ?? 1,
        a: props.tint?.a ?? 1,
      },
      { label: "色調" }
    ),
  },
  onChange: (v) => {
    if (!self.sprite)
      throw new Error("スプライトが見つかりません: " + props.name);
    switch (v.origin) {
      case "q":
        self.sprite.anchor.set(0, 0);
        break;
      case "w":
        self.sprite.anchor.set(0.5, 0);
        break;
      case "e":
        self.sprite.anchor.set(1, 0);
        break;
      case "a":
        self.sprite.anchor.set(0, 0.5);
        break;
      case "s":
        self.sprite.anchor.set(0.5, 0.5);
        break;
      case "d":
        self.sprite.anchor.set(1, 0.5);
        break;
      case "z":
        self.sprite.anchor.set(0, 1);
        break;
      case "x":
        self.sprite.anchor.set(0.5, 1);
        break;
      case "c":
        self.sprite.anchor.set(1, 1);
        break;
      default:
        break;
    }
    self.sprite.x = v.pos.grid * v.pos.set.x + v.pos.ofs.x;
    self.sprite.y = v.pos.grid * v.pos.set.y + v.pos.ofs.y;
    self.sprite.zIndex = v.pos.set.z + v.pos.ofs.z;
    self.sprite.scale.set(
      v.scale.zoom * v.scale.per.x,
      v.scale.zoom * v.scale.per.y
    );
    switch (v.blend) {
      case "ADD":
        self.sprite.blendMode = BLEND_MODES.ADD;
        break;
      case "MUL":
        self.sprite.blendMode = BLEND_MODES.MULTIPLY;
        break;
      case "SCREEN":
        self.sprite.blendMode = BLEND_MODES.SCREEN;
        break;
      default:
        self.sprite.blendMode = BLEND_MODES.NORMAL;
        break;
    }
    self.sprite.angle = v.angle;
    self.sprite.tint = rgbToHex(v.tint);
    self.sprite.alpha = v.tint.a;
  },
}));
