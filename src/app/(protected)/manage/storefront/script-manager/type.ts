export interface ScriptRecord {
  id: number | string;
  scriptName?: string | null;
  location?: string | null;
  placement?: string | null;
  scriptType?: string | null;
  createdAt?: string | null;
  [key: string]: unknown;
}
