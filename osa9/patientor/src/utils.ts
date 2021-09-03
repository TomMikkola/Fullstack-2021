export const isDate = (date: string | undefined): boolean => {
  if(date){
    return Boolean( Date.parse(date) );
  }

  return false;
};