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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDownloads.map((item) => (
          <Card key={item.id} className="bg-card/50 border-primary/20 hover:border-primary/60 transition-all group overflow-hidden flex flex-col">
            <div className="relative h-20 overflow-hidden bg-black/30 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <img 
                src={item.imageUrl} 
                alt={item.title}
                className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-2 left-2 z-20">
                <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20 backdrop-blur">
                  V 1.0
                </span>
              </div>
            </div>
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-xl">{item.title}</CardTitle>
              <CardDescription className="line-clamp-2 text-sm">{item.description}</CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto pt-4">
              {item.downloadUrl ? (
                <Button 
                  asChild
                  className="w-full bg-primary/10 hover:bg-primary hover:text-black text-primary border border-primary/50 transition-all shadow-[0_0_15px_rgba(0,255,157,0.1)] hover:shadow-[0_0_25px_rgba(0,255,157,0.4)]"
                >
                  <a 
                    href={item.downloadUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    download
                  >
                    <Download className="mr-2 h-4 w-4" /> Download Seguro
                  </a>
                </Button>
              ) : (
                <Button 
                  disabled
                  className="w-full bg-primary/10 hover:bg-primary hover:text-black text-primary border border-primary/50 transition-all shadow-[0_0_15px_rgba(0,255,157,0.1)] hover:shadow-[0_0_25px_rgba(0,255,157,0.4)] opacity-50 cursor-not-allowed"
                >
                  <Download className="mr-2 h-4 w-4" /> Download Indisponível
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
