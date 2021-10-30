import React, { useEffect, useRef } from "react"

import "./NodalBackground.css"
import { useNodalBackground } from "../src"

export const NodalBackground = () => {
  const container = useRef()

  const { setContainer } = useNodalBackground({
    container: container.current,
  })

  useEffect(() => {
    if (container.current) {
      setContainer(container.current)
    }
  }, [container.current])

  return <div id="canvas-wrapper" ref={container} />
}
