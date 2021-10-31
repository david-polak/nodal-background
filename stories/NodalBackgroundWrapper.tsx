// @ts-ignore
import React from 'react';

import {useEffect, useRef} from "react";
import {useNodalBackground} from "../src";

export const NodalBackgroundWrapper = (props) => {
  const container = useRef()

  const {setContainer} = useNodalBackground({
    container: container.current,
    ...props
  })

  useEffect(() => {
    if (container.current) {
      setContainer(container.current)
    }
  }, [container.current])

  return <div id="nodal-background-wrapper" ref={container}/>
}
