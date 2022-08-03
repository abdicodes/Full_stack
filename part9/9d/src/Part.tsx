import { PartsComponent } from './types'

const Part = (props: PartsComponent) => (
  <p>
    {props.name} {props.exerciseCount}
  </p>
)
export default Part
