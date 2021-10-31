// @ts-ignore
import React from 'react';

import {NodalBackgroundWrapper} from "../NodalBackgroundWrapper";
import {ArgumentTypes, DefaultArguments} from "../ArgumentTypes";

import "./Dark.css"

export default {
  title: 'Themes',
  argTypes: {
    mode: ArgumentTypes.mode,
    numberOfNodes: ArgumentTypes.numberOfNodes,
  },
  args: {
    mode: DefaultArguments.mode,
    numberOfNodes: DefaultArguments.numberOfNodes,
  },
  parameters: {
    controls: { expanded: true, },
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    backgrounds: { disable: true }
  }
}

export const Light = (props: any) => <NodalBackgroundWrapper {...props} />

export const Dark = (props: any) => {
  props.nodeColor = "#ffffff"
  props.linkColor = "#ffffff"

  return <div id="dark-stories-wrapper">
    <NodalBackgroundWrapper {...props} />
  </div>
}
