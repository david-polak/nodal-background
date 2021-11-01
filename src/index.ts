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
    simMaxDistance,
    simMassFactor,
    simMinDistance,
    simAttraction,
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
    if (linkColor != null && nodalBackground) {
      nodalBackground.linkColor = linkColor
    }
  }, [linkColor])

  useEffect(() => {
    if (linkDash != null && nodalBackground) {
      nodalBackground.linkDash = linkDash
    }
  }, [linkDash])

  useEffect(() => {
    if (mode != null && nodalBackground) {
      nodalBackground.mode = mode
    }
  }, [mode])

  useEffect(() => {
    if (nodeColor != null && nodalBackground) {
      nodalBackground.nodeColor = nodeColor
    }
  }, [nodeColor])

  useEffect(() => {
    if (numberOfNodes != null && nodalBackground) {
      nodalBackground.numberOfNodes = numberOfNodes
    }
  }, [numberOfNodes])

  useEffect(() => {
    if (preserveNumberOfNodes != null && nodalBackground) {
      nodalBackground.preserveNumberOfNodes = preserveNumberOfNodes
    }
  }, [preserveNumberOfNodes])

  useEffect(() => {
    if (fps != null && nodalBackground) {
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
    if (nodeMaxInitialVelocity != null && nodalBackground) {
      nodalBackground.nodeMaxInitialVelocity = nodeMaxInitialVelocity
    }
  }, [nodeMaxInitialVelocity])

  useEffect(() => {
    if (nodeInitialMass != null && nodalBackground) {
      nodalBackground.nodeInitialMass = nodeInitialMass
    }
  }, [nodeInitialMass])

  useEffect(() => {
    if (nodeAgeFactor != null && nodalBackground) {
      nodalBackground.nodeAgeFactor = nodeAgeFactor
    }
  }, [nodeAgeFactor])

  useEffect(() => {
    if (nodeDeAgeFactor != null && nodalBackground) {
      nodalBackground.nodeDeAgeFactor = nodeDeAgeFactor
    }
  }, [nodeDeAgeFactor])

  useEffect(() => {
    if (nodeVisualSize != null && nodalBackground) {
      nodalBackground.nodeVisualSize = nodeVisualSize
    }
  }, [nodeVisualSize])

  useEffect(() => {
    if (simMaxDistance != null && nodalBackground) {
      nodalBackground.simMaxDistance = simMaxDistance
    }
  }, [simMaxDistance])

  useEffect(() => {
    if (simMassFactor != null && nodalBackground) {
      nodalBackground.simMassFactor = simMassFactor
    }
  }, [simMassFactor])

  useEffect(() => {
    if (simMinDistance != null && nodalBackground) {
      nodalBackground.simMinDistance = simMinDistance
    }
  }, [simMinDistance])

  useEffect(() => {
    if (simAttraction != null && nodalBackground) {
      nodalBackground.simAttraction = simAttraction
    }
  }, [simAttraction])

  return {
    setContainer,
    nodalBackground,
  }
}
