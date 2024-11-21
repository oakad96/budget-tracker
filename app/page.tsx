import { Navbar } from '@/components/navbar';
import { Dashboard } from '@/components/dashboard';
import { StoreProvider } from '@/lib/store';

export default function Home() {
  return (
    <StoreProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Dashboard />
        </main>
      </div>
    </StoreProvider>
  );
}