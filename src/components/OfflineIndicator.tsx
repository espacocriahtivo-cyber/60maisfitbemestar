import React from 'react';
import { useOnlineStatus } from '../hooks/usePWAInstall';
import { WifiOff } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-xl bg-amber-500/90 border border-amber-300 text-black px-3.5 py-2 text-xs font-bold shadow-xl backdrop-blur-sm animate-pulse">
      <WifiOff className="w-4 h-4 text-black" />
      <span>Modo Offline — Treinos e dados em cache disponíveis.</span>
    </div>
  );
};
