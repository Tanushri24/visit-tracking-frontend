const AdminDashboard = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Admin Dashboard</h2>
      <div style={{ marginTop: '20px' }}>
        <h3>Quick Actions</h3>
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button style={{ padding: '10px 20px' }}>Manage Users</button>
          <button style={{ padding: '10px 20px' }}>Manage Masters</button>
          <button style={{ padding: '10px 20px' }}>View Reports</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
