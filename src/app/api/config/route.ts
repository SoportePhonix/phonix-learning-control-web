import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    // URLs Base
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || '',
    apiUrl: process.env.API_URL || '',
    apiAdminUrl: process.env.API_ADMIN_URL || '',
    nextAuthUrl: process.env.NEXTAUTH_URL || '',

    // Logos (URLs completas)
    logoNavbar: process.env.LOGO_NAVBAR || '',
    logoLogin: process.env.LOGO_LOGIN || '',
    logoLoginMobile: process.env.LOGO_LOGIN_MOBILE || '',

    // Recursos
    apiForResources: process.env.API_RESOURCES || '',

    // Configuración de información
    informationIcon: process.env.NEXT_PUBLIC_INFORMATION_ICON === 'true',
    informationIconEmail: process.env.NEXT_PUBLIC_INFORMATION_ICON_EMAIL || '',

    // Logging
    logLevel: process.env.NEXT_PUBLIC_LOG_LEVEL || 'info',
    useSilentLogger: process.env.NEXT_PUBLIC_USE_SILENT_LOGGER === 'true',
    disableConsoleLogging: process.env.NEXT_PUBLIC_DISABLE_CONSOLE_LOGGING === 'true',

    // Configuración de protocolo y hostname
    protocol: process.env.PROTOCOL || 'http',
    hostnameClient: process.env.HOSTNAME_CLIENT || '',
    hostnameServer: process.env.HOSTNAME_SERVER || '',
  });
}
