import { AbstractNode } from "../nodes/AbstractNode"

export type InstantiableAbstractTicker<T extends AbstractTicker> = {
  new (): T
}

export abstract class AbstractTicker {
  protected _maxDistance: number
  protected _minDistance: number
  protected _attraction: number
  protected _massFactor: number

  abstract tickBoth(
    tDelta: number,
    nodeA: AbstractNode,
    nodeB: AbstractNode
  ): number | boolean

  set maxDistance(maxDistance: number) {
    this._maxDistance = maxDistance
  }

  set minDistance(minDistance: number) {
    this._minDistance = minDistance
  }

  set attraction(attraction: number) {
    this._attraction = attraction
  }

  set massFactor(massFactor: number) {
    this._massFactor = massFactor
  }

  abstract tickSingle(tDelta: number, node: AbstractNode): void
}
