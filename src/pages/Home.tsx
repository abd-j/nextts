import { GetServerSideProps, NextPage } from 'next'
import { Dispatch, SetStateAction, useContext, useEffect, useState, VFC } from 'react'
import { LaunchSpaceX } from '../dto/launchSpaceX'
import { HomeContext, HomeProvider } from './context/HomeContext'
import SpaceLink from './SpaceLink'

interface Props {
  launch: {
    mission: string
    site: string
    timestamp: number
    rocket: string
  }
}

const POST_HTTP_METHOD = 'POST'

const query = `{
  launchesPast(limit: 3, sort: "DESC") {
    mission_name
    details
    links {
      article_link
      video_link
    }
    launch_date_unix
  }
}`

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('https://api.spacex.land/graphql/', {
    method: POST_HTTP_METHOD,
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ query }),
  })
  const data: Props = await res.json()

  return { props: { data } }
}

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

const HomePage = ({ data }) => {
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

const HomePageManager: NextPage<any> = ({
  data: {
    data: { launchesPast },
  },
}) => (
  <HomeProvider>
    <HomePage data={launchesPast} />
  </HomeProvider>
)

export default HomePageManager
