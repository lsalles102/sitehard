import React from "react";
import { useContent } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, FileText } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { VideoPlayer } from "@/components/VideoPlayer";

export default function Tutorials() {
  const { getItemsByType } = useContent();
  const tutorials = getItemsByType("tutorial");

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="text-4xl font-display font-bold text-primary neon-text mb-2">Tutoriais</h1>
        <p className="text-muted-foreground">Aprenda a usar e configurar suas ferramentas.</p>
      </div>

      <div className="space-y-4">
        {tutorials.map((item) => (
          <Dialog key={item.id}>
            <DialogTrigger asChild>
              <Card className="bg-card/50 border-primary/10 hover:border-primary/40 transition-all cursor-pointer group overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-64 h-48 md:h-auto relative shrink-0">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {item.videoUrl && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
                        <PlayCircle className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 drop-shadow-lg" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 p-6 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-secondary uppercase tracking-wider">
                        {item.videoUrl ? "Vídeo Aula" : "Artigo"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(item.date).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-2xl font-display font-bold mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] bg-card/95 backdrop-blur-xl border-primary/20">
              <DialogHeader>
                <DialogTitle className="text-2xl font-display font-bold text-primary">{item.title}</DialogTitle>
                <DialogDescription>{item.description}</DialogDescription>
              </DialogHeader>
              <ScrollArea className="h-[60vh] mt-4 pr-4">
                <div className="space-y-6">
                  {item.videoUrl && (
                    <VideoPlayer url={item.videoUrl} />
                  )}
                  
                  <div className="prose prose-invert max-w-none">
                    <p className="text-foreground/90 leading-relaxed whitespace-pre-line">
                      {item.content || "Conteúdo do tutorial..."}
                    </p>
                  </div>
                  
                  {item.imageUrl && !item.videoUrl && (
                    <img src={item.imageUrl} alt={item.title} className="rounded-lg w-full border border-border/50" />
                  )}
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
