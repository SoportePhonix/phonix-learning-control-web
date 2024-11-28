'use client';

import React from 'react';

import Link from 'next/link';

import './globals.css';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-4 text-lg">Lo sentimos, la página que buscas no existe.</p>
      <Link href="/login" className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
        Volver al inicio
      </Link>
    </div>
  );
}
