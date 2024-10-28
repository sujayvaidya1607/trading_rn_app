/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, ScrollView, Alert} from 'react-native';
import {Button, Text} from 'react-native-paper';
import InputComponent from '../Common/InputComponent';
import CommonDateTimePicker from '../Common/CommonDateTimePicker';
import moment from 'moment';
// import routeNames from '../Routes/routeNames';
// import {useNavigation} from '@react-navigation/native';
import {YearlyInvestmentActions} from '../../Slices/yearlyInvestmentSlice';
import {useDispatch, useSelector} from 'react-redux';
import WebViewGraphComponent from '../Common/WebViewGraphComponent';
import {showYearlyCalculationResult} from './yearlyCalculatorActions';
const YearlyInvestmentCalculatorForm = () => {
  // const navigation = useNavigation();
  const dispatch = useDispatch();
  const {yearlyCalculationResults} = useSelector(
    state => state.YearlyCalculatorStore,
  );
  const {isFullScreen} = useSelector(state => state.CommonStore);
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
  const [sipCalculationFields, setSipCalculationFields] = React.useState({
    stock_name: 'nvda',
    start_date: '',
    end_date: '',
    inc_in_yearly_invest: '500',
    daily_investment: '10',
  });
  const [increaseInYearlyInvestment, setInvestmentInYearlyInvestment] =
    React.useState(0);
  const [dailyInvestment, setDailyInvestment] = React.useState(0);
  const [showDatePickers, setShowDatePickers] = React.useState({
    startDate: false,
    endDate: false,
  });
  const [dateValues, setDateValues] = React.useState({
    startDate: '',
    endDate: '',
  });
  const [calculationLoader, setCalculationLoader] = React.useState(false);
  const [trigger, setTrigger] = React.useState(false);

  const onChange = (event, selectedDate, field) => {
    setShowDatePickers({
      startDate: false,
      endDate: false,
    });
    if (event.type === 'set') {
      if (field === 'startDate') {
        setSipCalculationFields(prev => ({
          ...prev,
          start_date: moment(selectedDate).format('YYYY-MM-DD'),
        }));
        setDateValues(prev => ({
          ...prev,
          startDate: selectedDate,
        }));
      } else {
        setSipCalculationFields(prev => ({
          ...prev,
          end_date: moment(selectedDate).format('YYYY-MM-DD'),
        }));
        setDateValues(prev => ({
          ...prev,
          endDate: selectedDate,
        }));
      }
    }
  };

  const getCalculationResults = async () => {
    if (Object.values(sipCalculationFields).some(v => !v.length)) {
      Alert.alert('Error', 'Please fill in all required fields.');
    } else {
      console.log('sipCalculationFields', sipCalculationFields);
      setCalculationLoader(true);
      try {
        const request = await fetch(
          `https://whole-logically-polecat.ngrok-free.app/api/account/analyse-account/?stock_name=${
            sipCalculationFields.stock_name
          }&inc_in_yearly_invest=${parseInt(
            increaseInYearlyInvestment,
            10,
          )}&daily_investment=${parseInt(dailyInvestment, 10)}&start_date=${
            sipCalculationFields.start_date
          }&end_date=${sipCalculationFields.end_date}`,
        );
        const response = await request.json();
        console.log('response', response);

        if (response && response.data) {
          setCalculationLoader(false);
          console.log('Success!', response.data);
          dispatch(
            YearlyInvestmentActions.setYearlyInvestmentResult({
              ...response.data,
            }),
          );
          dispatch(
            YearlyInvestmentActions.setYearlyCalculationFormFields({
              ...sipCalculationFields,
            }),
          );
          dispatch(
            showYearlyCalculationResult(
              graphRef,
              sendGraphDataToWebview,
              setTrigger,
            ),
          );
          // navigation.navigate(routeNames.YEARLY_CALCULATOR_RESULT);
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
  React.useEffect(() => {
    if (
      yearlyCalculationResults?.date_wise_data &&
      Object.values(yearlyCalculationResults.date_wise_data).length
    ) {
      setTrigger(prev => !prev); // Toggle trigger to force re-render
    }
  }, [yearlyCalculationResults]);

  React.useEffect(() => {
    if (
      yearlyCalculationResults?.date_wise_data &&
      Object.values(yearlyCalculationResults.date_wise_data).length
    ) {
      const returns = Object.values(
        yearlyCalculationResults?.date_wise_data,
      ).map(v => ({
        value: parseInt(v.account_value, 10),

        time: v.date,
      }));
      const totalContribution = Object.values(
        yearlyCalculationResults?.date_wise_data,
      ).map(v => ({
        value: parseInt(v.total_investment, 10),

        time: v.date,
      }));

      graphRef.current.injectJavaScript(
        sendGraphDataToWebview({
          returnsValue: returns,
          actualValue: totalContribution,
        }),
      );
    }
  }, [yearlyCalculationResults]);
  React.useEffect(() => {}, [trigger]);
  console.log('trigger', trigger);

  //https://whole-logically-polecat.ngrok-free.app/api/account/analyse-account/?stock_name=nvda&start_date=2015-01-01&end_date=2016-01-01&inc_in_yearly_invest=365&daily_investment=100
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
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          width: '100%',
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
          }}>
          <Text
            style={{
              fontFamily: 'RalewayBold',
              fontSize: 24,
              marginBottom: 10,
              color: '#fff',
            }}>
            Back testing Calculator
          </Text>
        </View>
        <View
          style={{
            width: '90%',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 10,
            paddingTop: 20,
          }}>
          <InputComponent
            title="Stock Name"
            iconName="dollar-sign"
            placeholder="Enter amount ($)"
            inputMode="text"
            value={sipCalculationFields.stock_name}
            onChangeText={text => {
              setSipCalculationFields(prev => ({
                ...prev,
                stock_name: text,
              }));
            }}
          />
          {/* <TextInput
              style={{
                width: '100%',
                borderWidth: 0,
                fontSize: 12,
                backgroundColor: 'rgba(100, 100, 111, 0.2)',
              }}
              outlineStyle={{borderRadius: 20, borderWidth: 0}}
              placeholder="Enter amount ($)"
              mode="outlined"
              inputMode="text"
              textColor="#fff"
              placeholderTextColor="#fff"
              value={sipCalculationFields.stock_name}
              onChangeText={text => {
                setSipCalculationFields(prev => ({
                  ...prev,
                  stock_name: text,
                }));
              }}
            /> */}
          {/* </InputComponent> */}
          <InputComponent
            title="Increase in yearly investment"
            iconName="dollar-sign"
            value={increaseInYearlyInvestment}
            setValue={setInvestmentInYearlyInvestment}
            steps={1}
            minimumValue={100}
            maximumValue={10000}
            shouldShowSlider
            upperLimit={10000}
            lowerLimit={100}
            beforeValueText="$"
            // value={sipCalculationFields.inc_in_yearly_invest}
            // onChangeText={text => {
            //   setSipCalculationFields(prev => ({
            //     ...prev,
            //     inc_in_yearly_invest: text,
            //   }));
            // }}
          />
          {/* <TextInput
              style={{
                width: '100%',
                borderWidth: 0,
                fontSize: 12,
                backgroundColor: 'rgba(100, 100, 111, 0.2)',
              }}
              outlineStyle={{borderRadius: 20, borderWidth: 0}}
              placeholder="Enter amount ($)"
              mode="outlined"
              textColor="#fff"
              placeholderTextColor="#fff"
              inputMode="numeric"
              value={sipCalculationFields.inc_in_yearly_invest}
              onChangeText={text => {
                setSipCalculationFields(prev => ({
                  ...prev,
                  inc_in_yearly_invest: text,
                }));
              }}
            />
          </InputComponent> */}
          <InputComponent
            title="Daily investment"
            iconName="dollar-sign"
            value={dailyInvestment}
            setValue={setDailyInvestment}
            steps={1}
            minimumValue={10}
            maximumValue={1000}
            shouldShowSlider
            upperLimit={1000}
            lowerLimit={10}
            beforeValueText="$"
          />
          {/* <TextInput
              style={{
                width: '100%',
                borderWidth: 0,
                fontSize: 12,
                backgroundColor: 'rgba(100, 100, 111, 0.2)',
              }}
              outlineStyle={{borderRadius: 20, borderWidth: 0}}
              placeholder="Enter amount ($)"
              mode="outlined"
              inputMode="numeric"
              textColor="#fff"
              placeholderTextColor="#fff"
              value={sipCalculationFields.daily_investment}
              onChangeText={text => {
                setSipCalculationFields(prev => ({
                  ...prev,
                  daily_investment: text,
                }));
              }}
            />
          </InputComponent> */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              justifyContent: 'space-between',
            }}>
            <Button
              mode="contained-tonal"
              style={{margin: 'auto', marginTop: 10}}
              onPress={() => {
                setShowDatePickers({
                  startDate: true,
                  endDate: false,
                });
              }}>
              {sipCalculationFields.start_date
                ? sipCalculationFields.start_date
                : 'Select Start Date'}
            </Button>
            <Button
              mode="contained-tonal"
              style={{margin: 'auto', marginTop: 10}}
              onPress={() => {
                setShowDatePickers({
                  startDate: false,
                  endDate: true,
                });
              }}>
              {sipCalculationFields.end_date
                ? sipCalculationFields.end_date
                : 'Select End Date'}
            </Button>
          </View>
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
        </View>
      </View>

      <View
        style={{
          width: '100%',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {yearlyCalculationResults?.date_wise_data &&
          Object.values(yearlyCalculationResults.date_wise_data).length && (
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
                  console.log('onLoad Ran');

                  dispatch(
                    showYearlyCalculationResult(
                      graphRef,
                      sendGraphDataToWebview,
                      setTrigger,
                      'onLoad ran',
                    ),
                  );
                }}
              />
            </View>
          )}
      </View>
      {showDatePickers.startDate && (
        <CommonDateTimePicker
          value={
            dateValues.startDate
              ? moment(dateValues.startDate).toDate()
              : new Date()
          }
          mode="date"
          onChange={(event, selectedDate) =>
            onChange(event, selectedDate, 'startDate')
          }
          placeholderText="Investment Start Date"
          maximumDate={new Date()}
        />
      )}
      {showDatePickers.endDate && sipCalculationFields.start_date && (
        <CommonDateTimePicker
          value={
            dateValues.endDate
              ? moment(sipCalculationFields.endDate).toDate()
              : new Date()
          }
          mode="date"
          onChange={(event, selectedDate) =>
            onChange(event, selectedDate, 'endDate')
          }
          placeholderText="Investment End Date"
          minimumDate={moment(dateValues.startDate).toDate() || new Date()}
          maximumDate={new Date()}
        />
      )}
    </ScrollView>
  );
};
export default YearlyInvestmentCalculatorForm;
