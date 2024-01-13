import { ISheet, ISheetObject, types } from "@theatre/core";
import { BLEND_MODES, Sprite } from "pixi.js";
import { rgbToHex } from "./utils";

const pictureProps = ({
  corner,
  x,
  y,
}: {
  corner: boolean;
  x: number;
  y: number;
}) => ({
  origin: types.stringLiteral(corner ? "q" : "s", {
    q: "┌ top left",
    w: "↑ top center",
    e: "┐ top right",
    a: "← center left",
    s: "・ center",
    d: "→ center right",
    z: "└ bottom left",
    x: "↓ bottom center",
    c: "┘ bottom right",
  }),
  pos: {
    grid: types.number(1, { range: [0, Infinity] }),
    x: types.number(x ?? 200, { nudgeMultiplier: 1 }),
    y: types.number(y ?? 200, { nudgeMultiplier: 1 }),
    ofs: {
      x: types.number(0, { nudgeMultiplier: 1 }),
      y: types.number(0, { nudgeMultiplier: 1 }),
    },
  },
  scale: {
    xy: types.number(1, { range: [0, 10] }),
    ofs: {
      x: types.number(0, { range: [0, 10] }),
      y: types.number(0, { range: [0, 10] }),
    },
  },
  blend: types.stringLiteral("normal", {
    normal: "NORMAL",
    add: "ADD",
    mul: "MULTILY",
    screen: "SCREEN",
  }),
  angle: 0,
  tint: types.rgba({ r: 1, g: 1, b: 1, a: 1 }),
});

export class Picture {
  sheet: ISheet;
  name: string;
  href: string;
  sprite: Sprite;
  obj: ISheetObject<ReturnType<typeof pictureProps>>;
  constructor(
    sheet: ISheet,
    name: string,
    href: string,
    {
      corner,
      x,
      y,
    }: {
      corner: boolean;
      x: number;
      y: number;
    }
  ) {
    this.sheet = sheet;
    this.name = name;
    this.href = href;
    this.sprite = Sprite.from(href);

    this.obj = this.sheet.object(name, pictureProps({ corner, x, y }));
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
        v.scale.xy + v.scale.ofs.x,
        v.scale.xy + v.scale.ofs.y
      );
      switch (v.blend) {
        case "add":
          this.sprite.blendMode = BLEND_MODES.ADD;
          break;
        case "mul":
          this.sprite.blendMode = BLEND_MODES.MULTIPLY;
          break;
        case "screen":
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
