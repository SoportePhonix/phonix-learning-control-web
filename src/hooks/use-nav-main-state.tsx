import { useCallback, useEffect, useMemo, useState } from 'react';

import { usePathname } from 'next/navigation';

interface NavMainItem {
  title: string;
  url: string;
  items?: {
    title: string;
    url: string;
  }[];
}

interface NavMainStateHook {
  isOpen: boolean;
  hasActiveRoute: boolean;
  closedManually: boolean;
  activeItemUrl: string | null;
  toggleMenu: () => void;
  openMenu: () => void;
  closeMenu: () => void;
}

/**
 * Hook para manejar el estado del menú desplegable NavMain
 *
 * Estados posibles:
 * 1. Abierto con ruta activa: isOpen=true, hasActiveRoute=true, closedManually=false
 * 2. Cerrado manualmente con ruta activa: isOpen=false, hasActiveRoute=true, closedManually=true
 * 3. Cerrado sin ruta activa: isOpen=false, hasActiveRoute=false, closedManually=false
 *
 * Lógica:
 * - Si la ruta activa está dentro del menú → hasActiveRoute=true
 * - Si el usuario cierra manualmente → closedManually=true, isOpen=false
 * - Si navega fuera del menú → reset todo a false
 * - Si navega dentro del menú → mantiene el estado de apertura/cierre
 */
export function useNavMainState(menuItem: NavMainItem): NavMainStateHook {
  const pathname = usePathname();
  const [manuallyOpen, setManuallyOpen] = useState(false);

  // Determinar si hay una ruta activa dentro de este menú
  const hasActive = useMemo(() => {
    if (!menuItem.items) return false;

    // Verificar si la URL del menú padre está activa
    if (pathname.startsWith(menuItem.url)) return true;

    // Verificar si alguna de las URLs de los sub-items está activa
    return menuItem.items.some((item) => pathname.startsWith(item.url));
  }, [pathname, menuItem]);

  // Determinar qué sub-item está activo
  const activeUrl = useMemo(() => {
    if (!hasActive || !menuItem.items) return null;

    // Encontrar el sub-item cuya URL coincide con el pathname
    const activeItem = menuItem.items.find((item) => pathname.startsWith(item.url));
    return activeItem?.url || null;
  }, [hasActive, pathname, menuItem.items]);

  // Determinar si el menú debe estar abierto
  // Si hay ruta activa → abierto (a menos que manuallyOpen sea false)
  // Si no hay ruta activa → usar manuallyOpen
  const isOpen = hasActive ? manuallyOpen !== false : manuallyOpen;
  const closedManually = hasActive && !isOpen;

  // Reset del estado cuando cambia la ruta
  useEffect(() => {
    if (hasActive) {
      // Si entramos a una ruta del menú, abrir automáticamente
      setManuallyOpen(true);
    } else {
      // Si salimos del menú, resetear
      setManuallyOpen(false);
    }
  }, [hasActive]);

  // Funciones de control
  const toggleMenu = useCallback(() => {
    setManuallyOpen((prev) => !prev);
  }, [hasActive, manuallyOpen, isOpen]);

  const openMenu = useCallback(() => {
    setManuallyOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setManuallyOpen(false);
  }, []);

  return {
    isOpen,
    hasActiveRoute: hasActive,
    closedManually,
    activeItemUrl: activeUrl,
    toggleMenu,
    openMenu,
    closeMenu,
  };
}
