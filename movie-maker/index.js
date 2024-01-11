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

// const watchAndReplace = (selector, replaceFunction) => {
//   observeDOMChanges(selector, "#theatrejs-studio-root", (node) => {
//     if (node.matches && node.matches(selector)) {
//       node.innerHTML = replaceFunction(node.innerHTML);
//     } else if (node.querySelectorAll) {
//       node.querySelectorAll(selector).forEach((childNode) => {
//         childNode.innerHTML = replaceFunction(childNode.innerHTML);
//       });
//     }
//   });
// };

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
  width: 816,
  height: 624,
  background: "#1099bb",
});

document.body.appendChild(app.view);

const project = getProject(document.title, {
  state: {
    sheetsById: {
      レイヤー: {
        staticOverrides: {
          byObject: {
            名刺: {
              pos: {
                y: 188,
                x: 542,
              },
              angle: -7,
              origin: "s",
            },
            ボタン3: {
              tint: {
                r: 1,
                g: 1,
                b: 1,
                a: 0.53,
              },
            },
          },
        },
        sequence: {
          subUnitsPerUnit: 30,
          length: 10,
          type: "PositionalSequence",
          tracksByObject: {
            名刺: {
              trackData: {
                z85FF0s4Gh: {
                  type: "BasicKeyframedTrack",
                  __debugName: '名刺:["angle"]',
                  keyframes: [
                    {
                      id: "BDSS81Y0dL",
                      position: 0,
                      connectedRight: true,
                      handles: [0.5, 1, 0.5, 0],
                      type: "bezier",
                      value: 388,
                    },
                    {
                      id: "P7mL5mM00X",
                      position: 1.467,
                      connectedRight: true,
                      handles: [
                        0.11656441717791415, 0.8637777777777778, 0.5, 0,
                      ],
                      type: "bezier",
                      value: -14.278243555555562,
                    },
                  ],
                },
                vT4IDuGOKL: {
                  type: "BasicKeyframedTrack",
                  __debugName: '名刺:["pos","x"]',
                  keyframes: [
                    {
                      id: "pDtCgSUmkO",
                      position: 0,
                      connectedRight: true,
                      handles: [0.5, 1, 0.5, 0],
                      type: "bezier",
                      value: 1034,
                    },
                    {
                      id: "jUlELruhrq",
                      position: 1.467,
                      connectedRight: true,
                      handles: [0, 1.08, 0.5, 0],
                      type: "bezier",
                      value: 569,
                    },
                  ],
                },
              },
              trackIdByPropPath: {
                '["angle"]': "z85FF0s4Gh",
                '["pos","x"]': "vT4IDuGOKL",
              },
            },
            文章窓: {
              trackData: {
                IyfmbANeya: {
                  type: "BasicKeyframedTrack",
                  __debugName: '文章窓:["scale","ofs","x"]',
                  keyframes: [
                    {
                      id: "EhMYi7KxkY",
                      position: 0,
                      connectedRight: true,
                      handles: [0.5, 1, 0.5, 0],
                      type: "bezier",
                      value: 0,
                    },
                  ],
                },
                R7FwRPKMgS: {
                  type: "BasicKeyframedTrack",
                  __debugName: '文章窓:["scale","ofs","y"]',
                  keyframes: [],
                },
                POq1Rbj6V4: {
                  type: "BasicKeyframedTrack",
                  __debugName: '文章窓:["scale","xy"]',
                  keyframes: [
                    {
                      id: "vNDJbEZ5Wq",
                      position: 0,
                      connectedRight: true,
                      handles: [0.5, 1, 0.5, 0],
                      type: "bezier",
                      value: 0,
                    },
                    {
                      id: "08w2s9JnAz",
                      position: 0.433,
                      connectedRight: true,
                      handles: [0.5, 1, 0.5, 0],
                      type: "bezier",
                      value: 1,
                    },
                  ],
                },
              },
              trackIdByPropPath: {
                '["scale","ofs","x"]': "IyfmbANeya",
                '["scale","ofs","y"]': "R7FwRPKMgS",
                '["scale","xy"]': "POq1Rbj6V4",
              },
            },
            ボタン1: {
              trackData: {
                xhn4agpu2T: {
                  type: "BasicKeyframedTrack",
                  __debugName: 'ボタン1:["tint"]',
                  keyframes: [
                    {
                      id: "q4cofyx5Sh",
                      position: 0,
                      connectedRight: true,
                      handles: [0.5, 1, 0.5, 0],
                      type: "bezier",
                      value: {
                        r: 0.9882352941176471,
                        g: 0.9411764705882353,
                        b: 0,
                        a: 1,
                      },
                    },
                  ],
                },
              },
              trackIdByPropPath: {
                '["tint"]': "xhn4agpu2T",
              },
            },
          },
        },
      },
    },
    definitionVersion: "0.4.0",
    revisionHistory: ["yDNhHSHp2qYJjYDC"],
  },
});
const sheet = project.sheet("レイヤー", "ピクチャ");

