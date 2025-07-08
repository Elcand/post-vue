// Environment configuration
const config = {
  development: {
    apiBaseURL: "/api", // Use proxy in development
  },
  production: {
    apiBaseURL: "https://your-backend-domain.com/api", // Replace with your actual backend URL
  },
  staging: {
    apiBaseURL: "https://staging.your-backend-domain.com/api", // Replace with your staging URL
  },
};

// Get current environment
const environment = import.meta.env.MODE || "development";

// Export the configuration for the current environment
export const env = config[environment] || config.development;
