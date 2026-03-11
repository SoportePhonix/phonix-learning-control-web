'use client';

import React from 'react';

import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <h1 className="text-6xl font-bold">403</h1>
      <p className="mt-4 text-lg">No tienes permisos para acceder a esta página</p>
      <Link href="/home" className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
        Volver al inicio
      </Link>
    </div>
  );
}
