import { Outlet } from '@tanstack/react-router';

export default function App() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Rick & Morty Characters</h1>
      <Outlet /> 
    </div>
  );
}
