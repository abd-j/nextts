import { render } from '@testing-library/react'
import Home from './Home'
describe('HomePage', () => {
  it.skip('displays without launches', () => {
    const { getByRole, debug } = render(<Home data={{ data: { launchesPast: [] } }} />)
    getByRole('heading')
    debug()
  })
  it.todo('has a link to detail page')
})
