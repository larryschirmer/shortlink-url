import format from 'date-fns/format';

const sumDuplicateDates = (dates: string[]) => {
  return dates.reduce<{ [key: string]: number }>((dateObj, date) => {
    const dateFormated = format(new Date(date), 'MM-dd-yy');
    if (dateFormated in dateObj) dateObj[dateFormated] += 1;
    else dateObj[dateFormated] = 1;
    return dateObj;
  }, {});
};

export default sumDuplicateDates;
