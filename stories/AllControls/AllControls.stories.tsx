// @ts-ignore
import React from "react"

import { NodalBackgroundWrapper } from "../NodalBackgroundWrapper"
import { ArgumentTypes, DefaultArguments } from "../ArgumentTypes"

export default {
  title: "Controls/All Controls",
  argTypes: {
    mode: ArgumentTypes.mode,
    numberOfNodes: ArgumentTypes.numberOfNodes,
  },
  args: {
    mode: DefaultArguments.mode,
    numberOfNodes: DefaultArguments.numberOfNodes,
  },
  parameters: {
    controls: { expanded: true },
    previewTabs: { "storybook/docs/panel": { hidden: true } },
    backgrounds: { disable: true },
  },
}

export const Everything = (props: any) => <NodalBackgroundWrapper {...props} />
