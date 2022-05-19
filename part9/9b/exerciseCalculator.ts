type rating = 1 | 2 | 3

interface ExerciseResult {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: rating
  ratingDescription: string
  target: number
  average: number
}

interface Inputs {
  array: Array<number>
  target: number
}
const parseArguments2 = (args: Array<string>): Inputs => {
  if (args.length < 4) throw new Error('Not enough arguments')
  if (args.length > 15) throw new Error('Too many arguments')
  let a = []
  for (let i = 3; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
      throw new Error('Provided values were not numbers!')
    }
    a.push(Number(args[i]))
  }

  return {
    array: a,
    target: Number(args[2]),
  }
}

export const calculateExercises = (
  arg1: Array<number>,
  arg2: number
): ExerciseResult => {
  const trainingDays = arg1.filter((day) => day !== 0).length
  const average = arg1.reduce((sum, day) => sum + day, 0) / arg1.length
  const success = average > arg2
  const rating: rating =
    average < 1.75 ? 1 : average > 1.75 && average < 2.25 ? 2 : 3
  const target = arg2
  const ratingDescription =
    average < 1.75
      ? 'underperformed'
      : average > 1.75 && average < 2.25
      ? 'average performance'
      : ' great performance'

  return {
    periodLength: arg1.length,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    target: target,
    ratingDescription: ratingDescription,
    average: average,
  }
}

try {
  const { array, target } = parseArguments2(process.argv)
  console.log(calculateExercises(array, target))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}
// module.exports = calculateExercises;
