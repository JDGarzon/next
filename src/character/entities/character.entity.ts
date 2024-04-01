import { UUID } from "crypto"
import { Weapon } from "src/weapon/entities/weapon.entity"
import Element from "./Element"

export class Character {
    name:string
    element:Element
    weapon:Weapon
    rarity:number
    constellation:number
    level:number
}
