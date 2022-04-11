import { GetServerSideProps, NextPage } from 'next'
import { Dispatch, SetStateAction, useContext, useEffect, useState, VFC } from 'react'
import { LaunchSpaceX } from '../dto/launchSpaceX'
import { fetchSpaceXlaunches } from '../services/api/spaceXlaunch'
import { HomeContext, HomeProvider } from './context/HomeContext'
import SpaceLink from './SpaceLink'

export const getServerSideProps: GetServerSideProps = fetchSpaceXlaunches

const LinkManager: VFC<{
  launches: LaunchSpaceX[]
  handleMissionClicked: Dispatch<SetStateAction<string | undefined>>
}> = ({ launches, handleMissionClicked }) => (
  <div>
    {launches.map(({ mission_name }, index) => (
      <a
        role="link"
        tabIndex={0}
        key={index}
        onClick={() => handleMissionClicked(mission_name)}
        onKeyPress={(e) => e.key === 'Enter' && handleMissionClicked(mission_name)}
      >
        {mission_name}
      </a>
    ))}
  </div>
)

const HomePage: VFC<{ data: LaunchSpaceX[] }> = ({ data }) => {
  const { setLaunches } = useContext(HomeContext)
  const [selectedMission, setSelectedMission] = useState<string>()
  useEffect(() => {
    setLaunches(data)
  }, [data, setLaunches])
  return (
    <main>
      <h1>Last 3 SpaceX launches:</h1>
      <p>here the list of the last 3 launches with link to a detail page please :)</p>
      <LinkManager launches={data} handleMissionClicked={setSelectedMission} />
      <SpaceLink mission={selectedMission} />
    </main>
  )
}

const HomePageManager: NextPage<{ data: { data: { launchesPast: LaunchSpaceX[] } } }> = ({
  data: {
    data: { launchesPast },
  },
}) => (
  <HomeProvider>
    <HomePage data={launchesPast} />
  </HomeProvider>
)

export default HomePageManager
