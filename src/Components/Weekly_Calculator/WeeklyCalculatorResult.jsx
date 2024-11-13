

/**
 * THIS COMPONENT IS NOT IN USE
 */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, ScrollView} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {showWeeklyCalculationResult} from './weeklyCalculatorActions';
import CalculatorResultParameterCard from '../Common/CalculatorResultParameterCard';
import WebViewGraphComponent from '../Common/WebViewGraphComponent';

const WeeklyCalculatorResult = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {weeklyCalculationResults, weeklyCalculationFormFields} = useSelector(
    state => state.WeeklyCalculatorStore,
  );
  const graphRef = React.useRef();
  const sendGraphDataToWebview = graphValues => {
    return `(function() {
        document.dispatchEvent(new MessageEvent('webview-graphData', {
          data:  ${JSON.stringify({
            type: 'graph-data',
            data: graphValues,
          })}
        })) 
      })()`;
  };

  React.useEffect(() => {
    dispatch(showWeeklyCalculationResult(graphRef, sendGraphDataToWebview));
  }, []);
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#131b55',
      }}>
      <Text
        style={{
          fontFamily: 'RalewayBold',
          fontSize: 24,
          margin: 10,
          color: '#fff',
        }}>
        Your Results
      </Text>
      {!Object.keys(weeklyCalculationResults).length ? (
        <View>
          <Text>Something Went Wrong!</Text>
          <Button
            mode="contained"
            style={{
              width: '90%',
              backgroundColor: 'blue',
              color: 'white',
            }}
            textColor="white"
            onPress={() => navigation.goBack()}>
            Try Again!
          </Button>
        </View>
      ) : (
        <ScrollView>
          <View
            style={{
              flexDirection: 'column',
              width: '95%',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                width: '100%',
                gap: 20,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 10,
                paddingVertical: 10,
              }}>
              <CalculatorResultParameterCard
                title="starting  principal"
                value={weeklyCalculationFormFields.start_principal}
              />
              <CalculatorResultParameterCard
                title="Weekly increase"
                value={weeklyCalculationFormFields.inc_in_weekly_cont}
              />
              <CalculatorResultParameterCard
                title="Total Returns"
                value={
                  Object.values(weeklyCalculationResults.week_wise_data)[
                    Object.values(weeklyCalculationResults.week_wise_data)
                      .length - 1
                  ].account_value
                }
              />
              <CalculatorResultParameterCard
                title="weekly contribution"
                value={weeklyCalculationFormFields.weekly_contribution}
              />
            </View>

            <View style={{flex: 1, marginLeft: 20, width: '100%', height: 250}}>
              {weeklyCalculationResults?.week_wise_data &&
                Object.values(weeklyCalculationResults.week_wise_data)
                  .length && (
                  <WebViewGraphComponent
                    graphRef={graphRef}
                    onLoad={() => {
                      dispatch(
                        showWeeklyCalculationResult(
                          graphRef,
                          sendGraphDataToWebview,
                        ),
                      );
                    }}
                  />
                )}
            </View>
            <Button
              mode="contained"
              style={{
                width: '90%',
                backgroundColor: 'black',
                color: 'white',
                marginBottom: 20,
              }}
              textColor="white"
              onPress={() => navigation.goBack()}>
              Back to Main
            </Button>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default WeeklyCalculatorResult;
//CalculatorResultParameterCard

/**
 *   const lineData = [
      {value: 0, dataPointText: '0', label: '0'},
      {value: 10, dataPointText: '10', label: '10'},
      {value: 8, dataPointText: '8'},
      {value: 50, label: '50'},
      {value: 58, dataPointText: '58'},
      {value: 56, dataPointText: '56'},
      {value: 60, label: '60'},
      {value: 70, label: '70'},
      {value: 78, dataPointText: '78'},
      {value: 74, dataPointText: '74'},
      {value: 80, label: '80'},
      {value: 90, label: '90'},
      {value: 98, dataPointText: '98'},
    ];
  const lineData2 = [
    {value: 0, dataPointText: '0'},
    {value: 20, dataPointText: '20'},
    {value: 18, dataPointText: '18'},
    {value: 40, dataPointText: '40'},
    {value: 36, dataPointText: '36'},
    {value: 60, dataPointText: '60'},
    {value: 54, dataPointText: '54'},
    {value: 85, dataPointText: '85'},
  ];
 */

// const formatNumber = number => {
//   if (number < 1000) {
//     return number.toString(); // For numbers less than 1000, return the original number
//   } else if (number < 1000000) {
//     return (number / 1000).toFixed(0) + 'k'; // For numbers between 1000 and 1000000, divide by 1000 and add "k"
//   } else {
//     return (number / 1000000).toFixed(0) + 'mil'; // For numbers greater than or equal to 1000000, divide by 1000000 and add "mil"
//   }
// };

// const totalInvestedAmount1 =
//   Object.values(RESULTS_DATA?.week_wise_data).map(v => ({
//     value: parseInt(v.account_value, 10),
//     dataPointText: v.account_value.toFixed(1).toString(),
//     time: v.week_no,
//   })) || [];
// const totalValueAmount2 =
//   Object.values(RESULTS_DATA?.week_wise_data).map(v => ({
//     value: parseInt(v.total_contribution, 10),
//     dataPointText: v.total_contribution.toFixed(1).toString(),
//     time: v.week_no,
//   })) || [];

/* <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                backgroundColor: 'rgba(100, 100, 111, 0.2)',
                paddingHorizontal: 20,
                paddingTop: 10,
                borderRadius: 20,
                elevation: 5,
                marginLeft: 12,
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  paddingVertical: 10,
                  width: '100%',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      backgroundColor: 'skyblue',
                      width: 15,
                      height: 15,
                      borderRadius: 50,
                    }}
                  />
                  <Text style={{fontFamily: 'RalewayThin', color: 'white'}}>
                    {' '}
                    Total Returns{' '}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      backgroundColor: 'orange',
                      width: 15,
                      height: 15,
                      borderRadius: 50,
                    }}
                  />
                  <Text style={{fontFamily: 'RalewayThin', color: 'white'}}>
                    {' '}
                    Actual investment{' '}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  gap: 10,
                  width: '100%',
                  borderRadius: 20,
                  shadowColor: 'rgba(100, 100, 111, 0.2)',
                  shadowOffset: {width: 7, height: 29},
                  shadowOpacity: 0.2,
                  shadowRadius: 1,
                  paddingVertical: 10,
                  elevation: 6,
                  paddingHorizontal: 12,
                  backgroundColor: 'rgba(100, 100, 111, 0.2)',
                }}>
                <Text style={{fontFamily: 'RalewayBold', color: 'white'}}>
                  Week : {value + 1}
                </Text>
                <Text style={{fontFamily: 'RalewayBold', color: 'white'}}>
                  Total Investment Till Week {value + 1} : ${' '}
                  {
                    Object.values(RESULTS_DATA.week_wise_data)[value]
                      .total_contribution
                  }
                </Text>
                <Text style={{fontFamily: 'RalewayBold', color: 'white'}}>
                  Total Returns Till Week {value + 1} : ${' '}
                  {
                    Object.values(RESULTS_DATA.week_wise_data)[value]
                      .account_value
                  }
                </Text>
              </View>
              <LineChart
                // areaChart
                dataPointRadius={10}
                data={[...totalInvestedAmount1]}
                data2={[...totalValueAmount2]}
                height={250}
                width={250}
                curved
                isAnimated
                // hideRules
                spacing={1}
                // initialSpacing={0}
                color1="skyblue"
                color2="orange"
                textColor1="transparent"
                dataPointsHeight={10}
                dataPointsWidth={10}
                dataPointsColor1="blue"
                dataPointsColor2="red"
                startFillColor1="skyblue"
                startFillColor2="orange"
                textShiftY={-2}
                textShiftX={-5}
                textFontSize={10}
                // backgroundColor={'rgba(100, 100, 111, 0.2)'}
                backgroundColor={'transparent'}
                scrollAnimation
                endFillColor="lightgray"
                yAxisTextStyle={{fontFamily: 'RalewayLight', fontSize: 10}}
                xAxisLabelTextStyle={{fontFamily: 'RalewayLight'}}
                labelTextStyle={{fontFamily: 'RalewayLight'}}
                textColor2="transparent"
                showScrollIndicator
                // yAxisOffset={RESULTS_DATA.initial_sip}
                nestedScrollEnabled
                overflowTop={1}
                // xAxisLabelTexts={[
                //   ...Array.from(
                //     {length: RESULTS_DATA.totalYears},
                //     (_, index) => index + 1,
                //   ),
                // ]}
                focusEnabled
                onlyPositive
                showTextOnFocus
                // showDataPointLabelOnFocus
                showDataPoints
                onFocus={(_, b) => {
                  setValue(b);
                }}
                yAxisLabelPrefix="$"
                formatYLabel={label => formatNumber(parseInt(label, 10))}
                focusedDataPointLabelComponent={(item, index) => (
                  <Text style={{color: 'black', fontSize: 15}}>
                    {item.value}
                  </Text>
                )}
              />
            </View> */
