import { types } from "@theatre/core";
import { TypeNumber, TypeString, makeObject } from "./maker";

export interface VariableProps {
  name: string;
  type: "INT" | "FLOAT" | "TEXT";
  value?: number | string;
}

export const Variable = makeObject<
  VariableProps,
  {
    value: TypeNumber | TypeString;
  }
>("Variable", ({ props }) => ({
  obj: {
    value:
      props.type === "TEXT"
        ? types.string(props.value ? String(props.value) : "", {
            label: "文字列",
          })
        : types.number(
            typeof props.value === "number" ? Number(props.value) : 0,
            props.type === "INT" ? { nudgeMultiplier: 1 } : {}
          ),
  },
  onChange: (_v) => {
    //
  },
}));
