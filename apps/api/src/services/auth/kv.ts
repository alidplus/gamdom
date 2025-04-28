import { users } from "@repo/db";

// a temporary key-value store to keep users session
export const authUsersKv = new Map<number, users.TData>();
