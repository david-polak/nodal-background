import { useEffect, useState } from "react"
import { NodalBackground, NodalBackgroundProps } from "./NodalBackground"

export function useNodalBackground(props: NodalBackgroundProps) {
  // console.log(props)

  const {
    fps,
    fpsCounter,
    mode,
    numberOfNodes,
    preserveNumberOfNodes,
    linkColor,
    nodeColor,
  } = props

  const [container, setContainer] = useState(props.container)
  const [nodalBackground, setNodalBackground] = useState(null)

  useEffect(() => {
    if (container) {
      const _nodalBackground = new NodalBackground(props)
      setNodalBackground(_nodalBackground)

      return () => {
        _nodalBackground.destroy()
      }
    }
  }, [container])

  useEffect(() => {
    if (linkColor && nodalBackground) {
      nodalBackground.linkColor = linkColor
    }
  }, [linkColor])

  useEffect(() => {
    if (mode && nodalBackground) {
      nodalBackground.mode = mode
    }
  }, [mode])

  useEffect(() => {
    if (nodeColor && nodalBackground) {
      nodalBackground.nodeColor = nodeColor
    }
  }, [nodeColor])

  useEffect(() => {
    if (numberOfNodes && nodalBackground) {
      nodalBackground.numberOfNodes = numberOfNodes
    }
  }, [numberOfNodes])

  useEffect(() => {
    if (preserveNumberOfNodes != null && nodalBackground) {
      nodalBackground.preserveNumberOfNodes = preserveNumberOfNodes
    }
  }, [preserveNumberOfNodes])

  useEffect(() => {
    if (fps && nodalBackground) {
      nodalBackground.fps = fps
    }
  }, [fps])

  useEffect(() => {
    if (fpsCounter != null && nodalBackground) {
      nodalBackground.fpsCounter = fpsCounter
    }
  }, [fpsCounter])

  return {
    setContainer,
    nodalBackground,
  }
}
