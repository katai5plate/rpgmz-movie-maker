# rpgmz-movie-maker

ツクール MZ 専用ムービーメーカー

## エディタの起動

```bash
npm i
npm run dev
# http://127.0.0.1:5173/
```

### ゲーム画面解像度の変更方法

- index.html の `main({ width, height })` の値を書き換えて変更してください。

## プラグインの使用方法（予定）

1. [ここ](https://cdn.jsdelivr.net/npm/@theatre/browser-bundles@0.7.0/dist/core-only.min.js) から Theatre.js をダウンロードし、`js/libs` に入れる。
2. エディタで作成した JSON を `js/tween/` に入れる（ない場合作成する）。
3. ツクールでプラグインを有効化する
4. プラグインコマンドから「再生」を選ぶ

## 開発計画

- まず pixi.js でゲームスクリーンとピクチャを再現する
  - 画面サイズの設定・ピクチャの追加などもできるようにする
- ビューアーを Theatre.js と結合
  - JSON を保存できるようにする
- ツクール MZ でプラグインとして JSON を再生できるようにする

## ライセンス

このソフトウェアおよびプラグインは Theatre.js を使用しているため、その利用方法によってライセンス規約が変化します。

### このプラグインと Theatre.js をゲームに同梱して利用する場合

- Theatre.js は Apache License Version 2.0 に従ってください。
- このプラグイン単品は MIT ライセンスです。

### このムービーメーカーのソースコードを用いて別のソフトウェアを作る場合

- Theatre.js の本体コードは Apache License Version 2.0 です。
- Theatre.js の Studio は AGPL 3.0 License です。
- このムービーメーカーも AGPL 3.0 License です。
