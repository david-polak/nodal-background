// @ts-ignore
import React from "react"

import { NodalBackgroundWrapper } from "../NodalBackgroundWrapper"
import { ArgumentTypes, DefaultArguments } from "../ArgumentTypes"
import { NodalBackgroundMode } from "../../src/main/NodalBackground"
import ReactMarkdown from "react-markdown"

import "../Presets.css"

export default {
  title: "Presets/Gravity Spaz",
  argTypes: {
    ...ArgumentTypes,
  },
  args: {
    ...DefaultArguments,
    mode: NodalBackgroundMode.Gravity,
    numberOfNodes: 150,
    preserveNumberOfNodes: false,
    nodeVisualSize: 2.2,
    simMaxDistance: 115,
    simAttraction: 30,
  },
  parameters: {
    controls: { expanded: true },
    previewTabs: { "storybook/docs/panel": { hidden: true } },
    backgrounds: { disable: true },
  },
}

export const GravitySpaz = (props: any) => {
  const description = `
  ## Gravity Spaz
  Gravity mode with extreme movement. Use clickscroll to add large nodes.
  \`\`\`
  mode: NodalBackgroundMode.Gravity,
  numberOfNodes:150,
  preserveNumberOfNodes:false,
  nodeVisualSize:2.2,
  simMaxDistance:115,
  simAttraction:30
  \`\`\`
  `

  return (
    <>
      <NodalBackgroundWrapper {...props} />
      <div id="presets-content">
        <ReactMarkdown>{description}</ReactMarkdown>
      </div>
    </>
  )
}
