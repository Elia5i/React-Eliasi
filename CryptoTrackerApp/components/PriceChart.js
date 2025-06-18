import React, { useState } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const PriceChart = ({ coinName = "Bitcoin", prices = [] }) => {
  const [tooltipPos, setTooltipPos] = useState({
    x: 0,
    y: 0,
    visible: false,
    value: 0,
    index: 0,
  });

  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const handleDataPointClick = (data) => {
    setTooltipPos({
      x: data.x,
      y: data.y,
      visible: true,
      value: data.value,
      index: data.index,
    });
  };

  return (
    <View>
      <Text style={styles.title}>{coinName} Price (Past 7 Days)</Text>

      {tooltipPos.visible && (
        <View
          style={[
            styles.tooltip,
            {
              left: tooltipPos.x - 40, 
              top: tooltipPos.y - 60,  
            },
          ]}
        >
          <Text style={styles.tooltipText}>€{tooltipPos.value.toFixed(2)}</Text>
          <Text style={styles.tooltipDate}>{labels[tooltipPos.index]}</Text>
        </View>
      )}

      <LineChart
        data={{
          labels,
          datasets: [{ data: prices, strokeWidth: 2 }],
        }}
        width={screenWidth - 20}
        height={220}
        yAxisLabel="€"
        chartConfig={{
          backgroundGradientFrom: "#1E2923",
          backgroundGradientTo: "#08130D",
          color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#00ffcc",
          },
        }}
        bezier
        style={styles.chart}
        onDataPointClick={handleDataPointClick}
        withShadow={false}
        withOuterLines={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: 'white',
  },
  tooltip: {
    position: 'absolute',
    backgroundColor: '#222',
    padding: 6,
    borderRadius: 6,
    alignItems: 'center',
    zIndex: 10,
    elevation: 10,
  },
  tooltipText: {
    color: '#00ffcc',
    fontWeight: 'bold',
  },
  tooltipDate: {
    color: '#aaa',
    fontSize: 12,
  },
  chart: {
    borderRadius: 16,
    marginHorizontal: 10,
  },
});

export default PriceChart;
