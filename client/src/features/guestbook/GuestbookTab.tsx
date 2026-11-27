import React, { useState } from 'react';
import { CheckCircle2, Mail, MessageSquareHeart, Send } from 'lucide-react';
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

const MOOD_EMOJIS = ['👋', '☕', '🚀', '🌟', '💡', '🎨', '🔥'];

export function GuestbookTab({
  entries,
  onAddEntry,
  onSendMessage,
}: GuestbookTabProps) {
  // Guestbook state
  const [authorName, setAuthorName] = useState('');
  const [emoji, setEmoji] = useState('☕');
  const [noteMessage, setNoteMessage] = useState('');
  const [submittingNote, setSubmittingNote] = useState(false);

  // DM / Hire Me state
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('Internship / Engineering Opportunity');
  const [body, setBody] = useState('');
  const [submittingDm, setSubmittingDm] = useState(false);
  const [dmSentSuccess, setDmSentSuccess] = useState(false);

  const handleGuestbookSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!authorName.trim() || !noteMessage.trim()) return;
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
    if (!senderName.trim() || !senderEmail.trim() || !body.trim()) return;
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
      setDmSentSuccess(true);
    } finally {
      setSubmittingDm(false);
    }
  };

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

          <form onSubmit={handleGuestbookSubmit} className="flex flex-col gap-sm">
            <div className="flex flex-wrap items-center gap-sm">
              <input
                type="text"
                required
                minLength={2}
                maxLength={60}
                placeholder="Your name or @handle"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="flex-1 min-w-[180px] rounded bg-light-surface dark:bg-dark-surface border border-light-outline dark:border-dark-outline px-sm py-xs font-body text-body-sm text-light-on-surface dark:text-dark-on-surface focus:outline-none focus:border-light-primary dark:focus:border-dark-primary"
              />

              <div className="flex items-center gap-1" role="group" aria-label="Select mood emoji">
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

            <div className="flex gap-sm">
              <input
                type="text"
                required
                minLength={3}
                maxLength={320}
                placeholder="Write a public note..."
                value={noteMessage}
                onChange={(e) => setNoteMessage(e.target.value)}
                className="flex-1 rounded bg-light-surface dark:bg-dark-surface border border-light-outline dark:border-dark-outline px-sm py-xs font-body text-body-sm text-light-on-surface dark:text-dark-on-surface focus:outline-none focus:border-light-primary dark:focus:border-dark-primary"
              />
              <Button type="submit" variant="primary" size="sm" disabled={submittingNote}>
                {submittingNote ? 'Posting...' : 'Post Note'}
              </Button>
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
        <div className="rounded-md bg-light-surface-container dark:bg-dark-surface-container border border-light-outline dark:border-dark-outline p-md sm:p-lg flex flex-col gap-md">
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

          {dmSentSuccess && (
            <div className="animate-envelope rounded bg-forest-olive-tint dark:bg-dark-secondary border border-light-primary/30 p-sm flex items-center gap-2 font-body text-body-sm text-light-on-secondary dark:text-dark-on-secondary">
              <CheckCircle2 className="w-4 h-4 text-light-primary dark:text-dark-primary shrink-0" />
              <span>Message delivered to Aygen&apos;s inbox!</span>
            </div>
          )}

          <form onSubmit={handleDmSubmit} className="flex flex-col gap-sm">
            <div>
              <label className="block font-label text-label-sm text-light-on-surface-muted dark:text-dark-on-surface-muted mb-1">
                Your Name
              </label>
              <input
                type="text"
                required
                minLength={2}
                placeholder="Jane Doe / Tech Recruiter"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="w-full rounded bg-light-surface dark:bg-dark-surface border border-light-outline dark:border-dark-outline px-sm py-xs font-body text-body-sm text-light-on-surface dark:text-dark-on-surface focus:outline-none focus:border-light-primary dark:focus:border-dark-primary"
              />
            </div>

            <div>
              <label className="block font-label text-label-sm text-light-on-surface-muted dark:text-dark-on-surface-muted mb-1">
                Your Email
              </label>
              <input
                type="email"
                required
                placeholder="jane@company.com"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                className="w-full rounded bg-light-surface dark:bg-dark-surface border border-light-outline dark:border-dark-outline px-sm py-xs font-body text-body-sm text-light-on-surface dark:text-dark-on-surface focus:outline-none focus:border-light-primary dark:focus:border-dark-primary"
              />
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
                required
                minLength={10}
                rows={4}
                placeholder="Hi Aygen, we loved your Clean Architecture projects and would like to connect..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full rounded bg-light-surface dark:bg-dark-surface border border-light-outline dark:border-dark-outline px-sm py-xs font-body text-body-sm text-light-on-surface dark:text-dark-on-surface focus:outline-none focus:border-light-primary dark:focus:border-dark-primary"
              />
            </div>

            <Button type="submit" variant="terracotta" disabled={submittingDm}>
              <Send className="w-3.5 h-3.5" />
              <span>{submittingDm ? 'Sending DM...' : 'Send Direct Message'}</span>
            </Button>
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
