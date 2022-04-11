import { FC } from 'react'
// import style from './card.css'

const Card: FC<{ title: string }> = ({ title, children }) => (
  <div>
    <h4>{title}</h4>
    {children}
  </div>
)

export default Card
