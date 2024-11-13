

/**
 * This function arranges the result in the format required for lightweight charts and sends to react js web app.
 * @param {*} graphRef - ref value of webview to inject js function in them.
 * @param {*} sendGraphDataToWebview  - function which injects js.
 * @param {*} setTrigger - trigger state.
 * @param {*} msgLog - optional - logs. 
 * 
 */
export const showYearlyCalculationResult =
  (graphRef, sendGraphDataToWebview, setTrigger, msgLog) => (_, getState) => {
    const {yearlyCalculationResults} = getState().YearlyCalculatorStore;
    
    
    //arrange the result in the required format
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
    //inject to webview
    graphRef.current.injectJavaScript(
      sendGraphDataToWebview({
        returnsValue: returns,
        actualValue: totalContribution,
      }),
    );
  };
