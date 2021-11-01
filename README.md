# Nodal Background
![Nodal Background](https://raw.githubusercontent.com/david-polak/nodal-background/main/static/img/repo_background_short.jpg)

An abstract animated nodal background JavaScript canvas library.

* [Demonstration page](https://nodal-background.polakdavid.com)

## Features
* Different modes of operation
    * `AntiGravity` produces a pleasing effect of nodes pulling 
                    away from each other.
    * `Gravity` creates a true n-body simulation with emerging 
                chaotic behaviour.
    * `Simple` makes the simulation serene and non-distracting.
     
* Fully configurable
 
  * Everything that could have been has been exposed as a configuration 
    variable. Values can be changed that greatly affect the behaviour and 
    visuals of the simulation.
   
  * You can provide concrete implementations of abstract classes for 
    custom behaviour.
   
* Interactive
  * You can add nodes and interact with the nodes flying around

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

All variables can be changed while the simulation is running.

Canvas is by default transparent, changing the background color below the
canvas element combined with `nodeColor` and `linkColor` is an easy way to
achieve a different theme.

The [demonstration page](https://nodal-background.polakdavid.com) can be used
to interactively change the following controls.

## Simulation controls

#### `mode: NodalBackgroundMode`
Controls the behaviour of the entire simulation.

* `NodalBackgroundMode.AntiGravity` (default)
* `NodalBackgroundMode.Gravity`
* `NodalBackgroundMode.Simple`

#### `simMaxDistance: number, default: 150`
Maximum distance between two nodes for the interaction to be calculated.
Higher numbers are more computationally expensive and create a more connected
graph, whereas lower values produce less connection lines between nodes.

#### `simMinDistance: number, default: 3`
Minimum distance between two nodes for the interaction to be calculated.
Lower values produce large slingshot speeds when nodes get or spawn close 
together. Higher values minimize the slingshot potential. Too high values
will affect the perceived realism of the simulation.

#### `simMassFactor: number, default: 1`
Multiplier for node mass, affects speed and chaos.

#### `simAttraction: number, default: 10`
Multiplier for attraction, affects speed and chaos

## Node controls
#### `numberOfNodes: number, default: 100`
The target number of nodes, relative to a 1200x1200 pixel area. Simulation
complexity rises with O(n*log n), so higher numbers are discouraged.

#### `preserveNumberOfNodes: boolean, default: true`
Whether to delete extraneous nodes, with this disabled, the user created nodes
do not disappear.

#### `nodeColor: hex string, default: #000000`
Color of the nodes.

#### `nodeMaxInitialVelocity: number, default: 20`
Node initial velocity is chosen at random from a range, this control affects 
that range. Higher values significantly affect the behaviour, increasing the 
chaos.

#### `nodeInitialMass: number, default: 1.5`
Initial mass of the nodes.

#### `nodeVisualSize: number, default: 0.5`
Visual node size offset, does not affect the simulation apart from merging.

#### `nodeAgeFactor: number, default: 0.5`
How quickly nodes fade in after spawn.

#### `nodeDeAgeFactor: number, default: 2`
How quickly nodes fade out after leaving the area.

## Link controls
#### `linkColor: hex color, default: "#000000"`
Changes the link color.

#### `linkDash: setLineDash(segments: Array<number>), default: []`
Changes the link line between nodes.

[Documentation on MDN - setLineDash()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash)

## Performance
#### `fps: number, default: 30`
Sets the target FPS. Simulation is generally acceptable down to 20 fps.

#### `fpsCounter: boolean, defaul: false`
Displays the FPS counter, the current implementation of the fps counter has a 
negative impact on the actual fps, when bottlenecked it takes about 10fps.

## Overrides
If you wish to write custom simulation behaviour you can use the base abstract
classes and provide your own implementation.

For more information read the included implementing classes.

#### `ticker: AbstractTicker`
Ticker performs the simulation steps. 

#### `linker: AbstractLinker`
Linker draws links between the nodes.
