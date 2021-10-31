// @ts-ignore
import React from 'react';

import {ArgTypes, Meta} from '@storybook/react';
import {NodalBackgroundWrapper} from "./NodalBackgroundWrapper";
import {
  NodalBackgroundMode,
  NodalBackgroundProps
} from "../src/NodalBackground";

import "./common.css"
import "./Introduction.css"
import {ArgumentTypes, DefaultArguments} from "./ArgumentTypes";

export default {
  title: 'Introduction',
  component: Introduction,
  argTypes: {
    mode: ArgumentTypes.mode,
    linkColor: ArgumentTypes.linkColor,
    nodeColor: ArgumentTypes.nodeColor,
    numberOfNodes: ArgumentTypes.numberOfNodes,
  },
  args: {
    mode: DefaultArguments.mode,
    linkColor: DefaultArguments.linkColor,
    nodeColor: DefaultArguments.nodeColor,
    numberOfNodes: DefaultArguments.numberOfNodes,
  },
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      page: null
    },
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    backgrounds: { disable: true }
  },
} as Meta;

export function Introduction(props: NodalBackgroundProps) {
  return <>
    <NodalBackgroundWrapper {...props} />
    <div id="content">
      <h1>Nodal Background</h1>
      <p>Nodal background is a fully configurable abstract background nodal
        element for web pages.</p>

      <h2>Features</h2>
      <ul>
        <li>Interactive</li>
        <ul><li>Try clicking! And click scrolling!</li></ul>
        <li>Fully configurable</li>
        <li>Various modes of operation</li>
        <li>React bindings</li>
      </ul>
    </div>
  </>
}

