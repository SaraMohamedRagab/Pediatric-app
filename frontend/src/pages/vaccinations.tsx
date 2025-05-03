import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { CONFIG } from 'src/config-global';

import VaccinationTable from 'src/sections/vaccination/vaccination-table';

// ----------------------------------------------------------------------

export default function Page() {
  const [vaccinationData, setVaccinationData] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem('selectedPatientId');
    if (user) {
      fetch(
        `https://pediacare-preview-aadng6gffsgafygs.centralindia-01.azurewebsites.net/patients/${user}/vaccinations`
      )
        .then((res) => res.json())
        .then((data) => {
          setVaccinationData(data);
        })
        .catch((err) => {
          console.error('Failed to fetch allergy data:', err);
        });
    }
  }, []);
  return (
    <>
      <Helmet>
        <title> {`Vaccinations - ${CONFIG.appName}`}</title>
      </Helmet>

      <VaccinationTable vaccinationData={vaccinationData} />
    </>
  );
}
