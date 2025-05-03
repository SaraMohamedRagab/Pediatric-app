import type { SeriesValueFormatter } from '@mui/x-charts/internals';

import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import { LineChart } from '@mui/x-charts/LineChart';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CustomMarkElement from './custom-mark-element';

import type { observation, percentileData } from './view/overview-analytics-view';

export default function BMIForAgeChart({
  bmiGraph5Perc,
  bmiGraph50Perc,
  bmiGraph95Perc,
  childData,
}: {
  bmiGraph5Perc: percentileData[];
  bmiGraph50Perc: percentileData[];
  bmiGraph95Perc: percentileData[];
  childData: observation;
}) {
  let dataAvailable: boolean = true;
  const chartWidth = 500;
  const chartHeight = 460;
  let bmiGraph5PercSorted: percentileData[] = [];
  let bmiGraph50PercSorted: percentileData[] = [];
  let bmiGraph95PercSorted: percentileData[] = [];
  let xAxisData: number[] = [];
  let childAgeIndex: number = -1;
  let isLoading: boolean = true;

  const isValidPercentileData = (data: percentileData[]): boolean =>
    Array.isArray(data) &&
    data.every((item) => typeof item.age === 'number' && typeof item.percentileValue === 'number');

  if (
    bmiGraph5Perc.length < 17 ||
    bmiGraph50Perc.length < 17 ||
    bmiGraph95Perc.length < 17 ||
    childData === null ||
    !isValidPercentileData(bmiGraph5Perc) ||
    !isValidPercentileData(bmiGraph50Perc) ||
    !isValidPercentileData(bmiGraph95Perc)
  ) {
    dataAvailable = false;
    isLoading = true;
  } else {
    dataAvailable = true;
    isLoading = false;
  }

  if (dataAvailable) {
    bmiGraph5PercSorted = bmiGraph5Perc.sort((a, b) => a.age - b.age);
    bmiGraph50PercSorted = bmiGraph50Perc.sort((a, b) => a.age - b.age);
    bmiGraph95PercSorted = bmiGraph95Perc.sort((a, b) => a.age - b.age);

    xAxisData = bmiGraph5Perc.map((data) => data.age);
    childAgeIndex = xAxisData.indexOf(parseInt(childData.age, 10));
  }

  const childSeriesData = Array(xAxisData.length).fill(null);
  if (childAgeIndex !== -1) {
    childSeriesData[childAgeIndex] = childData.bmi;
  }

  const valueFormatter: SeriesValueFormatter<number | null> = (value, context) => {
    if (value === null) {
      return 'Data not available';
    }
    const age = bmiGraph5Perc[context.dataIndex]?.age ?? 'Unknown age';
    return `${age} years, ${value} BMI`;
  };

  return (
    <Card>
      <CardHeader
        title="BMI-for-Age Growth Chart (WHO)"
        sx={{
          '& .MuiCardHeader-title': {
            fontSize: '26px', // or '24px'
            // fontWeight: 'bold', // optional
          },
        }}
      />
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
              data: bmiGraph5PercSorted.map((data) => data.age),
              label: 'Age (Years)',
            },
          ]}
          yAxis={[{ label: 'BMI' }]}
          series={[
            {
              data: bmiGraph5PercSorted.map((data) => data.percentileValue),
              label: '5th Percentile',
              color: 'blue',
              showMark: false,
              valueFormatter,
            },
            {
              data: bmiGraph50PercSorted.map((data) => data.percentileValue),
              label: '50th Percentile',
              color: 'green',
              showMark: false,
              valueFormatter,
            },
            {
              data: bmiGraph95PercSorted.map((data) => data.percentileValue),
              label: '95th Percentile',
              color: 'red',
              showMark: false,
              valueFormatter,
            },
            {
              data: childSeriesData,
              label: "Child's current BMI",
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
    </Card>
  );
}
