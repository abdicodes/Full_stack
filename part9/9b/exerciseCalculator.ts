type rating = 1 | 2 | 3;

interface ExerciseResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: rating;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (
    arg1: Array<number>,
    arg2: number
): ExerciseResult => {
    const trainingDays = arg1.filter((day) => day !== 0).length;
    const average = arg1.reduce((sum, day) => sum + day, 0) / 7;
    const success = average > arg2;
    const rating: rating =
        average < 1.75 ? 1 : average > 1.75 && average < 2.25 ? 2 : 3;
    const target = arg2;
    const ratingDescription =
        average < 1.75
            ? 'underperformed'
            : average > 1.75 && average < 2.25
            ? 'average performance'
            : ' great performance';

    return {
        periodLength: arg1.length,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        target: target,
        ratingDescription: ratingDescription,
        average: average,
    };
};

console.log(calculateExercises([0, 0, 0, 4.5, 0, 3, 1], 2));
console.log(process.argv);
