import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { _tasks, _posts, _timeline } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Card from '@mui/material/Card';
import MenuItem from '@mui/material/MenuItem';
import CardHeader from '@mui/material/CardHeader';
import StraightenIcon from '@mui/icons-material/Straighten';
import ScaleIcon from '@mui/icons-material/Scale';
import { PatientData } from '../analytics-widget-summary';

import WeightForAgeChart from '../analytics-weight-for-age';
import HeightForAgeChart from '../analytics-height-for-age';

import BMIForAgeChart from '../anlytics-bmi-forage';

// ----------------------------------------------------------------------

export type observation = {
  age: string;
  height: string;
  weight: string;
  bmi: string;
};

export type vaccination = {
  vaccinationDate: string;
  encounterId: string;
  code: string;
  description: string;
  baseCost: string;
};
export type Allergy = {
  patientId: string;
  encounterId: string;
  code: number;
  description: string;
  system: string;
  type: string;
  category: string;
};
export type percentileData = {
  age: number;
  percentileValue: number;
};
export function OverviewAnalyticsView() {
  const location = useLocation();
  // const user = localStorage.getItem('selectedPatientId');
  const [observationData, setObservationData] = useState<observation>({
    age: '',
    height: '',
    weight: '',
    bmi: '',
  });
  const [bmiGraph5Perc, setBmiGraph5Perc] = useState<percentileData[]>([
    { age: 0, percentileValue: 0 },
  ]);
  const [bmiGraph50Perc, setBmiGraph50Perc] = useState<percentileData[]>([
    { age: 0, percentileValue: 0 },
  ]);
  const [bmiGraph95Perc, setBmiGraph95Perc] = useState<percentileData[]>([
    { age: 0, percentileValue: 0 },
  ]);
  const [weightGraph5Perc, setWeightGraph5Perc] = useState<percentileData[]>([
    { age: 0, percentileValue: 0 },
  ]);
  const [weightGraph50Perc, setWeightGraph50Perc] = useState<percentileData[]>([
    { age: 0, percentileValue: 0 },
  ]);
  const [weightGraph95Perc, setWeightGraph95Perc] = useState<percentileData[]>([
    { age: 0, percentileValue: 0 },
  ]);
  const [heightGraph5Perc, setHeightGraph5Perc] = useState<percentileData[]>([
    { age: 0, percentileValue: 0 },
  ]);
  const [heightGraph50Perc, setHeightGraph50Perc] = useState<percentileData[]>([
    { age: 0, percentileValue: 0 },
  ]);
  const [heightGraph95Perc, setHeightGraph95Perc] = useState<percentileData[]>([
    { age: 0, percentileValue: 0 },
  ]);
  const [name, setName] = useState<string | null>('');
  const [age, setAge] = useState<string | null>('');
  const [selectedChart, setSelectedChart] = useState('weight');

  useEffect(() => {
    const user = localStorage.getItem('selectedPatientId');
    const firstName = localStorage.getItem('selectedPatientName');
    const agelocal = localStorage.getItem('selectedPatientAge');
    setName(firstName);
    setAge(agelocal);

    if (user) {
      fetch(
        `https://pediacare-preview-aadng6gffsgafygs.centralindia-01.azurewebsites.net/patients/${user}/observations`
      )
        .then((response) => response.json())
        .then((result) => {
          setObservationData(result);
        })
        .catch((error) => console.error('Error fetching data:', error));

      fetch(
        `https://pediacare-preview-aadng6gffsgafygs.centralindia-01.azurewebsites.net/analytics/weight/percentiles?p=0.05`
      )
        .then((response) => response.json())
        .then((result) => {
          setWeightGraph5Perc(result);
        })
        .catch((error) => console.error('Error fetching data:', error));

      fetch(
        `https://pediacare-preview-aadng6gffsgafygs.centralindia-01.azurewebsites.net/analytics/weight/percentiles?p=0.5`
      )
        .then((response) => response.json())
        .then((result) => {
          setWeightGraph50Perc(result);
        })
        .catch((error) => console.error('Error fetching data:', error));

      fetch(
        `https://pediacare-preview-aadng6gffsgafygs.centralindia-01.azurewebsites.net/analytics/weight/percentiles?p=0.95`
      )
        .then((response) => response.json())
        .then((result) => {
          setWeightGraph95Perc(result);
        })
        .catch((error) => console.error('Error fetching data:', error));

      fetch(
        `https://pediacare-preview-aadng6gffsgafygs.centralindia-01.azurewebsites.net/analytics/height/percentiles?p=0.05`
      )
        .then((response) => response.json())
        .then((result) => {
          setHeightGraph5Perc(result);
        })
        .catch((error) => console.error('Error fetching data:', error));

      fetch(
        `https://pediacare-preview-aadng6gffsgafygs.centralindia-01.azurewebsites.net/analytics/height/percentiles?p=0.5`
      )
        .then((response) => response.json())
        .then((result) => {
          setHeightGraph50Perc(result);
        })
        .catch((error) => console.error('Error fetching data:', error));

      fetch(
        `https://pediacare-preview-aadng6gffsgafygs.centralindia-01.azurewebsites.net/analytics/height/percentiles?p=0.95`
      )
        .then((response) => response.json())
        .then((result) => {
          setHeightGraph95Perc(result);
        })
        .catch((error) => console.error('Error fetching data:', error));

      fetch(
        `https://pediacare-preview-aadng6gffsgafygs.centralindia-01.azurewebsites.net/analytics/bmi/percentiles?p=0.05`
      )
        .then((response) => response.json())
        .then((result) => {
          setBmiGraph5Perc(result);
        })
        .catch((error) => console.error('Error fetching data:', error));

      fetch(
        `https://pediacare-preview-aadng6gffsgafygs.centralindia-01.azurewebsites.net/analytics/bmi/percentiles?p=0.5`
      )
        .then((response) => response.json())
        .then((result) => {
          setBmiGraph50Perc(result);
        })
        .catch((error) => console.error('Error fetching data:', error));

      fetch(
        `https://pediacare-preview-aadng6gffsgafygs.centralindia-01.azurewebsites.net/analytics/bmi/percentiles?p=0.95`
      )
        .then((response) => response.json())
        .then((result) => {
          setBmiGraph95Perc(result);
        })
        .catch((error) => console.error('Error fetching data:', error));
    } else {
      console.warn('No selectedPatientId found in localStorage');
    }
  }, []);

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        {name}
        {`'s dashboard`}
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <PatientData
            title="Age"
            total={observationData ? age : '12'}
            icon={<CalendarMonthIcon fontSize="large" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <PatientData
            title="Height"
            total={observationData.height}
            color="secondary"
            icon={<StraightenIcon fontSize="large" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <PatientData
            title="Weight"
            total={`${observationData.weight || '0'}KG`}
            color="warning"
            icon={<ScaleIcon fontSize="large" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <PatientData
            title="Body Mass Index"
            total={observationData.bmi}
            color="error"
            icon={<ScaleIcon fontSize="large" />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={6}>
          <BMIForAgeChart
            bmiGraph5Perc={bmiGraph5Perc}
            bmiGraph50Perc={bmiGraph50Perc}
            bmiGraph95Perc={bmiGraph95Perc}
            childData={observationData}
          />
        </Grid>

        <Grid xs={12} md={6} lg={6}>
          <Card>
            <CardHeader
              title={
                <FormControl fullWidth>
                  <InputLabel id="chart-select-label">Select Chart</InputLabel>
                  <Select
                    labelId="chart-select-label"
                    value={selectedChart}
                    label="Select Chart"
                    onChange={(e) => setSelectedChart(e.target.value)}
                    size="small" // optional: keeps the dropdown compact like a title
                  >
                    <MenuItem value="weight">
                      <Typography fontWeight="bold">Weight-for-Age</Typography>
                    </MenuItem>
                    <MenuItem value="height">
                      <Typography fontWeight="bold">Height-for-Age</Typography>
                    </MenuItem>
                  </Select>
                </FormControl>
              }
            />
            {selectedChart === 'weight' && (
              <WeightForAgeChart
                weightGraph5Perc={weightGraph5Perc}
                weightGraph50Perc={weightGraph50Perc}
                weightGraph95Perc={weightGraph95Perc}
                childData={observationData}
              />
            )}
            {selectedChart === 'height' && (
              <HeightForAgeChart
                heightGraph5Perc={heightGraph5Perc}
                heightGraph50Perc={heightGraph50Perc}
                heightGraph95Perc={heightGraph95Perc}
                childData={observationData}
              />
            )}
          </Card>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
