import { QueryClient, QueryClientProvider } from "react-query";

import useLocation from "./hooks/useLocation";

import Home from "./Home";

const queryClient = new QueryClient();

export default function App() {
  const location = useLocation();
  console.log({ location });

  return (
    <QueryClientProvider client={queryClient}>
      <Home location={location} />
    </QueryClientProvider>
  );
}
