'use client';

const isDev = process.env.NODE_ENV === 'development';

export function DevLanguageReset() {
  if (!isDev) {
    return null;
  }

  const handleReset = () => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.removeItem('language');
    window.location.reload();
  };

  return (
    <button
      type="button"
      onClick={handleReset}
      className="fixed bottom-4 right-20 z-50 text-xs text-red-500/50 hover:text-red-500 transition-colors"
    >
      Reset Lang
    </button>
  );
}


