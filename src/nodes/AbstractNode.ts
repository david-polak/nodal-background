import Vector2 from "../Vector2"
import getRandomArbitrary from "../utils/getRandomArbitrary"

export abstract class AbstractNode {
  context: CanvasRenderingContext2D
  canvas: HTMLCanvasElement

  position: Vector2
  velocity: Vector2
  age: number
  age_factor: number
  mass: number

  constructor(
    canvas: HTMLCanvasElement,
    max_velocity: number,
    mass?: number,
    age?: number,
    age_factor?: number
  ) {
    this.canvas = canvas
    this.context = canvas.getContext("2d")

    this.recreate(max_velocity, mass, age, age_factor)
  }

  recreate(
    max_velocity: number,
    mass?: number,
    age?: number,
    age_factor?: number
  ): void {
    this.age = age || 0
    this.age_factor = age_factor || 0.5
    this.mass = mass || 1.5

    this.position = new Vector2(
      getRandomArbitrary(0, this.canvas.width),
      getRandomArbitrary(0, this.canvas.height)
    )

    this.velocity = new Vector2(
      getRandomArbitrary(-max_velocity, max_velocity),
      getRandomArbitrary(-max_velocity, max_velocity)
    )
  }

  tick(tDelta: number): void {
    this.age = this.age + this.age_factor * (tDelta / 1000)
  }

  abstract render(): void
}
