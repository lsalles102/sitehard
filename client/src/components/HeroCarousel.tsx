import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Item } from "@/lib/store";

interface HeroCarouselProps {
  items: Item[];
}

export default function HeroCarousel({ items }: HeroCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (items.length === 0) return null;

  return (
    <div className="relative group overflow-hidden rounded-xl border border-primary/20 shadow-[0_0_30px_rgba(0,255,157,0.1)]">
      <div className="embla" ref={emblaRef}>
        <div className="flex h-[400px] md:h-[500px]">
          {items.map((item) => (
            <div className="flex-[0_0_100%] min-w-0 relative" key={item.id}>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-10" />
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 z-20 p-6 md:p-12 w-full md:w-2/3">
                <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-black uppercase bg-primary rounded-full">
                  Destaque
                </span>
                <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-white drop-shadow-lg">
                  {item.title}
                </h2>
                <p className="text-lg text-gray-200 mb-6 line-clamp-2 drop-shadow-md">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-background/50 backdrop-blur border-primary/30 hover:bg-primary hover:text-black transition-all opacity-0 group-hover:opacity-100"
        onClick={scrollPrev}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-background/50 backdrop-blur border-primary/30 hover:bg-primary hover:text-black transition-all opacity-0 group-hover:opacity-100"
        onClick={scrollNext}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  );
}
