'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode, createContext, useCallback, useContext, useMemo, useReducer } from 'react';

interface RtkRequestsContextData {
  findDataRequested: (key: string) => Record<string, string | number>;
  updateDataRequested: (key: string, data: Record<string, string | number>) => void;
}

const rtkRequestsReducer = (state: Record<string, Record<string, string | number>>, action: any) => {
  switch (action.type) {
    case 'UPDATE_REQUEST':
      return { ...state, [action.key]: action.data };
    default:
      return state;
  }
};

const RtkRequestsContext = createContext<RtkRequestsContextData>({} as RtkRequestsContextData);

const RtkRequestsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(rtkRequestsReducer, {});

  const findDataRequested = useCallback((key: string): Record<string, string | number> => state[key] ?? {}, [state]);

  const updateDataRequested = useCallback((key: string, data: Record<string, string | number>) => {
    dispatch({ type: 'UPDATE_REQUEST', key, data });
  }, []);

  const providerValue = useMemo(
    () => ({
      findDataRequested,
      updateDataRequested,
    }),
    [findDataRequested, updateDataRequested]
  );

  return <RtkRequestsContext.Provider value={providerValue}>{children}</RtkRequestsContext.Provider>;
};

const useRtkRequestsContext = () => useContext(RtkRequestsContext);

export { RtkRequestsProvider, useRtkRequestsContext };
