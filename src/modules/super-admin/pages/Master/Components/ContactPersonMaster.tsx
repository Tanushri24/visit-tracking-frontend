import React, { useEffect, useState } from "react";
import axios from "axios";
import { contactService } from "../../../services/contactPerson.service";
import type {
  ContactPerson,
  ContactPersonPayload,
  CompanyOption,
  OrganisationOption,
  DepartmentOption,
} from "../../../services/contactPerson.service";

const ContactPersonMaster = () => {
  const [contacts, setContacts] = useState<ContactPerson[]>([]);
  const [loading, setLoading] = useState(false);
  const [lookupLoading, setLookupLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState<Omit<ContactPerson, "id">>({
    companyId: 0,
    organisationId: 0,
    departmentId: 0,
    name: "",
    designation: "",
    mobile: "",
    email: "",
    remark: "",
    isActive: true,
  });

  const [editId, setEditId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [companies, setCompanies] = useState<CompanyOption[]>([]);
  const [organizations, setOrganizations] = useState<OrganisationOption[]>([]);
  const [departments, setDepartments] = useState<DepartmentOption[]>([]);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await contactService.getAll();
      setContacts(res.data);
    } catch (err) {
      console.error("Error fetching contacts", err);
    }
    setLoading(false);
  };

  const fetchLookupData = async () => {
    setLookupLoading(true);
    try {
      const [companyData, organisationData, departmentData] = await Promise.all([
        contactService.getCompanies(),
        contactService.getOrganisations(),
        contactService.getDepartments(),
      ]);

      setCompanies((companyData ?? []).filter((company) => company.isActive !== false));
      setOrganizations((organisationData ?? []).filter((organisation) => organisation.isActive !== false));
      setDepartments((departmentData ?? []).filter((department) => department.isActive !== false));
    } catch (err) {
      console.error("Error fetching contact master dependencies", err);
      setErrorMessage("Unable to load company, organisation, or department master data.");
    } finally {
      setLookupLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
    fetchLookupData();
  }, []);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]:
        type === "checkbox"
          ? checked
          : ["companyId", "organisationId", "departmentId"].includes(name)
          ? Number(value) // ✅ FIX: convert to number
          : value,
    });
  };

  const handleSubmit = async () => {
    if (!form.companyId || !form.organisationId || !form.departmentId) {
      setErrorMessage("Please select company, organization, and department.");
      return;
    }

    if (!form.name.trim() || !form.designation.trim() || !form.mobile.trim() || !form.email.trim()) {
      setErrorMessage("Name, designation, mobile, and email are required.");
      return;
    }

    const selectedCompany = companies.find((company) => company.id === form.companyId);
    const selectedOrganisation = organizations.find((organisation) => organisation.id === form.organisationId);
    const selectedDepartment = departments.find((department) => department.id === form.departmentId);

    if (!selectedCompany || !selectedOrganisation || !selectedDepartment) {
      setErrorMessage("Please select valid company, organization, and department values from master data.");
      return;
    }

    if (selectedOrganisation.companyId !== selectedCompany.id) {
      setErrorMessage("Selected organization does not belong to the selected company.");
      return;
    }

    if (selectedDepartment.organisationId !== selectedOrganisation.id) {
      setErrorMessage("Selected department does not belong to the selected organization.");
      return;
    }

    const payload: ContactPersonPayload = {
      companyId: form.companyId,
      organisationId: form.organisationId,
      departmentId: form.departmentId,
      name: form.name.trim(),
      designation: form.designation.trim(),
      mobile: form.mobile.trim(),
      email: form.email.trim(),
      remark: form.remark.trim(),
      isActive: form.isActive,
    };

    setErrorMessage("");

    try {
      if (editMode && editId !== null) {
        await contactService.update(editId, { id: editId, ...payload });
      } else {
        await contactService.create(payload);
      }

      setShowModal(false);
      resetForm();
      fetchContacts();
    } catch (err) {
      console.error("Save error", err);
      if (axios.isAxiosError(err)) {
        const apiMessage =
          (err.response?.data as { message?: string; title?: string })?.message ||
          (err.response?.data as { message?: string; title?: string })?.title ||
          `Request failed with status code ${err.response?.status ?? 500}`;
        setErrorMessage(apiMessage);
        return;
      }

      setErrorMessage("Unable to save contact person. Please try again.");
    }
  };

  const handleEdit = (data: ContactPerson) => {
    setEditMode(true);
    setEditId(data.id);

    setForm({
      companyId: data.companyId,
      organisationId: data.organisationId,
      departmentId: data.departmentId,
      name: data.name,
      designation: data.designation,
      mobile: data.mobile,
      email: data.email,
      remark: data.remark,
      isActive: data.isActive,
    });

      setErrorMessage("");
      setShowModal(true);
  };

  const resetForm = () => {
    setForm({
      companyId: 0,
      organisationId: 0,
      departmentId: 0,
      name: "",
      designation: "",
      mobile: "",
      email: "",
      remark: "",
      isActive: true,
    });

    setErrorMessage("");
    setEditMode(false);
    setEditId(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Contact Person Master</h2>

      <button
        onClick={() => {
          resetForm();
          setShowModal(true);
        }}
        className="bg-purple-600 text-white px-4 py-2 rounded mb-4"
      >
        Add Contact
      </button>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Name</th>
            <th>Designation</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={6}>Loading...</td>
            </tr>
          ) : (
            contacts.map((c) => (
              <tr key={c.id} className="text-center border-t">
                <td>{c.name}</td>
                <td>{c.designation}</td>
                <td>{c.mobile}</td>
                <td>{c.email}</td>
                <td>{c.isActive ? "Active" : "Inactive"}</td>
                <td>
                  <button
                    onClick={() => handleEdit(c)}
                    className="text-blue-600"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-[500px]">
            <h3 className="text-lg font-bold mb-4">
              {editMode ? "Edit Contact" : "Add Contact"}
            </h3>

            <select name="companyId" value={form.companyId} onChange={handleChange} className="input">
              <option value={0}>Select Company</option>
              {companies.map((c) => (
                <option key={c.id} value={c.id}>{c.companyName}</option>
              ))}
            </select>

            <select name="organisationId" value={form.organisationId} onChange={handleChange} className="input">
              <option value={0}>Select Organization</option>
              {organizations
                .filter((o) => !form.companyId || o.companyId === form.companyId)
                .map((o) => (
                  <option key={o.id} value={o.id}>{o.organisationName}</option>
                ))}
            </select>

            <select name="departmentId" value={form.departmentId} onChange={handleChange} className="input">
              <option value={0}>Select Department</option>
              {departments
                .filter((d) => !form.organisationId || d.organisationId === form.organisationId)
                .map((d) => (
                  <option key={d.id} value={d.id}>{d.departmentName}</option>
                ))}
            </select>

            <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="input" />
            <input name="designation" value={form.designation} onChange={handleChange} placeholder="Designation" className="input" />
            <input name="mobile" value={form.mobile} onChange={handleChange} placeholder="Mobile" className="input" />
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="input" />
            <input name="remark" value={form.remark} onChange={handleChange} placeholder="Remark" className="input" />

            <label className="flex items-center gap-2 mt-2">
              <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} />
              Active
            </label>

            {lookupLoading && (
              <p className="mt-3 text-sm text-gray-500">Loading company, organization, and department masters...</p>
            )}

            {errorMessage && (
              <p className="mt-3 text-sm text-red-600">{errorMessage}</p>
            )}

            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button onClick={handleSubmit} className="bg-purple-600 text-white px-4 py-2 rounded">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactPersonMaster;
