import { registrationApi } from './registrationApi';

export interface DropdownOption {
    id: number;
    name: string;
}

export interface ManagerOption {
    id: number;
    name: string;
    email?: string;
}

// Fetch departments from API
export const fetchDepartments = async (): Promise<DropdownOption[]> => {
    try {
        const departments = await registrationApi.getDepartments();
        return departments.map(dept => ({
            id: dept.id,
            name: dept.name
        }));
    } catch (error) {
        console.error('Error fetching departments:', error);
        return [];
    }
};

// Fetch designations from API
export const fetchDesignations = async (): Promise<DropdownOption[]> => {
    try {
        const designations = await registrationApi.getDesignations();
        return designations.map(des => ({
            id: des.id,
            name: des.name
        }));
    } catch (error) {
        console.error('Error fetching designations:', error);
        return [];
    }
};

// Fetch managers from API
export const fetchManagers = async (): Promise<ManagerOption[]> => {
    try {
        const managers = await registrationApi.getManagers();
        return managers.map(mgr => ({
            id: mgr.id,
            name: mgr.name,
            email: mgr.email
        }));
    } catch (error) {
        console.error('Error fetching managers:', error);
        return [];
    }
};

// Fetch locations from API
export const fetchLocations = async (): Promise<DropdownOption[]> => {
    try {
        const locations = await registrationApi.getLocations();
        return locations.map(loc => ({
            id: loc.id,
            name: loc.name
        }));
    } catch (error) {
        console.error('Error fetching locations:', error);
        return [];
    }
};

// User roles (if you have API for roles, otherwise use static)
export const fetchUserRoles = async (): Promise<DropdownOption[]> => {
    try {
        // If you have an API for roles, use it
        // const roles = await registrationApi.getRoles();
        // return roles.map(role => ({ id: role.id, name: role.name }));
        
        // Using static roles for now
        return [
            { id: 1, name: 'Super Admin' },
            { id: 2, name: 'Admin' },
            { id: 3, name: 'Master Management' },
            { id: 4, name: 'Manager' },
            { id: 5, name: 'Team Lead' },
            { id: 6, name: 'Employee' },
            { id: 7, name: 'HR' }
        ];
    } catch (error) {
        console.error('Error fetching roles:', error);
        return [];
    }
};