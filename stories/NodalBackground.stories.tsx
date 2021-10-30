import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"

import { NodalBackground } from "./NodalBackground"

export default {
  title: "Example/Page",
  component: NodalBackground,
} as ComponentMeta<typeof NodalBackground>

const Template: ComponentStory<typeof NodalBackground> = (args) => <NodalBackground {...args} />

export const DevSpace = Template.bind({})
DevSpace.args = {}
