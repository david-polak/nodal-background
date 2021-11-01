// @ts-ignore
import React from "react"

import { NodalBackgroundWrapper } from "../NodalBackgroundWrapper"
import { ArgumentTypes, DefaultArguments } from "../ArgumentTypes"
import { NodalBackgroundMode } from "../../src/main/NodalBackground"
import ReactMarkdown from "react-markdown"

import "../Presets.css"

export default {
  title: "Presets/Simple Dash",
  argTypes: {
    ...ArgumentTypes,
    backgroundColor: {
      description:
        "Background color of this page, not a prop on the component.",
      control: {
        type: "color",
      },
    },
  },
  args: {
    ...DefaultArguments,
    mode: NodalBackgroundMode.Simple,
    linkDash: [1, 6, 1, 2],
    linkColor: "#835600",
    nodeColor: "#835600",
    backgroundColor: "#decfac",
    numberOfNodes: 120,
    nodeInitialMassRange: 10,
    simMaxDistance: 180,
  },
  parameters: {
    controls: { expanded: true },
    previewTabs: { "storybook/docs/panel": { hidden: true } },
    backgrounds: { disable: true },
  },
}

export const SimpleDash = (props: any) => {
  const description = `
  ## Simple Dash
  Dashed links can create interesting visuals.
  \`\`\`
    mode: NodalBackgroundMode.Simple,
    linkDash: [1,6,1,2],
    linkColor: "#835600",
    nodeColor: "#835600",
    backgroundColor: "#decfac",
    numberOfNodes: 120,
    nodeInitialMassRange: 10,
    simMaxDistance: 180
  \`\`\`
  `

  return (
    <>
      <div
        style={{
          backgroundColor: props.backgroundColor,
          height: "100vh",
          width: "100vw",
          position: "absolute",
        }}
      >
        <NodalBackgroundWrapper {...props} />
      </div>
      <div id="presets-content">
        <ReactMarkdown>{description}</ReactMarkdown>
      </div>
    </>
  )
}
