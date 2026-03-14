const SuperAdminDashboard = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Super Admin Dashboard</h2>
      <div style={{ marginTop: '20px' }}>
        <h3>System Overview</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '20px', marginTop: '20px' }}>
          <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h4>Total Users</h4>
            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>245</p>
          </div>
          <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h4>Total Companies</h4>
            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>18</p>
          </div>
          <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h4>Active Visits</h4>
            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>1,245</p>
          </div>
          <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h4>System Health</h4>
            <p style={{ fontSize: '20px', fontWeight: 'bold', color: 'green' }}>Good</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;