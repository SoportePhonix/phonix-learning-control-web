'use client';

import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';

import { usePathname, useSearchParams } from 'next/navigation';

export interface SelectedCompany {
  id: number;
  name?: string;
}

interface SelectedCompanyContextProps {
  selectedCompany: SelectedCompany | null;
  setSelectedCompany: (company: SelectedCompany | null) => void;
  clearSelectedCompany: () => void;
  isCompanySelected: boolean;
  isInitialized: boolean;
}

const STORAGE_KEY = 'selectedCompany';
const MANAGE_COMPANIES_PATH = '/manage-companies';

const SelectedCompanyContext = createContext<SelectedCompanyContextProps | undefined>(undefined);

// Helpers para localStorage
const saveToStorage = (company: SelectedCompany) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(company));
};

const loadFromStorage = (): SelectedCompany | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && typeof parsed.id === 'number') {
        return parsed;
      }
    }
  } catch {
    // Si hay error de parseo, limpiar
    localStorage.removeItem(STORAGE_KEY);
  }
  return null;
};

const clearStorage = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const SelectedCompanyProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCompany, setSelectedCompanyState] = useState<SelectedCompany | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Cargar empresa desde localStorage o URL al iniciar
  useEffect(() => {
    const companyIdFromUrl = searchParams.get('companyId');

    if (companyIdFromUrl) {
      // Priorizar el companyId de la URL
      const companyId = parseInt(companyIdFromUrl, 10);
      if (!isNaN(companyId)) {
        // Mantener el nombre existente si el ID coincide
        const stored = loadFromStorage();
        const name = stored?.id === companyId ? stored.name : undefined;
        const company = { id: companyId, name };
        setSelectedCompanyState(company);
        saveToStorage(company);
      }
    } else if (!isInitialized) {
      // Cargar desde localStorage siempre al inicializar (para mostrar en sidebar)
      const stored = loadFromStorage();
      if (stored) {
        setSelectedCompanyState(stored);
      }
    }
    setIsInitialized(true);
  }, [searchParams, isInitialized]);

  // Limpiar contexto cuando el usuario sale del módulo manage-companies
  useEffect(() => {
    if (!pathname.startsWith(MANAGE_COMPANIES_PATH)) {
      // Limpiar cuando sale del módulo
      setSelectedCompanyState(null);
      clearStorage();
    }
  }, [pathname]);

  const setSelectedCompany = useCallback((company: SelectedCompany | null) => {
    setSelectedCompanyState(company);
    if (company) {
      saveToStorage(company);
    } else {
      clearStorage();
    }
  }, []);

  const clearSelectedCompany = useCallback(() => {
    setSelectedCompanyState(null);
    clearStorage();
  }, []);

  const isCompanySelected = selectedCompany !== null;

  return (
    <SelectedCompanyContext.Provider
      value={{
        selectedCompany,
        setSelectedCompany,
        clearSelectedCompany,
        isCompanySelected,
        isInitialized,
      }}
    >
      {children}
    </SelectedCompanyContext.Provider>
  );
};

export const useSelectedCompany = () => {
  const context = useContext(SelectedCompanyContext);
  if (!context) {
    throw new Error('useSelectedCompany debe usarse dentro de SelectedCompanyProvider');
  }
  return context;
};
