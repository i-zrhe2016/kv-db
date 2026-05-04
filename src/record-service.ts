import { HttpError } from "./errors";
import { RecordRepository } from "./record-repository";
import type { CreateRecordInput, Env, RecordData, UpdateRecordInput } from "./types";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function validateId(value: string): string {
  const id = value.trim();
  if (!id) {
    throw new HttpError(400, "INVALID_ID", "Record id is required");
  }

  return id;
}

function validateCreateInput(input: unknown): CreateRecordInput {
  if (!isPlainObject(input) || !("value" in input)) {
    throw new HttpError(
      400,
      "INVALID_BODY",
      'Request body must be an object containing a "value" field'
    );
  }

  const candidateId = typeof input.id === "string" ? validateId(input.id) : undefined;

  return {
    id: candidateId,
    value: input.value
  };
}

function validateUpdateInput(input: unknown): UpdateRecordInput {
  if (!isPlainObject(input) || !("value" in input)) {
    throw new HttpError(
      400,
      "INVALID_BODY",
      'Request body must be an object containing a "value" field'
    );
  }

  return {
    value: input.value
  };
}

function createRecordId(): string {
  return crypto.randomUUID();
}

export class RecordService {
  private readonly repository: RecordRepository;

  constructor(env: Env) {
    this.repository = new RecordRepository(env);
  }

  listRecords(): Promise<RecordData[]> {
    return this.repository.list();
  }

  getRecord(id: string): Promise<RecordData> {
    return this.repository.get(validateId(id));
  }

  createRecord(input: unknown): Promise<RecordData> {
    const parsed = validateCreateInput(input);
    return this.repository.create(parsed.id ?? createRecordId(), parsed.value);
  }

  updateRecord(id: string, input: unknown): Promise<RecordData> {
    const parsed = validateUpdateInput(input);
    return this.repository.update(validateId(id), parsed.value);
  }

  deleteRecord(id: string): Promise<void> {
    return this.repository.delete(validateId(id));
  }
}
