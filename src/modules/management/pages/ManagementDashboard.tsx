const ManagementDashboard = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Management Dashboardnnnn</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h3>Total Revenue</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>₹45,00,000</p>
        </div>
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h3>Conversion Rate</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>68%</p>
        </div>
      </div>
    </div>
  );
};

export default ManagementDashboard;