class Vector2 {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x || 0
    this.y = y || 0
  }

  clone(): Vector2 {
    return new Vector2(this.x, this.y)
  }

  add(vector: Vector2): Vector2 {
    this.x = this.x + vector.x
    this.y = this.y + vector.y
    return this
  }

  distance(vector: Vector2): number {
    const distanceX = this.x - vector.x
    const distanceY = this.y - vector.y
    return Math.sqrt(distanceX * distanceX + distanceY * distanceY)
  }

  multiplyByFactor(factor: number): Vector2 {
    this.x = this.x * factor
    this.y = this.y * factor
    return this
  }
}

export default Vector2
