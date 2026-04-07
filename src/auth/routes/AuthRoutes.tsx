import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import EmployeeRegistration from '../../modules/super-admin/pages/employee-registration/EmployeeRegistration'
import ChangePassword from '../pages/ChangePassword' // Import ChangePassword

const AuthRoutes = () => {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="login" element={<Login />} />
      <Route path="registration" element={<EmployeeRegistration />} />  
      <Route path="change-password" element={<ChangePassword />} />  {/* Add this route */}
    </Routes>
  )
}

export default AuthRoutes