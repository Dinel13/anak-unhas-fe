import { createContext, Dispatch, SetStateAction, useCallback, useContext, useState } from 'react';

const AppContext = createContext<any>(null);

export function AppWrapper({ children } : { children: React.ReactNode }) {
  const [socket, setSocket ] = useState<WebSocket | null>(null);

  return (
    <AppContext.Provider value={[socket, setSocket ]}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const [socket, setSocket]: [WebSocket, Dispatch<SetStateAction<WebSocket | null>>] = useContext(AppContext);

  const CloseSocket = useCallback(() => {
    socket?.close();
  }, [socket]);

  return {socket, setSocket, CloseSocket};
}