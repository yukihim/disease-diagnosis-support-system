// import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceArea } from 'recharts';

// const data = [
//     { time: '00:00', bpm: 90 },
//     { time: '01:00', bpm: 70 },
//     { time: '02:00', bpm: 80 },
//     { time: '03:00', bpm: 90 },
//     { time: '04:00', bpm: 90 },
//     { time: '05:00', bpm: 110 },
//     { time: '06:00', bpm: 120 },
//     { time: '07:00', bpm: 90 },
//     { time: '08:00', bpm: 140 },
//     { time: '09:00', bpm: 150 },
//     { time: '10:00', bpm: 160 },
//     { time: '11:00', bpm: 170 },
//     { time: '12:00', bpm: 180 },
//     { time: '13:00', bpm: 190 },
//     { time: '14:00', bpm: 200 },
//     { time: '15:00', bpm: 210 },
//     { time: '16:00', bpm: 220 },
//     { time: '17:00', bpm: 230 },
//     { time: '18:00', bpm: 240 },
//     { time: '19:00', bpm: 250 },
//     { time: '20:00', bpm: 260 },
//     { time: '21:00', bpm: 270 },
//     { time: '22:00', bpm: 280 },
//     { time: '23:00', bpm: 290 }
// ];

// const SAFE_LOW = 90;
// const SAFE_HIGH = 120;

// // Calculate the maximum value from the data for the Y-axis domain
// let calculatedMax = Math.max(...data.map(item => item.bpm));
// let MAX_VALUE = Math.max(calculatedMax, 300); // Use a fixed upper bound or calculated max + padding

// // Function to calculate median
// const calculateMedian = (values) => {
//   const sorted = [...values].sort((a, b) => a - b);
//   const middle = Math.floor(sorted.length / 2);
  
//   if (sorted.length % 2 === 0) {
//     return (sorted[middle - 1] + sorted[middle]) / 2;
//   }
  
//   return sorted[middle];
// };

// // Generate running median data
// const dataWithMedian = data.map((point, index) => {
//   // Get all values up to the current point
//   const valuesUpToCurrentPoint = data.slice(0, index + 1).map(item => item.bpm);
  
//   // Calculate median for all points up to current point
//   const runningMedian = calculateMedian(valuesUpToCurrentPoint);
  
//   return {
//     ...point,
//     median: runningMedian
//   };
// });

// function LineChartComponent() {
//   return (
//     <ResponsiveContainer
//         width="100%"
//         height={300}
//     >
//         <LineChart
//             data={dataWithMedian}
//             margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//         >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="time" />
//             <YAxis dataKey="bpm" domain={[0, MAX_VALUE]} />
//             <Tooltip 
//                 content={({ active, payload }) => {
//                     if (active && payload && payload.length) {
//                         const { time, bpm, median } = payload[0].payload;
//                         return (
//                             <div style={{
//                                     backgroundColor: 'rgba(199, 199, 199, 0.7)',
//                                     padding: '10px',
//                                     border: '1px solid #ccc',
//                                     borderRadius: '5px',
//                                     color: 'white',
//                                     boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
//                                 }}
//                             >
//                                 <p>{`Time: ${time}`}</p>
//                                 <p>{`BPM: ${bpm}`}</p>
//                                 <p>{`Median: ${median}`}</p>
//                             </div>
//                         );
//                     }
//                     return null;
//                 }}
//                 cursor={{ stroke: 'red', strokeWidth: 1 }}
//             />
//             <Legend
//                 align="center" 
//                 wrapperStyle={{
//                     margin: '0 auto',
//                     paddingBottom: 10,
//                     width: '100%',
//                     lineHeight: '40px'
//                 }}
//             />

//             {/* Dangerous Low Area */}
//             <ReferenceArea y1={0} y2={SAFE_LOW} fill="yellow" fillOpacity={0.2} label={{ value: "Dangerous Low", position: "insideTopRight" }} />

//             {/* Safe Area */}
//             <ReferenceArea y1={SAFE_LOW} y2={SAFE_HIGH} fill="green" fillOpacity={0.2} label={{ value: "Safe", position: "insideTopRight" }} />

//             {/* Dangerous High Area */}
//             <ReferenceArea y1={SAFE_HIGH} y2={MAX_VALUE} fill="red" fillOpacity={0.2} label={{ value: "Dangerous High", position: "insideTopRight" }} />

//             {/* BPM Line */}
//             <Line type="monotone" dataKey="bpm" stroke="#8884d8" strokeWidth={2} name="BPM" />
            
//             {/* Dynamic Median Line */}
//             <Line 
//               type="monotone" 
//               dataKey="median" 
//               stroke="#ff7300" 
//               strokeWidth={2} 
//               dot={false}
//               name="Median" 
//             />
//         </LineChart>
//     </ResponsiveContainer>
//   );
// }

// export default LineChartComponent;

















































import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceArea } from 'recharts';

// Default props in case none are provided
const defaultProps = {
  data: [],
  dataKeys: ['value'], // Expecting an array, e.g., ['bpm'] or ['systolic', 'diastolic']
  unit: 'units',      // Can be a string or an array matching dataKeys
  safeRange: { low: 0, high: 100 }, // Can be an object or an array matching dataKeys
  chartName: 'Measurement', // Can be a string or an array matching dataKeys
  height: 300, // Default height
};

// Function to calculate median (operates on the first dataKey)
const calculateMedian = (values) => {
  if (!values || values.length === 0) return null;
  const sorted = [...values].filter(v => typeof v === 'number' && !isNaN(v)).sort((a, b) => a - b);
  if (sorted.length === 0) return null;
  const middle = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }
  return sorted[middle];
};

