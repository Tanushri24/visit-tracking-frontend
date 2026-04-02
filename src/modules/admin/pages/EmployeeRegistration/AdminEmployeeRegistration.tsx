import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertCircle,
  ArrowLeft,
  Building2,
  CheckCircle,
  Loader2,
  MapPin,
  Save,
  Shield,
  User,
  Users,
} from 'lucide-react';
import {
  createEmployee,
  type CreateEmployeeRequest,
} from '../../../super-admin/services/registrationApi';

type EmployeeCreateFormData = {
  fullName: string;
  email: string;
  mobile: string;
  roleId: string;
  departmentId: string;
  employeeCode: string;
  designationId: string;
  reportingManagerId: string;
  locationId: string;
};

type EmployeeCreateErrors = Partial<Record<keyof EmployeeCreateFormData, string>>;

type SelectOption = {
  id: number;
  name: string;
  helperText?: string;
};

const roleOptions: SelectOption[] = [
  { id: 1, name: 'Manager' },
  { id: 2, name: 'Employee' },
  { id: 3, name: 'Management' },
];

const departmentOptions: SelectOption[] = [
  { id: 1, name: 'Engineering' },
  { id: 2, name: 'Sales' },
  { id: 3, name: 'Marketing' },
  { id: 4, name: 'Human Resources' },
  { id: 5, name: 'Finance' },
  { id: 6, name: 'Operations' },
];

const designationOptions: SelectOption[] = [
  { id: 1, name: 'Software Developer' },
  { id: 2, name: 'Senior Developer' },
  { id: 3, name: 'Team Lead' },
  { id: 4, name: 'Project Manager' },
  { id: 5, name: 'HR Executive' },
  { id: 6, name: 'Sales Executive' },
];

const managerOptions: SelectOption[] = [
  { id: 1, name: 'Rahul Sharma', helperText: 'Engineering Head' },
  { id: 2, name: 'Priya Patel', helperText: 'Sales Director' },
  { id: 3, name: 'Amit Kumar', helperText: 'Operations Manager' },
  { id: 4, name: 'Neha Singh', helperText: 'HR Manager' },
];

const locationOptions: SelectOption[] = [
  { id: 1, name: 'Mumbai HQ' },
  { id: 2, name: 'Delhi Office' },
  { id: 3, name: 'Bangalore Branch' },
  { id: 4, name: 'Pune Office' },
];

const initialFormData: EmployeeCreateFormData = {
  fullName: '',
  email: '',
  mobile: '',
  roleId: '',
  departmentId: '',
  employeeCode: '',
  designationId: '',
  reportingManagerId: '',
  locationId: '',
};

const inputClassName =
  'w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100';
const labelClassName = 'mb-1.5 block text-sm font-medium text-gray-700';

