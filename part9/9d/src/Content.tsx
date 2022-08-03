import Part from './Part'
import { CoursePart } from './types'

export default function Content({ parts }: { parts: CoursePart[] }) {
  return (
    <div>
      {parts.map((part: CoursePart, i) => (
        <Part key={i} part={part} />
      ))}
    </div>
  )
}
