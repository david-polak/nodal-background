import { useEffect, useState } from "react"
import { NodalBackground, NodalBackgroundProps } from "./NodalBackground"

export function useNodalBackground(props: NodalBackgroundProps) {
  console.log(props)
  const { linkColor, mode } = props

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

  return {
    setContainer,
    nodalBackground,
  }
}
