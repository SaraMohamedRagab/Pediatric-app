import type { SeriesValueFormatter } from '@mui/x-charts/internals';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { LineChart } from '@mui/x-charts/LineChart';
import Box from '@mui/material/Box';

import CustomMarkElement from './custom-mark-element';

import type { observation, percentileData } from './view/overview-analytics-view';

export default function WeightForAgeChart({
  weightGraph5Perc,
  weightGraph50Perc,
  weightGraph95Perc,
  childData,
}: {
  weightGraph5Perc: percentileData[];
  weightGraph50Perc: percentileData[];
  weightGraph95Perc: percentileData[];
  childData: observation;
}) {
  let dataavailble: boolean = true;
  const chartWidth = 500;
  const chartHeight = 460;
  let weightGraph5PercSorted: percentileData[] = [];
  let weightGraph50PercSorted: percentileData[] = [];
  let weightGraph95PercSorted: percentileData[] = [];
  let xAxisData: number[] = [];
  let childAgeIndex: number = -1;
  let isLoading: boolean = true;

  const isValidPercentileData = (data: percentileData[]): boolean =>
    Array.isArray(data) &&
    data.every((item) => typeof item.age === 'number' && typeof item.percentileValue === 'number');

  if (
    weightGraph5Perc.length < 17 ||
    weightGraph50Perc.length < 17 ||
    weightGraph95Perc.length < 17 ||
    childData === null ||
    !isValidPercentileData(weightGraph5Perc) ||
    !isValidPercentileData(weightGraph50Perc) ||
    !isValidPercentileData(weightGraph95Perc)
  ) {
    dataavailble = false;
    isLoading = true;
  } else {
    dataavailble = true;
    isLoading = false;
  }

  if (dataavailble) {
    weightGraph5PercSorted = weightGraph5Perc.sort((a, b) => a.age - b.age);
    weightGraph50PercSorted = weightGraph50Perc.sort((a, b) => a.age - b.age);
    weightGraph95PercSorted = weightGraph95Perc.sort((a, b) => a.age - b.age);

    xAxisData = weightGraph5Perc.map((data) => data.age);
    childAgeIndex = xAxisData.indexOf(parseInt(childData.age, 10));
  }

  const childSeriesData = Array(xAxisData.length).fill(null);
  if (childAgeIndex !== -1) {
    childSeriesData[childAgeIndex] = childData.weight;
  }
  const valueFormatter: SeriesValueFormatter<number | null> = (value, context) => {
    if (value === null) {
      return 'Data not available';
    }
    const age = weightGraph5Perc[context.dataIndex]?.age ?? 'Unknown age';
    return `${age} years, ${value} kg`;
  };
  return (
    // <Card>
    //   <CardHeader title="Weight-for-Age Growth Chart (WHO)" />
    <>
      <Divider />
      <div
        style={{
          width: chartWidth,
          height: chartHeight + 40, // Add some height to accommodate disclaimer
          position: 'relative',
          padding: '3px',
        }}
      >
        <LineChart
          loading={isLoading}
          margin={{ top: 100 }}
          xAxis={[
            {
              data: weightGraph5PercSorted.map((data) => data.age),
              label: 'Age (Years)',
            },
          ]}
          yAxis={[{ label: 'Weight (kg)' }]}
          series={[
            {
              data: weightGraph5PercSorted.map((data) => data.percentileValue),
              label: '5th Percentile',
              color: 'blue',
              showMark: false,
              valueFormatter,
            },
            {
              data: weightGraph50PercSorted.map((data) => data.percentileValue),
              label: '50th Percentile',
              color: 'green',
              showMark: false,
              valueFormatter,
            },
            {
              data: weightGraph95PercSorted.map((data) => data.percentileValue),
              label: '95th Percentile',
              color: 'red',
              showMark: false,
              valueFormatter,
            },
            {
              data: childSeriesData,
              label: "Child's current weight",
              color: 'purple',
              showMark: true,
              valueFormatter,
            },
          ]}
          slots={{ mark: CustomMarkElement }}
          width={chartWidth}
          height={chartHeight}
        />
        <Box sx={{ pl: 3 }}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mt: 1, display: 'block', textAlign: 'left', pr: 3 }}
          >
            * Data shown is based on observation date.
          </Typography>
        </Box>
      </div>
    </>
  );
}
