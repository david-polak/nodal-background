import React, { useEffect, useRef } from "react"

import "./page.css"
import { useNodalBackground } from "../index"

interface PageProps {}

export const Page = ({}: PageProps) => {
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
