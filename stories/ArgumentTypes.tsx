import { ArgTypes } from "@storybook/react"
import { NodalBackgroundMode } from "../src/main/NodalBackground"

export const DefaultArguments: any = {
  mode: NodalBackgroundMode.AntiGravity,
  linkColor: "#000000",
  nodeColor: "#000000",
  numberOfNodes: 100,
  preserveNumberOfNodes: true,
  fps: 30,
  fpsCounter: false,
  linkDash: [],
  nodeMaxInitialVelocity: 20,
  nodeInitialMass: 1.5,
  nodeAgeFactor: 0.5,
  nodeDeAgeFactor: 2,
  nodeVisualSize: 0.5,
  nodeMaxMass: 0,
  simMaxDistance: 150,
  simMinDistance: 3,
  simMassFactor: 1,
  simAttraction: 10,
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

  preserveNumberOfNodes: {
    description: "Whether to preserve the number of nodes.",
    control: {
      type: "boolean",
    },
    table: {
      type: { summary: "boolean" },
      defaultValue: { summary: true },
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

  nodeMaxInitialVelocity: {
    description: "Initial velocity of nodes.",
    control: {
      type: "range",
      min: 0,
      max: 300,
      step: 0.01,
    },
    table: {
      type: { summary: "number" },
      defaultValue: { summary: 20 },
    },
  },

  nodeInitialMass: {
    description: "Initial mass of the nodes.",
    control: {
      type: "range",
      min: 1,
      max: 100,
      step: 0.1,
    },
    table: {
      type: { summary: "number" },
      defaultValue: { summary: 1.5 },
    },
  },

  nodeMaxMass: {
    description: "Maximum node size when merging, prevents large nodes.",
    control: {
      type: "range",
      min: 0,
      max: 500,
      step: 1,
    },
    table: {
      type: { summary: "number" },
      defaultValue: { summary: 0 },
    },
  },

  nodeVisualSize: {
    description: "Visual size of the nodes (does not affect gravity)",
    control: {
      type: "range",
      min: 0,
      max: 30,
      step: 0.01,
    },
    table: {
      type: { summary: "number" },
      defaultValue: { summary: 1.5 },
    },
  },

  nodeAgeFactor: {
    description: "How quickly nodes fade in.",
    control: {
      type: "range",
      min: 0,
      max: 10,
      step: 0.01,
    },
    table: {
      type: { summary: "number" },
      defaultValue: { summary: 0.5 },
    },
  },

  nodeDeAgeFactor: {
    description: "How quickly nodes fade out.",
    control: {
      type: "range",
      min: 0,
      max: 10,
      step: 0.01,
    },
    table: {
      type: { summary: "number" },
      defaultValue: { summary: 2 },
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

  linkDash: {
    description: "Segments of links, try [20,10] or [12,3,3]",
    control: {
      type: "object",
      raw: true,
    },
    table: {
      type: { summary: "setLineDash(segments: Array<number>)" },
      defaultValue: { summary: "[]" },
    },
  },

  fpsCounter: {
    description: "Displays a fps counter. (expensive)",
    control: {
      type: "boolean",
    },
    table: {
      type: { summary: "boolean" },
      defaultValue: { summary: false },
    },
  },

  simMaxDistance: {
    description:
      "Maximum simulation distance between nodes. Affects overall visuals and performance.",
    control: {
      type: "range",
      min: 1,
      max: 300,
      step: 0.1,
    },
    table: {
      type: { summary: "number" },
      defaultValue: { summary: 150 },
    },
  },

  simMinDistance: {
    description:
      "Minimum simulation distance between nodes. Low values produce significant slingshot speeds.",
    control: {
      type: "range",
      min: 0,
      max: 100,
      step: 0.01,
    },
    table: {
      type: { summary: "number" },
      defaultValue: { summary: 1 },
    },
  },

  simMassFactor: {
    description: "Mass factor multiplier",
    control: {
      type: "range",
      min: 0,
      max: 100,
      step: 0.01,
    },
    table: {
      type: { summary: "number" },
      defaultValue: { summary: 1 },
    },
  },

  simAttraction: {
    description: "Strength of the force applied between nodes.",
    control: {
      type: "range",
      min: 0,
      max: 100,
      step: 0.01,
    },
    table: {
      type: { summary: "number" },
      defaultValue: { summary: 10 },
    },
  },
}
