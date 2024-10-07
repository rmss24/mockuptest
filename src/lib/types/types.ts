import { IconDefinition } from "@fortawesome/fontawesome-svg-core"

export interface BaseList {
  id: number
}

export interface Discover{
    id:number,
    icon:IconDefinition,
    title:string
    description:string
}