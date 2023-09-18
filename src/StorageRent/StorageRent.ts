
export type MonthlyRentRecord = {
  vacancy: boolean,
  rentAmount: number,
  rentDueDate: Date
}

export type MonthlyRentRecords = Array<MonthlyRentRecord>;

/**
 * Determines the vacancy, rent amount and due date for each month in a given time window
 * 
 * @param baseMonthlyRent : The base or starting monthly rent for unit (Number)
 * @param leaseStartDate : The date that the tenant's lease starts (Date)
 * @param windowStartDate : The first date of the given time window (Date)
 * @param windowEndDate : The last date of the given time window (Date)
 * @param dayOfMonthRentDue : The day of each month on which rent is due (Number)
 * @param rentRateChangeFrequency : The frequency in months the rent is changed (Number)
 * @param rentChangeRate : The rate to increase or decrease rent, input as decimal (not %), positive for increase, negative for decrease (Number),
 * @returns Array<MonthlyRentRecord>;
 */
export function calculateMonthlyRent(baseMonthlyRent: number, leaseStartDate: Date, windowStartDate: Date,
  windowEndDate: Date, dayOfMonthRentDue: number, rentRateChangeFrequency: number, rentChangeRate: number) {
  const monthlyRentRecords: MonthlyRentRecords = [];
  let montlyRent = baseMonthlyRent;
  let incrementMonths = 0;

  const leaseYear = leaseStartDate.getFullYear();
  const leaseStartMonth = leaseStartDate.getMonth();
  const leaseStartDay = leaseStartDate.getDate();

  const windowStartMonth = windowStartDate.getMonth();
  const windowEndMonth = windowEndDate.getMonth();

  for (let index = windowStartMonth; index <= windowEndMonth; index++) {
    let vacancy = isVacancy(index, leaseStartMonth);
    let dueDate = leaseStartDate;
    incrementMonths++;

    if (dayOfMonthRentDue > leaseStartDay) {
      return;
    }

    if (dayOfMonthRentDue === leaseStartDay) {
      if (index !== leaseStartMonth) {
        dueDate = getDueDate(leaseYear, index, dayOfMonthRentDue);
      }

      montlyRent = calculateMontlyRent(
        index,
        windowStartMonth,
        incrementMonths,
        rentRateChangeFrequency,
        vacancy,
        rentChangeRate,
        montlyRent
      );

      monthlyRentRecords.push({ vacancy, rentAmount: montlyRent, rentDueDate: dueDate });
    }

    if (dayOfMonthRentDue < leaseStartDay) {
      return;
    }
  }

  return monthlyRentRecords;
}

/**
 * Calculates the new monthly rent
 * 
 * @param baseMonthlyRent : the base amount of rent
 * @param rentChangeRate : the rate that rent may increase or decrease (positive for increase, negative for decrease)
 * @returns number
 * 
 */
function calculateNewMonthlyRent(baseMonthlyRent: number, rentChangeRate: number) {
  return baseMonthlyRent * (1 + rentChangeRate);
}

/**
 * Determines if the year is a leap year
 * 
 * @param year 
 * @returns boolean
 * 
 */
function isLeapYear(year: number) {
  return (year % 4 == 0 && year % 100 != 0);
}

function calculateProrated(year: number, month: number) {
  if (month === 1) {
    const febDays = isLeapYear(year) ? 29 : 28;
  };

  return;
}

function isVacancy(currentMonth: number, leaseStartMonth: number) {
  return leaseStartMonth > currentMonth;
}

function isAllowToUpdateMontlyRent(vacancy: boolean, rentChangeRate: number) {
  return vacancy === false && rentChangeRate > 0 || vacancy === true && rentChangeRate < 0;
}

function shouldUpdateMontlyRent(incrementMonths: number, rentRateChangeFrequency: number) {
  return (incrementMonths % rentRateChangeFrequency) === 0;
}

function getDays(year: number, month: number) {
  // Passing day as equal to "0" returns the last day of previous month;
  return new Date(year, month, 0).getDate();
};

function calculateMontlyRent(
  index: number,
  windowStartMonth: number,
  incrementMonths: number,
  rentRateChangeFrequency: number,
  vacancy: boolean,
  rentChangeRate: number,
  montlyRent: number
) {
  if (index !== windowStartMonth) {
    if (
      shouldUpdateMontlyRent(incrementMonths, rentRateChangeFrequency) &&
      isAllowToUpdateMontlyRent(vacancy, rentChangeRate)
    ) {
      const newRentValue = calculateNewMonthlyRent(montlyRent, rentChangeRate).toFixed(2);

      return parseFloat(newRentValue);
    }
  }
  return montlyRent;
}

function getDueDate(leaseYear: number, index: number, dayOfMonthRentDue: number) {
  const daysInCurrentMonth = getDays(leaseYear, index + 1);
  const newDateDay = (dayOfMonthRentDue > daysInCurrentMonth) ? daysInCurrentMonth : dayOfMonthRentDue;
  const newDate = new Date(leaseYear, index, newDateDay);

  newDate.setMonth(index);

  return new Date(newDate);
}