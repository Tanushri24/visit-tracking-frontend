// src/modules/super-admin/pages/Master/Components/DepartmentMaster.tsx

import React, { useEffect, useState } from "react";
import {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment
} from "../../../services/department.service";

export interface Department {
  id: number;
  departmentName: string;
  organisationId: number;
  isActive: boolean;
  insertedDate?: string;
}

const DepartmentMaster = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [newDepartment, setNewDepartment] = useState({
    departmentName: "",
    organisationId: 0,
    isActive: true
  });

  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getDepartments();
      const normalizedDepartments = (data ?? []).map((department: any) => ({
        id: Number(department.id ?? 0),
        departmentName: department.departmentName ?? "",
        organisationId: Number(department.organisationId ?? 0),
        isActive: Boolean(department.isActive ?? true),
        insertedDate: department.insertedDate ?? department.createdAt ?? ""
      }));
      setDepartments(normalizedDepartments);
    } catch (err: any) {
      setError("Failed to load departments");
      console.error("fetchDepartments error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleInsertDepartment = async () => {
    if (!newDepartment.departmentName || !newDepartment.organisationId) {
      alert("Department Name and Organisation Id are required");
      return;
    }

    try {
      setLoading(true);
      await createDepartment({
        departmentName: newDepartment.departmentName.trim(),
        organisationId: Number(newDepartment.organisationId),
        isActive: newDepartment.isActive
      });
      await fetchDepartments();
      setNewDepartment({ departmentName: "", organisationId: 0, isActive: true });
    } catch (err: any) {
      const validationErrors = err?.response?.data?.errors;
      const validationMessage =
        validationErrors && typeof validationErrors === "object"
          ? Object.values(validationErrors).flat().join("\n")
          : null;

      alert(validationMessage || err?.response?.data?.message || err?.response?.data?.title || "Error creating department");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    try {
      await deleteDepartment(id);
      await fetchDepartments();
    } catch (err) {
      alert("Delete failed");
      console.error("deleteDepartment error", err);
    }
  };

  const handleEdit = (department: Department) => {
    setSelectedDepartment(department);
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    if (!selectedDepartment) return;

    try {
      setLoading(true);
      await updateDepartment(selectedDepartment.id, selectedDepartment);
      await fetchDepartments();
      setShowEditModal(false);
      setSelectedDepartment(null);
    } catch (err) {
      alert("Update failed");
      console.error("updateDepartment error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Department Master</h1>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <div className="bg-white shadow rounded p-4 mb-6">
        <h2 className="text-lg font-semibold mb-3">Add Department</h2>
        <div className="flex flex-wrap gap-3 items-end">
          <input
            type="text"
            placeholder="Department Name"
            value={newDepartment.departmentName}
            onChange={(e) => setNewDepartment((s) => ({ ...s, departmentName: e.target.value }))}
            className="border p-2 rounded w-1/3"
          />
          <input
            type="number"
            placeholder="Organisation ID"
            value={newDepartment.organisationId}
            onChange={(e) => setNewDepartment((s) => ({ ...s, organisationId: Number(e.target.value) }))}
            className="border p-2 rounded w-1/3"
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={newDepartment.isActive}
              onChange={(e) => setNewDepartment((s) => ({ ...s, isActive: e.target.checked }))}
            />
            Active
          </label>
          <button onClick={handleInsertDepartment} className="bg-purple-600 text-white px-4 py-2 rounded">
            Add
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded p-4 mb-6">
        <h2 className="text-lg font-semibold mb-3">Department List</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Organisation</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Created</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((d) => (
                <tr key={d.id} className="hover:bg-gray-50">
                  <td className="p-2 border">{d.id}</td>
                  <td className="p-2 border">{d.departmentName}</td>
                  <td className="p-2 border">{d.organisationId}</td>
                  <td className="p-2 border">{d.isActive ? "Active" : "Inactive"}</td>
                  <td className="p-2 border">{d.insertedDate || "-"}</td>
                  <td className="p-2 border">
                    <button
                      className="text-blue-600 mr-2"
                      onClick={() => handleEdit(d)}
                    >
                      Edit
                    </button>
                    <button className="text-red-600" onClick={() => handleDelete(d.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {departments.length === 0 && !loading && (
          <p className="text-gray-500 text-center mt-4">No departments found</p>
        )}
      </div>

      {showEditModal && selectedDepartment && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Edit Department</h3>
            <div className="grid gap-3">
              <input
                type="text"
                value={selectedDepartment.departmentName}
                onChange={(e) => setSelectedDepartment((prev) => prev ? { ...prev, departmentName: e.target.value } : prev)}
                className="border p-2 rounded"
              />
              <input
                type="number"
                value={selectedDepartment.organisationId}
                onChange={(e) => setSelectedDepartment((prev) => prev ? { ...prev, organisationId: Number(e.target.value) } : prev)}
                className="border p-2 rounded"
              />
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedDepartment.isActive}
                  onChange={(e) => setSelectedDepartment((prev) => prev ? { ...prev, isActive: e.target.checked } : prev)}
                />
                Active
              </label>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setShowEditModal(false)} className="px-4 py-2 border rounded">Cancel</button>
              <button onClick={handleUpdate} className="px-4 py-2 bg-purple-600 text-white rounded">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentMaster;
