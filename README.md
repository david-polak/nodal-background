# Nodal Background
![Nodal Background](/static/img/repo_background_short.jpg)

An abstract animated nodal background JavaScript canvas library.

* [Demonstration page](https://nodal-background.polakdavid.com)

## Features
* Fully configurable
  * Everything that could have been has been exposed as a configuration variable.
    Values can be changed tht greatly affect the behaviour and visuals of the simulation.
  * You can provide concrete implementations of abstract classes for custom behaviour.
* Interactive
  * You can add nodes and interact with the nodes flying around
* Different modes of operation
  * AntiGravity produces a pleasing effect of nodes pulling away from each other.
  * Gravity creates a true n-body simulation with emerging chaotic behaviour.
  * Simple makes the simulation serene and non-distracting.

# Usage
## Installation
Release pending
```bash
npm install --save nodal-background
```

## React
### Custom wrapper
```tsx
import { useNodalBackground } from "nodal-background"

export const NodalBackgroundComponent = (props: NodalBackgroundProps) => {
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
  
  return <div ref={container}/>
}
```

### Predefined wrapper
The wrapper above is also provided as an importable component.

```tsx
import {NodalBackgroundComponent} from "nodal-background"

const YourComponent = () => <NodalBackgroundComponent>
```

## Generic JavaScript / TypeScript
```js
new NodalBackground({container: document.getElementById("id")})
```

# Modes of operation
## Gravity Mode
https://user-images.githubusercontent.com/5686338/139601589-d5fa1313-59cd-4112-b781-e68cad123f30.mp4

### AntiGravity Mode
https://user-images.githubusercontent.com/5686338/139601633-0376d7a2-be8f-4a24-a39c-2415a0e8ce92.mp4

# Configuration