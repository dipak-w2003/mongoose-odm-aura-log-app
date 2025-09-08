// global.ts
export const Status = {
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
} as const;

// Type of all values ("loading" | "success" | "error")
// Simple : Take all the values of the Status object and make a union type out of them.
export type Status = typeof Status[keyof typeof Status];