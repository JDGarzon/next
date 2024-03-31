import { UUID } from "crypto"
import Type from "./type"

export class Weapon {
    id:UUID
    name:string
    type:Type
    level:number
    mainStat:string
    subStats:string[]
    effect:string
    rarity:number
}
