// @ts-ignore
import React from "react"

import { NodalBackgroundWrapper } from "../NodalBackgroundWrapper"
import { ArgumentTypes, DefaultArguments } from "../ArgumentTypes"
import { NodalBackgroundMode } from "../../src/main/NodalBackground"
import ReactMarkdown from "react-markdown"

import "./Presets.css"

export default {
  title: "Presets/Gravity Chill",
  argTypes: {
    ...ArgumentTypes,
  },
  args: {
    ...DefaultArguments,
    mode: NodalBackgroundMode.Gravity,
    numberOfNodes: 130,
    nodeVisualSize: 1.5,
    nodeMaxMass: 30,
    simMaxDistance: 85,
    simMinDistance: 10,
    simAttraction: 3,
  },
  parameters: {
    controls: { expanded: true },
    previewTabs: { "storybook/docs/panel": { hidden: true } },
    backgrounds: { disable: true },
  },
}

export const GravityChill = (props: any) => {
  const description = `
  ## Gravity Chill
  Gravity mode with less movement and larger node sizes.
  \`\`\`
  mode: NodalBackgroundMode.Gravity,
  numberOfNodes:  130,
  nodeVisualSize:  1.5,
  nodeMaxMass: 30,
  simMaxDistance:  85,
  simMinDistance:  10,
  simAttraction:  3
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
