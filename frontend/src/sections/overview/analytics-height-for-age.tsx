import type { SeriesValueFormatter } from '@mui/x-charts/internals';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';

import CustomMarkElement from './custom-mark-element';

import type { observation, percentileData } from './view/overview-analytics-view';

export default function HeightForAgeChart({
  heightGraph5Perc,
  heightGraph50Perc,
  heightGraph95Perc,
  childData,
}: {
  heightGraph5Perc: percentileData[];
  heightGraph50Perc: percentileData[];
  heightGraph95Perc: percentileData[];
  childData: observation;
}) {
  let dataavailble: boolean = true;
  const chartWidth = 500;
  const chartHeight = 460;
  let heightGraph5PercSorted: percentileData[] = [];
  let heightGraph50PercSorted: percentileData[] = [];
  let heightGraph95PercSorted: percentileData[] = [];
  let xAxisData: number[] = [];
  let childAgeIndex: number = -1;
  let isLoading: boolean = true;

  const isValidPercentileData = (data: percentileData[]): boolean =>
    Array.isArray(data) &&
    data.every((item) => typeof item.age === 'number' && typeof item.percentileValue === 'number');

  if (
    heightGraph5Perc.length < 17 ||
    heightGraph50Perc.length < 17 ||
    heightGraph95Perc.length < 17 ||
    childData === null ||
    !isValidPercentileData(heightGraph5Perc) ||
    !isValidPercentileData(heightGraph50Perc) ||
    !isValidPercentileData(heightGraph95Perc)
  ) {
    dataavailble = false;
    isLoading = true;
  } else {
    dataavailble = true;
    isLoading = false;
  }

  if (dataavailble) {
    heightGraph5PercSorted = heightGraph5Perc.sort((a, b) => a.age - b.age);
    heightGraph50PercSorted = heightGraph50Perc.sort((a, b) => a.age - b.age);
    heightGraph95PercSorted = heightGraph95Perc.sort((a, b) => a.age - b.age);
    xAxisData = heightGraph5Perc.map((data) => data.age);
    childAgeIndex = xAxisData.indexOf(parseInt(childData.age, 10));
  }
  const childSeriesData = Array(xAxisData.length).fill(null);
  if (childAgeIndex !== -1) {
    childSeriesData[childAgeIndex] = childData.height;
  }
  const valueFormatter: SeriesValueFormatter<number | null> = (value, context) => {
    if (value === null) {
      return 'Data not available';
    }
    const age = heightGraph5Perc[context.dataIndex]?.age ?? 'Unknown age';
    return `${age} years, ${value} m`;
  };
  return (
    <>
      <Divider />
      <div
        style={{
          width: chartWidth,
          height: chartHeight + 40,
          position: 'relative',
          padding: '3px',
        }}
      >
        <LineChart
          loading={isLoading}
          margin={{ top: 100 }}
          xAxis={[
            {
              data: heightGraph5PercSorted.map((data) => data.age),
              label: 'Age (Years)',
            },
          ]}
          yAxis={[{ label: 'height (m)' }]}
          series={[
            {
              data: heightGraph5PercSorted.map((data) => data.percentileValue),
              label: '5th Percentile',
              color: 'blue',
              showMark: false,
              valueFormatter,
            },
            {
              data: heightGraph50PercSorted.map((data) => data.percentileValue),
              label: '50th Percentile',
              color: 'green',
              showMark: false,
              valueFormatter,
            },
            {
              data: heightGraph95PercSorted.map((data) => data.percentileValue),
              label: '95th Percentile',
              color: 'red',
              showMark: false,
              valueFormatter,
            },
            {
              data: childSeriesData,
              label: "Child's current height",
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
