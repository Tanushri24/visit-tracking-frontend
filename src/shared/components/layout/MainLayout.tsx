import { Outlet, Link } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <div style={{ width: '250px', background: '#1a1a1a', color: 'white', padding: '20px' }}>
        <h3 style={{ color: 'white', marginBottom: '30px' }}>Visit Tracking</h3>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Link to="/employee/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
          <Link to="/employee/visits" style={{ color: 'white', textDecoration: 'none' }}>My Visits</Link>
          <Link to="/employee/follow-ups" style={{ color: 'white', textDecoration: 'none' }}>Follow-ups</Link>
          <Link to="/employee/expenses" style={{ color: 'white', textDecoration: 'none' }}>Expenses</Link>
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <header style={{ padding: '20px', background: '#f5f5f5', borderBottom: '1px solid #ddd' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>Welcome, John Doe</h2>
            <button>Logout</button>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, background: '#fff' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;