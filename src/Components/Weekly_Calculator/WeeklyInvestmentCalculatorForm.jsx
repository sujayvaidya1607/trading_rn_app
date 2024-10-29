/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Alert, ScrollView, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import InputComponent from '../Common/InputComponent';
// import RangeSlider from '../Common/RangeSlider';
import {useDispatch, useSelector} from 'react-redux';
import {WeeklyInvestmentActions} from '../../Slices/weeklyInvestmentSlice';
import WebViewGraphComponent from '../Common/WebViewGraphComponent';
import {showWeeklyCalculationResult} from './weeklyCalculatorActions';

const WeeklyInvestmentCalculatorForm = () => {
  const dispatch = useDispatch();
  const {weeklyCalculationResults} = useSelector(
    state => state.WeeklyCalculatorStore,
  );
  const {isFullScreen} = useSelector(state => state.CommonStore);

  const [sipCalculationFields, setSipCalculationFields] = React.useState({
    start_principal: '10000',
    inc_in_weekly_cont: '10',
    weekly_contribution: '100',
  });
  const [interestRate, setInterestRate] = React.useState(0);
  const [totalYears, setTotalYears] = React.useState(0);
  const [calculationLoader, setCalculationLoader] = React.useState(false);
  const getCalculationResults = async () => {
    if (Object.values(sipCalculationFields).some(v => !v.length)) {
      Alert.alert('Error', 'Please fill in all required fields.');
    } else if ([interestRate, totalYears].some(v => v.length <= 0)) {
      Alert.alert(
        'Error',
        'Please fill in all required fields and ensure they are greater than zero.',
      );
    } else {
      setCalculationLoader(true);
      console.log(
        'entered fields',
        sipCalculationFields,
        interestRate,
        totalYears,
      );
      try {
        const request = await fetch(
          `https://whole-logically-polecat.ngrok-free.app/api/account/track-account/?start_principal=${parseInt(
            sipCalculationFields.start_principal,
            10,
          )}&weekly_contribution=${parseInt(
            sipCalculationFields.weekly_contribution,
            10,
          )}&inc_in_weekly_cont=${parseInt(
            sipCalculationFields.inc_in_weekly_cont,
            10,
          )}&interest_rate=${parseFloat(interestRate, 10)}&years=${parseInt(
            totalYears,
            10,
          )}`,
        );
        const response = await request.json();
        if (response && response.data) {
          setCalculationLoader(false);
          console.log('Success!', response.data);
          // navigation.push('Stock graph data', {
          //   ...response.data,
          //   ...sipCalculationFields,
          //   interestRate,
          //   totalYears,
          // });
          dispatch(
            WeeklyInvestmentActions.setWeeklyInvestmentResult({
              ...response.data,
            }),
          );
          dispatch(
            WeeklyInvestmentActions.setWeeklyCalculationFormFields({
              ...sipCalculationFields,
              interestRate,
              totalYears,
            }),
          );
          dispatch(
            showWeeklyCalculationResult(graphRef, sendGraphDataToWebview),
          );

          // navigation.navigate(routeNames.WEEKLY_CALCULATOR_RESULT);
        }
      } catch (error) {
        console.log('error occurred: ', error);
        Alert.alert(
          'Error',
          `An error occurred while calculating. ${JSON.stringify(error)}`,
        );
        setCalculationLoader(false);
      }
    }
  };
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
  return (
    <ScrollView
      style={{
        backgroundColor: 'black',
      }}
      contentContainerStyle={{
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
      }}>
      <View
        style={{
          justifyContent: 'flex-start',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
          width: '100%',
          // height: '100%',
          paddingTop: 20,
          // backgroundColor: '#131b55',
          backgroundColor: 'black',
          paddingBottom: 20,
          display: isFullScreen ? 'none' : 'flex',
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            marginRight: 20,
          }}>
          <Text
            style={{
              // fontFamily: 'RalewayBold',
              fontSize: 24,
              marginBottom: 10,
              color: '#fff',
            }}>
            Account Tracker
          </Text>
        </View>

        <View
          style={{
            width: '100%',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 10,
            paddingTop: 20,
          }}>
          <InputComponent
            title="Starting Principle"
            iconName="dollar-sign"
            value={sipCalculationFields.start_principal}
            onChangeText={text => {
              setSipCalculationFields(prev => ({
                ...prev,
                start_principal: text,
              }));
            }}
            placeholder={'Enter amount ($)'}
            inputMode={'numeric'}
          />

          <InputComponent
            title="Weekly Contribution"
            iconName="dollar-sign"
            value={sipCalculationFields.weekly_contribution}
            onChangeText={text => {
              setSipCalculationFields(prev => ({
                ...prev,
                weekly_contribution: text,
              }));
            }}
            placeholder="Enter amount ($)"
            inputMode="numeric"
          />
          <InputComponent
            title="Weekly increase in contribution"
            iconName="dollar-sign"
            value={sipCalculationFields.inc_in_weekly_cont}
            onChangeText={text => {
              setSipCalculationFields(prev => ({
                ...prev,
                inc_in_weekly_cont: text,
              }));
            }}
            inputMode="numeric"
            placeholder="Enter amount ($)"
          />
          <InputComponent
            title="Interest Rate"
            iconName="chart-line"
            value={interestRate}
            setValue={setInterestRate}
            afterValueText="%"
            steps={0.2}
            shouldShowSlider
          />
          <InputComponent
            title="Total years"
            iconName="calendar-alt"
            value={totalYears}
            setValue={setTotalYears}
            afterValueText="years"
            steps={1}
            shouldShowSlider
            onChangeText={text => {
              setTotalYears(parseInt(text, 10));
            }}
          />
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 20,
            marginTop: '5%',
          }}>
          <Button
            mode="elevated"
            style={{
              width: '90%',
              backgroundColor: 'red',
              color: 'white',
            }}
            textColor="white"
            loading={calculationLoader}
            onPress={() => {
              getCalculationResults();
            }}>
            {' '}
            {calculationLoader ? 'Calculating' : ' Calculate'}
          </Button>
          {/* <Button
            mode="outlined"
            disabled={calculationLoader}
            onPress={() => {
              setSipCalculationFields({
                start_principal: 100,
                step_up_percent: 1,
                annual_return_rate: 10,
                years: 10,
                st_name: '',
              });
              Alert.alert('Reset successful');
            }}>
            Reset
          </Button> */}
        </View>
      </View>
      <View
        style={{
          width: '100%',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {weeklyCalculationResults?.week_wise_data &&
          Object.values(weeklyCalculationResults.week_wise_data).length && (
            <View
              style={{
                flex: 1,
                marginLeft: 20,
                width: '100%',
                height: 250,
                marginTop: 20,
              }}>
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
            </View>
          )}
      </View>
    </ScrollView>
  );
};
export default WeeklyInvestmentCalculatorForm;
