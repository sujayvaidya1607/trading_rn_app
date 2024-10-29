/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import RangeSlider from './RangeSlider';
// import Icon from 'react-native-vector-icons/FontAwesome5';

const InputComponent = props => {
  const {
    title,
    value,
    onChangeText,
    placeholder,
    inputMode,
    shouldShowSlider = false,
    setValue,
    afterValueText = '',
    steps = 1,
    minimumValue,
    maximumValue,
    upperLimit,
    lowerLimit,
    beforeValueText,
    titleFontSize = 13,
  } = props; //iconName
  //"dollar-sign"
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        // paddingLeft: 2,
        flexDirection: 'column',
        gap: 5,
        justifyContent: 'center',
        alignItems: 'flex-start',
        elevation: 7,
        borderRadius: 20,
        shadowColor: 'rgba(100, 100, 111, 0.2)',
        shadowOffset: {width: 7, height: 29},
        shadowOpacity: 0.2,
        shadowRadius: 1,
        paddingVertical: 5,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(100, 100, 111, 0.2)',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          gap: 10,
          // paddingHorizontal: 10,
        }}>
        <Text
          style={{
            // fontFamily: 'RalewayBold',
            color: '#fefefe',
            fontSize: titleFontSize,
          }}>
          {title}
        </Text>
      </View>
      {/* {props.children} */}
      {!shouldShowSlider ? (
        <TextInput
          style={{
            width: '100%',
            borderWidth: 0,
            fontSize: titleFontSize > 10 ? 12 : 9,
            backgroundColor: 'rgba(100, 100, 111, 0.2)',
            height: titleFontSize > 10 ? 30 : 20,
            paddingHorizontal: titleFontSize > 10 ? 12 : 0,

          }}
          outlineStyle={{
            borderRadius: 20,
            borderWidth: 0,
            paddingHorizontal: titleFontSize > 10 ? 12 : 0,

          }}
          placeholder={placeholder}
          mode="outlined"
          inputMode={inputMode}
          textColor="#fff"
          placeholderTextColor="#fff"
          value={value}
          onChangeText={text => {
            onChangeText(text);
          }}
        />
      ) : (
        <RangeSlider
          value={value}
          setValue={setValue}
          afterValueText={afterValueText}
          step={steps}
          minimumValue={minimumValue}
          maximumValue={maximumValue}
          upperLimit={upperLimit}
          lowerLimit={lowerLimit}
          beforeValueText={beforeValueText}
        />
      )}
    </View>
  );
};
export default InputComponent;

/* <View
          style={{
            backgroundColor: '#eae8f3',
            paddingVertical: 7,
            paddingHorizontal: 12,
            width: 40,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon
            name={iconName || 'stream'}
            size={12}
            solid
            style={{color: '#686992'}}
          />
        </View> */
