import { HttpError } from "./errors";
import type { Env, RecordData } from "./types";

const RECORD_PREFIX = "record:";

function recordKey(id: string): string {
  return `${RECORD_PREFIX}${id}`;
}

export class RecordRepository {
  constructor(private readonly env: Env) {}

  async list(): Promise<RecordData[]> {
    const listing = await this.env.APP_KV.list({ prefix: RECORD_PREFIX });
    const records = await Promise.all(
      listing.keys.map(async ({ name }) => {
        const record = await this.env.APP_KV.get<RecordData>(name, "json");
        if (!record) {
          return null;
        }

        return record;
      })
    );

    return records
      .filter((record): record is RecordData => record !== null)
      .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
  }

  async get(id: string): Promise<RecordData> {
    const record = await this.env.APP_KV.get<RecordData>(recordKey(id), "json");
    if (!record) {
      throw new HttpError(404, "NOT_FOUND", `Record "${id}" was not found`);
    }

    return record;
  }

  async create(id: string, value: unknown): Promise<RecordData> {
    const key = recordKey(id);
    const existing = await this.env.APP_KV.get(key);
    if (existing !== null) {
      throw new HttpError(
        409,
        "RECORD_EXISTS",
        `Record "${id}" already exists`
      );
    }

    const now = new Date().toISOString();
    const record: RecordData = {
      id,
      value,
      createdAt: now,
      updatedAt: now
    };

    await this.env.APP_KV.put(key, JSON.stringify(record));
    return record;
  }

  async update(id: string, value: unknown): Promise<RecordData> {
    const current = await this.get(id);
    const updated: RecordData = {
      ...current,
      value,
      updatedAt: new Date().toISOString()
    };

    await this.env.APP_KV.put(recordKey(id), JSON.stringify(updated));
    return updated;
  }

  async delete(id: string): Promise<void> {
    await this.get(id);
    await this.env.APP_KV.delete(recordKey(id));
  }
}
