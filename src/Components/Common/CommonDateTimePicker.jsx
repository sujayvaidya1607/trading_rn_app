import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
const CommonDateTimePicker = props => {
  const {
    value,
    onChange,
    placeholderText,
    mode = 'date',
    minimumDate,
    maximumDate,
    display,
  } = props;
  let maxDate = maximumDate ? maximumDate : null;
  let minDate = minimumDate ? minimumDate : null;
  console.log('props datetime', props);
  return (
    <DateTimePicker
      testID="dateTimePicker"
      value={value}
      mode={mode}
      display={display}
      onChange={onChange}
      placeholderText={placeholderText}
      minimumDate={minDate}
      maximumDate={maxDate}
      is24Hour={false}
      key={value.toISOString()}
    />
  );
};
export default CommonDateTimePicker;

/**
 * onChange code
 *   const onChange = (event, selectedDate) => {
    setShowDatePicker(!showDatePicker);
    // const currentDate = selectedDate
    if (event.type === 'set') {
      const currentDate = moment(selectedDate).format('YYYY-MM-DD');
      setBirthdate(currentDate);
    }
  };
 */
