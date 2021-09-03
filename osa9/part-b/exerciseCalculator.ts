interface ExerciseValues { 
    periodLength: number
    trainingDays: number
    success: boolean
    rating: number
    ratingDescription: string
    target: number
    average: number
}

interface Rating{
  rating: number,
  ratingDescription: string
}

const calculateExercises = (args: Array<string>, validate = true): ExerciseValues => {

  let target = 0;
  let period = null;

  if(validate){
    validateInput(args);
    target = Number( args[2] );
    period = args.slice(3);
  } else {
    target = Number(args[0]);
    period = args.slice(1);
  }
  
  const filteredTrainingDays = period.filter( d => Number(d) > 0 ).map( d => Number(d));
  const trainingDays = filteredTrainingDays.length;

  const reducer = (acc: number, current: number) => acc + current;
  const average = filteredTrainingDays.reduce(reducer) / period.length;

  const success = average <= target ? false : true;

  const rating = (): Rating => {
    const rate = target - average;

    if( rate >= 0.5 ) {
      return {
        rating: 1,
        ratingDescription: 'There\'s more work to be done, you can do it!'
      };
    } else if( rate > -0.5) {
      return {
        rating: 2,
        ratingDescription: 'Not too bad but could be better'
      };
    } else {
      return {
        rating: 3,
        ratingDescription: 'Good job!'
      };
    }
  };

  return {
    periodLength: period.length,
    trainingDays,
    success,
    rating: rating().rating,
    ratingDescription: rating().ratingDescription,
    target,
    average
  };
};

export const calcExercises = (daily_exercises: Array<string>, target: string): ExerciseValues => {
  const data: Array<string> = [target, ...daily_exercises];
  const validate = false;

  return calculateExercises(data, validate);

};

const validateInput = (args: Array<string>): void => {
  const argsToValidate = args.slice(2);
  
  if ( argsToValidate.find( arg => isNaN(Number(arg)) ) ) {
    throw new Error('Arguments must be numbers');
  } else if ( args.length <= 3){
    throw new Error('Need more data');
  }
};

//console.log( calculateExercises(process.argv) );