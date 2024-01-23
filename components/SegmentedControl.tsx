import { StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import React from 'react';
import { Palette } from '../constants';
import { useFonts } from 'expo-font';
import { useAnimatedStyle, withTiming } from 'react-native-reanimated';

type SegmentedControlProps = {
  options: string[];
  selectedOption?: string;
  onOptionPress?: (option: string) => void;
};

const SegmentedControl = ({ options, selectedOption, onOptionPress }: SegmentedControlProps) => {
  const [fontsLoaded, fontError] = useFonts({
    'SF-Compact-Rounded-Medium': require('../assets/fonts/FontsFree-Net-SF-Compact-Rounded-Medium.ttf'),
  });
  const { width: windowWidth } = useWindowDimensions();

  const internalPadding = 20;
  const segmentedControlWidth = windowWidth - 40;
  const itemWidth = (segmentedControlWidth - internalPadding) / options.length;

  const rStyle = useAnimatedStyle(() => {
    return {
      left: withTiming(itemWidth * options.indexOf(selectedOption) + internalPadding / 2),
    };
  }, [selectedOption, options, itemWidth]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <View
      style={[
        styles.container,
        {
          width: segmentedControlWidth,

          borderRadius: 20,
          paddingLeft: internalPadding / 2,
        },
      ]}>
      <Animated.View
        style={[
          {
            width: itemWidth,
          },
          rStyle,
          styles.activeBox,
        ]}
      />
      {options.map((option) => {
        return (
          <TouchableOpacity
            onPress={() => {
              onOptionPress?.(option);
            }}
            key={option}
            style={[{ width: itemWidth }, styles.labelContainer]}>
            <Text style={styles.label}>{option}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default SegmentedControl;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: Palette.baseGray05,
  },
  activeBox: {
    position: 'absolute',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    height: '80%',
    top: '10%',
    backgroundColor: Palette.background,
  },
  labelContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontFamily: 'SF-Compact-Rounded-Medium',
    fontSize: 16,
  },
});
