export interface Env {
  APP_KV: KVNamespace;
  AUTH_TOKEN: string;
}

export interface RecordData {
  id: string;
  value: unknown;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRecordInput {
  id?: string;
  value: unknown;
}

export interface UpdateRecordInput {
  value: unknown;
}