console.log(
  JSON.parse(
    localStorage.getItem(
      Object.keys(localStorage).find((x) => /theatre/.test(x))
    )
  )?.historic.innerState.coreByProject.Document
);

// studio.extend({
//   id: "hello-world-extension",
//   toolbars: {
//     global(set, studio) {
//       set([
//         {
//           type: "Icon",
//           title: "Example Button",
//           svgSource: "🍕",
//           onClick: () => {},
//         },
//       ]);
//       return () => console.log("toolbar removed!");
//     },
//   },
//   panes: [
//     {
//       class: "example",
//       mount({ paneId, node }) {
//         studio.ui.renderToolset("exampleToolbar", node);
//         return () => console.log("pane closed!");
//       },
//     },
//   ],
// });
studio.initialize();

const container = new PIXI.Container();
app.stage.addChild(container);

class Picture {
  constructor(name, href, { corner, x, y } = {}) {
    this.name = name;
    this.href = href;
    this.sprite = PIXI.Sprite.from(href);

    this.obj = sheet.object(name, {
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
  new Picture("文章窓", "./pictures/meswin.png", {
    corner: true,
    x: 0,
    y: 384,
  }),
  new Picture("ボタン1", "./pictures/button.png", {
    corner: true,
    x: 24,
    y: 24,
  }),
  new Picture("ボタン2", "./pictures/button.png", {
    corner: true,
    x: 24,
    y: 144,
  }),
  new Picture("ボタン3", "./pictures/button.png", {
    corner: true,
    x: 24,
    y: 264,
  }),
  new Picture("名刺", "./pictures/meishi.png", { corner: true, x: 384, y: 72 }),
];

pictures.forEach((picture) => {
  container.addChild(picture.sprite);
});

watchAndEdit("#pointer-root > div > div.sc-dcJsrY.cxwChO > div", (node) => {
  [...node.childNodes].forEach((child) => {
    Object.entries({
      Docs: "Theatre.js の説明書",
      Changelog: "Theatre.js の履歴",
      Github: "Theatre.js の GitHub",
      Twitter: "Theatre.js の Twitter",
      Discord: "Theatre.js の Discord",
      Version: "Theatre.js",
      // "No notifications": "問題なし",
      // "Notifications will appear here when you get them.":
      //   "何か問題が発生したらここに表示されます",
      "No notificationsNotifications will appear here when you get them.":
        "何か問題が発生したらここに表示されます",
    }).forEach(([before, after]) => {
      if (child.textContent === before) child.textContent = after;
    });
  });
});
watchAndEdit("#pointer-root > div > div.sc-dPZUQH.dCKgVu > div", (node) => {
  try {
    node.querySelector("a").textContent = "Theatre.js の関連ページを開く";
    node.querySelector("div > div:nth-child(2)").innerHTML =
      "<u>インスペクタ</u>からピクチャを選択して、そのプロパティを確認してください。";
  } catch {}
});
watchAndEdit(
  "#pointer-root > div > div.sc-dPZUQH.dCKgVu > div.sc-lnPyaJ.gtHpBQ > div > div > button",
  (node) => {
    node.textContent = "JSON ファイルとして保存";
  }
);

watchAndEdit("#pointer-root > div > div.sc-dcJsrY.cxwChO > ul", (node) => {
  [...node.childNodes].forEach((child) => {
    Object.entries({
      "Reset to default": "デフォルトに戻す",
      "Reset all to default": "すべてデフォルトに戻す",
      "Make static": "固定値にする",
      "Make all static": "すべて固定値にする",
      Sequence: "アニメーションする",
      "Sequence all": "すべてアニメーションする",
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
watchAndEdit("#pointer-root > div > div.sc-dcJsrY.cxwChO > div", (node) => {
  [...node.childNodes].forEach((child) => {
    Object.entries({
      "This will create a JSON file with the state of your project. You can commit this file to your git repo and include it in your production bundle.":
        "プロジェクトの状態を含む JSON ファイルをダウンロードします。",
      "If your project uses assets, this will also create a zip file with all the assets that you can unpack in your public folder.":
        "",
      "Here is a quick guide on how to export to production.":
        "Theatre.js の関連ページを開く",
    }).forEach(([before, after]) => {
      if (child.textContent === before) child.textContent = after;
    });
  });
});
