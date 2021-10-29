import Vector2 from "../Vector2"
import getRandomArbitrary from "../utils/getRandomArbitrary"

export abstract class AbstractNode {
  ctx: CanvasRenderingContext2D
  position: Vector2
  velocity: Vector2

  constructor(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    max_velocity: number
  ) {
    this.reposition(width, height)
    // this.position = new Vector2(300, 300)

    this.velocity = new Vector2(
      getRandomArbitrary(-max_velocity, max_velocity),
      getRandomArbitrary(-max_velocity, max_velocity)
    )

    this.ctx = ctx
  }

  reposition(width: number, height: number): void {
    this.position = new Vector2(
      getRandomArbitrary(0, width),
      getRandomArbitrary(0, height)
    )
  }

  abstract render(): void
}
