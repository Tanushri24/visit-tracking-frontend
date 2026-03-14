const EmployeeDashboard = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Employee Dashboard</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginTop: '20px' }}>
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h3>Total Visits</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>24</p>
        </div>
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h3>Pending Follow-ups</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>5</p>
        </div>
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h3>Total Expenses</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>₹2,450</p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;