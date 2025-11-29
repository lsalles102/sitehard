import { db } from "./db";
import {
  type User,
  type InsertUser,
  type Item,
  type InsertItem,
  type Settings,
  type InsertSettings,
  users,
  items,
  settings
} from "@shared/schema";
import { eq, sql } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getItems(): Promise<Item[]>;
  getItemById(id: string): Promise<Item | undefined>;
  createItem(item: InsertItem): Promise<Item>;
  updateItem(id: string, item: Partial<InsertItem>): Promise<Item | undefined>;
  deleteItem(id: string): Promise<void>;

  getSettings(): Promise<Settings | undefined>;
  updateSettings(settingsData: Partial<InsertSettings>): Promise<Settings>;
}

export class DatabaseStorage implements IStorage {
  // ============================
  // USERS
  // ============================

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // ============================
  // ITEMS
  // ============================

  async getItems(): Promise<Item[]> {
    return await db.select().from(items).orderBy(items.createdAt);
  }

  async getItemById(id: string): Promise<Item | undefined> {
    const [item] = await db.select().from(items).where(eq(items.id, id));
    return item;
  }

  async createItem(item: InsertItem): Promise<Item> {
    const [newItem] = await db.insert(items).values(item).returning();
    return newItem;
  }

  async updateItem(id: string, itemData: Partial<InsertItem>): Promise<Item | undefined> {
    const [updatedItem] = await db
      .update(items)
      .set(itemData)
      .where(eq(items.id, id))
      .returning();

    return updatedItem;
  }

  async deleteItem(id: string): Promise<void> {
    await db.delete(items).where(eq(items.id, id));
  }

  // ============================
  // SETTINGS
  // ============================

  async getSettings(): Promise<Settings | undefined> {
    const [settingsRow] = await db.select().from(settings).limit(1);

    // Se não existir registro, cria um vazio
    if (!settingsRow) {
      const [newSettings] = await db.insert(settings).values({}).returning();
      return newSettings;
    }

    return settingsRow;
  }

  async updateSettings(settingsData: Partial<InsertSettings>): Promise<Settings> {
    // Atualiza SEM depender de ID do frontend
    const [updated] = await db
      .update(settings)
      .set({
        shopUrl: settingsData.shopUrl,
        discordUrl: settingsData.discordUrl,
        footerText: settingsData.footerText
      })
      .where(sql`TRUE`) // Atualiza o único registro da tabela
      .returning();

    return updated;
  }
}

export const storage = new DatabaseStorage();
