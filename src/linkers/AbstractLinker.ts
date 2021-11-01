import { AbstractNode } from "../nodes/AbstractNode"
import hexRgb, { RgbaObject } from "hex-rgb"

export type InstantiableAbstractLinker<T extends AbstractLinker> = {
  new (context: CanvasRenderingContext2D): T
}

export abstract class AbstractLinker {
  protected _context: CanvasRenderingContext2D
  protected _linkColor: RgbaObject
  protected _linkDash: Array<number> = []

  constructor(context: CanvasRenderingContext2D) {
    this._context = context
  }

  set linkColor(linkColor: string) {
    this._linkColor = hexRgb(linkColor)
  }

  set linkDash(linkDash: Array<number>) {
    this._linkDash = linkDash
  }

  abstract renderLink(
    factor: number,
    nodeA: AbstractNode,
    nodeB: AbstractNode
  ): void
}
