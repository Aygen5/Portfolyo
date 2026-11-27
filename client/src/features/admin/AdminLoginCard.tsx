import React, { useState } from 'react';
import { ArrowLeft, KeyRound, Lock } from 'lucide-react';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';

interface AdminLoginCardProps {
  onLogin: (secret: string) => Promise<void>;
  onBackToPortfolio: () => void;
}

export function AdminLoginCard({
  onLogin,
  onBackToPortfolio,
}: AdminLoginCardProps) {
  const [secretInput, setSecretInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!secretInput.trim()) return;
    setVerifying(true);
    setError(null);
    try {
      await onLogin(secretInput.trim());
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Invalid admin secret key.'
      );
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="max-w-md mx-auto w-full py-xl">
      <Card className="p-lg flex flex-col gap-md">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 text-light-primary dark:text-dark-primary">
            <Lock className="w-5 h-5" />
            <span className="font-label text-label-sm uppercase tracking-wider">
              Protected Studio Area
            </span>
          </div>
          <button
            type="button"
            onClick={onBackToPortfolio}
            className="inline-flex items-center gap-1 font-label text-label-sm text-light-on-surface-muted dark:text-dark-on-surface-muted hover:text-light-on-surface dark:hover:text-dark-on-surface"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
        </div>

        <div>
          <h1 className="font-display text-headline-lg text-light-on-surface dark:text-dark-on-surface">
            Admin Console
          </h1>
          <p className="font-body text-body-sm text-light-on-surface-muted dark:text-dark-on-surface-muted mt-1">
            Enter your <code className="font-label">ADMIN_SECRET</code> to read direct messages, publish new projects or dev notes, and moderate the guestbook.
          </p>
        </div>

        {error && (
          <div className="rounded bg-terracotta/15 border border-terracotta px-sm py-xs font-body text-body-sm text-terracotta">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-sm">
          <div>
            <label
              htmlFor="admin-secret-input"
              className="block font-label text-label-sm text-light-on-surface-muted dark:text-dark-on-surface-muted mb-1"
            >
              Admin Secret Key
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-light-on-surface-muted dark:text-dark-on-surface-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="admin-secret-input"
                type="password"
                required
                placeholder="Enter ADMIN_SECRET..."
                value={secretInput}
                onChange={(e) => setSecretInput(e.target.value)}
                className="w-full rounded bg-light-surface dark:bg-dark-surface border border-light-outline dark:border-dark-outline pl-9 pr-sm py-sm font-label text-body-sm text-light-on-surface dark:text-dark-on-surface focus:outline-none focus:border-light-primary dark:focus:border-dark-primary"
              />
            </div>
          </div>

          <Button type="submit" variant="primary" disabled={verifying}>
            {verifying ? 'Verifying Credentials...' : 'Unlock Admin Console'}
          </Button>
        </form>
      </Card>
    </div>
  );
}
