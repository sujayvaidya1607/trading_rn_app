/* eslint-disable react-native/no-inline-styles */
import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Slider from "@react-native-community/slider";
import { useSelector } from "react-redux";

const RangeSlider = (props) => {
  const {
    value,
    setValue,
    afterValueText,
    step,
    minimumValue,
    maximumValue,
    upperLimit,
    lowerLimit,
    beforeValueText,
  } = props;
  const { isFullScreen } = useSelector((state) => state.CommonStore);

  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "row-reverse",
        display: isFullScreen ? "none" : "flex",
      }}
    >
      <Text style={styles.text}>
        {`${beforeValueText || ""}` + value &&
          value + " " + `${afterValueText || ""}`}
      </Text>
      <Slider
        step={step || 0.5}
        style={[styles.slider]}
        value={value}
        onValueChange={setValue}
        minimumValue={minimumValue || 0}
        maximumValue={maximumValue || 30}
        upperLimit={upperLimit || 100}
        lowerLimit={lowerLimit || 0}
        tapToSeek
        minimumTrackTintColor={"#a594d2"}
        maximumTrackTintColor={"#979EA4"}
      />
    </View>
  );
};
export default RangeSlider;
const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
    margin: 0,
    color: "white",
  },

  slider: {
    width: 300,
    opacity: 1,
    marginTop: 10,
  },
});
