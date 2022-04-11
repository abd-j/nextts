import { createContext, Dispatch, FC, SetStateAction, useState } from 'react'
import { LaunchSpaceX } from '../../dto/launchSpaceX'

interface IHomeContext {
  launches?: LaunchSpaceX[]
  setLaunches: Dispatch<SetStateAction<LaunchSpaceX[]>>
}
export const HomeContext = createContext<IHomeContext>({ launches: [], setLaunches: () => {} })
export const HomeProvider: FC = ({ children }) => {
  const [launches, setLaunches] = useState<LaunchSpaceX[]>()
  return <HomeContext.Provider value={{ launches, setLaunches }}>{children}</HomeContext.Provider>
}
