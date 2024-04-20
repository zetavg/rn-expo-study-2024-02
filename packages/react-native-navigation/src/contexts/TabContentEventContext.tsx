import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { useRoute } from '@react-navigation/native';

import { TabContentEventSenderRef } from '../types';

type EventHandler = (payload?: unknown) => void;

type TabContentEventContextValue = {
  eventListeners: Map<string, EventHandler>;
  eventListenerIdsRef: React.MutableRefObject<string[]>;
};

/**
 * A context that is used to send custom events to components in a specific tab.
 */
export const TabContentEventContext = createContext<
  TabContentEventContextValue | undefined
>(undefined);

export function TabContentEventContextProvider({
  eventSenderRef,
  children,
}: {
  /** Pass in a ref object that can hold the event sender function, and it will be populated with this provider component. */
  eventSenderRef: TabContentEventSenderRef;
  children: React.ReactNode;
}) {
  const eventListenerIdsRef = useRef<string[]>([]);

  const eventListeners = useRef(new Map<string, EventHandler>()).current;

  const contextValue = useMemo(
    () => ({ eventListeners, eventListenerIdsRef }),
    [eventListenerIdsRef, eventListeners],
  );

  const sendEventToLastRegisteredHandler = useCallback(
    (payload?: unknown) => {
      const eventListenerId =
        eventListenerIdsRef.current[eventListenerIdsRef.current.length - 1];
      if (!eventListenerId) return;

      const eventListener = eventListeners.get(eventListenerId);
      if (!eventListener) return;

      eventListener(payload);
    },
    [eventListeners],
  );

  eventSenderRef.current = sendEventToLastRegisteredHandler;

  return (
    <TabContentEventContext.Provider value={contextValue}>
      {children}
    </TabContentEventContext.Provider>
  );
}

/**
 * Registers an event handler to be called when an event is sent to the current tab.
 *
 * To deregister the event handler, pass `null` as the first argument.
 *
 * Example usage:
 * ```tsx
 * // In a screen component
 * useTabContentEventHandler(
 *   useCallback((payload: unknown) => {
 *     console.log(`Event received. Payload: ${JSON.stringify(payload)}`);
 *   }, []),
 * );
 * ```
 */
export function useTabContentEventHandler(
  fn: EventHandler | null,
  { ignoreNoContext }: { ignoreNoContext?: boolean } = {},
) {
  const contextValue = useContext(TabContentEventContext);
  const route = useRoute();
  const key = route.key;

  if (!contextValue) {
    if (__DEV__ && !ignoreNoContext) {
      let message =
        'useTabContentEventHandler: Failed to register the event handler. Cannot get context value.';

      message += '\n\nIs your screen inside a tab navigator?';

      message +=
        "\n\nThis is a development-only warning and won't be shown in production.";

      console.warn(message);
    }
  }

  const { eventListeners, eventListenerIdsRef } = contextValue || {};
  const eventListenersRef = useRef(eventListeners);
  eventListenersRef.current = eventListeners;

  useEffect(() => {
    if (!eventListenerIdsRef) return;
    if (!eventListenersRef.current) return;
    if (!fn) return;

    if (!eventListenersRef.current.has(key)) {
      eventListenerIdsRef.current.push(key);
    }

    eventListenersRef.current.set(key, fn);

    const unsubscribe = () => {
      eventListenersRef.current?.delete(key);
      eventListenerIdsRef.current = eventListenerIdsRef.current.filter(
        (k) => k !== key,
      );
    };

    return unsubscribe;
  }, [eventListenerIdsRef, fn, key]);
}
