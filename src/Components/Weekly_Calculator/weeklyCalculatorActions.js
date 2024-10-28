import moment from 'moment';

export const showWeeklyCalculationResult =
  (graphRef, sendGraphDataToWebview) => (_, getState) => {
    const {weeklyCalculationResults} = getState().WeeklyCalculatorStore;
    const returns = Object.values(weeklyCalculationResults?.week_wise_data).map(
      v => ({
        value: parseInt(v.account_value, 10),
        // time: getDateOfWeek(v.week_no),
        time: parseInt(v.week_no, 10) + 1,
      }),
    );
    const totalContribution = Object.values(
      weeklyCalculationResults?.week_wise_data,
    ).map(v => ({
      value: parseInt(v.total_contribution, 10),
      // time: getDateOfWeek(v.week_no),
      time: parseInt(v.week_no, 10) + 1,
    }));

    graphRef.current.injectJavaScript(
      sendGraphDataToWebview({
        returnsValue: returns,
        actualValue: totalContribution,
        showNumbersOnXAxis: true,
      }),
    );
  };
export const getDateOfWeek = weekNumber => {
  const today = moment();
  if (weekNumber === 0) {
    return moment().subtract(1, 'days').format('YYYY-MM-DD');
  } else {
    const resultDate = today.add((weekNumber - 1) * 7, 'days'); // Add the number of days

    // Convert the date to UTC and format it to YYYY-MM-DD
    const utcDate = resultDate.utc().format('YYYY-MM-DD');
    return utcDate;
  }
};
