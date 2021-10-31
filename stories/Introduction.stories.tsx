import {ArgTypes, Meta} from '@storybook/react';
import {NodalBackgroundWrapper} from "./NodalBackgroundWrapper";
import {
  NodalBackgroundMode,
  NodalBackgroundProps
} from "../src/NodalBackground";

import "./Introduction.css"

const argTypes: ArgTypes = {
  mode: {
    control: {
      type: 'radio'
    },
    defaultValue: NodalBackgroundMode.AntiGravity,
    description: "The type of the Nodal Background",
    type: 'enum',
    options: [
      NodalBackgroundMode.AntiGravity,
      NodalBackgroundMode.Gravity,
      NodalBackgroundMode.Simple
    ],
  },
  linkColor: {
    control: 'color',
    defaultValue: '#222222',
    description: "Color of the node links.",
    type: "color",
  },
}

export default {
  title: 'Introduction',
  component: Introduction,
  argTypes: {
    mode: argTypes.mode,
    linkColor: argTypes.linkColor,
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

