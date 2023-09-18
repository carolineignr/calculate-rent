import { calculateMonthlyRent, MonthlyRentRecord, MonthlyRentRecords } from "../../StorageRent/StorageRent";

describe("calculateMonthlyRent function", () => {

  // tested

  it("should return MonthlyRentRecords validate when first payment is EQUAL to due date - increase rent change and no vacancy", () => {
    const baseMonthlyRent = 100.00;
    const leaseStartDate = new Date("2023-01-01T00:00:00");
    const windowStartDate = new Date("2023-01-01T00:00:00");
    const windowEndDate = new Date("2023-03-31T00:00:00");
    const dayOfMonthRentDue = 1;
    const rentRateChangeFrequency = 1;
    const rentChangeRate = .1;

    const result = calculateMonthlyRent(baseMonthlyRent,
      leaseStartDate, windowStartDate, windowEndDate,
      dayOfMonthRentDue, rentRateChangeFrequency, rentChangeRate);

    let expectedResult = [
      {
        vacancy: false,
        rentAmount: 100.00,
        rentDueDate: new Date("2023-01-01T00:00:00")
      },
      {
        vacancy: false,
        rentAmount: 110.00,
        rentDueDate: new Date("2023-02-01T00:00:00")
      },
      {
        vacancy: false,
        rentAmount: 121.00,
        rentDueDate: new Date("2023-03-01T00:00:00")
      }
    ];

    expect(result).toEqual(expectedResult);
  });

  it("should return MonthlyRentRecords validate when first payment is EQUAL to due date - no rent change and vacancy", () => {
    const baseMonthlyRent = 100.00;
    const leaseStartDate = new Date("2023-02-15T00:00:00");
    const windowStartDate = new Date("2023-01-01T00:00:00");
    const windowEndDate = new Date("2023-03-31T00:00:00");
    const dayOfMonthRentDue = 15;
    const rentRateChangeFrequency = 0;
    const rentChangeRate = 0;

    const result = calculateMonthlyRent(baseMonthlyRent,
      leaseStartDate, windowStartDate, windowEndDate,
      dayOfMonthRentDue, rentRateChangeFrequency, rentChangeRate);

    let expectedResult = [
      {
        vacancy: true,
        rentAmount: 100,
        rentDueDate: new Date("2023-01-15T00:00:00")
      },
      {
        vacancy: false,
        rentAmount: 100.00,
        rentDueDate: new Date("2023-02-15T00:00:00")
      },
      {
        vacancy: false,
        rentAmount: 100.00,
        rentDueDate: new Date("2023-03-15T00:00:00")
      }
    ];

    expect(result).toEqual(expectedResult);
  })

  it("should return MonthlyRentRecords validate due date EQUAL to start date - decreased rent change and vacancy", () => {
    const baseMonthlyRent = 100.00;
    const leaseStartDate = new Date("2023-03-15T00:00:00");
    const windowStartDate = new Date("2023-01-01T00:00:00");
    const windowEndDate = new Date("2023-03-31T00:00:00");
    const dayOfMonthRentDue = 15;
    const rentRateChangeFrequency = 1;
    const rentChangeRate = -0.1;

    const result = calculateMonthlyRent(baseMonthlyRent,
      leaseStartDate, windowStartDate, windowEndDate,
      dayOfMonthRentDue, rentRateChangeFrequency, rentChangeRate);

    let expectedResult = [
      {
        vacancy: true,
        rentAmount: 100,
        rentDueDate: new Date("2023-01-15T00:00:00")
      },
      {
        vacancy: true,
        rentAmount: 90.00,
        rentDueDate: new Date("2023-02-15T00:00:00")
      },
      {
        vacancy: false,
        rentAmount: 90.00,
        rentDueDate: new Date("2023-03-15T00:00:00")
      }
    ];

    expect(result).toEqual(expectedResult);
  })
  
  it("should return MonthlyRentRecords validate due date on 31th and rent due on 28 days month", () => {
    const baseMonthlyRent = 100.00;
    const leaseStartDate = new Date("2023-01-31T00:00:00");
    const windowStartDate = new Date("2023-01-01T00:00:00");
    const windowEndDate = new Date("2023-03-31T00:00:00");
    const dayOfMonthRentDue = 31;
    const rentRateChangeFrequency = 1;
    const rentChangeRate = .1;

    const result = calculateMonthlyRent(baseMonthlyRent,
      leaseStartDate, windowStartDate, windowEndDate,
      dayOfMonthRentDue, rentRateChangeFrequency, rentChangeRate);

    let expectedResult = [
      {
        vacancy: false,
        rentAmount: 100.00,
        rentDueDate: new Date("2023-01-31T00:00:00")
      },
      {
        vacancy: false,
        rentAmount: 110.00,
        rentDueDate: new Date("2023-02-28T00:00:00")
      },
      {
        vacancy: false,
        rentAmount: 121.00,
        rentDueDate: new Date("2023-03-31T00:00:00")
      }
    ];

    expect(result).toEqual(expectedResult);
  })

  // to test
  

});
