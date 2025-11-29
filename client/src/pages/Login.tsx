import React, { useState } from "react";
import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Lock, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Login() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  // Redirect if already logged in
  if (isAuthenticated) {
    setLocation("/admin");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(password);
    if (success) {
      setLocation("/admin");
    } else {
      setError(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md bg-card/50 backdrop-blur border-primary/20 shadow-[0_0_50px_rgba(0,255,157,0.1)]">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 border border-primary/30">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-display font-bold text-primary">Acesso Restrito</CardTitle>
          <CardDescription>Área administrativa do Hardzera</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive" className="bg-destructive/10 border-destructive/50 text-destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Senha incorreta. Tente novamente.
                </AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="password">Senha de Acesso</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                className="bg-background/50 border-primary/20 focus-visible:ring-primary"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-primary text-black hover:bg-primary/90 font-bold">
              Entrar no Sistema
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
