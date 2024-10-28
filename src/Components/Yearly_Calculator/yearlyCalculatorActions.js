export const showYearlyCalculationResult =
  (graphRef, sendGraphDataToWebview, setTrigger, msgLog) => (_, getState) => {
    const {yearlyCalculationResults} = getState().YearlyCalculatorStore;
    const returns = Object.values(yearlyCalculationResults?.date_wise_data).map(
      v => ({
        value: parseInt(v.account_value, 10),

        time: v.date,
      }),
    );
    const totalContribution = Object.values(
      yearlyCalculationResults?.date_wise_data,
    ).map(v => ({
      value: parseInt(v.total_investment, 10),

      time: v.date,
    }));
    setTrigger(prev => !prev);
    if (msgLog) {
      console.log('msgLog', msgLog, returns.length);
    }
    graphRef.current.injectJavaScript(
      sendGraphDataToWebview({
        returnsValue: returns,
        actualValue: totalContribution,
      }),
    );
  };
