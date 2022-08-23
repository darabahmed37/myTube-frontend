import { createContext } from "react"
import { VideoCardProps } from "types/ComponentProps"

export const DashboardContext = createContext<VideoCardProps[]>( [])