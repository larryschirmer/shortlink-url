import sub from "date-fns/sub";
import add from "date-fns/add";
import format from "date-fns/format";

const padMonthly = (dataset: { [key: string]: number }) => {
  const dateStart = sub(new Date(), { days: 29 });
  return Array(30)
    .fill(0)
    .map((_, i) => {
      const day = add(dateStart, { days: i });
      const dayAsKey = format(day, "MM-dd-yy");
      const amt = dataset[dayAsKey] || 0;
      return { dt: day.getTime(), amt };
    });
};

export default padMonthly;
