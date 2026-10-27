export interface ScriptRecord {
  id: number | string;
  script_name?: string | null;
  location?: string | null;
  placement?: string | null;
  script_type?: string | null;
  created_at?: string | null;
  [key: string]: unknown;
}
