import moment from 'moment';

/**
 * This function arranges the result in the format required for lightweight charts and sends to react js web app.
 * @param {*} graphRef - ref value of webview to inject js function in them.
 * @param {*} sendGraphDataToWebview - function which injects js.
 *
 */
export const showWeeklyCalculationResult =
  (graphRef, sendGraphDataToWebview) => (_, getState) => {
    const {weeklyCalculationResults} = getState().WeeklyCalculatorStore;


     //arrange the result in the required format
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
    //inject to webview
    graphRef.current.injectJavaScript(
      sendGraphDataToWebview({
        returnsValue: returns,
        actualValue: totalContribution,
        showNumbersOnXAxis: true,
      }),
    );
  };


  
  /**
   * 
   * @param {Integer} weekNumber
   * @returns date for the week number from today as start date
   */
export const getDateOfWeek = weekNumber => {
  const today = moment();
  if (weekNumber === 0) {
    return moment().subtract(1, 'days').format('YYYY-MM-DD'); //return the yesterday for 0 th week number
  } else {
    const resultDate = today.add((weekNumber - 1) * 7, 'days'); // Add the number of days

    // Convert the date to UTC and format it to YYYY-MM-DD
    const utcDate = resultDate.utc().format('YYYY-MM-DD');
    return utcDate;
  }
};
