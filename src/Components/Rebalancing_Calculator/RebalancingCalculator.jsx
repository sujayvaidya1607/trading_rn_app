/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { View, ScrollView, Alert, Platform } from "react-native";
import { Button, Text } from "react-native-paper";
import InputComponent from "../Common/InputComponent";
import CommonDateTimePicker from "../Common/CommonDateTimePicker";
import moment from "moment";
import WebViewGraphComponent from "../Common/WebViewGraphComponent";
import { StatusBar } from "expo-status-bar";

const RebalancingCalculator = () => {
  const graphRef = React.useRef();
  const [sipCalculationFields, setSipCalculationFields] = React.useState({
    stock_name1: "nvda",
    stock_name2: "aapl",
    allocation_1_stock_1: "",
    allocation_2_stock_1: "",
    allocation_1_stock_2: "",
    allocation_2_stock_2: "",
    leverage: "",
    coverage: "",
    start_date: "",
    end_date: "",
    inc_in_yearly_invest: "500",
    weekly_investment: "10",
    initial_investment: "3000",
  });
  // const [increaseInYearlyInvestment, setInvestmentInYearlyInvestment] =
  // React.useState(0);
  // const [dailyInvestment, setDailyInvestment] = React.useState(0);
  const [showDatePickers, setShowDatePickers] = React.useState({
    startDate: false,
    endDate: false,
  });
  const [dateValues, setDateValues] = React.useState({
    startDate: "",
    endDate: "",
  });
  const [calculationLoader, setCalculationLoader] = React.useState(false);
  const [checkButtonLoader, setCheckButtonLoader] = React.useState(false)
  const onChange = (event, selectedDate, field) => {
    setShowDatePickers({
      startDate: false,
      endDate: false,
    });
    if (event.type === "set") {
      if (field === "startDate") {
        setSipCalculationFields((prev) => ({
          ...prev,
          start_date: moment(selectedDate).format("YYYY-MM-DD"),
        }));
        setDateValues((prev) => ({
          ...prev,
          startDate: selectedDate,
        }));
      } else {
        setSipCalculationFields((prev) => ({
          ...prev,
          end_date: moment(selectedDate).format("YYYY-MM-DD"),
        }));
        setDateValues((prev) => ({
          ...prev,
          endDate: selectedDate,
        }));
      }
    }
  };

  const getCalculationResults = async () => {
    if (Object.values(sipCalculationFields).some((v) => !v.length)) {
      Alert.alert("Error", "Please fill in all required fields.");
    } else {
      console.log("sipCalculationFields", sipCalculationFields);
      setCalculationLoader(true);
      try {
        const request = await fetch(
          `https://whole-logically-polecat.ngrok-free.app/api/account/analyse-account/?stock_name=${
            sipCalculationFields.stock_name
          }&inc_in_yearly_invest=${parseInt(
            sipCalculationFields.inc_in_yearly_invest,
            10
          )}&weekly_investment=${parseInt(
            sipCalculationFields.weekly_investment,
            10
          )}&start_date=${sipCalculationFields.start_date}&end_date=${
            sipCalculationFields.end_date
          }`
        );
        const response = await request.json();
        console.log("response", response);

        if (response && response.data) {
          setCalculationLoader(false);
          console.log("Success!", response.data);
          // dispatch(
          //   YearlyInvestmentActions.setYearlyInvestmentResult({
          //     ...response.data,
          //   }),
          // );
          // dispatch(
          //   YearlyInvestmentActions.setYearlyCalculationFormFields({
          //     ...sipCalculationFields,
          //   }),
          // );
          // dispatch(
          //   showYearlyCalculationResult(graphRef, sendGraphDataToWebview),
          // );
          // navigation.navigate(routeNames.YEARLY_CALCULATOR_RESULT);
        }
      } catch (error) {
        console.log("error occurred: ", error);
        Alert.alert(
          "Error",
          `An error occurred while calculating. ${JSON.stringify(error)}`
        );
        setCalculationLoader(false);
      }
    }
  };
  return (
    <ScrollView
      style={{
        backgroundColor: "black",
      }}
    >
      <StatusBar
        style={Platform.OS === "android" ? "light" : "dark"}
        backgroundColor="#000"
      />

      <View
        style={{
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          width: "100%",
          paddingTop: 20,
          // backgroundColor: '#131b55',
          backgroundColor: "black",
          paddingBottom: 20,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Text
            style={{
               fontFamily: 'RalewayBold',
              fontSize: 24,
              marginBottom: 10,
              color: "#fff",
            }}
          >
            Rebalancing Calculator
          </Text>
        </View>
        <View
          style={{
            width: "90%",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          <Text style={{color : '#FFF'}} >Stock 1</Text>
          <View style={{ flexDirection: "row" }}>
            <InputComponent
              title="Name"
              iconName="dollar-sign"
              // placeholder="Enter name"
              inputMode="text"
              value={sipCalculationFields.stock_name1}
              onChangeText={(text) => {
                setSipCalculationFields((prev) => ({
                  ...prev,
                  stock_name1: text,
                }));
              }}
              titleFontSize={9}
              showBackground = {false}
            />
            <InputComponent
              title="Allocation 1"
              iconName="dollar-sign"
              // placeholder="Enter amount ($)"
              inputMode="text"
              value={sipCalculationFields.allocation_1_stock_1}
              onChangeText={(text) => {
                setSipCalculationFields((prev) => ({
                  ...prev,
                  allocation_1_stock_1: text,
                }));
              }}
              titleFontSize={9}
              showBackground = {false}
            />
            <InputComponent
              title="Allocation 2"
              iconName="dollar-sign"
              // placeholder="Enter amount ($)"
              inputMode="text"
              value={sipCalculationFields.allocation_2_stock_1}
              onChangeText={(text) => {
                setSipCalculationFields((prev) => ({
                  ...prev,
                  allocation_2_stock_1: text,
                }));
              }}
              titleFontSize={9}
              showBackground = {false}
            />
            <InputComponent
              title="Leverage"
              iconName="dollar-sign"
              // placeholder="Enter amount ($)"
              inputMode="text"
              value={sipCalculationFields.leverage}
              onChangeText={(text) => {
                setSipCalculationFields((prev) => ({
                  ...prev,
                  leverage: text,
                }));
              }}
              titleFontSize={9}
              showBackground = {false}
            />
          </View>
          <Text style={{color : '#FFF'}} >Stock 2</Text>
          <View style={{ flexDirection: "row" }}>
            <InputComponent
              title="Name"
              iconName="dollar-sign"
              // placeholder="Enter name"
              inputMode="text"
              value={sipCalculationFields.stock_name2}
              onChangeText={(text) => {
                setSipCalculationFields((prev) => ({
                  ...prev,
                  stock_name2: text,
                }));
              }}
              titleFontSize={9}
              showBackground = {false}
            />
            <InputComponent
              title="Allocation 1"
              iconName="dollar-sign"
              // placeholder="Enter amount ($)"
              inputMode="text"
              value={sipCalculationFields.allocation_1_stock_2}
              onChangeText={(text) => {
                setSipCalculationFields((prev) => ({
                  ...prev,
                  allocation_1_stock_2: text,
                }));
              }}
              titleFontSize={9}
              showBackground = {false}
            />
            <InputComponent
              title="Allocation 2"
              iconName="dollar-sign"
              // placeholder="Enter amount ($)"
              inputMode="text"
              value={sipCalculationFields.allocation_2_stock_2}
              onChangeText={(text) => {
                setSipCalculationFields((prev) => ({
                  ...prev,
                  allocation_2_stock_1: text,
                }));
              }}
              titleFontSize={9}
              showBackground = {false}
            />
            <InputComponent
              title="Leverage"
              iconName="dollar-sign"
              // placeholder="Enter amount ($)"
              inputMode="text"
              value={sipCalculationFields.coverage}
              onChangeText={(text) => {
                setSipCalculationFields((prev) => ({
                  ...prev,
                  coverage: text,
                }));
              }}
              titleFontSize={9}
              showBackground = {false}
            />
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 20,
              marginTop: "5%",
            }}
          >
            <Button
              mode="elevated"
              style={{
                width: "90%",
                backgroundColor: "red",
                color: "white",
              }}
              textColor="white"
              loading={calculationLoader}
              onPress={() => {
                // getCalculationResults();
                setCheckButtonLoader(true)
                setTimeout(() => {
                  setCheckButtonLoader(false)
                }, 500);
              }}
            >
              {" "}
              {checkButtonLoader ? "Checking" : " Check"}
            </Button>
          </View>
          <View style={{ flexDirection: "row" }}>
            <InputComponent
              title="Inital investment"
              iconName="dollar-sign"
              value={sipCalculationFields.initial_investment}
              onChangeText={(text) => {
                setSipCalculationFields((prev) => ({
                  ...prev,
                  initial_investment: text,
                }));
              }}
            />
            <InputComponent
              title="Yearly increase"
              iconName="dollar-sign"
              value={sipCalculationFields.inc_in_yearly_invest}
              onChangeText={(text) => {
                setSipCalculationFields((prev) => ({
                  ...prev,
                  inc_in_yearly_invest: text,
                }));
              }}
            />
            <InputComponent
              title="Weekly investment"
              iconName="dollar-sign"
              value={sipCalculationFields.weekly_investment}
              onChangeText={(text) => {
                setSipCalculationFields((prev) => ({
                  ...prev,
                  weekly_investment: text,
                }));
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              justifyContent: "space-between",
            }}
          >
            <Button
              mode="contained-tonal"
              style={{ margin: "auto", marginTop: 10 }}
              onPress={() => {
                setShowDatePickers({
                  startDate: true,
                  endDate: false,
                });
              }}
            >
              {sipCalculationFields.start_date
                ? sipCalculationFields.start_date
                : "Select Start Date"}
            </Button>
            <Button
              mode="contained-tonal"
              style={{ margin: "auto", marginTop: 10 }}
              onPress={() => {
                setShowDatePickers({
                  startDate: false,
                  endDate: true,
                });
              }}
            >
              {sipCalculationFields.end_date
                ? sipCalculationFields.end_date
                : "Select End Date"}
            </Button>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 20,
            marginTop: "5%",
          }}
        >
          <Button
            mode="elevated"
            style={{
              width: "90%",
              backgroundColor: "red",
              color: "white",
            }}
            textColor="white"
            loading={calculationLoader}
            onPress={() => {
              getCalculationResults();
            }}
          >
            {" "}
            {calculationLoader ? "Calculating" : " Calculate"}
          </Button>
        </View>
        <View
          style={{
            flex: 1,
            marginLeft: 20,
            width: "100%",
            height: 250,
            marginTop: 20,
          }}
        >
          <WebViewGraphComponent
            graphRef={graphRef}
            onLoad={() => {
              // dispatch(
              //   showYearlyCalculationResult(
              //     graphRef,
              //     sendGraphDataToWebview,
              //   ),
              // );
            }}
          />
        </View>
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
            onChange(event, selectedDate, "startDate")
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
            onChange(event, selectedDate, "endDate")
          }
          placeholderText="Investment End Date"
          minimumDate={moment(dateValues.startDate).toDate() || new Date()}
          maximumDate={new Date()}
        />
      )}
    </ScrollView>
  );
};
export default RebalancingCalculator;
