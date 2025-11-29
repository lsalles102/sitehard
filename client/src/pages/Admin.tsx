import React, { useState, useEffect } from "react";
import { useContent, Item, ItemType } from "@/lib/store";
import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Edit2, Save, X, LogOut } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function Admin() {
  const { items, settings, deleteItem, addItem, updateItem, updateSettings } = useContent();
  const { isAuthenticated, logout } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<Item> | null>(null);
  
  // Settings state
  const [localSettings, setLocalSettings] = useState(settings);

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/login");
    }
  }, [isAuthenticated, setLocation]);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(localSettings);
    toast({ title: "Configurações salvas", description: "As alterações foram aplicadas com sucesso." });
  };

  if (!isAuthenticated) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    if (editingItem.id) {
      updateItem(editingItem.id, editingItem);
      toast({ title: "Item atualizado", description: "As alterações foram salvas com sucesso." });
    } else {
      if (!editingItem.title || !editingItem.type || !editingItem.imageUrl) {
        toast({ title: "Erro", description: "Preencha os campos obrigatórios.", variant: "destructive" });
        return;
      }
      addItem(editingItem as any);
      toast({ title: "Item criado", description: "Novo conteúdo adicionado com sucesso." });
    }
    setIsEditOpen(false);
    setEditingItem(null);
  };

  const openNew = (type: ItemType) => {
    setEditingItem({ type, title: "", description: "", imageUrl: "", content: "" });
    setIsEditOpen(true);
  };

  const openEdit = (item: Item) => {
    setEditingItem({ ...item });
    setIsEditOpen(true);
  };

  const ItemList = ({ type }: { type: ItemType }) => {
    const filteredItems = items.filter((i) => i.type === type);
    return (
      <div className="space-y-4 mt-4">
        <div className="flex justify-end">
          <Button onClick={() => openNew(type)} className="bg-primary text-black hover:bg-primary/80">
            <Plus className="mr-2 h-4 w-4" /> Adicionar {type}
          </Button>
        </div>
        {filteredItems.map((item) => (
          <Card key={item.id} className="bg-card/40 border-border/50 flex flex-row items-center p-4 gap-4">
             <img src={item.imageUrl} className="w-16 h-16 object-cover rounded bg-muted" alt="" />
             <div className="flex-1">
               <h3 className="font-bold text-lg">{item.title}</h3>
               <p className="text-sm text-muted-foreground line-clamp-1">{item.description}</p>
             </div>
             <div className="flex gap-2">
               <Button variant="outline" size="icon" onClick={() => openEdit(item)}>
                 <Edit2 className="h-4 w-4" />
               </Button>
               <Button variant="destructive" size="icon" onClick={() => deleteItem(item.id)}>
                 <Trash2 className="h-4 w-4" />
               </Button>
             </div>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">Painel Admin</h1>
          <p className="text-muted-foreground">Gerencie o conteúdo do site.</p>
        </div>
        <Button variant="outline" onClick={logout} className="border-destructive text-destructive hover:bg-destructive hover:text-white">
          <LogOut className="mr-2 h-4 w-4" /> Sair
        </Button>
      </div>

      <Tabs defaultValue="news" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-muted/20">
          <TabsTrigger value="news">Novidades (Carousel)</TabsTrigger>
          <TabsTrigger value="download">Downloads</TabsTrigger>
          <TabsTrigger value="tutorial">Tutoriais</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>
        <TabsContent value="news"><ItemList type="news" /></TabsContent>
        <TabsContent value="download"><ItemList type="download" /></TabsContent>
        <TabsContent value="tutorial"><ItemList type="tutorial" /></TabsContent>
        <TabsContent value="settings">
          <div className="max-w-2xl mt-6">
             <Card className="bg-card/40 border-border/50">
               <CardHeader>
                 <CardTitle>Configurações Gerais</CardTitle>
                 <CardDescription>Gerencie links e textos globais do site.</CardDescription>
               </CardHeader>
               <form onSubmit={handleSaveSettings}>
                 <CardContent className="space-y-4">
                   <div className="space-y-2">
                     <Label>URL da Loja</Label>
                     <Input 
                       value={localSettings.shopUrl} 
                       onChange={(e) => setLocalSettings((prev) => ({ ...prev, shopUrl: e.target.value }))} 
                     />
                   </div>
                   <div className="space-y-2">
                     <Label>URL do Discord</Label>
                     <Input 
                       value={localSettings.discordUrl} 
                       onChange={(e) => setLocalSettings((prev) => ({ ...prev, discordUrl: e.target.value }))} 
                     />
                   </div>
                   <div className="space-y-2">
                     <Label>Texto do Rodapé (Sobre)</Label>
                     <Textarea 
                       value={localSettings.footerText} 
                       onChange={(e) => setLocalSettings((prev) => ({ ...prev, footerText: e.target.value }))} 
                       className="h-24"
                     />
                   </div>
                 </CardContent>
                 <div className="p-6 pt-0 flex justify-end">
                   <Button type="submit" className="bg-primary text-black hover:bg-primary/90">
                     <Save className="mr-2 h-4 w-4" /> Salvar Configurações
                   </Button>
                 </div>
               </form>
             </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-lg bg-card border-primary/20">
          <DialogHeader>
            <DialogTitle>{editingItem?.id ? "Editar Item" : "Novo Item"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Título</Label>
              <Input 
                value={editingItem?.title || ""} 
                onChange={(e) => setEditingItem(prev => ({ ...prev!, title: e.target.value }))} 
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Descrição</Label>
              <Textarea 
                value={editingItem?.description || ""} 
                onChange={(e) => setEditingItem(prev => ({ ...prev!, description: e.target.value }))} 
                required
              />
            </div>
            <div className="space-y-2">
              <Label>URL da Imagem</Label>
              <Input 
                value={editingItem?.imageUrl || ""} 
                onChange={(e) => setEditingItem(prev => ({ ...prev!, imageUrl: e.target.value }))} 
                placeholder="https://..."
                required
              />
            </div>

            {editingItem?.type === "tutorial" && (
              <>
                <div className="space-y-2">
                  <Label>URL do Vídeo (Opcional)</Label>
                  <Input 
                    value={editingItem?.videoUrl || ""} 
                    onChange={(e) => setEditingItem(prev => ({ ...prev!, videoUrl: e.target.value }))} 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Conteúdo Detalhado</Label>
                  <Textarea 
                    className="h-32"
                    value={editingItem?.content || ""} 
                    onChange={(e) => setEditingItem(prev => ({ ...prev!, content: e.target.value }))} 
                  />
                </div>
              </>
            )}

            {editingItem?.type === "download" && (
              <div className="space-y-2">
                <Label>Link de Download</Label>
                <Input 
                  value={editingItem?.downloadUrl || ""} 
                  onChange={(e) => setEditingItem(prev => ({ ...prev!, downloadUrl: e.target.value }))} 
                />
              </div>
            )}

            <div className="pt-4 flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => setIsEditOpen(false)}>Cancelar</Button>
              <Button type="submit" className="bg-primary text-black hover:bg-primary/90">Salvar</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
