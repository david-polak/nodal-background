import React from "react"
import { NodalBackgroundProps } from "./NodalBackground"
import { useEffect, useRef } from "react"
import { useNodalBackground } from "./useNodalBackground"

export const NodalBackgroundComponent = (props: NodalBackgroundProps) => {
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

  return <div id="nodal-background-component" ref={container} />
}
