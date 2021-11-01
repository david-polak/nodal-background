import { useEffect, useState } from "react"
import { NodalBackground, NodalBackgroundProps } from "./NodalBackground"

export function useNodalBackground(props: NodalBackgroundProps) {
  const {
    fps,
    fpsCounter,
    mode,
    numberOfNodes,
    preserveNumberOfNodes,
    linkColor,
    linkDash,
    nodeColor,
    nodeMaxInitialVelocity,
    nodeInitialMass,
    nodeAgeFactor,
    nodeDeAgeFactor,
    nodeVisualSize,
    ticker,
    linker,
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
    if (linkDash && nodalBackground) {
      nodalBackground.linkDash = linkDash
    }
  }, [linkDash])

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

  useEffect(() => {
    if (ticker != null && nodalBackground) {
      nodalBackground.ticker = ticker
    }
  }, [ticker])

  useEffect(() => {
    if (linker != null && nodalBackground) {
      nodalBackground.linker = linker
    }
  }, [linker])

  useEffect(() => {
    if (nodeMaxInitialVelocity && nodalBackground) {
      nodalBackground.nodeMaxInitialVelocity = nodeMaxInitialVelocity
    }
  }, [nodeMaxInitialVelocity])

  useEffect(() => {
    if (nodeInitialMass && nodalBackground) {
      nodalBackground.nodeInitialMass = nodeInitialMass
    }
  }, [nodeInitialMass])

  useEffect(() => {
    if (nodeAgeFactor && nodalBackground) {
      nodalBackground.nodeAgeFactor = nodeAgeFactor
    }
  }, [nodeAgeFactor])

  useEffect(() => {
    if (nodeDeAgeFactor && nodalBackground) {
      nodalBackground.nodeDeAgeFactor = nodeDeAgeFactor
    }
  }, [nodeDeAgeFactor])

  useEffect(() => {
    if (nodeVisualSize && nodalBackground) {
      nodalBackground.nodeVisualSize = nodeVisualSize
    }
  }, [nodeVisualSize])

  return {
    setContainer,
    nodalBackground,
  }
}
