import React from "react";

interface VideoPlayerProps {
  url: string;
  className?: string;
}

type VideoType = "youtube" | "vimeo" | "direct" | "unknown";

/**
 * Extrai o ID do vídeo do YouTube a partir de diferentes formatos de URL
 */
function getYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

/**
 * Extrai o ID do vídeo do Vimeo a partir da URL
 */
function getVimeoVideoId(url: string): string | null {
  const patterns = [
    /vimeo\.com\/(\d+)/,
    /player\.vimeo\.com\/video\/(\d+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

/**
 * Detecta o tipo de vídeo baseado na URL
 */
function detectVideoType(url: string): VideoType {
  if (!url) return "unknown";

  const lowerUrl = url.toLowerCase();

  if (lowerUrl.includes("youtube.com") || lowerUrl.includes("youtu.be")) {
    return "youtube";
  }

  if (lowerUrl.includes("vimeo.com")) {
    return "vimeo";
  }

  // Verifica se é um arquivo de vídeo direto
  const videoExtensions = [".mp4", ".webm", ".ogg", ".ogv", ".mov", ".m4v", ".avi"];
  const hasVideoExtension = videoExtensions.some(ext => lowerUrl.includes(ext));
  
  if (hasVideoExtension || lowerUrl.startsWith("http") && !lowerUrl.includes("youtube") && !lowerUrl.includes("vimeo")) {
    // Assume que URLs HTTP/HTTPS sem YouTube/Vimeo podem ser vídeos diretos
    return "direct";
  }

  return "unknown";
}

export function VideoPlayer({ url, className = "" }: VideoPlayerProps) {
  const videoType = detectVideoType(url);

  if (videoType === "youtube") {
    const videoId = getYouTubeVideoId(url);
    if (!videoId) {
      return (
        <div className={`aspect-video w-full bg-black rounded-lg overflow-hidden border border-border/50 flex items-center justify-center ${className}`}>
          <p className="text-muted-foreground">URL do YouTube inválida</p>
        </div>
      );
    }

    return (
      <div className={`aspect-video w-full bg-black rounded-lg overflow-hidden border border-border/50 ${className}`}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    );
  }

  if (videoType === "vimeo") {
    const videoId = getVimeoVideoId(url);
    if (!videoId) {
      return (
        <div className={`aspect-video w-full bg-black rounded-lg overflow-hidden border border-border/50 flex items-center justify-center ${className}`}>
          <p className="text-muted-foreground">URL do Vimeo inválida</p>
        </div>
      );
    }

    return (
      <div className={`aspect-video w-full bg-black rounded-lg overflow-hidden border border-border/50 ${className}`}>
        <iframe
          src={`https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0`}
          title="Vimeo video player"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    );
  }

  if (videoType === "direct") {
    return (
      <div className={`aspect-video w-full bg-black rounded-lg overflow-hidden border border-border/50 ${className}`}>
        <video
          src={url}
          controls
          className="w-full h-full"
          preload="metadata"
        >
          Seu navegador não suporta a reprodução de vídeo.
          <a href={url} download>Baixar vídeo</a>
        </video>
      </div>
    );
  }

  // Tipo desconhecido - tenta renderizar como iframe genérico ou mostra erro
  return (
    <div className={`aspect-video w-full bg-black rounded-lg overflow-hidden border border-border/50 flex items-center justify-center ${className}`}>
      <div className="text-center p-4">
        <p className="text-muted-foreground mb-2">Formato de vídeo não suportado</p>
        <p className="text-xs text-muted-foreground/70 break-all">{url}</p>
        <p className="text-xs text-muted-foreground/70 mt-2">
          Formatos suportados: YouTube, Vimeo, MP4, WebM, OGG
        </p>
      </div>
    </div>
  );
}

