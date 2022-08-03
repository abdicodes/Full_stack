import { PartsComponent } from './types'
const Total = (props: []) => {
  return (
    <p>
      Number of exercises{' '}
      {props.reduce((sum, part: PartsComponent) => sum + part.exerciseCount, 0)}
    </p>
  )
}

export default Total
