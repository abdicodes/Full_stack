interface Bmi {
    height: number;
    weight: number;
}

const parseArguments1 = (args: Array<string>): Bmi => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3]),
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

const calculateBmi = (height: number, weight: number): string => {
    if (height === 0) return 'invalid input';
    const bmi = weight / (height / 100) ** 2;
    if (24.9 >= bmi && bmi >= 18.5) return ' Normal (healthy weight)';
    if (bmi < 18.5) return 'Underweight (unhealthy weight)';
    if (bmi > 24.9) return 'overweight (obese weight)';
    else {
        throw new Error('Provided values were not numbers');
    }
};

try {
    const { height, weight } = parseArguments1(process.argv);
    console.log(calculateBmi(height, weight));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
