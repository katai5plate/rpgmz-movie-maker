import { Variable, VariableProps } from "../objects/Variable";
import { makeSheet } from "./maker";

export const Variables = makeSheet<VariableProps>(
  "変数",
  ({ self: { sheet }, props }) => new Variable({ sheet, props })
);
