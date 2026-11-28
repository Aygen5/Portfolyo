import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Mail, MessageSquareHeart, Send } from 'lucide-react';
import { Button } from '../../components/Button';
import { PROFILE_DATA } from '../../data/portfolioData';
import {
  CreateGuestbookPayload,
  CreateMessagePayload,
  GuestbookEntry,
} from '../../domain/models';

interface GuestbookTabProps {
  entries: GuestbookEntry[];
  onAddEntry: (payload: CreateGuestbookPayload) => Promise<void>;
  onSendMessage: (payload: CreateMessagePayload) => Promise<void>;
}

interface DmFormErrors {
  senderName?: string;
  senderEmail?: string;
  body?: string;
}

interface GuestbookFormErrors {
  authorName?: string;
  noteMessage?: string;
}

const MOOD_EMOJIS = ['👋', '☕', '🚀', '🌟', '💡', '🎨', '🔥'];
const NAME_ONLY_LETTERS_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿĞğÜüŞşİıÖöÇç\s.'-]+$/;
const STRICT_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function GuestbookTab({
  entries,
  onAddEntry,
  onSendMessage,
}: GuestbookTabProps) {
  // Guestbook state
  const [authorName, setAuthorName] = useState('');
  const [emoji, setEmoji] = useState('☕');
  const [noteMessage, setNoteMessage] = useState('');
  const [gbErrors, setGbErrors] = useState<GuestbookFormErrors>({});
  const [submittingNote, setSubmittingNote] = useState(false);

  // DM / Hire Me state
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('Internship / Engineering Opportunity');
  const [body, setBody] = useState('');
  const [dmErrors, setDmErrors] = useState<DmFormErrors>({});
  const [submittingDm, setSubmittingDm] = useState(false);
  const [isEnvelopeFlying, setIsEnvelopeFlying] = useState(false);
  const [dmSentSuccess, setDmSentSuccess] = useState(false);

  // Validate Name (no numbers allowed)
  const validateName = (value: string): string | undefined => {
    const trimmed = value.trim();
    if (!trimmed) {
      return 'Please enter your name.';
    }
    if (/\d/.test(trimmed)) {
      return 'Name cannot contain numbers.';
    }
    if (!NAME_ONLY_LETTERS_REGEX.test(trimmed)) {
      return 'Name can only contain letters and spaces.';
    }
    if (trimmed.length < 2) {
      return 'Name must be at least 2 characters long.';
    }
    return undefined;
  };

  // Validate Email
  const validateEmail = (value: string): string | undefined => {
    const trimmed = value.trim();
    if (!trimmed) {
      return 'Please enter your email address.';
    }
    if (!STRICT_EMAIL_REGEX.test(trimmed)) {
      return 'Please enter a valid email address (e.g. name@company.com).';
    }
    return undefined;
  };

  // Validate DM Message Body
  const validateDmBody = (value: string): string | undefined => {
    const trimmed = value.trim();
    if (!trimmed) {
      return 'Please enter a message before sending.';
    }
    if (trimmed.length < 10) {
      return 'Your message must be at least 10 characters long.';
    }
    return undefined;
  };

  const handleSenderNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (/\d/.test(raw)) {
      setDmErrors((prev) => ({
        ...prev,
        senderName: 'Numbers are not allowed in the name field.',
      }));
      return;
    }
    setSenderName(raw);
    if (dmErrors.senderName) {
      setDmErrors((prev) => ({ ...prev, senderName: validateName(raw) }));
    }
  };

  const handleAuthorNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (/\d/.test(raw)) {
      setGbErrors((prev) => ({
        ...prev,
        authorName: 'Numbers are not allowed in the name field.',
      }));
      return;
    }
    setAuthorName(raw);
    if (gbErrors.authorName) {
      setGbErrors((prev) => ({ ...prev, authorName: validateName(raw) }));
    }
  };

  const handleGuestbookSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const nameErr = validateName(authorName);
    const msgErr = !noteMessage.trim()
      ? 'Please write a short note before posting.'
      : noteMessage.trim().length < 3
      ? 'Note must be at least 3 characters long.'
      : undefined;

    if (nameErr || msgErr) {
      setGbErrors({ authorName: nameErr, noteMessage: msgErr });
      return;
    }

    setGbErrors({});
    setSubmittingNote(true);
    try {
      await onAddEntry({
        authorName: authorName.trim(),
        emoji,
        message: noteMessage.trim(),
      });
      setAuthorName('');
      setNoteMessage('');
    } finally {
      setSubmittingNote(false);
    }
  };

  const handleDmSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const nameError = validateName(senderName);
    const emailError = validateEmail(senderEmail);
    const bodyError = validateDmBody(body);

    if (nameError || emailError || bodyError) {
      setDmErrors({
        senderName: nameError,
        senderEmail: emailError,
        body: bodyError,
      });
      return;
    }

    setDmErrors({});
    setSubmittingDm(true);
    setDmSentSuccess(false);

    try {
      await onSendMessage({
        senderName: senderName.trim(),
        senderEmail: senderEmail.trim(),
        subject: subject.trim() || 'Direct Message from Portfolio',
        body: body.trim(),
      });

      setSenderName('');
      setSenderEmail('');
      setBody('');

      // 1. Launch white envelope upward from the button toward the top banner
      setIsEnvelopeFlying(true);
      setTimeout(() => {
        setIsEnvelopeFlying(false);
        setDmSentSuccess(true);
      }, 900);
    } finally {
      setSubmittingDm(false);
    }
  };

  const burgundyErrorClass =
    'mt-1 flex items-center gap-1 font-body text-[12px] font-medium text-[#8B1E24] dark:text-[#F28B82]';

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-lg">
      {/* Left Column (7 cols): Public Guestbook Wall */}
      <section className="md:col-span-7 flex flex-col gap-md">
        <div className="rounded-md bg-light-surface-container dark:bg-dark-surface-container border border-light-outline dark:border-dark-outline p-md sm:p-lg flex flex-col gap-md">
          <div className="flex items-center gap-2">
            <MessageSquareHeart className="w-5 h-5 text-terracotta" />
            <div>
              <h3 className="font-headline text-headline-md text-light-on-surface dark:text-dark-on-surface">
                Public Guestbook
              </h3>
              <p className="font-body text-body-sm text-light-on-surface-muted dark:text-dark-on-surface-muted">
                Leave a short note, feedback, or coffee greeting on my profile stream.
              </p>
            </div>
          </div>

          <form
            noValidate
            onSubmit={handleGuestbookSubmit}
            className="flex flex-col gap-sm"
          >
            <div className="flex flex-wrap items-start gap-sm">
              <div className="flex-1 min-w-[180px]">
                <input
                  type="text"
                  maxLength={60}
                  placeholder="Your name"
                  value={authorName}
                  onChange={handleAuthorNameChange}
                  className={`w-full rounded bg-light-surface dark:bg-dark-surface border px-sm py-xs font-body text-body-sm text-light-on-surface dark:text-dark-on-surface focus:outline-none ${
                    gbErrors.authorName
                      ? 'border-[#8B1E24] dark:border-[#F28B82]'
                      : 'border-light-outline dark:border-dark-outline focus:border-light-primary dark:focus:border-dark-primary'
                  }`}
                />
                {gbErrors.authorName && (
                  <p role="alert" className={burgundyErrorClass}>
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{gbErrors.authorName}</span>
                  </p>
                )}
              </div>

              <div
                className="flex items-center gap-1"
                role="group"
                aria-label="Select mood emoji"
              >
                {MOOD_EMOJIS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setEmoji(item)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-transform ${
                      emoji === item
                        ? 'bg-terracotta/25 border border-terracotta scale-110'
                        : 'bg-light-surface dark:bg-dark-surface border border-light-outline dark:border-dark-outline opacity-75 hover:opacity-100'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex gap-sm">
                <input
                  type="text"
                  maxLength={320}
                  placeholder="Write a public note..."
                  value={noteMessage}
                  onChange={(e) => {
                    setNoteMessage(e.target.value);
                    if (gbErrors.noteMessage) {
                      setGbErrors((prev) => ({ ...prev, noteMessage: undefined }));
                    }
                  }}
                  className={`flex-1 rounded bg-light-surface dark:bg-dark-surface border px-sm py-xs font-body text-body-sm text-light-on-surface dark:text-dark-on-surface focus:outline-none ${
                    gbErrors.noteMessage
                      ? 'border-[#8B1E24] dark:border-[#F28B82]'
                      : 'border-light-outline dark:border-dark-outline focus:border-light-primary dark:focus:border-dark-primary'
                  }`}
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={submittingNote}
                >
                  {submittingNote ? 'Posting...' : 'Post Note'}
                </Button>
              </div>
              {gbErrors.noteMessage && (
                <p role="alert" className={burgundyErrorClass}>
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{gbErrors.noteMessage}</span>
                </p>
              )}
            </div>
          </form>
        </div>

        {/* Guestbook Stream */}
        <div className="flex flex-col gap-sm">
          {entries.map((entry) => (
            <article
              key={entry.id}
              className="rounded-md bg-light-surface-container dark:bg-dark-surface-container border border-light-outline dark:border-dark-outline p-md flex items-start gap-sm"
            >
              <span className="w-9 h-9 rounded-full bg-light-surface dark:bg-dark-surface border border-light-outline dark:border-dark-outline flex items-center justify-center text-base shrink-0">
                {entry.emoji}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-xs">
                  <span className="font-body text-body-sm font-semibold text-light-on-surface dark:text-dark-on-surface">
                    {entry.authorName}
                  </span>
                  <span className="font-label text-[11px] text-light-on-surface-muted dark:text-dark-on-surface-muted">
                    {new Date(entry.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <p className="font-body text-body-sm text-light-on-surface dark:text-dark-on-surface mt-0.5 break-words">
                  {entry.message}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Right Column (5 cols): Direct Message (DM / Hire Me) */}
      <section className="md:col-span-5">
        <div className="relative rounded-md bg-light-surface-container dark:bg-dark-surface-container border border-light-outline dark:border-dark-outline p-md sm:p-lg flex flex-col gap-md overflow-hidden">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-light-primary dark:text-dark-primary" />
            <div>
              <h3 className="font-headline text-headline-md text-light-on-surface dark:text-dark-on-surface">
                Send a Direct Message
              </h3>
              <p className="font-body text-body-sm text-light-on-surface-muted dark:text-dark-on-surface-muted">
                Hiring for an internship or engineering role? Drop a DM directly to my inbox.
              </p>
            </div>
          </div>

          {/* Green Success Banner (Appears right where the flying white envelope lands) */}
          <AnimatePresence>
            {dmSentSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.28 }}
                className="rounded bg-forest-olive-tint dark:bg-dark-secondary border border-light-primary/30 p-sm flex items-center gap-2 font-body text-body-sm text-light-on-secondary dark:text-dark-on-secondary shadow-xs"
              >
                <CheckCircle2 className="w-4 h-4 text-light-primary dark:text-dark-primary shrink-0" />
                <span>Message delivered to Aygen&apos;s inbox!</span>
              </motion.div>
            )}
          </AnimatePresence>

          <form noValidate onSubmit={handleDmSubmit} className="flex flex-col gap-sm">
            <div>
              <label className="block font-label text-label-sm text-light-on-surface-muted dark:text-dark-on-surface-muted mb-1">
                Your Name
              </label>
              <input
                type="text"
                placeholder="Jane Doe / Tech Recruiter"
                value={senderName}
                onChange={handleSenderNameChange}
                onBlur={() => {
                  if (senderName) {
                    setDmErrors((prev) => ({
                      ...prev,
                      senderName: validateName(senderName),
                    }));
                  }
                }}
                className={`w-full rounded bg-light-surface dark:bg-dark-surface border px-sm py-xs font-body text-body-sm text-light-on-surface dark:text-dark-on-surface focus:outline-none ${
                  dmErrors.senderName
                    ? 'border-[#8B1E24] dark:border-[#F28B82]'
                    : 'border-light-outline dark:border-dark-outline focus:border-light-primary dark:focus:border-dark-primary'
                }`}
              />
              {dmErrors.senderName && (
                <p role="alert" className={burgundyErrorClass}>
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{dmErrors.senderName}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block font-label text-label-sm text-light-on-surface-muted dark:text-dark-on-surface-muted mb-1">
                Your Email
              </label>
              <input
                type="email"
                placeholder="jane@company.com"
                value={senderEmail}
                onChange={(e) => {
                  const val = e.target.value;
                  setSenderEmail(val);
                  if (dmErrors.senderEmail) {
                    setDmErrors((prev) => ({
                      ...prev,
                      senderEmail: validateEmail(val),
                    }));
                  }
                }}
                onBlur={() => {
                  if (senderEmail) {
                    setDmErrors((prev) => ({
                      ...prev,
                      senderEmail: validateEmail(senderEmail),
                    }));
                  }
                }}
                className={`w-full rounded bg-light-surface dark:bg-dark-surface border px-sm py-xs font-body text-body-sm text-light-on-surface dark:text-dark-on-surface focus:outline-none ${
                  dmErrors.senderEmail
                    ? 'border-[#8B1E24] dark:border-[#F28B82]'
                    : 'border-light-outline dark:border-dark-outline focus:border-light-primary dark:focus:border-dark-primary'
                }`}
              />
              {dmErrors.senderEmail && (
                <p role="alert" className={burgundyErrorClass}>
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{dmErrors.senderEmail}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block font-label text-label-sm text-light-on-surface-muted dark:text-dark-on-surface-muted mb-1">
                Topic
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full rounded bg-light-surface dark:bg-dark-surface border border-light-outline dark:border-dark-outline px-sm py-xs font-body text-body-sm text-light-on-surface dark:text-dark-on-surface focus:outline-none focus:border-light-primary dark:focus:border-dark-primary"
              >
                <option value="Internship / Engineering Opportunity">
                  Internship / Engineering Opportunity
                </option>
                <option value="Backend / Full-Stack Collaboration">
                  Backend / Full-Stack Collaboration
                </option>
                <option value="Mobile (Flutter) Project">
                  Mobile (Flutter) Project
                </option>
                <option value="SAP / Project Management Inquiry">
                  SAP / Project Management Inquiry
                </option>
                <option value="General Hello">General Hello</option>
              </select>
            </div>

            <div>
              <label className="block font-label text-label-sm text-light-on-surface-muted dark:text-dark-on-surface-muted mb-1">
                Message
              </label>
              <textarea
                rows={4}
                placeholder="Hi Aygen, we loved your Clean Architecture projects and would like to connect..."
                value={body}
                onChange={(e) => {
                  const val = e.target.value;
                  setBody(val);
                  if (dmErrors.body) {
                    setDmErrors((prev) => ({
                      ...prev,
                      body: validateDmBody(val),
                    }));
                  }
                }}
                className={`w-full rounded bg-light-surface dark:bg-dark-surface border px-sm py-xs font-body text-body-sm text-light-on-surface dark:text-dark-on-surface focus:outline-none ${
                  dmErrors.body
                    ? 'border-[#8B1E24] dark:border-[#F28B82]'
                    : 'border-light-outline dark:border-dark-outline focus:border-light-primary dark:focus:border-dark-primary'
                }`}
              />
              {dmErrors.body && (
                <p role="alert" className={burgundyErrorClass}>
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{dmErrors.body}</span>
                </p>
              )}
            </div>

            {/* Submit Button & Flying White Envelope Anchor */}
            <div className="relative pt-1">
              <AnimatePresence>
                {isEnvelopeFlying && (
                  <motion.div
                    key="flying-white-envelope"
                    initial={{ opacity: 0, y: 0, x: 0, scale: 0.7, rotate: -8 }}
                    animate={{
                      opacity: [0, 1, 1, 0],
                      y: [0, -110, -230, -310],
                      x: [0, 14, -10, 0],
                      scale: [0.75, 1.15, 1, 0.45],
                      rotate: [-8, 10, -6, 0],
                    }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.9,
                      ease: 'easeInOut',
                      times: [0, 0.25, 0.75, 1],
                    }}
                    className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-2 z-30"
                    aria-hidden="true"
                  >
                    {/* Crisp White Letter Envelope SVG with Terracotta Wax Seal */}
                    <div className="rounded-md bg-white px-2.5 py-2 shadow-lg border border-light-outline flex items-center justify-center">
                      <svg
                        width="34"
                        height="24"
                        viewBox="0 0 36 26"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="1"
                          y="1"
                          width="34"
                          height="24"
                          rx="3"
                          fill="#FFFFFF"
                          stroke="#49382F"
                          strokeWidth="1.8"
                        />
                        <path
                          d="M2 3 L18 15 L34 3"
                          stroke="#49382F"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle cx="18" cy="14" r="3.2" fill="#C18B70" />
                      </svg>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <Button
                type="submit"
                variant="terracotta"
                className="w-full"
                disabled={submittingDm || isEnvelopeFlying}
              >
                <Send className="w-3.5 h-3.5" />
                <span>
                  {submittingDm
                    ? 'Sending DM...'
                    : isEnvelopeFlying
                    ? 'Delivering...'
                    : 'Send Direct Message'}
                </span>
              </Button>
            </div>
          </form>

          <div className="pt-xs border-t border-light-outline dark:border-dark-outline font-label text-[11px] text-light-on-surface-muted dark:text-dark-on-surface-muted">
            Or email directly:{' '}
            <a
              href={PROFILE_DATA.socials.email}
              className="text-terracotta underline hover:opacity-80"
            >
              {PROFILE_DATA.socials.emailAddress}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
