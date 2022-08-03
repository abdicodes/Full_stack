import Part from './Part'
import { PartsComponent } from './types'

export default function Content({ parts }: { parts: PartsComponent[] }) {
  return (
    <div>
      {parts.map((part: PartsComponent, i) => (
        <Part key={i} name={part.name} exerciseCount={part.exerciseCount} />
      ))}
    </div>
  )
}
