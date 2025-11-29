import type { Item as DBItem, Settings as DBSettings } from "@shared/schema";

export type ItemType = "news" | "download" | "tutorial";

// Map database Item to frontend Item (with date conversion and typed 'type' field)
export type Item = Omit<DBItem, "createdAt" | "type"> & {
  type: ItemType;
  date: string;
};

export type Settings = DBSettings;

export async function fetchItems(): Promise<Item[]> {
  const res = await fetch("/api/items");
  if (!res.ok) throw new Error("Failed to fetch items");
  const items: DBItem[] = await res.json();
  return items.map(item => ({
    ...item,
    type: item.type as ItemType,
    date: new Date(item.createdAt).toISOString()
  })) as Item[];
}

export async function createItem(item: Omit<Item, "id" | "date">): Promise<Item> {
  const res = await fetch("/api/items", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error("Failed to create item");
  const dbItem: DBItem = await res.json();
  return {
    ...dbItem,
    type: dbItem.type as ItemType,
    date: new Date(dbItem.createdAt).toISOString()
  } as Item;
}

export async function updateItem(id: string, item: Partial<Omit<Item, "id" | "date">>): Promise<Item> {
  const res = await fetch(`/api/items/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error("Failed to update item");
  const dbItem: DBItem = await res.json();
  return {
    ...dbItem,
    type: dbItem.type as ItemType,
    date: new Date(dbItem.createdAt).toISOString()
  } as Item;
}

export async function deleteItem(id: string): Promise<void> {
  const res = await fetch(`/api/items/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete item");
}

export async function fetchSettings(): Promise<Settings> {
  const res = await fetch("/api/settings");
  if (!res.ok) throw new Error("Failed to fetch settings");
  return res.json();
}

export async function updateSettings(settings: Partial<Settings>): Promise<Settings> {
  const res = await fetch("/api/settings", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(settings),
  });
  if (!res.ok) throw new Error("Failed to update settings");
  return res.json();
}

export async function login(password: string): Promise<boolean> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
  return res.ok;
}
