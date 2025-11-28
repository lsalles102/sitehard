import React from "react";
import { Link, useLocation } from "wouter";
import { Terminal, Download, BookOpen, Settings, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  const navItems = [
    { href: "/", label: "Home", icon: Terminal },
    { href: "/downloads", label: "Downloads", icon: Download },
    { href: "/tutorials", label: "Tutoriais", icon: BookOpen },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-2">
            <Link href="/">
              <a className="flex items-center gap-2 font-display text-2xl font-bold tracking-tighter text-primary transition-colors hover:text-primary/80">
                <Terminal className="h-6 w-6" />
                HARDZERA
              </a>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a
                  className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                    location === item.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </a>
              </Link>
            ))}
          </nav>

          {/* Mobile Nav */}
          <div className="md:hidden">
            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="border-l-primary/20 bg-card/95 backdrop-blur-xl">
                 <div className="flex flex-col gap-8 mt-8">
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                      <a
                        onClick={() => setIsMobileOpen(false)}
                        className={`flex items-center gap-4 text-lg font-medium transition-colors hover:text-primary ${
                          location === item.href
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      >
                        <item.icon className="h-6 w-6" />
                        {item.label}
                      </a>
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container py-6 px-4 md:px-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 md:px-8">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by{" "}
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4 hover:text-primary"
            >
              Replit Agent
            </a>
            . &copy; 2025 Hardzera.
          </p>
        </div>
      </footer>
    </div>
  );
}