function LineChartComponent(props) {
  // Merge provided props with defaults
  const { data: rawData, dataKeys, unit, safeRange, chartName, height } = { ...defaultProps, ...props };

  // Use the first dataKey for median calculation and primary Y-axis scaling
  const primaryDataKey = dataKeys[0];
  const primaryUnit = Array.isArray(unit) ? unit[0] : unit;
  const primarySafeRange = Array.isArray(safeRange) ? safeRange[0] : safeRange;
  const primaryChartName = Array.isArray(chartName) ? chartName[0] : chartName;

  // Generate running median data for the primary key
  const dataWithMedian = rawData.map((point, index) => {
    const valuesUpToCurrentPoint = rawData.slice(0, index + 1).map(item => item[primaryDataKey]);
    const runningMedian = calculateMedian(valuesUpToCurrentPoint);
    return {
      ...point,
      [`${primaryDataKey}_median`]: runningMedian // Use a dynamic key for median
    };
  });

  // Calculate the maximum value from all data keys for the Y-axis domain
  let calculatedMax = 0;
  dataKeys.forEach(key => {
      const maxForKey = Math.max(...rawData.map(item => item[key] || 0), 0);
      calculatedMax = Math.max(calculatedMax, maxForKey);
  });
  // Add some padding to the max value, ensure it's at least a bit higher than safe high
  const yAxisMax = Math.max(calculatedMax * 1.1, primarySafeRange.high * 1.1, 10); // Ensure a minimum range

  // Define line colors (add more if you expect more than 2 keys)
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
        justifyContent: 'space-between', // Center items
        paddingTop: '10px',   // Add space above the legend
        fontSize: '11px',
        lineHeight: '18px'   // Vertical spacing if wrapped
      }}>
        {
          payload.map((entry, index) => (
            <li key={`item-${index}`} style={{ width: '100%', marginRight: '15px', display: 'flex', alignItems: 'center' }}>
              {/* Recreate the icon */}
              <span style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%', // Make it a circle
                  backgroundColor: entry.color, // Use the line color
                  marginRight: '5px'
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
          ))
        }
      </ul>
    );
  };
  

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart
        data={dataWithMedian}
        margin={{ top: 5, right: 30, left: 0, bottom: 5 }} // Adjusted left margin
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
        <XAxis dataKey="time" stroke="#666" fontSize={10} />
        <YAxis
            dataKey={primaryDataKey} // Base Y-axis on the primary key
            domain={[0, parseFloat(yAxisMax.toFixed(2))]} // Ensure the domain is a number
            stroke="#666"
            fontSize={10}
            // Removed label to save space
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
                  <p style={{ margin: '0 0 4px 0' }}>{`Time: ${pointData.time}`}</p>
                  {payload.map((item, index) => (
                     // Check if it's the median line
                     item.dataKey === `${primaryDataKey}_median`
                     ? <p key={index} style={{ margin: '2px 0', color: item.stroke }}>{`Median (${primaryChartName}): ${pointData[`${primaryDataKey}_median`]}`}</p>
                     : <p key={index} style={{ margin: '2px 0', color: item.stroke }}>{`${item.name}: ${pointData[item.dataKey]} ${Array.isArray(unit) ? unit[index] || '' : unit}`}</p>
                  ))}
                </div>
              );
            }
            return null;
          }}
          cursor={{ stroke: 'rgba(255, 100, 100, 0.5)', strokeWidth: 1 }}
        />
        {/* <Legend
            align="center"
            verticalAlign="bottom"
            // wrapperStyle={{
            //     paddingTop: 10, // Add padding above legend
            //     fontSize: '11px',
            //     lineHeight: '15px'
            // }}
            wrapperStyle={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
            }}
            iconSize={10}
            iconType="circle"
        /> */}
        <Legend
            content={renderCustomLegend} // Use the custom renderer
            // Other props like align, verticalAlign are less relevant when using custom content
        />

        {/* Reference Areas based on primary safe range */}
        <ReferenceArea y1={0} y2={primarySafeRange.low} fill="#FEF08A" fillOpacity={0.7} label={{ value: "Low", position: "insideTopRight", fontSize: 9, fill: '#A16207' }} />
        <ReferenceArea y1={primarySafeRange.low} y2={primarySafeRange.high} fill="#D9F99D" fillOpacity={0.7} label={{ value: "Safe", position: "insideTopRight", fontSize: 9, fill: '#3F6212' }} />
        <ReferenceArea y1={primarySafeRange.high} y2={parseFloat(yAxisMax.toFixed(2))} fill="#FECACA" fillOpacity={0.7} label={{ value: "High", position: "insideTopRight", fontSize: 9, fill: '#991B1B' }} />

        {/* Data Lines */}
        {dataKeys.map((key, index) => (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            stroke={lineColors[index % lineColors.length]} // Cycle through colors
            strokeWidth={2}
            name={Array.isArray(chartName) ? chartName[index] : chartName} // Use array or single name
            dot={false} // Hide dots for cleaner look
            activeDot={{ r: 4 }} // Show slightly larger dot on hover
          />
        ))}

        {/* Dynamic Median Line for primary key */}
        <Line
          type="monotone"
          dataKey={`${primaryDataKey}_median`}
          stroke={medianColor}
          strokeWidth={1.5}
          strokeDasharray="3 3" // Dashed line for median
          dot={false}
          name={`Median (${primaryChartName})`}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default LineChartComponent;