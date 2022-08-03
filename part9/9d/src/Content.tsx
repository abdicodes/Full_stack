import Part from './Part'
import { PartsComponent } from './types'

export default function Content(props: []) {
  return (
    <div>
      {props.map((part: PartsComponent, i) => (
        <Part key={i} name={part.name} exerciseCount={part.exerciseCount} />
      ))}
    </div>
  )
}
