import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Search from './pages/Search.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SingleMovie from './pages/SingleMovie.tsx';

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "search/:query",
    element: <Search />,
  },
  {
    path: "movie/:id",
    element: <SingleMovie />,
  },
]);



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />

    </QueryClientProvider>

  </React.StrictMode>,
)
