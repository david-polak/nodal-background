import React, { useEffect, useRef } from "react"

import "./page.css"
import { useNodalBackground } from "../src"

export const Page = () => {
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
