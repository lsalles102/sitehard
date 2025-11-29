import React, { createContext, useContext, useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "./api";
import type { ItemType, Item, Settings } from "./api";

export type { ItemType, Item, Settings };

interface ContentContextType {
  items: Item[];
  settings: Settings;
  isLoading: boolean;
  addItem: (item: Omit<Item, "id" | "date">) => Promise<void>;
  updateItem: (id: string, item: Partial<Item>) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  getItemsByType: (type: ItemType) => Item[];
  updateSettings: (settings: Partial<Settings>) => Promise<void>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const defaultSettings: Settings = {
  id: "",
  shopUrl: "#",
  discordUrl: "#",
  footerText: "O maior portal de cheats e hacks da América Latina. Domine o jogo com nossas ferramentas exclusivas."
};

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  
  const { data: items = [], isLoading: itemsLoading } = useQuery({
    queryKey: ["items"],
    queryFn: api.fetchItems,
  });

  const { data: settings = defaultSettings, isLoading: settingsLoading } = useQuery({
    queryKey: ["settings"],
    queryFn: api.fetchSettings,
  });

  const createItemMutation = useMutation({
    mutationFn: api.createItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  const updateItemMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Item> }) =>
      api.updateItem(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  const deleteItemMutation = useMutation({
    mutationFn: api.deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  const updateSettingsMutation = useMutation({
    mutationFn: api.updateSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
  });

  const addItem = async (newItem: Omit<Item, "id" | "date">) => {
    await createItemMutation.mutateAsync(newItem);
  };

  const updateItem = async (id: string, updatedItem: Partial<Item>) => {
    await updateItemMutation.mutateAsync({ id, data: updatedItem });
  };

  const deleteItem = async (id: string) => {
    await deleteItemMutation.mutateAsync(id);
  };

  const updateSettings = async (newSettings: Partial<Settings>) => {
    await updateSettingsMutation.mutateAsync(newSettings);
  };

  const getItemsByType = (type: ItemType) => {
    return items.filter((item) => item.type === type);
  };

  return (
    <ContentContext.Provider
      value={{ 
        items, 
        settings, 
        isLoading: itemsLoading || settingsLoading,
        addItem, 
        updateItem, 
        deleteItem, 
        getItemsByType, 
        updateSettings 
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
}
