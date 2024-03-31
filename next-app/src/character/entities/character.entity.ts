import { UUID } from "crypto"
import { Weapon } from "src/weapon/entities/weapon.entity"

export class Character {
    id:UUID
    name:string
    element:Element
    weapon:Weapon
    rarity:number
    constellation:number
    stats:string[]
    level:number
}
