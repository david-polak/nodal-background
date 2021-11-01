// @ts-ignore
import React from "react"

import { NodalBackgroundWrapper } from "../NodalBackgroundWrapper"
import { ArgumentTypes, DefaultArguments } from "../ArgumentTypes"

export default {
  title: "Controls/All Controls",
  argTypes: {
    ...ArgumentTypes,
  },
  args: {
    ...DefaultArguments,
  },
  parameters: {
    controls: { expanded: true },
    previewTabs: { "storybook/docs/panel": { hidden: true } },
    backgrounds: { disable: true },
  },
}

export const AllControls = (props: any) => <NodalBackgroundWrapper {...props} />
