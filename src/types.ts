export interface Env {
  APP_KV: KVNamespace;
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
