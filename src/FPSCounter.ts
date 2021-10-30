export class FPSCounter {
  context: CanvasRenderingContext2D
  fps: number
  decay: number

  constructor(context: CanvasRenderingContext2D, enabled: boolean) {
    this.context = context
    this.fps = 1
    this.decay = 0.9

    if (!enabled) {
      // eslint-disable-next-line
      this.draw = () => {}
    }
  }

  draw(time: number) {
    this.context.font = "12px serif"
    this.fps = this.decay * this.fps + (1 - this.decay) * (1 / (time / 1000))

    this.context.fillText(
      `${this.fps.toFixed(2)}fps ${time.toFixed(2)}ms`,
      0,
      12
    )
  }
}
