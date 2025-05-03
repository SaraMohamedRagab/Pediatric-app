import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { CONFIG } from 'src/config-global';

import { PatientInfo, Patient } from 'src/sections/info/patient-info-view';

// ----------------------------------------------------------------------
// export type Patient= {
//   patientId: string,
//   birthDate: string,
//   age: number,
//   firstName: string,
//   middleName: string,
//   lastName: string,
//   race: string,
//   gender: string,
//   address: string,
//   city: string,
//   state: string
// }
export default function Page() {
  const [patientData, setPatientData] = useState<Patient>({
    patientId: '',
    birthDate: '',
    age: 0,
    firstName: '',
    middleName: '',
    lastName: '',
    race: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    ethnicity: '',
    healthCareExpenses: '',
    healthCareCoverage: '',
  });

  useEffect(() => {
    const user = localStorage.getItem('selectedPatientId');
    if (user) {
      fetch(
        `https://pediacare-preview-aadng6gffsgafygs.centralindia-01.azurewebsites.net/patients/${user}`
      )
        .then((res) => res.json())
        .then((data) => {
          setPatientData(data);
        })
        .catch((err) => {
          console.error('Failed to fetch allergy data:', err);
        });
    }
  }, []);
  return (
    <>
      <Helmet>
        <title> {`Patient Information - ${CONFIG.appName}`}</title>
      </Helmet>

      <PatientInfo patientData={patientData} />
    </>
  );
}
