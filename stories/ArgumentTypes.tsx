import { ArgTypes } from "@storybook/react"
import { NodalBackgroundMode } from "../src/NodalBackground"

export const DefaultArguments: any = {
  mode: NodalBackgroundMode.AntiGravity,
  linkColor: "#222222",
  nodeColor: "#222222",
  numberOfNodes: 100,
  fps: 30,
}

export const ArgumentTypes: ArgTypes = {
  mode: {
    description:
      "The type of the behaviour of the nodes. Greatly affects the visuals.",
    control: {
      type: "radio",
    },
    options: [
      NodalBackgroundMode.AntiGravity,
      NodalBackgroundMode.Gravity,
      NodalBackgroundMode.Simple,
    ],
    table: {
      type: { summary: "enum[AntiGravity|Gravity|Simple]" },
      defaultValue: { summary: "AntiGravity" },
    },
  },

  numberOfNodes: {
    description: "Target number of nodes in a 1200x1200 area (fuzzy).",
    control: {
      type: "range",
      min: 1,
      max: 300,
      step: 1,
    },
    table: {
      type: { summary: "number" },
      defaultValue: { summary: 100 },
    },
  },

  fps: {
    description: "Target fps",
    control: {
      type: "range",
      min: 1,
      max: 300,
      step: 1,
    },
    table: {
      type: { summary: "number" },
      defaultValue: { summary: 30 },
    },
  },

  linkColor: {
    description: "Color of the links between nodes.",
    control: {
      type: "color",
    },
    table: {
      type: { summary: "hex color" },
      defaultValue: { summary: "#000000" },
    },
  },

  nodeColor: {
    description: "Color of the nodes.",
    control: {
      type: "color",
    },
    table: {
      type: { summary: "hex color" },
      defaultValue: { summary: "#000000" },
    },
  },
}
