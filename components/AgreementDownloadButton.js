import { Download, Loader2 } from 'lucide-react';
import { useState } from 'react';

/**
 * Downloads a Celestial-branded project agreement PDF for the given form snapshot.
 */
export default function AgreementDownloadButton({
  agreementData,
  className = '',
  label = 'Download project agreement (PDF)',
  variant = 'primary',
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDownload = async () => {
    if (!agreementData) return;
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/client-agreement-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(agreementData),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Could not generate agreement');
      }

      const blob = await response.blob();
      const disposition = response.headers.get('Content-Disposition') || '';
      const match = disposition.match(/filename="([^"]+)"/);
      const filename = match?.[1] || 'Celestial-Project-Agreement.pdf';
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message || 'Download failed');
    } finally {
      setLoading(false);
    }
  };

  const base =
    variant === 'light'
      ? 'inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/80 bg-transparent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 disabled:opacity-60'
      : 'inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:from-orange-600 hover:to-orange-700 disabled:opacity-60';

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleDownload}
        disabled={loading || !agreementData}
        className={`${base} ${className}`}
        style={{ fontFamily: 'Albert Sans, sans-serif' }}
      >
        {loading ? <Loader2 size={16} className="animate-spin" aria-hidden /> : <Download size={16} aria-hidden />}
        {loading ? 'Preparing PDF…' : label}
      </button>
      {error ? (
        <p className="text-xs text-red-500" style={{ fontFamily: 'Albert Sans, sans-serif' }}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
