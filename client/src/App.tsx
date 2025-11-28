import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Layout from "@/components/Layout";
import { ContentProvider } from "@/lib/store";
import { AuthProvider } from "@/lib/auth";
import Home from "@/pages/Home";
import Downloads from "@/pages/Downloads";
import Tutorials from "@/pages/Tutorials";
import Admin from "@/pages/Admin";
import Login from "@/pages/Login";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/downloads" component={Downloads} />
        <Route path="/tutorials" component={Tutorials} />
        <Route path="/admin" component={Admin} />
        <Route path="/login" component={Login} />
        <Route path="/terms" component={Terms} />
        <Route path="/privacy" component={Privacy} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ContentProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ContentProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
