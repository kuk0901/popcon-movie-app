export type ActionError =
  | string
  | { name: string; message: string; code?: string };

export interface ActionResponse {
  status: boolean;
  message?: string;
  error?: ActionError;
}
