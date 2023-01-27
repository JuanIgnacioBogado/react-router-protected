import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ProtectedRoutes } from './components/ProtectedRoutes';

import { AdminPage, AnalyticsPage, DashboardPage, HomePage, LandingPage } from './pages';

export const App = () => {
  const [user, setUser] = useState(null);

  const login = () => {
    setUser({
      id: 1,
      name: 'Nacho',
      permissions: ['analize'],
      roles: ['admin']
    });
  };

  const logout = () => setUser(null);

  return (
    <BrowserRouter>
      <Navigation />

      <button onClick={user ? logout : login}>{user ? 'Logout' : 'Login'}</button>

      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="landing" element={<LandingPage />} />

        <Route element={<ProtectedRoutes isAllowed={!!user} />}>
          <Route path="home" element={<HomePage />} />
          <Route path="dashboard" element={<DashboardPage />} />
        </Route>

        <Route
          path="analytics"
          element={
            <ProtectedRoutes isAllowed={user?.permissions.includes('analize')} redirectTo="/home">
              <AnalyticsPage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="admin"
          element={
            <ProtectedRoutes isAllowed={user?.roles.includes('admin')} redirectTo="/home">
              <AdminPage />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Landing</Link>
        </li>
        <li>
          <Link to="home">Home</Link>
        </li>
        <li>
          <Link to="dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="analytics">Analytics</Link>
        </li>
        <li>
          <Link to="admin">Admin</Link>
        </li>
      </ul>
    </nav>
  );
}
