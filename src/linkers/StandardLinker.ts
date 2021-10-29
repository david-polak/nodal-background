import { AbstractLinker } from "./AbstractLinker"
import { AbstractNode } from "../nodes/AbstractNode"

export class StandardLinker extends AbstractLinker {
  renderLink(factor: number, nodeA: AbstractNode, nodeB: AbstractNode): void {
    // noop
  }
}
