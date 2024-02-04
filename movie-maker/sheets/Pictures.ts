import { Picture, PictureProps } from "../objects/Picture";
import { makeSheet } from "./maker";

export const Pictures = makeSheet<PictureProps>(
  "ピクチャ",
  ({ self, props }) => new Picture({ sheet: self.sheet, props })
);
