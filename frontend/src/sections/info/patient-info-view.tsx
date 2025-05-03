import React from 'react';

export type Patient = {
  patientId: string;
  birthDate: string;
  age: number;
  firstName: string;
  middleName: string;
  lastName: string;
  race: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  ethnicity: string;
  healthCareCoverage: string;
  healthCareExpenses: string;
};

type PatientInfoProps = {
  patientData: Patient;
};

export function PatientInfo({ patientData }: PatientInfoProps) {
  return (
    <div
      style={{
        maxWidth: '900px',
        width: '90%',
        margin: '40px auto',
        background: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.1)',
        padding: '32px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          paddingBottom: '20px',
          borderBottom: '2px solid #f0f0f0',
        }}
      >
        <div>
          {patientData.gender === 'F' && (
            <img
              src="/assets/images/avatar/avatar-1.webp"
              alt="Patient Avatar"
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '4px solid rgb(255, 0, 179)',
              }}
            />
          )}
          {patientData.gender === 'M' && (
            <img
              src="/assets/images/avatar/avatar-25.webp"
              alt="Patient Avatar"
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '4px solid #007bff',
              }}
            />
          )}
        </div>

        <div style={{ flex: 1, textAlign: 'left' }}>
          <h2
            style={{
              margin: '0',
              color: '#333',
              fontSize: '26px',
              fontWeight: 'bold',
            }}
          >
            {patientData.firstName} {patientData.middleName} {patientData.lastName}
          </h2>
          <p style={{ color: '#666', fontSize: '16px' }}>
            {patientData.gender} | {new Date(patientData.birthDate).toDateString()}
          </p>
        </div>
      </div>

      <div
        style={{
          marginTop: '24px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px', // Increased spacing for better separation
        }}
      >
        {[
          { label: 'Race', value: patientData.race },
          { label: 'Age', value: patientData.age },
          { label: 'Address', value: patientData.address },
          { label: 'City', value: patientData.city },
          { label: 'State', value: patientData.state },
          { label: 'Ethnicity', value: patientData.ethnicity },
          { label: 'Healthcare Expenses', value: patientData.healthCareExpenses },
          { label: 'Healthcare Coverage', value: patientData.healthCareCoverage },
        ].map((item, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px',
              background: index % 2 === 0 ? '#f9f9f9' : '#ffffff',
              borderRadius: '6px',
            }}
          >
            <strong>{item.label}:</strong>
            <span style={{ color: '#007bff', textAlign: 'right', maxWidth: '50%' }}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
