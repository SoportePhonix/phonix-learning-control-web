'use client';

import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

export interface AppConfig {
  // URLs Base
  baseUrl: string;
  apiUrl: string;
  apiAdminUrl: string;
  nextAuthUrl: string;

  // Logos
  logoNavbar: string;
  logoLogin: string;
  logoLoginMobile: string;

  // Recursos
  apiForResources: string;

  // Configuración
  informationIcon: boolean;
  informationIconEmail: string;

  // Configuración de presentación
  presentationMode: boolean;

  // Logging
  logLevel: string;
  useSilentLogger: boolean;
  disableConsoleLogging: boolean;

  // Protocolo y Hostname
  protocol: string;
  hostnameClient: string;
  hostnameServer: string;
}

// Valores por defecto (fallback si falla el fetch)
const DEFAULT_CONFIG: AppConfig = {
  baseUrl: '',
  apiUrl: '',
  apiAdminUrl: '',
  nextAuthUrl: '',
  logoNavbar: '',
  logoLogin: '',
  logoLoginMobile: '',
  apiForResources: '',
  informationIcon: false,
  informationIconEmail: '',
  presentationMode: false, // Valor por defecto conservador
  logLevel: 'info',
  useSilentLogger: false,
  disableConsoleLogging: false,
  protocol: 'http',
  hostnameClient: '',
  hostnameServer: '',
};

export interface AppConfigContext {
  config: AppConfig;
  isLoading: boolean;
}

const ConfigContext = createContext<AppConfigContext>({
  config: DEFAULT_CONFIG,
  isLoading: true,
});

interface ConfigProviderProps {
  children: ReactNode;
}

export function ConfigProvider({ children }: ConfigProviderProps) {
  const [config, setConfig] = useState<AppConfig>(DEFAULT_CONFIG);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch de /api/config al montar
    fetch('/api/config', {
      headers: { Accept: 'application/json' },
      credentials: 'same-origin',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch config');
        return res.json();
      })
      .then((data) => {
        setConfig(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error loading config:', err);
        setIsLoading(false);
        // Mantener valores por defecto
      });
  }, []);

  return <ConfigContext.Provider value={{ config, isLoading }}>{children}</ConfigContext.Provider>;
}

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within ConfigProvider');
  }
  return context.config;
};

export const useConfigWithLoading = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfigWithLoading must be used within ConfigProvider');
  }
  return context;
};
