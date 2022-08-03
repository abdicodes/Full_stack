// import { PartsComponent } from './types'
import { CoursePart } from './types'

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
}

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.type) {
    case 'normal':
      return (
        <p>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <br /> {part.description}
        </p>
      )
    case 'groupProject':
      return (
        <p>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <br /> project exercises {part.groupProjectCount}
        </p>
      )
    case 'submission':
      return (
        <p>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <br /> {part.description}
          <br /> submit to {part.exerciseSubmissionLink}
        </p>
      )
    case 'special':
      return (
        <p>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <br /> {part.description}
          <br /> required skills: {part.requirements.join(', ')}
        </p>
      )

    default:
      return assertNever(part)
  }
}

export default Part
