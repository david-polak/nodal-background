import { useEffect, useState } from "react"
import { NodalBackground } from "./NodalBackground"

export function useNodalBackground(props: any) {
  const [container, setContainer] = useState(props.container)

  useEffect(() => {
    if (container) {
      const nodalBackground = new NodalBackground(container)
      nodalBackground.start()
      window.addEventListener(
        "resize",
        nodalBackground.resize.bind(nodalBackground)
      )
      // window.setInterval(
      //     nodalBackground.tick.bind(nodalBackground),
      //     100
      // )
    }
  }, [container])

  return {
    container,
    setContainer,
  }
}
