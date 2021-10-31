import { AbstractNode } from "../nodes/AbstractNode"
import hexRgb, { RgbaObject } from "hex-rgb"

export abstract class AbstractLinker {
  protected _context: CanvasRenderingContext2D
  protected _linkColor: RgbaObject

  constructor(context: CanvasRenderingContext2D) {
    this._context = context
  }

  set linkColor(linkColor: string) {
    this._linkColor = hexRgb(linkColor)
  }

  abstract renderLink(
    factor: number,
    nodeA: AbstractNode,
    nodeB: AbstractNode
  ): void
}
