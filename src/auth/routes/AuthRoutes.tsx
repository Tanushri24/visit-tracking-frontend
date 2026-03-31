import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import EmployeeRegistration from '../registration/EmployeeRegistration'
import ForgotPassword from '../pages/ForgotPassword'
  


const AuthRoutes = () => {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="login" element={<Login />} />
       <Route path="registration" element={<EmployeeRegistration />} />  
        <Route path="forgotpassword" element={<ForgotPassword/>} />  
    </Routes>
  )
}

export default AuthRoutes