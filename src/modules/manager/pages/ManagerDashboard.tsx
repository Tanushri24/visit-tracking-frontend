const ManagerDashboard = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Manager Dashboard</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginTop: '20px' }}>
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h3>Team Visits</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>156</p>
        </div>
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h3>Pending Approvals</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>8</p>
        </div>
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h3>Team Expenses</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>₹12,450</p>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;