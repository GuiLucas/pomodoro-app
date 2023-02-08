import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from '@mantine/core';
import './index.css'
import { Auth0ProviderWithNavigate } from './providers';
import { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: 'dark' }}
    >
      <BrowserRouter>
        <Auth0ProviderWithNavigate>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </Auth0ProviderWithNavigate>
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>
)
