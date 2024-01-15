import { getProject } from "@theatre/core";
import studio from "@theatre/studio";
import demo from "./demo";
import "./localize";
import { Application, Container } from "pixi.js";
import { Pictures } from "./sheets/Pictures";

const app = new Application({
  width: 816,
  height: 624,
  background: "#1099bb",
});

document.body.appendChild(app.view as HTMLCanvasElement);

// console.log(
//   JSON.parse(
//     localStorage.getItem(
//       Object.keys(localStorage).find((x) => /theatre/.test(x)) ?? ""
//     ) ?? ""
//   )?.historic.innerState.coreByProject.Document
// );

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

const container = new Container();
app.stage.addChild(container);

const project = getProject(document.title, {
  state: demo,
});
// const sheetOptions = project.sheet("レイヤー", "プロジェクト");

new Pictures(project, container, [
  { name: "文章窓", href: "./pictures/meswin.png", pos: { x: 0, y: 384 } },
  { name: "ボタン1", href: "./pictures/button.png", pos: { x: 24, y: 24 } },
  { name: "ボタン2", href: "./pictures/button.png", pos: { x: 24, y: 144 } },
  { name: "ボタン3", href: "./pictures/button.png", pos: { x: 24, y: 264 } },
  { name: "名刺", href: "./pictures/meishi.png", pos: { x: 384, y: 72 } },
]);
