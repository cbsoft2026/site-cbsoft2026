'use client';
import { createContext, useContext } from 'react';

export const MessagesContext = createContext<any>(null);

export function useMessagesContext() {
  const context = useContext(MessagesContext);
  if (!context) throw new Error('MessagesContext not provided');
  return context;
}
