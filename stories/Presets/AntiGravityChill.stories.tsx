// @ts-ignore
import React from "react"

import { NodalBackgroundWrapper } from "../NodalBackgroundWrapper"
import { ArgumentTypes, DefaultArguments } from "../ArgumentTypes"
import { NodalBackgroundMode } from "../../src/main/NodalBackground"
import ReactMarkdown from "react-markdown"

import "../Presets.css"

export default {
  title: "Presets/Anti Gravity Chill",
  argTypes: {
    ...ArgumentTypes,
  },
  args: {
    ...DefaultArguments,
    mode: NodalBackgroundMode.AntiGravity,
    numberOfNodes: 40,
    nodeVisualSize: 2,
    simMaxDistance: 180,
    simMinDistance: 0,
    simAttraction: 4.5,
  },
  parameters: {
    controls: { expanded: true },
    previewTabs: { "storybook/docs/panel": { hidden: true } },
    backgrounds: { disable: true },
  },
}

export const AntiGravityChill = (props: any) => {
  const description = `
  ## Gravity Chill
  Gravity mode with less movement and larger node sizes.
  \`\`\`
  mode: NodalBackgroundMode.AntiGravity,
  numberOfNodes: 40,
  nodeVisualSize: 2,
  simMaxDistance: 180,
  simMinDistance: 0,
  simAttraction: 4.5,
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
