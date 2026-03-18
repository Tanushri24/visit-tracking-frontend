import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import EmployeeRegistration from '../registration/EmployeeRegistration'
  


const AuthRoutes = () => {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="login" element={<Login />} />
       <Route path="registration" element={<EmployeeRegistration />} />   
    </Routes>
  )
}

export default AuthRoutes