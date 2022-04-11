import { useContext, VFC } from 'react'
import { LaunchSpaceX } from '../dto/launchSpaceX'
import { HomeContext } from './context/HomeContext'

interface SpaceLinkProps {
  mission?: string
}

const SpaceLinkDisplayer: VFC<{ launch: LaunchSpaceX }> = ({
  launch: { date, details, link, mission_name },
}) => (
  <div>
    <h2>{mission_name}</h2>
    <h3>{date}</h3>
    <article>
      {link && (
        <>
          <span>{link.article}</span>
          <span>{link.video}</span>
        </>
      )}
    </article>
    <section>{details}</section>
  </div>
)

const SpaceLink: VFC<SpaceLinkProps> = ({ mission }) => {
  const { launches } = useContext(HomeContext)
  if (!launches || !mission) return null
  const launch = launches.find(({ mission_name }) => mission_name === mission)
  if (!launch) return null
  return <SpaceLinkDisplayer launch={launch} />
}
export default SpaceLink
