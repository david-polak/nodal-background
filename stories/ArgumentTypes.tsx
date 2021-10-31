import {ArgTypes} from "@storybook/react";
import {NodalBackgroundMode} from "../src/NodalBackground";

export const ArgumentTypes: ArgTypes = {
  mode: {
    description: "The type of the Nodal Background",
    control: {
      type: 'radio'
    },
    defaultValue: NodalBackgroundMode.AntiGravity,
    options: [
      NodalBackgroundMode.AntiGravity,
      NodalBackgroundMode.Gravity,
      NodalBackgroundMode.Simple
    ],
    table: {
      type: { summary: 'enum[AntiGravity|Gravity|Simple]' },
      defaultValue: { summary: "AntiGravity" },
    },
  },
  linkColor: {
    description: "Color of the node links.",
    control: {
      type: 'color'
    },
    defaultValue: '#222222',
    table: {
      type: { summary: 'hex color' },
      defaultValue: { summary: "#000000" },
    },
  },
  nodeColor: {
    description: "Color of the nodes.",
    control: {
      "type": 'color'
    },
    defaultValue: '#222222',
    table: {
      type: { summary: 'hex color' },
      defaultValue: { summary: "#000000" },
    },
  },
  numberOfNodes: {
    description: "Target number of nodes (fuzzy)",
    control: {
      type: 'range',
      min: 1,
      max: 300,
      step: 1,
    },
    table: {
      type: { summary: 'number' },
      defaultValue: { summary: 120 },
    },
  },
}
