import React, { useState, useEffect } from 'react';
import { 
  X, 
  Database, 
  LogIn, 
  LogOut, 
  MessageCircle, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  User, 
  Phone, 
  RefreshCw,
  Shield,
  Layers,
  Mail,
  Lock,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut, 
  onAuthStateChanged, 
  User as FirebaseUser 
} from 'firebase/auth';
import { 
  collection, 
  query, 
  orderBy, 
  limit, 
  onSnapshot, 
  doc, 
  updateDoc 
} from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '../firebase.ts';
import { EnquiryRecord, CustomCakeRecord } from '../services/dbService.ts';

interface AdminInboxModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminInboxModal: React.FC<AdminInboxModalProps> = ({ isOpen, onClose }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'enquiries' | 'custom_cakes'>('enquiries');
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>([]);
  const [customRequests, setCustomRequests] = useState<CustomCakeRecord[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Blank email & password state (no auto-provided credentials)
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isOpen || !user) return;

    setLoadingData(true);
    setErrorMessage(null);

    // Live listener for enquiries
    const enqQuery = query(collection(db, 'enquiries'), orderBy('createdAt', 'desc'), limit(30));
    const unsubEnq = onSnapshot(
      enqQuery,
      (snapshot) => {
        const list = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        })) as EnquiryRecord[];
        setEnquiries(list);
        setLoadingData(false);
      },
      (error) => {
        setErrorMessage('Access restricted to verified bakery administrator or sign-in required.');
        setLoadingData(false);
        try {
          handleFirestoreError(error, OperationType.GET, 'enquiries');
        } catch (e) {
          console.error(e);
        }
      }
    );

    // Live listener for custom cake requests
    const cakeQuery = query(collection(db, 'custom_cake_requests'), orderBy('createdAt', 'desc'), limit(30));
    const unsubCake = onSnapshot(
      cakeQuery,
      (snapshot) => {
        const list = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        })) as CustomCakeRecord[];
        setCustomRequests(list);
      },
      (error) => {
        try {
          handleFirestoreError(error, OperationType.GET, 'custom_cake_requests');
        } catch (e) {
          console.error(e);
        }
      }
    );

    return () => {
      unsubEnq();
      unsubCake();
    };
  }, [isOpen, user]);

  if (!isOpen) return null;

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim() || !passwordInput) return;
    setIsSigningIn(true);
    setErrorMessage(null);

    try {
      // First attempt to sign in with provided credentials
      await signInWithEmailAndPassword(auth, emailInput.trim(), passwordInput);
    } catch (err: any) {
      console.warn('Sign-in attempt failed, checking for account creation:', err);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        // Try creating account if not already registered
        try {
          await createUserWithEmailAndPassword(auth, emailInput.trim(), passwordInput);
        } catch (createErr: any) {
          if (createErr.code === 'auth/operation-not-allowed') {
            setErrorMessage(
              'Email/Password provider is not yet enabled in your Firebase Console. Please enable "Email/Password" in Firebase Console > Authentication > Sign-in method.'
            );
          } else {
            setErrorMessage(createErr.message || 'Invalid email or password.');
          }
        }
      } else if (err.code === 'auth/operation-not-allowed') {
        setErrorMessage(
          'Email/Password provider is not yet enabled in your Firebase Console. Please enable "Email/Password" in Firebase Console > Authentication > Sign-in method.'
        );
      } else {
        setErrorMessage(err.message || 'Invalid email or password.');
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: EnquiryRecord['status']) => {
    try {
      const docRef = doc(db, 'enquiries', id);
      await updateDoc(docRef, { status: newStatus });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `enquiries/${id}`);
    }
  };

  const replyViaWhatsApp = (phone: string, name: string, req: string) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const msg = encodeURIComponent(`Hi ${name}, this is The CUPnCAKE Factory regarding your enquiry: "${req}". We'd love to assist you!`);
    window.open(`https://wa.me/${cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone}?text=${msg}`, '_blank');
  };

  const renderContent = () => {
    if (loadingData) {
      return (
        <div className="text-center py-12 text-sm text-[#7A6961]">
          Loading bakery records from Firestore...
        </div>
      );
    }

    if (activeTab === 'enquiries') {
      if (enquiries.length === 0) {
        return (
          <div className="text-center py-12 text-sm text-[#7A6961]">
            No enquiries in Firestore yet. Submit a test enquiry via the contact form!
          </div>
        );
      }

      return (
        <div className="space-y-4">
          {enquiries.map((enq) => (
            <div
              key={enq.id}
              className="bg-white p-5 rounded-2xl border border-[#EDE4DC] shadow-2xs hover:border-[#8C5338]/40 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-3 border-b border-[#F0E6DF]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-[#2E1B11]">
                      {enq.name}
                    </span>
                    <span className="text-xs text-[#8C5338] font-medium">
                      ({enq.occasion || 'General Enquiry'})
                    </span>
                  </div>
                  <div className="text-xs text-[#7A6961] flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-[#8C5338]" /> {enq.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#8C5338]" /> {new Date(enq.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={enq.status}
                    onChange={(e) => handleStatusUpdate(enq.id!, e.target.value as any)}
                    className="px-2.5 py-1 text-xs rounded-lg border border-[#D9CBC2] bg-[#FAF7F2] text-[#2E1B11] font-medium focus:ring-1 focus:ring-[#8C5338]"
                  >
                    <option value="pending">Pending</option>
                    <option value="contacted">Contacted</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => replyViaWhatsApp(enq.phone, enq.name, enq.requirement)}
                    className="px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Reply directly on WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-white" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>

              <div className="text-xs sm:text-sm text-[#46332A] space-y-1">
                <p>
                  <strong className="text-[#2E1B11]">Requirement:</strong> {enq.requirement}
                </p>
                {enq.preferredDate && (
                  <p className="text-xs text-[#7A6961]">
                    <strong>Target Date:</strong> {enq.preferredDate}
                  </p>
                )}
                {enq.message && (
                  <p className="text-xs text-[#7A6961] italic">
                    "{enq.message}"
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (customRequests.length === 0) {
      return (
        <div className="text-center py-12 text-sm text-[#7A6961]">
          No custom cake specs saved in Firestore yet.
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {customRequests.map((req) => (
          <div
            key={req.id}
            className="bg-white p-5 rounded-2xl border border-[#EDE4DC] shadow-2xs"
          >
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#F0E6DF]">
              <span className="font-semibold text-sm text-[#2E1B11]">
                {req.occasion}
              </span>
              <span className="text-xs text-[#7A6961]">
                {new Date(req.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-[#523E35] mb-2">
              <p><strong>Size:</strong> {req.size}</p>
              <p><strong>Flavor:</strong> {req.flavor}</p>
              <p><strong>Target Date:</strong> {req.deliveryDate || 'Flexible'}</p>
            </div>

            {req.customTheme && (
              <p className="text-xs text-[#7A6961] italic bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E8DFD8]">
                Theme / Message: {req.customTheme}
              </p>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FAF7F2] rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-[#EDE4DC] overflow-hidden">
        
        {/* Header Bar */}
        <div className="px-6 py-4 bg-white border-b border-[#E8DFD8] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#FAF3EC] text-[#8C5338] flex items-center justify-center">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-[#2E1B11]">
                Bakehouse Orders & Enquiries
              </h3>
              <p className="text-xs text-[#7A6961]">
                Powered by Firebase Firestore persistence
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline text-xs text-[#523E35] font-medium">
                  {user.email}
                </span>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="px-3 py-1.5 text-xs font-semibold text-[#8C5338] hover:text-[#2E1B11] border border-[#D9CBC2] rounded-lg bg-[#FAF7F2] hover:bg-[#F3ECE6] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : null}

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-[#EFE7E0] text-[#523E35] transition-colors cursor-pointer"
              aria-label="Close portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {!user ? (
            /* Sign in gate */
            <div className="max-w-md mx-auto py-8">
              <div className="w-14 h-14 rounded-2xl bg-white border border-[#E8DFD8] text-[#8C5338] flex items-center justify-center mx-auto mb-4 shadow-xs">
                <Shield className="w-7 h-7" />
              </div>
              <h4 className="font-display text-2xl font-bold text-[#2E1B11] text-center mb-1">
                Bakery Owner Sign-In
              </h4>
              <p className="text-xs sm:text-sm text-[#6C5950] text-center leading-relaxed mb-6">
                Enter your bakery administrator email and password to access customer orders.
              </p>

              {errorMessage && (
                <div className="p-3.5 mb-5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <p>{errorMessage}</p>
                </div>
              )}

              {/* Email & Password Form */}
              <form onSubmit={handleEmailSignIn} className="bg-white p-6 rounded-2xl border border-[#EDE4DC] shadow-xs space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#2E1B11] mb-1.5">
                    Admin Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#8C5338] absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="Enter administrator email"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#D9CBC2] bg-[#FAF7F2] text-sm text-[#2E1B11] focus:ring-2 focus:ring-[#8C5338] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2E1B11] mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#8C5338] absolute left-3 top-3" />
                    <input
                      type="password"
                      required
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="Enter password"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#D9CBC2] bg-[#FAF7F2] text-sm text-[#2E1B11] focus:ring-2 focus:ring-[#8C5338] focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSigningIn}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-[#2E1B11] hover:bg-[#8C5338] transition-all cursor-pointer shadow-xs disabled:opacity-75"
                >
                  {isSigningIn ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4" />
                      <span>Sign In</span>
                    </>
                  )}
                </button>
              </form>

            </div>
          ) : (
            /* Authenticated Inbox view */
            <div>
              {/* Tab Selector */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E8DFD8]">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('enquiries')}
                    className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                      activeTab === 'enquiries'
                        ? 'bg-[#2E1B11] text-white shadow-xs'
                        : 'bg-white text-[#6C5950] hover:text-[#2E1B11] border border-[#E8DFD8]'
                    }`}
                  >
                    Contact Enquiries ({enquiries.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('custom_cakes')}
                    className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                      activeTab === 'custom_cakes'
                        ? 'bg-[#2E1B11] text-white shadow-xs'
                        : 'bg-white text-[#6C5950] hover:text-[#2E1B11] border border-[#E8DFD8]'
                    }`}
                  >
                    Custom Cake Plans ({customRequests.length})
                  </button>
                </div>

                <div className="text-xs text-[#7A6961] flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                  <span>Real-time Sync Active</span>
                </div>
              </div>

              {renderContent()}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
