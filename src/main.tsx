import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store';
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from './lib/queryClient.ts';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
      <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
)
