import { UUID } from "crypto";
import Type from "./type";

export class Artifact {
    id:UUID
    name:string
    type:Type
    level:number
    mainStat:string
    subStats:string[]
    set:string
    setEffect:string
    rarity:number
    
}
