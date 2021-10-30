import Vector2 from "../Vector2"
import getRandomArbitrary from "../utils/getRandomArbitrary"

export abstract class AbstractNode {
  ctx: CanvasRenderingContext2D
  position: Vector2
  velocity: Vector2
  age: number
  age_factor: number
  mass: number

  constructor(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    max_velocity: number,
    mass?: number,
    age?: number,
    age_factor?: number
  ) {
    this.recreate(width, height, max_velocity, mass, age, age_factor)
    // this.position = new Vector2(300, 300)
    this.ctx = ctx
  }

  recreate(
    width: number,
    height: number,
    max_velocity: number,
    mass?: number,
    age?: number,
    age_factor?: number
  ): void {
    this.age = age || 0
    this.age_factor = age_factor || 0.5
    this.mass = mass || 1.5

    this.position = new Vector2(
      getRandomArbitrary(0, width),
      getRandomArbitrary(0, height)
    )

    this.velocity = new Vector2(
      getRandomArbitrary(-max_velocity, max_velocity),
      getRandomArbitrary(-max_velocity, max_velocity)
    )
  }

  tick(tDelta: number): void {
    const step = this.age_factor * (tDelta / 1000)
    this.age = this.age + step
  }

  abstract render(): void
}
