'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect directly to /admin which hosts the dedicated admin gate & console
    router.replace('/admin');
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-xs">
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-blue-500 animate-ping" />
        <span>Redirecting to Admin Portal...</span>
      </div>
    </div>
  );
}
