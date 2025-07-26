import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Converter from "./pages/converter";
import Support from "./pages/support";
import Terms from "./pages/terms";
import Privacy from "./pages/privacy";
import EmailSupport from "./pages/email-support";
import Feedback from "./pages/feedback";
import Community from "./pages/community";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Converter} />
      <Route path="/converter" component={Converter} />
      <Route path="/support" component={Support} />
      <Route path="/terms" component={Terms} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/email-support" component={EmailSupport} />
      <Route path="/feedback" component={Feedback} />
      <Route path="/community" component={Community} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
