import { calculateMonthlyRent } from "./StorageRent/StorageRent";

let baseMonthlyRent;
let leaseStartDate;
let windowStartDate;
let windowEndDate;
let dayOfMonthRentDue;
let rentRateChangeFrequency;
let rentChangeRate;

calculateMonthlyRent(
  baseMonthlyRent,
  leaseStartDate,
  windowStartDate,
  windowEndDate,
  dayOfMonthRentDue,
  rentRateChangeFrequency,
  rentChangeRate
);
