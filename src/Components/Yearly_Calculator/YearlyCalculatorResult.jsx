/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {showYearlyCalculationResult} from './yearlyCalculatorActions';
import {Button} from 'react-native-paper';
import WebViewGraphComponent from '../Common/WebViewGraphComponent';
import CalculatorResultParameterCard from '../Common/CalculatorResultParameterCard';
const YearlyCalculatorResult = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {yearlyCalculationResults, yearlyCalculationFormFields} = useSelector(
    state => state.YearlyCalculatorStore,
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
    dispatch(showYearlyCalculationResult(graphRef, sendGraphDataToWebview));
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
      {!yearlyCalculationResults ||
      (yearlyCalculationResults &&
        !Object.keys(yearlyCalculationResults).length) ? (
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
                title="Stock Name"
                value={yearlyCalculationFormFields.stock_name}
                shouldShowUSD={false}
              />
              <CalculatorResultParameterCard
                title="Yearly increase"
                value={yearlyCalculationFormFields.inc_in_yearly_invest}
              />
              <CalculatorResultParameterCard
                title="Total Returns"
                value={
                  Object.values(yearlyCalculationResults.date_wise_data)[
                    Object.values(yearlyCalculationResults.date_wise_data)
                      .length - 1
                  ].account_value
                }
              />
              <CalculatorResultParameterCard
                title="Daily contribution"
                value={yearlyCalculationFormFields.daily_investment}
              />
              <CalculatorResultParameterCard
                title="Starting from"
                value={yearlyCalculationFormFields.start_date}
                shouldShowUSD={false}
              />
              <CalculatorResultParameterCard
                title="To"
                value={yearlyCalculationFormFields.end_date}
                shouldShowUSD={false}
              />
            </View>

            <View style={{flex: 1, marginLeft: 20, width: '100%', height: 250}}>
              {yearlyCalculationResults?.date_wise_data &&
                Object.values(yearlyCalculationResults.date_wise_data)
                  .length && (
                  <WebViewGraphComponent
                    graphRef={graphRef}
                    onLoad={() => {
                      dispatch(
                        showYearlyCalculationResult(
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
export default YearlyCalculatorResult;
