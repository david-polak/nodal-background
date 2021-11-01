import { AbstractLinker } from "./AbstractLinker"
import { AbstractNode } from "../nodes/AbstractNode"

export class StandardLinker extends AbstractLinker {
  renderLink(factor: number, nodeA: AbstractNode, nodeB: AbstractNode): void {
    this._context.beginPath()

    this._context.strokeStyle = `rgba(${this._linkColor.red},${this._linkColor.green},${this._linkColor.blue},${factor})`

    this._context.setLineDash(this._linkDash)
    this._context.moveTo(nodeA.position.x, nodeA.position.y)
    this._context.lineTo(nodeB.position.x, nodeB.position.y)

    this._context.stroke()
  }
}
