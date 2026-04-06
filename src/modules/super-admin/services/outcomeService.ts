// src/services/outcomeService.ts
export interface OutcomeType {
  id: number;
  outComeName: string;
  isRevenueLinked: boolean;
  isActive: boolean;
}

const API_BASE_URL = '/api/OutcomeType';

// GET all outcomes
export const fetchOutcomes = async (): Promise<OutcomeType[]> => {
  try {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch outcomes');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching outcomes:', error);
    throw error;
  }
};

// POST new outcome
export const createOutcome = async (outcomeData: Omit<OutcomeType, 'id'>): Promise<OutcomeType> => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(outcomeData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create outcome');
    }
    
    // Check if response is JSON or plain text
    const contentType = response.headers.get('content-type');
    let data;
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
      return data;
    } else {
      // If response is plain text, create a custom object with the data
      const textResponse = await response.text();
      console.log('Server response:', textResponse); // "Created Successfully"
      
      // Create a temporary object with a placeholder ID
      // You might need to fetch the list again to get the actual ID
      return {
        id: Date.now(), // Temporary ID
        outComeName: outcomeData.outComeName,
        isRevenueLinked: outcomeData.isRevenueLinked,
        isActive: outcomeData.isActive
      };
    }
  } catch (error) {
    console.error('Error creating outcome:', error);
    throw error;
  }
};