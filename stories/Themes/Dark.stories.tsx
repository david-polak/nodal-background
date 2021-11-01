// @ts-ignore
import React from "react"

import { NodalBackgroundWrapper } from "../NodalBackgroundWrapper"
import { ArgumentTypes, DefaultArguments } from "../ArgumentTypes"

import "../Presets.css"
import { NodalBackgroundMode } from "../../src/main/NodalBackground"
import ReactMarkdown from "react-markdown"

export default {
  title: "Themes/Dark Blue",
  argTypes: {
    backgroundColor: {
      description:
        "Background color of this page, not a prop on the component.",
      control: {
        type: "color",
      },
    },
    ...ArgumentTypes,
  },
  args: {
    ...DefaultArguments,
    numberOfNodes: 130,
    nodeVisualSize: 1.5,
    nodeMaxMass: 30,
    simMaxDistance: 85,
    simMinDistance: 10,
    simAttraction: 3,
    nodeColor: "#ffffff",
    linkColor: "#ffffff",
    backgroundColor: "#080b2b",
  },
  parameters: {
    controls: { expanded: true },
    previewTabs: {
      "storybook/docs/panel": {
        hidden: true,
      },
    },
    backgrounds: { disable: true },
  },
}

export const DarkBlue = (props: any) => {
  const description = `
  ## Dark theme
  Dark theme with the Gravity Chill preset.
  \`\`\`
    nodeColor: "#ffffff",
    linkColor: "#ffffff",
    backgroundColor: "#0a0f44"
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
