import React from "react";
import { useContent } from "@/lib/store";
import HeroCarousel from "@/components/HeroCarousel";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, BookOpen } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { getItemsByType, items } = useContent();
  const newsItems = getItemsByType("news");
  
  // Get latest 3 items that are NOT news for the "Recent Additions" section
  const recentItems = items
    .filter(item => item.type !== "news")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-12">
      <section>
        <HeroCarousel items={newsItems} />
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-display font-bold text-primary neon-text">
            Novidades Recentes
          </h2>
          <Link href="/downloads">
            <Button variant="ghost" className="text-primary hover:text-primary/80">
              Ver tudo <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentItems.map((item) => (
            <Card key={item.id} className="bg-card/50 border-primary/20 hover:border-primary/60 transition-all group overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors z-10" />
                <img 
                  src={item.imageUrl} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <Badge className="absolute top-2 right-2 z-20 bg-black/80 text-primary border-primary/50 backdrop-blur">
                  {item.type === 'download' ? 'Download' : 'Tutorial'}
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="font-display text-xl group-hover:text-primary transition-colors">
                  {item.title}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href={item.type === 'download' ? '/downloads' : '/tutorials'}>
                  <Button className="w-full group-hover:bg-primary group-hover:text-black transition-colors">
                    {item.type === 'download' ? (
                      <><Download className="mr-2 h-4 w-4" /> Baixar Agora</>
                    ) : (
                      <><BookOpen className="mr-2 h-4 w-4" /> Ler Tutorial</>
                    )}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-primary/5 border border-primary/20 rounded-2xl p-8 md:p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
              Participe da Comunidade
            </h2>
            <p className="text-muted-foreground text-lg">
              Entre no nosso Discord e fique por dentro das últimas novidades, sorteios e suporte em tempo real.
            </p>
          </div>
          <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-6 text-lg shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all hover:scale-105">
            Entrar no Discord
          </Button>
        </div>
      </section>
    </div>
  );
}
