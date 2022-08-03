import { PartsComponent } from './types'
const Total = ({ parts }: { parts: PartsComponent[] }) => {
  return (
    <p>
      Number of exercises{' '}
      {parts.reduce((sum, part: PartsComponent) => sum + part.exerciseCount, 0)}
    </p>
  )
}

export default Total
