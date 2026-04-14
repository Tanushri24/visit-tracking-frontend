// src/components/VisitEntryForm.tsx
import React, { useState } from 'react';

interface VisitFormData {
  visitDate: string;
  employeeName: string;
  company: string;
  organisation: string;
  department: string;
  contactPerson: string;
  locationCity: string;
}

// Sample data for dropdowns
const sampleEmployees = [
  { id: 1, name: 'Rajesh Kumar' },
  { id: 2, name: 'Priya Sharma' },
  { id: 3, name: 'Amit Patel' },
  { id: 4, name: 'Sneha Reddy' },
];

const sampleCompanies = [
  { id: 1, name: 'TechCorp India' },
  { id: 2, name: 'Global Solutions' },
  { id: 3, name: 'Innovative Minds' },
  { id: 4, name: 'Future Tech Ltd' },
];

const sampleOrganisations = [
  { id: 1, name: 'Examination Wing - MP Board' },
  { id: 2, name: 'University Campus Office' },
  { id: 3, name: 'ITI Limited - Rae Bareli Plant' },
];

const sampleDepartments = [
  { id: 1, name: 'Human Resources' },
  { id: 2, name: 'Information Technology' },
  { id: 3, name: 'Sales & Marketing' },
  { id: 4, name: 'Operations' },
];

const sampleContactPersons = [
  { id: 1, name: 'Mr. Anil Mehta' },
  { id: 2, name: 'Ms. Deepa Nair' },
  { id: 3, name: 'Dr. Suresh Iyer' },
  { id: 4, name: 'Mrs. Kavita Singh' },
];

const VisitEntryForm: React.FC = () => {
  const [formData, setFormData] = useState<VisitFormData>({
    visitDate: '',
    employeeName: '',
    company: '',
    organisation: '',
    department: '',
    contactPerson: '',
    locationCity: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add API call or further logic here
    alert('Visit entry submitted successfully!');
    // Optionally reset form
    // setFormData({ visitDate: '', employeeName: '', company: '', organisation: '', department: '', contactPerson: '', locationCity: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-purple-600 px-6 py-4">
          <h2 className="text-xl font-bold text-white">Employee Visit Entry Form</h2>
          <p className="text-purple-100 text-sm">Fill in the details of the visit</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Visit Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Visit Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="visitDate"
              value={formData.visitDate}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Employee Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Employee Name <span className="text-red-500">*</span>
            </label>
            <select
              name="employeeName"
              value={formData.employeeName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select Employee</option>
              {sampleEmployees.map((emp) => (
                <option key={emp.id} value={emp.name}>
                  {emp.name}
                </option>
              ))}
            </select>
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company <span className="text-red-500">*</span>
            </label>
            <select
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select Company</option>
              {sampleCompanies.map((comp) => (
                <option key={comp.id} value={comp.name}>
                  {comp.name}
                </option>
              ))}
            </select>
          </div>

          {/* Organisation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Organisation <span className="text-red-500">*</span>
            </label>
            <select
              name="organisation"
              value={formData.organisation}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select Organisation</option>
              {sampleOrganisations.map((org) => (
                <option key={org.id} value={org.name}>
                  {org.name}
                </option>
              ))}
            </select>
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Department <span className="text-red-500">*</span>
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select Department</option>
              {sampleDepartments.map((dept) => (
                <option key={dept.id} value={dept.name}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          {/* Contact Person */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Person <span className="text-red-500">*</span>
            </label>
            <select
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select Contact Person</option>
              {sampleContactPersons.map((contact) => (
                <option key={contact.id} value={contact.name}>
                  {contact.name}
                </option>
              ))}
            </select>
          </div>

          {/* Location / City */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location / City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="locationCity"
              value={formData.locationCity}
              onChange={handleChange}
              required
              placeholder="e.g., Mumbai, Bangalore, Delhi"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-200 font-medium"
            >
              Submit Visit Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VisitEntryForm;