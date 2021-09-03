interface Values {
  height: number;
  weight: number;
}

export const calculateBmi = (args: Array<string> ): string => {

  if( args.length === 2 ) {
    const height = Number(args[0])/100;
    const weight = Number(args[1]);
    const bmi = weight / ( Math.pow(height,2) );
    
    if( bmi < 18.4 ){
      return 'Underweight (thinness)';
    } else if ( bmi < 24.9 ) {
      return 'Normal (healthy weight)';
    } else {
      return 'Overweight (obesity)';
    }

  } else {
    const {height, weight} = validateArgs(args);
    const bmi = weight / ( Math.pow(height,2) );
    
    if( bmi < 18.4 ){
      return 'Underweight (thinness)';
    } else if ( bmi < 24.9 ) {
      return 'Normal (healthy weight)';
    } else {
      return 'Overweight (obesity)';
    }
  }
};

const validateArgs = (args: Array<string>): Values => {
  if (args.length > 4) throw new Error('Too many arguments');
  if (args.length < 4) throw new Error('Not enough arguments');

  let height = Number(args[2]);
  const weight = Number(args[3]);

  height > 2.5
    ? height = height / 100
    : null;

  if( !isNaN( height ) && !isNaN( weight ) ) {
    return {
      height,
      weight
    };
  } else {
    throw new Error('Invalid arguments');
  }
};

//console.log( calculateBmi(process.argv) );