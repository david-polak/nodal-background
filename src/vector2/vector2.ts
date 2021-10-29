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
    this.x += vector.x
    this.y += vector.y
    return this
  }

  addX(vector: Vector2): Vector2 {
    this.x += vector.x
    return this
  }

  addY(vector: Vector2): Vector2 {
    this.y += vector.y
    return this
  }
}

export default Vector2
