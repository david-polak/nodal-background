import { AbstractLinker } from "./AbstractLinker"
import { AbstractNode } from "../nodes/AbstractNode"

export class StandardLinker extends AbstractLinker {
  renderLink(factor: number, nodeA: AbstractNode, nodeB: AbstractNode): void {
    this.context.beginPath()
    this.context.strokeStyle = `rgba(1,1,1,${factor})`
    this.context.moveTo(nodeA.position.x, nodeA.position.y)
    this.context.lineTo(nodeB.position.x, nodeB.position.y)
    this.context.stroke()
  }
}
