// @ts-ignore
import React from 'react';

import {ArgTypes, Meta} from '@storybook/react';
import {NodalBackgroundWrapper} from "./NodalBackgroundWrapper";
import {
  NodalBackgroundMode,
  NodalBackgroundProps
} from "../src/NodalBackground";

import "./Introduction.css"

const argTypes: ArgTypes = {
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
      defaultValue: { summary: 50 },
    },
  },
}

export default {
  title: 'Introduction',
  component: Introduction,
  argTypes: {
    mode: argTypes.mode,
    linkColor: argTypes.linkColor,
    nodeColor: argTypes.nodeColor,
    numberOfNodes: argTypes.numberOfNodes,
  },
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
    }
  },
} as Meta;

export function Introduction(props: NodalBackgroundProps) {

  return <div>
    <h1>Nodal Background</h1>
    <NodalBackgroundWrapper {...props} />
  </div>
}

