import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Layout from "@/components/Layout";
import { ContentProvider } from "@/lib/store";
import Home from "@/pages/Home";
import Downloads from "@/pages/Downloads";
import Tutorials from "@/pages/Tutorials";
import Admin from "@/pages/Admin";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/downloads" component={Downloads} />
        <Route path="/tutorials" component={Tutorials} />
        <Route path="/admin" component={Admin} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ContentProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ContentProvider>
    </QueryClientProvider>
  );
}

export default App;
