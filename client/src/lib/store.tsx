import React, { createContext, useContext, useState, useEffect } from "react";
import heroBg from "@assets/generated_images/cyberpunk_gamer_hero_background.png";
import fpsCover from "@assets/generated_images/fps_game_cover.png";
import racingCover from "@assets/generated_images/racing_game_cover.png";
import rpgCover from "@assets/generated_images/rpg_game_cover.png";
import codeAbstract from "@assets/generated_images/coding_tutorial_abstract.png";

export type ItemType = "news" | "download" | "tutorial";

export interface Item {
  id: string;
  type: ItemType;
  title: string;
  description: string;
  content?: string; // For tutorials (could be markdown or html)
  imageUrl: string;
  videoUrl?: string;
  downloadUrl?: string;
  featured?: boolean;
  date: string;
}


export interface Settings {
  shopUrl: string;
  discordUrl: string;
  footerText: string;
}

interface ContentContextType {
  items: Item[];
  settings: Settings;
  addItem: (item: Omit<Item, "id" | "date">) => void;
  updateItem: (id: string, item: Partial<Item>) => void;
  deleteItem: (id: string) => void;
  getItemsByType: (type: ItemType) => Item[];
  updateSettings: (settings: Partial<Settings>) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const initialSettings: Settings = {
  shopUrl: "#",
  discordUrl: "#",
  footerText: "O maior portal de cheats e hacks da América Latina. Domine o jogo com nossas ferramentas exclusivas."
};

const initialItems: Item[] = [
  {
    id: "1",
    type: "news",
    title: "Bem-vindo ao Hardzera",
    description: "O melhor lugar para encontrar cheats, hacks e tutoriais para seus jogos favoritos.",
    imageUrl: heroBg,
    date: new Date().toISOString(),
    featured: true,
  },
  {
    id: "2",
    type: "news",
    title: "Novo Anti-Cheat Bypass",
    description: "Descubra como contornar as novas proteções dos jogos mais populares.",
    imageUrl: codeAbstract,
    date: new Date().toISOString(),
    featured: true,
  },
  {
    id: "3",
    type: "download",
    title: "Super Aimbot 3000",
    description: "Aimbot indetectável para todos os jogos FPS. Headshots garantidos.",
    imageUrl: fpsCover,
    downloadUrl: "#",
    date: new Date().toISOString(),
  },
  {
    id: "4",
    type: "download",
    title: "Speed Hack Racer",
    description: "Vença todas as corridas com nosso speed hack atualizado.",
    imageUrl: racingCover,
    downloadUrl: "#",
    date: new Date().toISOString(),
  },
  {
    id: "5",
    type: "download",
    title: "Mana Infinito RPG",
    description: "Lance magias sem parar. Script atualizado para a versão 1.5.",
    imageUrl: rpgCover,
    downloadUrl: "#",
    date: new Date().toISOString(),
  },
  {
    id: "6",
    type: "tutorial",
    title: "Como instalar Injectors",
    description: "Guia passo a passo para iniciantes sobre como usar DLL injectors.",
    content: "Passo 1: Baixe o injector. Passo 2: Abra como administrador...",
    imageUrl: codeAbstract,
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    date: new Date().toISOString(),
  },
];

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [settings, setSettings] = useState<Settings>(initialSettings);

  const addItem = (newItem: Omit<Item, "id" | "date">) => {
    const item: Item = {
      ...newItem,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
    };
    setItems((prev) => [item, ...prev]);
  };

  const updateItem = (id: string, updatedItem: Partial<Item>) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedItem } : item))
    );
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const getItemsByType = (type: ItemType) => {
    return items.filter((item) => item.type === type);
  };

  return (
    <ContentContext.Provider
      value={{ items, settings, addItem, updateItem, deleteItem, getItemsByType, updateSettings }}
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
