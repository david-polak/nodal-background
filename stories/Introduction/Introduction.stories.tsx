// @ts-ignore
import React from "react"

import { Meta } from "@storybook/react"
import { NodalBackgroundWrapper } from "../NodalBackgroundWrapper"
import { NodalBackgroundProps } from "../../src/main/NodalBackground"

import ReactMarkdown from "react-markdown"

import "../common.css"
import "./Introduction.css"
import { ArgumentTypes, DefaultArguments } from "../ArgumentTypes"

export default {
  title: "Introduction",
  component: Introduction,
  argTypes: {
    mode: ArgumentTypes.mode,
    numberOfNodes: ArgumentTypes.numberOfNodes,
    linkColor: ArgumentTypes.linkColor,
    nodeColor: ArgumentTypes.nodeColor,
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
      page: null,
    },
    previewTabs: {
      "storybook/docs/panel": {
        hidden: true,
      },
    },
    backgrounds: { disable: true },
  },
} as Meta

export function Introduction(props: NodalBackgroundProps) {
  const readme = require("../../README.md")
  return (
    <>
      <NodalBackgroundWrapper {...props} />
      <div id="content">
        <ReactMarkdown>{readme.default}</ReactMarkdown>
      </div>
    </>
  )
}