const AdminEmployeeRegistration: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<EmployeeCreateFormData>(initialFormData);
  const [errors, setErrors] = useState<EmployeeCreateErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiMessage, setApiMessage] = useState<string>('');
  const [apiError, setApiError] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = (): EmployeeCreateErrors => {
    const nextErrors: EmployeeCreateErrors = {};

    if (!formData.fullName.trim()) nextErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      nextErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      nextErrors.email = 'Enter a valid email address';
    }

    if (!formData.mobile.trim()) {
      nextErrors.mobile = 'Mobile number is required';
    } else if (!/^[0-9]{10,15}$/.test(formData.mobile.trim())) {
      nextErrors.mobile = 'Enter a valid mobile number';
    }

    if (!formData.employeeCode.trim()) nextErrors.employeeCode = 'Employee code is required';
    if (!formData.roleId) nextErrors.roleId = 'Role is required';
    if (!formData.departmentId) nextErrors.departmentId = 'Department is required';
    if (!formData.designationId) nextErrors.designationId = 'Designation is required';
    if (!formData.reportingManagerId) nextErrors.reportingManagerId = 'Reporting manager is required';
    if (!formData.locationId) nextErrors.locationId = 'Location is required';

    return nextErrors;
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));

    setApiError('');
    setApiMessage('');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);
    setApiError('');
    setApiMessage('');

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const payload: CreateEmployeeRequest = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      mobile: formData.mobile.trim(),
      roleId: Number(formData.roleId),
      departmentId: Number(formData.departmentId),
      employeeCode: formData.employeeCode.trim(),
      designationId: Number(formData.designationId),
      reportingManagerId: Number(formData.reportingManagerId),
      locationId: Number(formData.locationId),
    };

    setIsSubmitting(true);

    try {
      const response = await createEmployee(payload);

      if (response.success) {
        setIsSuccess(true);
        setApiMessage(response.message || 'Employee created successfully');
        setFormData(initialFormData);

        window.setTimeout(() => {
          navigate('/admin/dashboard');
        }, 1500);
      } else {
        setIsSuccess(false);
        setApiError(response.message || 'Failed to create employee');
      }
    } catch (error) {
      console.error('Create employee failed:', error);
      setIsSuccess(false);
      setApiError('Something went wrong while creating the employee.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderError = (field: keyof EmployeeCreateFormData) =>
    errors[field] ? (
      <p className="mt-1 text-xs font-medium text-red-600">{errors[field]}</p>
    ) : null;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="mx-auto max-w-6xl">
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-purple-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </button>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 px-6 py-6 text-white">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-semibold">Create Employee</h1>
                <p className="mt-1 text-sm text-purple-100">
                  Employee registration aligned to <span className="font-semibold">POST /api/Admin/create-employee</span>
                </p>
              </div>
              <div className="rounded-xl bg-white/10 px-4 py-3 text-sm backdrop-blur-sm">
                <p className="font-medium">API Payload</p>
                <p className="mt-1 text-purple-100">
                  fullName, email, mobile, roleId, departmentId, employeeCode, designationId, reportingManagerId, locationId
                </p>
              </div>
            </div>
          </div>

          <div className="px-6 py-6">
            <section className="mx-auto max-w-4xl">
              {(apiError || apiMessage) && (
                <div
                  className={`mb-5 flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${
                    apiError
                      ? 'border-red-200 bg-red-50 text-red-700'
                      : 'border-green-200 bg-green-50 text-green-700'
                  }`}
                >
                  {apiError ? (
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  ) : (
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  )}
                  <span>{apiError || apiMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label htmlFor="fullName" className={labelClassName}>
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter employee full name"
                      className={inputClassName}
                    />
                    {renderError('fullName')}
                  </div>

                  <div>
                    <label htmlFor="employeeCode" className={labelClassName}>
                      Employee Code
                    </label>
                    <input
                      id="employeeCode"
                      name="employeeCode"
                      type="text"
                      value={formData.employeeCode}
                      onChange={handleChange}
                      placeholder="EMP-1001"
                      className={inputClassName}
                    />
                    {renderError('employeeCode')}
                  </div>

                  <div>
                    <label htmlFor="email" className={labelClassName}>
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="employee@company.com"
                      className={inputClassName}
                    />
                    {renderError('email')}
                  </div>

                  <div>
                    <label htmlFor="mobile" className={labelClassName}>
                      Mobile Number
                    </label>
                    <input
                      id="mobile"
                      name="mobile"
                      type="tel"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="9876543210"
                      className={inputClassName}
                    />
                    {renderError('mobile')}
                  </div>

                  <div>
                    <label htmlFor="roleId" className={labelClassName}>
                      Role
                    </label>
                    <div className="relative">
                      <Shield className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <select
                        id="roleId"
                        name="roleId"
                        value={formData.roleId}
                        onChange={handleChange}
                        className={`${inputClassName} pl-10`}
                      >
                        <option value="">Select role</option>
                        {roleOptions.map((role) => (
                          <option key={role.id} value={role.id}>
                            {role.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {renderError('roleId')}
                  </div>

                  <div>
                    <label htmlFor="departmentId" className={labelClassName}>
                      Department
                    </label>
                    <div className="relative">
                      <Building2 className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <select
                        id="departmentId"
                        name="departmentId"
                        value={formData.departmentId}
                        onChange={handleChange}
                        className={`${inputClassName} pl-10`}
                      >
                        <option value="">Select department</option>
                        {departmentOptions.map((department) => (
                          <option key={department.id} value={department.id}>
                            {department.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {renderError('departmentId')}
                  </div>

                  <div>
                    <label htmlFor="designationId" className={labelClassName}>
                      Designation
                    </label>
                    <div className="relative">
                      <User className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <select
                        id="designationId"
                        name="designationId"
                        value={formData.designationId}
                        onChange={handleChange}
                        className={`${inputClassName} pl-10`}
                      >
                        <option value="">Select designation</option>
                        {designationOptions.map((designation) => (
                          <option key={designation.id} value={designation.id}>
                            {designation.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {renderError('designationId')}
                  </div>

                  <div>
                    <label htmlFor="reportingManagerId" className={labelClassName}>
                      Reporting Manager
                    </label>
                    <div className="relative">
                      <Users className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <select
                        id="reportingManagerId"
                        name="reportingManagerId"
                        value={formData.reportingManagerId}
                        onChange={handleChange}
                        className={`${inputClassName} pl-10`}
                      >
                        <option value="">Select manager</option>
                        {managerOptions.map((manager) => (
                          <option key={manager.id} value={manager.id}>
                            {manager.name}
                            {manager.helperText ? ` - ${manager.helperText}` : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                    {renderError('reportingManagerId')}
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="locationId" className={labelClassName}>
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <select
                        id="locationId"
                        name="locationId"
                        value={formData.locationId}
                        onChange={handleChange}
                        className={`${inputClassName} pl-10`}
                      >
                        <option value="">Select location</option>
                        {locationOptions.map((location) => (
                          <option key={location.id} value={location.id}>
                            {location.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {renderError('locationId')}
                  </div>
                </div>

                <div className="flex flex-col gap-3 border-t border-gray-200 pt-5 sm:flex-row sm:items-center sm:justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(initialFormData);
                      setErrors({});
                      setApiError('');
                      setApiMessage('');
                      setIsSuccess(false);
                    }}
                    className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                  >
                    Reset
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition ${
                      isSubmitting
                        ? 'cursor-not-allowed bg-purple-400'
                        : isSuccess
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-purple-600 hover:bg-purple-700'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Creating Employee...
                      </>
                    ) : isSuccess ? (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        Employee Created
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Create Employee
                      </>
                    )}
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEmployeeRegistration;
