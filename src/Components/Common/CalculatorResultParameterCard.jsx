import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
/**
 * Common result card component
 * @param {*} props title, value, shouldShowUSD
 */
const CalculatorResultParameterCard = props => {
  const {title, value, shouldShowUSD = true} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>
        {shouldShowUSD ? '$ ' : ''}
        {value}
      </Text>
    </View>
  );
};
export default CalculatorResultParameterCard;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 10,
    width: '44%',
    height: 85,
    borderRadius: 20,
    shadowColor: 'rgba(100, 100, 111, 0.2)',
    shadowOffset: {width: 7, height: 29},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    paddingVertical: 10,
    elevation: 6,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(100, 100, 111, 0.2)',
  },
  text: {
    fontFamily: 'RalewayBold',
    fontSize: 13,
    color: '#fff',
    paddingBottom: 8,
  },
  title: {
    // fontFamily: 'RalewayBold', 
    fontSize: 12, color: '#686992'},
});
