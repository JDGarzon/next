import { UUID } from "crypto"
import Type from "./type"

export class Weapon {
    name:string
    type:Type
    level:number
    subStats:string
    effect:string
    rarity:number
}
