import React from "react";
import { useContent } from "@/lib/store";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Downloads() {
  const { getItemsByType } = useContent();
  const downloads = getItemsByType("download");
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredDownloads = downloads.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-display font-bold text-primary neon-text mb-2">Downloads</h1>
          <p className="text-muted-foreground">Explore nossa coleção de ferramentas e cheats.</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar downloads..." 
            className="pl-10 bg-card/50 border-primary/20 focus-visible:ring-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredDownloads.map((item) => (
          <Card key={item.id} className="bg-card/50 border-primary/20 hover:border-primary/60 transition-all group overflow-hidden flex flex-col h-[260px]">

            {/* IMAGEM FIXA ESTILO HAZE STORE */}
            <div className="relative w-full h-[120px] overflow-hidden">
              <img 
                src={item.imageUrl} 
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <span className="absolute bottom-2 left-2 text-[10px] px-2 py-0.5 bg-black/60 border border-primary/30 text-primary rounded font-mono">
                V 1.0
              </span>
            </div>

            {/* TITULO E DESCRIÇÃO */}
            <CardHeader className="px-3 pt-2 pb-0 flex-grow">
              <CardTitle className="text-sm font-bold truncate">{item.title}</CardTitle>
              <CardDescription className="text-[11px] line-clamp-2">{item.description}</CardDescription>
            </CardHeader>

            {/* BOTÃO FIXO NO RODAPÉ */}
            <CardFooter className="mt-auto pb-3 px-3">
              {item.downloadUrl ? (
                <Button 
                  asChild
                  size="sm"
                  className="w-full text-xs bg-primary/10 hover:bg-primary hover:text-black border border-primary/50 transition-all"
                >
                  <a href={item.downloadUrl} target="_blank" rel="noopener noreferrer" download>
                    <Download className="mr-2 h-3 w-3" /> Download
                  </a>
                </Button>
              ) : (
                <Button disabled size="sm" className="w-full opacity-50 text-xs">
                  Indisponível
                </Button>
              )}
            </CardFooter>

          </Card>
        ))}
      </div>

      {filteredDownloads.length === 0 && (
        <div className="text-center py-20 border border-dashed border-border rounded-xl">
          <p className="text-muted-foreground text-lg">Nenhum download encontrado.</p>
        </div>
      )}
    </div>
  );
}
