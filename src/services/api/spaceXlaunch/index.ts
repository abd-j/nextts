import { LaunchSpaceX } from '../../../dto/launchSpaceX'

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

//catching should be handled by next
export const fetchSpaceXlaunches: () => Promise<{ props: { data: LaunchSpaceX[] } }> = async () => {
  const res = await fetch('https://api.spacex.land/graphql/', {
    method: POST_HTTP_METHOD,
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ query }),
  })
  const data: LaunchSpaceX[] = await res.json()

  return { props: { data } }
}
