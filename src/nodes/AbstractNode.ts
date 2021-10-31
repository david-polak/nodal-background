import Vector2 from "../Vector2"
import getRandomArbitrary from "../utils/getRandomArbitrary"
import hexRgb, { RgbaObject } from "hex-rgb"

export abstract class AbstractNode {
  protected _canvas: HTMLCanvasElement
  protected _context: CanvasRenderingContext2D
  protected _nodeColor: RgbaObject

  position: Vector2
  velocity: Vector2
  age: number
  ageFactor: number
  deAgeFactor: number
  mass: number

  constructor(
    canvas: HTMLCanvasElement,
    max_velocity: number,
    mass?: number,
    age?: number,
    age_factor?: number
  ) {
    this._canvas = canvas
    this._context = canvas.getContext("2d")

    this.recreate(max_velocity, mass, age, age_factor)
  }

  set nodeColor(nodeColor: string) {
    this._nodeColor = hexRgb(nodeColor)
  }

  recreate(
    max_velocity: number,
    mass?: number,
    age?: number,
    ageFactor?: number,
    deAgeFactor?: number
  ): void {
    this.age = age || 0
    this.ageFactor = ageFactor || 0.5
    this.deAgeFactor = deAgeFactor || 2
    this.mass = mass || 1.5

    this.position = new Vector2(
      getRandomArbitrary(0, this._canvas.width),
      getRandomArbitrary(0, this._canvas.height)
    )

    this.velocity = new Vector2(
      getRandomArbitrary(-max_velocity, max_velocity),
      getRandomArbitrary(-max_velocity, max_velocity)
    )
  }

  ageNode(tDelta: number): void {
    this.age = this.age + this.ageFactor * (tDelta / 1000)
  }

  deAgeNode(tDelta: number): void {
    this.age = this.age - this.deAgeFactor * (tDelta / 1000)
  }

  abstract render(): void
}
