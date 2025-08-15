import { type BusinessProfile } from './types';

/**
 * Simulates an API call to register a new business.
 * In a real application, this would make an HTTP POST request to a backend endpoint.
 * The backend would then handle validation, database insertion, etc.
 *
 * @param data The business profile data.
 * @returns A promise that resolves on successful "registration".
 */
export const registerBusiness = (data: BusinessProfile): Promise<{ success: true }> => {
  return new Promise((resolve, reject) => {
    console.log("--- SIMULATING BACKEND API CALL ---");
    console.log("Received business registration data:", data);

    // Simulate network delay
    setTimeout(() => {
      // In a real scenario, you might get an error back from the server
      // if, for example, the email is already taken.
      if (data.email.includes('fail')) {
         console.log("--- SIMULATION FAILED ---");
         reject(new Error("This email is already associated with an existing business."));
         return;
      }
      
      console.log("--- SIMULATION SUCCESSFUL ---");
      // The backend would typically return the created user/business object or a success message
      resolve({ success: true });
    }, 2000); // 2-second delay
  });
};
