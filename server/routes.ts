import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertItemSchema, insertSettingsSchema } from "@shared/schema";
import bcrypt from "bcryptjs";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Auth routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { password } = req.body;
      
      if (password === "C@pitulo4v3") {
        res.json({ success: true });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Items routes
  app.get("/api/items", async (req, res) => {
    try {
      const allItems = await storage.getItems();
      res.json(allItems);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/items/:id", async (req, res) => {
    try {
      const item = await storage.getItemById(req.params.id);
      if (!item) {
        return res.status(404).json({ error: "Item not found" });
      }
      res.json(item);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/items", async (req, res) => {
    try {
      const parsed = insertItemSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: fromZodError(parsed.error).message });
      }
      const newItem = await storage.createItem(parsed.data);
      res.status(201).json(newItem);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.patch("/api/items/:id", async (req, res) => {
    try {
      const updatedItem = await storage.updateItem(req.params.id, req.body);
      if (!updatedItem) {
        return res.status(404).json({ error: "Item not found" });
      }
      res.json(updatedItem);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.delete("/api/items/:id", async (req, res) => {
    try {
      await storage.deleteItem(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Settings routes
  app.get("/api/settings", async (req, res) => {
    try {
      const settingsData = await storage.getSettings();
      res.json(settingsData);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.patch("/api/settings", async (req, res) => {
    try {
      const updatedSettings = await storage.updateSettings(req.body);
      res.json(updatedSettings);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  return httpServer;
}
