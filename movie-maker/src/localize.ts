import { watchAndEdit } from "./utils";

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
      "<u>インスペクタ</u>から項目を選択して、そのプロパティを確認してください。";
  } catch {}
});
watchAndEdit(
  "#pointer-root > div > div.sc-dPZUQH.dCKgVu > div.sc-lnPyaJ.gtHpBQ > div > div > button",
  (node) => {
    node.textContent = "デバッグ用ステートを出力";
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
        "クリーニングされていない生の作業ファイルをダウンロードします。",
      "If your project uses assets, this will also create a zip file with all the assets that you can unpack in your public folder.":
        "",
      "Here is a quick guide on how to export to production.":
        "Theatre.js の関連ページを開く",
    }).forEach(([before, after]) => {
      if (child.textContent === before) child.textContent = after;
    });
  });
});
