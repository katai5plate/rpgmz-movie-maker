import { ToolConfig } from "@theatre/studio";
import { getPictureList } from "../../api";
import { gs } from "../../globalState";
import { closeModal, openModal } from "../modal";

export const addPicture: ToolConfig = {
  type: "Icon",
  title: "ピクチャ追加",
  svgSource: "P+",
  onClick: () => {
    openModal("ピクチャを追加する", async (node) => {
      const res = await getPictureList();
      if (res instanceof Error) {
        node.innerHTML =
          "データが取得できません。<code>npm run api</code> を実行していないか、許可されていません。";
        return;
      }
      node.innerHTML = `
      <p><code>movie-maker/pictures</code> の中にある <code>*.png</code> ファイルを参照しています。</p>
      <div class="gallery"></div>
`;
      const gallery = node.querySelector(".gallery") as HTMLDivElement;
      res.forEach((filename) => {
        const item = document.createElement("div");
        item.className = "gallery-item";

        const image = document.createElement("img");
        const span = document.createElement("span");
        const href = `./pictures/${filename}`;
        image.src = href;
        image.alt = span.textContent = filename;
        item.onclick = () => {
          const alias = prompt(
            "識別名を入力してください",
            filename.replace(".png", "")
          );
          if (!alias) return;
          const name = `${alias}: ${filename}`;
          if (alias.match(": "))
            return alert("使用できない文字列が含まれています。");
          if (gs.pictures.children.has(name))
            return alert("重複しているため使用できません。");
          gs.pictures.add({ name, href });
        };

        item.append(image, span);
        gallery.appendChild(item);
      });
    });
  },
};

export const removePicture: ToolConfig = {
  type: "Icon",
  title: "ピクチャ削除",
  svgSource: "P-",
  onClick: () => {
    openModal("ピクチャを削除する", (node) => {
      const names = [...gs.pictures.children.keys()];
      const ul = document.createElement("ul");
      names.forEach((name) => {
        const li = document.createElement("li");
        li.innerHTML = `<u>${name}</u>`;
        li.onclick = () => {
          if (!confirm("本当に削除しますか？\n" + name)) return;
          gs.pictures.remove(name);
          closeModal();
        };
        ul.appendChild(li);
      });
      node.appendChild(ul);
    });
  },
};
