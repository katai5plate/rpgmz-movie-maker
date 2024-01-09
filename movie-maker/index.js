import * as PIXI from "pixi.js";
import studio from "@theatre/studio";
import { getProject, types } from "@theatre/core";

const rgbToHex = ({ r, g, b }) =>
  (Math.round(r * 255) << 16) |
  (Math.round(g * 255) << 8) |
  Math.round(b * 255);

const observeDOMChanges = (selector, rootSelector, callback) => {
  const checkAndObserve = () => {
    const rootElement = document.querySelector(rootSelector);
    if (rootElement && rootElement.shadowRoot) {
      callback(rootElement.shadowRoot);

      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (
              (node.matches && node.matches(selector)) ||
              node.querySelectorAll
            ) {
              callback(node);
            }
          });
        });
      });

      observer.observe(rootElement.shadowRoot, {
        childList: true,
        subtree: true,
      });
    } else {
      setTimeout(checkAndObserve, 500);
    }
  };

  checkAndObserve();
};

const watchAndReplace = (selector, replaceFunction) => {
  observeDOMChanges(selector, "#theatrejs-studio-root", (node) => {
    if (node.matches && node.matches(selector)) {
      node.innerHTML = replaceFunction(node.innerHTML);
    } else if (node.querySelectorAll) {
      node.querySelectorAll(selector).forEach((childNode) => {
        childNode.innerHTML = replaceFunction(childNode.innerHTML);
      });
    }
  });
};

const watchAndEdit = (selector, editFunction) => {
  observeDOMChanges(selector, "#theatrejs-studio-root", (node) => {
    if (node.matches && node.matches(selector)) {
      editFunction(node);
    } else if (node.querySelectorAll) {
      node.querySelectorAll(selector).forEach(editFunction);
    }
  });
};

const app = new PIXI.Application({
  width: 800,
  height: 600,
  background: "#1099bb",
});

document.body.appendChild(app.view);

const project = getProject(document.title);
const sheet = project.sheet("レイヤー", "ピクチャ");

console.log(
  JSON.parse(
    localStorage.getItem(
      Object.keys(localStorage).find((x) => /theatre/.test(x))
    )
  )
);

studio.extend({
  id: "hello-world-extension",
  toolbars: {
    global(set, studio) {
      set([
        {
          type: "Icon",
          title: "Example Button",
          svgSource: "🍕",
          onClick: () => {},
        },
      ]);
      return () => console.log("toolbar removed!");
    },
  },
  panes: [
    {
      class: "example",
      mount({ paneId, node }) {
        studio.ui.renderToolset("exampleToolbar", node);
        return () => console.log("pane closed!");
      },
    },
  ],
});
studio.initialize();

const container = new PIXI.Container();
app.stage.addChild(container);

console.log();

class Picture {
  constructor(name, href) {
    this.name = name;
    this.href = href;
    this.sprite = PIXI.Sprite.from(href);

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
        grid: types.number(1, { range: [0, Infinity] }),
        x: types.number(200, { nudgeMultiplier: 1 }),
        y: types.number(100, { nudgeMultiplier: 1 }),
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

watchAndReplace("#pointer-root > div > div.sc-dcJsrY.cxwChO > div", (html) =>
  html
    .replace("Docs", "Theatre.js の説明書")
    .replace("Changelog", "Theatre.js の履歴")
    .replace("Github", "Theatre.js の GitHub")
    .replace("Twitter", "Theatre.js の Twitter")
    .replace("Discord", "Theatre.js の Discord")
    .replace("Version", "Theatre.js")
    .replace("No notifications", "問題なし")
    .replace(
      "Notifications will appear here when you get them.",
      "何か問題が発生したらここに表示されます"
    )
);

watchAndEdit("#pointer-root > div > div.sc-dcJsrY.cxwChO > ul", (node) => {
  [...node.childNodes].forEach((child) => {
    Object.entries({
      "Reset all to default": "すべてデフォルトに戻す",
      "Make all static": "すべて固定値にする",
      "Sequence all": "すべてアニメーションする",
      "Reset to default": "デフォルトに戻す",
      Sequence: "アニメーションする",
      //
      "Keyframe Track": "キーフレームトラック:",
      "Aggregate Keyframe Track": "複数キーフレームトラック:",
      Tween: "ツイーン:",
      "Aggregate Tween": "複数ツイーン:",
      Keyframe: "キーフレーム:",
      "Aggregate Keyframe": "複数キーフレーム:",
      //
      Copy: "コピー",
      Delete: "削除",
      "Paste Keyframes": "キーフレームをペースト",
    }).forEach(([before, after]) => {
      if (child.textContent === before) child.textContent = after;
    });
  });
});
watchAndEdit(
  "#pointer-root > div > div.sc-gEkIjz.exygSb.sc-bOhtcR.gXdrPR",
  (node) => {
    const seqLength = node.querySelector(".sc-fulCBj.gaIoHz");
    const [matches, sec] = seqLength.textContent.match(
      /Sequence length:\s+(.*?)s/
    );
    if (matches) seqLength.textContent = `上限: ${sec}秒`;
  }
);
