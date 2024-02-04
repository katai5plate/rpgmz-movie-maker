import { Picture, PictureProps } from "../objects/Picture";
import { makeSheet } from "./maker";

export const Pictures = makeSheet<PictureProps>(
  "ピクチャ",
  ({ self: { sheet }, props }) => new Picture({ sheet, props })
);
