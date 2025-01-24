// we can define JSON schemas here for more advanced validation if needed.

// For example (but not being used in the current implementation):
// export const agentSchema = {
//  type: "object",
//  properties: {
//    id: { type: "string" },
//    name: { type: "string" },
//    category: { type: "string", enum: ["autonomous", "analytics", "marketing"] },
//     // ... other properties
//  },
//    required: ["id", "name", "category"],
// };

// This file is currently not being used for validation, but can be if a schema library is added.

export const metricsSchema = {
  type: "object",
  properties: {
    tasks_completed: { type: "number" },
    status: { type: "string" },
    average_rating: { type: "number" },
    cost_to_complete: { type: "number" },
    currency: { type: "string" },
    payment_completed: { type: "boolean" },
    transaction_time: { type: "number" },
    human_assistance_request_count: { type: "number" },
  },
  required: ["tasks_completed", "status"],
};