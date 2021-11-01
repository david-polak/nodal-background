// @ts-ignore
import React from "react"

import { useEffect, useRef } from "react"
import { NodalBackgroundProps } from "../src/main/NodalBackground"
import { useNodalBackground } from "../src"

export const NodalBackgroundWrapper = (props: NodalBackgroundProps) => {
  const container = useRef()

  const { setContainer } = useNodalBackground({
    container: container.current,
    ...props,
  })

  useEffect(() => {
    if (container.current) {
      setContainer(container.current)
    }
  }, [container.current])

  return <div id="nodal-background-wrapper" ref={container} />
}
