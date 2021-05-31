import { GetServerSideProps, NextPage } from 'next'

interface Props {
  launch: {
    mission: string
    site: string
    timestamp: number
    rocket: string
  }
}
const IndexPage: NextPage<Props> = () => (
  <main>
    <h1>Last 3 SpaceX launches:</h1>
    <p>here the list of the last 3 launches with link to a detail page please :)</p>
  </main>
)

export default IndexPage
