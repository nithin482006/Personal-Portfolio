import { useState } from 'react';
import { Lock, LogOut, Shield, X, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminButton() {
  const { isAdmin, signIn, signUp, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const close = () => {
    setOpen(false);
    setError(null);
    setSuccess(null);
    setEmail('');
    setPassword('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setSubmitting(true);

    const err = mode === 'signin'
      ? await signIn(email, password)
      : await signUp(email, password);

    setSubmitting(false);

    if (err) {
      setError(err);
    } else if (mode === 'signup') {
      setSuccess('Account created! You can now sign in.');
      setMode('signin');
    } else {
      close();
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setOpen(false);
  };

  return (
    <>
      {/* Floating trigger */}
      <button
        onClick={() => setOpen(true)}
        title={isAdmin ? 'Admin panel' : 'Admin login'}
        className={`fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 ${
          isAdmin
            ? 'bg-teal-500 hover:bg-teal-400 text-white shadow-teal-900/30'
            : 'bg-navy-900/80 backdrop-blur-sm hover:bg-navy-800 text-slate-400 hover:text-white border border-navy-700'
        }`}
      >
        {isAdmin ? <Shield size={18} /> : <Lock size={16} />}
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={close} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-7 z-10">
            <button onClick={close} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors">
              <X size={20} />
            </button>

            {isAdmin ? (
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-4">
                  <Shield size={24} className="text-teal-600" />
                </div>
                <h2 className="font-display font-semibold text-xl text-navy-900 mb-2">Admin Mode Active</h2>
                <p className="text-slate-500 text-sm mb-6">
                  You can add, edit, and delete projects and certificates directly on the page.
                </p>
                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-red-600 border border-slate-200 hover:border-red-200 px-5 py-2.5 rounded-lg transition-colors"
                >
                  <LogOut size={15} />
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                <div className="w-12 h-12 rounded-full bg-navy-900 flex items-center justify-center mx-auto mb-5">
                  <Lock size={18} className="text-teal-400" />
                </div>
                <h2 className="font-display font-semibold text-xl text-navy-900 text-center mb-1">
                  {mode === 'signin' ? 'Admin Sign In' : 'Create Admin Account'}
                </h2>
                <p className="text-slate-500 text-sm text-center mb-6">
                  {mode === 'signin' ? 'Sign in to manage your portfolio.' : 'Set up your admin credentials.'}
                </p>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="bg-teal-50 border border-teal-200 text-teal-700 text-sm rounded-lg px-4 py-3 mb-4">
                    {success}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Password</label>
                    <div className="relative">
                      <input
                        type={showPass ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full border border-slate-200 rounded-lg px-4 py-2.5 pr-10 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass(v => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-navy-800 hover:bg-navy-700 disabled:bg-slate-300 text-white font-semibold py-3 rounded-lg text-sm transition-colors"
                  >
                    {submitting ? 'Please wait…' : mode === 'signin' ? 'Sign In' : 'Create Account'}
                  </button>
                </form>

                <p className="text-center text-sm text-slate-500 mt-5">
                  {mode === 'signin' ? (
                    <>No account?{' '}
                      <button onClick={() => { setMode('signup'); setError(null); setSuccess(null); }} className="text-teal-600 hover:underline font-medium">Create one</button>
                    </>
                  ) : (
                    <>Already have an account?{' '}
                      <button onClick={() => { setMode('signin'); setError(null); setSuccess(null); }} className="text-teal-600 hover:underline font-medium">Sign in</button>
                    </>
                  )}
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
