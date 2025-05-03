import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { CONFIG } from 'src/config-global';
import AllergyTable from 'src/sections/allergies/allergies-table';

// ----------------------------------------------------------------------

export default function Page() {
  const [allergyData, setAllergyData] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem('selectedPatientId');
    if (user) {
      fetch(
        `https://pediacare-preview-aadng6gffsgafygs.centralindia-01.azurewebsites.net/patients/${user}/allergies`
      )
        .then((res) => res.json())
        .then((data) => {
          setAllergyData(data);
        })
        .catch((err) => {
          console.error('Failed to fetch allergy data:', err);
        });
    }
  }, []);
  return (
    <>
      <Helmet>
        <title> {`Allergies - ${CONFIG.appName}`}</title>
      </Helmet>

      <AllergyTable allergyData={allergyData} />
    </>
  );
}
