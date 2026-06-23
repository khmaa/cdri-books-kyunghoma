import BookSearchPage from '@/pages/BookSearchPage';
import FavoritesPage from '@/pages/FavoritesPage';
import { Header } from '@/shared/ui/Header';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router';

function Layout() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-[960px] px-6 py-10">
        <Outlet />
      </main>
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <BookSearchPage /> },
      { path: '/favorites', element: <FavoritesPage /> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
