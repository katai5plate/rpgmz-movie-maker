import * as PIXI from "pixi.js";
import studio from "@theatre/studio";
import { getProject, types } from "@theatre/core";

const rgbToHex = ({ r, g, b }) =>
  (Math.round(r * 255) << 16) |
  (Math.round(g * 255) << 8) |
  Math.round(b * 255);

const app = new PIXI.Application({
  width: 800,
  height: 600,
  background: "#1099bb",
});

document.body.appendChild(app.view);

const project = getProject(document.title);
const sheet = project.sheet("Layer", "Pictures");

console.log(
  JSON.parse(
    localStorage.getItem(
      Object.keys(localStorage).find((x) => /theatre/.test(x))
    )
  )
);

studio.initialize();

const container = new PIXI.Container();
app.stage.addChild(container);

console.log();

class Picture {
  constructor(name, href) {
    this.name = name;
    this.href = href;
    this.sprite = new PIXI.Sprite(PIXI.Texture.from(href));
    this.blur = new PIXI.BlurFilter(0);
    this.sprite.filters = [this.blur];

    this.obj = sheet.object(name, {
      origin: types.stringLiteral("s", {
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
        x: app.screen.width / 2,
        y: app.screen.height / 2,
      },
      scale: {
        zoom: types.number(1, { range: [0, 8] }),
        x: types.number(1, { range: [0, 8] }),
        y: types.number(1, { range: [0, 8] }),
      },
      blend: types.stringLiteral("normal", {
        normal: "NORMAL",
        add: "ADD",
        mul: "MULTILY",
        screen: "SCREEN",
      }),
      angle: 0,
      tint: types.rgba({ r: 1, g: 1, b: 1, a: 1 }),
      blur: {
        x: 0,
        y: 0,
      },
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
      this.sprite.x = v.pos.x;
      this.sprite.y = v.pos.y;
      this.sprite.scale.set(v.scale.zoom + v.scale.x, v.scale.zoom + v.scale.y);
      switch (v.blend) {
        case "add":
          this.sprite.blendMode = PIXI.BLEND_MODES.ADD;
          break;
        case "mul":
          this.sprite.blendMode = PIXI.BLEND_MODES.MULTIPLY;
          break;
        case "screen":
          this.sprite.blendMode = PIXI.BLEND_MODES.SCREEN;
          break;
        default:
          this.sprite.blendMode = PIXI.BLEND_MODES.NORMAL;
          break;
      }
      this.sprite.angle = v.angle;
      this.blur.blurX = v.blur.x;
      this.blur.blurY = v.blur.y;
      this.sprite.tint = rgbToHex(v.tint);
      this.sprite.alpha = v.tint.a;
    });
  }
}

const pictures = [
  new Picture("Test", "https://pixijs.com/assets/flowerTop.png"),
];

pictures.forEach((picture) => {
  container.addChild(picture.sprite);
});
