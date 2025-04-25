import React, { useMemo } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceArea } from 'recharts';

// Default props in case none are provided
const defaultProps = {
  data: [],
  dataKeys: ['value'], // Expecting an array, e.g., ['bpm'] or ['systolic', 'diastolic']
  unit: 'units',      // Can be a string or an array matching dataKeys
  safeRange: { low: 0, high: 100 }, // Can be an object or an array matching dataKeys
  chartName: 'Measurement', // Can be a string or an array matching dataKeys
  height: 300, // Default height
  medianOrNot: true, // Default to showing median
};

// Function to calculate median (operates on the first dataKey)
const calculateMedian = (values) => {
  if (!values || values.length === 0) return null;
  // Filter out non-numeric values before sorting
  const sorted = [...values].filter(v => typeof v === 'number' && !isNaN(v)).sort((a, b) => a - b);
  if (sorted.length === 0) return null; // Return null if no valid numbers
  const middle = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    // Average of two middle numbers for even length
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }
  // Middle number for odd length
  return sorted[middle];
};

function LineChartComponent(props) {
  // Merge provided props with defaults, correctly extracting medianOrNot
  const { data: rawData, dataKeys, unit, safeRange, chartName, height, medianOrNot, yMin = 0, yMax, noZone = false } = { ...defaultProps, ...props };

  // Use the first dataKey for median calculation (if needed) and primary Y-axis scaling
  const primaryDataKey = dataKeys[0];
  const primarySafeRange = Array.isArray(safeRange) ? safeRange[0] : safeRange;
  const primaryChartName = Array.isArray(chartName) ? chartName[0] : chartName;

  // Generate running median data ONLY if medianOrNot is true
  const chartData = useMemo(() => {
    if (!medianOrNot || !rawData || rawData.length === 0) {
      return rawData; // Return raw data if median is not needed or data is empty
    }
    return rawData.map((point, index) => {
      const valuesUpToCurrentPoint = rawData.slice(0, index + 1).map(item => item[primaryDataKey]);
      const runningMedian = calculateMedian(valuesUpToCurrentPoint);
      return {
        ...point,
        [`${primaryDataKey}_median`]: runningMedian // Use a dynamic key for median
      };
    });
  }, [rawData, primaryDataKey, medianOrNot]); // Dependencies for recalculation


  // Calculate the maximum value from all data keys for the Y-axis domain
  let calculatedMax = 0;
  dataKeys.forEach(key => {
    // Ensure item[key] exists and is a number before using Math.max
    const validValues = rawData.map(item => typeof item[key] === 'number' ? item[key] : 0);
    const maxForKey = Math.max(...validValues, 0);
    calculatedMax = Math.max(calculatedMax, maxForKey);
  });
  // Add some padding to the max value, ensure it's at least a bit higher than safe high
  // Ensure safeRange.high is a valid number before using it
  const safeHighValue = typeof primarySafeRange.high === 'number' && isFinite(primarySafeRange.high) ? primarySafeRange.high : 0;
  const yAxisMax = Math.max(calculatedMax * 1.1, safeHighValue * 1.1, 10); // Ensure a minimum range

  // Define line colors (add more if you expect more than dataKeys.length)
  const lineColors = ["#8884d8", "#82ca9d", "#ffc658"];
  const medianColor = "#ff7300";


  // Custom Legend Content Renderer
  const renderCustomLegend = (props) => {
    const { payload } = props; // payload contains the legend items

    return (
      <ul style={{
        display: 'flex',
        flexDirection: 'row',
        listStyle: 'none', // Remove bullet points
        padding: 0,        // Remove default padding
        margin: 0,         // Remove default margin
        gap: '5px',      // Space between items
        justifyContent: 'space-between', // Distribute space
        paddingTop: '10px',   // Add space above the legend
        fontSize: '11px',
        lineHeight: '18px'   // Vertical spacing if wrapped
      }}>
        {
          payload.map((entry, index) => (
            // Filter out median legend item if medianOrNot is false or it's the median line
            (medianOrNot || !entry.dataKey.includes('_median')) && (
              <li key={`item-${index}`} style={{ width: 'auto', marginRight: '15px', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                {/* Recreate the icon */}
                <span style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%', // Make it a circle
                  backgroundColor: entry.color, // Use the line color
                  marginRight: '5px',
                  display: 'inline-block' // Needed for alignment
                }}></span>

                {/* Legend Text */}
                <span style={{
                  color: '#4E4B66',
                  fontWeight: '600',
                  fontSize: '14px',
                  whiteSpace: 'normal', // Allow text to wrap
                  textAlign: 'left',    // Align text to the left
                  wordBreak: 'break-word' // Break long words if necessary
                }}>{entry.value}</span>
              </li>
            )
          ))
        }
      </ul>
    );
  };



  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart
        // Use chartData which might include median or be just rawData
        data={chartData}
        margin={{ top: 5, right: 30, left: 0, bottom: 5 }} // Adjusted left margin
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
        <XAxis dataKey="time" stroke="#666" fontSize={10} />
        <YAxis
          // Base Y-axis on the primary key
          // dataKey={primaryDataKey} // dataKey on YAxis is often not needed if domain is set
          domain={[yMin, yMax !== undefined ? yMax : parseFloat(yAxisMax.toFixed(2))]} // Ensure the domain is a number
          stroke="#666"
          fontSize={10}
        // Removed label to save space
        // Add unit to Y-axis ticks if desired
        // tickFormatter={(value) => `${value} ${primaryUnit}`}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const pointData = payload[0].payload;
              return (
                <div style={{
                  backgroundColor: 'rgba(90, 90, 90, 0.85)',
                  padding: '8px 12px',
                  border: '1px solid #555',
                  borderRadius: '4px',
                  color: 'white',
                  fontSize: '12px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                }}>
                  {/* Display time if available */}
                  {pointData.time && <p style={{ margin: '0 0 4px 0' }}>{`Time: ${pointData.time}`}</p>}
                  {payload.map((item, index) => {
                    // Check if it's the median line AND if median should be shown
                    if (item.dataKey === `${primaryDataKey}_median` && medianOrNot) {
                      return <p key={index} style={{ margin: '2px 0', color: item.stroke }}>{`Median (${primaryChartName}): ${pointData[`${primaryDataKey}_median`]}`}</p>;
                    }
                    // Otherwise, display regular data points
                    if (item.dataKey !== `${primaryDataKey}_median`) {
                      return <p key={index} style={{ margin: '2px 0', color: item.stroke }}>{`${item.name}: ${pointData[item.dataKey]} ${Array.isArray(unit) ? unit[index] || '' : unit}`}</p>;
                    }
                    return null; // Don't render median if medianOrNot is false
                  })}
                </div>
              );
            }
            return null;
          }}
          cursor={{ stroke: 'rgba(255, 100, 100, 0.5)', strokeWidth: 1 }}
        />
        <Legend
          content={renderCustomLegend} // Use the custom renderer
        />

        {/* Reference Areas based on primary safe range */}
        {/* Ensure low and high are valid numbers before rendering */}
        {typeof primarySafeRange.low === 'number' && isFinite(primarySafeRange.low) && (
          <ReferenceArea y1={yMin} y2={primarySafeRange.low} fill="#FEF08A" fillOpacity={0.7} label={{ value: "Low", position: "insideTopRight", fontSize: 9, fill: '#A16207' }} />
        )}
        {typeof primarySafeRange.low === 'number' && isFinite(primarySafeRange.low) && typeof primarySafeRange.high === 'number' && isFinite(primarySafeRange.high) && (
          <ReferenceArea y1={primarySafeRange.low} y2={primarySafeRange.high} fill="#D9F99D" fillOpacity={0.7} label={{ value: "Safe", position: "insideTopRight", fontSize: 9, fill: '#3F6212' }} />
        )}
        {typeof primarySafeRange.high === 'number' && isFinite(primarySafeRange.high) && (
          <ReferenceArea y1={primarySafeRange.high} y2={yMax ? yMax : parseFloat(yAxisMax.toFixed(2))} fill="#FECACA" fillOpacity={0.7} label={{ value: "High", position: "insideTopRight", fontSize: 9, fill: '#991B1B' }} />
        )}
        {/* {noZone ? (
          <ReferenceArea y1={0} y2={0.5} fill="#FEF08A" fillOpacity={0.7} label={{ value: "Low", position: "insideTopRight", fontSize: 9, fill: '#A16207' }} />
        ) : null}
        {noZone ? (
          <ReferenceArea y1={0.5} y2={1} fill="#FECACA" fillOpacity={0.7} label={{ value: "High", position: "insideTopRight", fontSize: 9, fill: '#991B1B' }} />
        ) : null}

        {noZone ? null : (
          <>
            {typeof primarySafeRange.low === 'number' && isFinite(primarySafeRange.low) && (
              <ReferenceArea y1={yMin} y2={primarySafeRange.low} fill="#FEF08A" fillOpacity={0.7} label={{ value: "Low", position: "insideTopRight", fontSize: 9, fill: '#A16207' }} />
            )}
          </>
        )}
        {noZone ? null : (
          <>
            {typeof primarySafeRange.low === 'number' && isFinite(primarySafeRange.low) && typeof primarySafeRange.high === 'number' && isFinite(primarySafeRange.high) && (
                <ReferenceArea y1={primarySafeRange.low} y2={primarySafeRange.high} fill="#D9F99D" fillOpacity={0.7} label={{ value: "Safe", position: "insideTopRight", fontSize: 9, fill: '#3F6212' }} />
              )}
          </>
        )}
        {noZone ? null : (
          <>
            {typeof primarySafeRange.high === 'number' && isFinite(primarySafeRange.high) && (
                <ReferenceArea y1={primarySafeRange.high} y2={yMax ? yMax : parseFloat(yAxisMax.toFixed(2))} fill="#FECACA" fillOpacity={0.7} label={{ value: "High", position: "insideTopRight", fontSize: 9, fill: '#991B1B' }} />
              )}
          </>
        )} */}


        {/* {noZone ? (
            <>
              <ReferenceArea y1={0} y2={0.5} fill="#FEF08A" fillOpacity={0.7} label={{ value: "Low", position: "insideTopRight", fontSize: 9, fill: '#A16207' }} />
              <ReferenceArea y1={0.5} y2={1} fill="#FECACA" fillOpacity={0.7} label={{ value: "High", position: "insideTopRight", fontSize: 9, fill: '#991B1B' }} />
            </>
          ) : (
            <>
              {typeof primarySafeRange.low === 'number' && isFinite(primarySafeRange.low) && (
                <ReferenceArea y1={yMin} y2={primarySafeRange.low} fill="#FEF08A" fillOpacity={0.7} label={{ value: "Low", position: "insideTopRight", fontSize: 9, fill: '#A16207' }} />
              )}
              {typeof primarySafeRange.low === 'number' && isFinite(primarySafeRange.low) && typeof primarySafeRange.high === 'number' && isFinite(primarySafeRange.high) && (
                <ReferenceArea y1={primarySafeRange.low} y2={primarySafeRange.high} fill="#D9F99D" fillOpacity={0.7} label={{ value: "Safe", position: "insideTopRight", fontSize: 9, fill: '#3F6212' }} />
              )}
              {typeof primarySafeRange.high === 'number' && isFinite(primarySafeRange.high) && (
                <ReferenceArea y1={primarySafeRange.high} y2={yMax ? yMax : parseFloat(yAxisMax.toFixed(2))} fill="#FECACA" fillOpacity={0.7} label={{ value: "High", position: "insideTopRight", fontSize: 9, fill: '#991B1B' }} />
              )}
            </>
          )
        } */}


        {/* Data Lines */}
        {dataKeys.map((key, index) => (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            stroke={lineColors[index % lineColors.length]} // Cycle through colors
            strokeWidth={2}
            name={Array.isArray(chartName) ? chartName[index] : chartName} // Use array or single name
            // Conditional dot rendering: show dots only if there's one data point
            dot={rawData.length === 1 ? { r: 3, fill: lineColors[index % lineColors.length] } : false}
            activeDot={{ r: 4 }} // Show slightly larger dot on hover
          />
        ))}

        {/* Dynamic Median Line for primary key - RENDER CONDITIONALLY */}
        {
          medianOrNot && rawData && rawData.length > 0 ? ( // Only render if median is requested and data exists
            <Line
              type="monotone"
              dataKey={`${primaryDataKey}_median`}
              stroke={medianColor}
              strokeWidth={1.5}
              strokeDasharray="3 3" // Dashed line for median
              dot={false}
              name={`Median (${primaryChartName})`}
            />
          ) : null
        }

      </LineChart>
    </ResponsiveContainer>
  );
}

export default LineChartComponent;