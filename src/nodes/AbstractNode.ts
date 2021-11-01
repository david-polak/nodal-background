import Vector2 from "../Vector2"
import getRandomArbitrary from "../utils/getRandomArbitrary"
import hexRgb, { RgbaObject } from "hex-rgb"

export abstract class AbstractNode {
  protected _canvas: HTMLCanvasElement
  protected _context: CanvasRenderingContext2D
  protected _nodeColor: RgbaObject
  protected _ageFactor: number
  protected _deAgeFactor: number

  public _visualSize: number
  public position: Vector2
  public velocity: Vector2
  public age: number
  public mass: number

  constructor(canvas: HTMLCanvasElement, maxVelocity: number, mass: number) {
    this._canvas = canvas
    this._context = canvas.getContext("2d")

    this.age = 0

    this.recreate(maxVelocity, mass)
  }

  set nodeColor(nodeColor: string) {
    this._nodeColor = hexRgb(nodeColor)
  }

  set ageFactor(ageFactor: number) {
    this._ageFactor = ageFactor
  }

  set deAgeFactor(deAgeFactor: number) {
    this._deAgeFactor = deAgeFactor
  }

  set visualSize(visualSize: number) {
    this._visualSize = visualSize
  }

  recreate(maxVelocity: number, mass: number): void {
    this.age = 0
    this.mass = mass

    this.position = new Vector2(
      getRandomArbitrary(0, this._canvas.width),
      getRandomArbitrary(0, this._canvas.height)
    )

    this.velocity = new Vector2(
      getRandomArbitrary(-maxVelocity, maxVelocity),
      getRandomArbitrary(-maxVelocity, maxVelocity)
    )
  }

  ageNode(tDelta: number): void {
    this.age = this.age + this._ageFactor * (tDelta / 1000)
  }

  deAgeNode(tDelta: number): void {
    this.age = this.age - this._deAgeFactor * (tDelta / 1000)
  }

  abstract render(): void
}
