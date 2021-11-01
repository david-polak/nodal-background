# Nodal Background
![Nodal Background](/static/img/repo_background_short.jpg)

An abstract animated nodal background JavaScript canvas library.

## Demo
* [Demonstration page](https://nodal-background.polakdavid.com)

# Usage
## Installation
```bash
npm install --save <pending-package-publish>
```

## React
```tsx
export const NodalBackground = (props: NodalBackgroundProps) => {
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

# Modes of operation
## Gravity Mode
https://user-images.githubusercontent.com/5686338/139601589-d5fa1313-59cd-4112-b781-e68cad123f30.mp4

### AntiGravity Mode
https://user-images.githubusercontent.com/5686338/139601633-0376d7a2-be8f-4a24-a39c-2415a0e8ce92.mp4

# Configuration

TODO