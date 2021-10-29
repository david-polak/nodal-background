import Vector2 from "../vector2/vector2"
import { getRandomArbitrary } from "../utils/getRandomArbitrary"

export class Node {
  ctx: any

  position: Vector2
  velocity: Vector2

  constructor(ctx: any, width: number, height: number, max_velocity: number) {
    this.position = new Vector2(
      getRandomArbitrary(0, width),
      getRandomArbitrary(0, height)
    )
    this.velocity = new Vector2(
      getRandomArbitrary(-max_velocity, max_velocity),
      getRandomArbitrary(-max_velocity, max_velocity)
    )

    this.ctx = ctx
  }

  render() {
    this.ctx.beginPath()
    this.ctx.arc(this.position.x, this.position.y, 2, 0, 2 * Math.PI)

    this.position.add(this.velocity)

    // if (this.position.x > this.ctx.width || this.position.y > this.ctx.height) {
    //     this.position.negate()
    //     console.log(this.position)
    // }

    this.ctx.fill()
  }
}
