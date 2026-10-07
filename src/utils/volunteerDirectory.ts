import type { Member } from '../types/member';

export interface StaticFormerVolunteer {
  name: string;
  title: string;
  volunteerDate: string;
  bio: string;
  image: string;
  linkedIn: string;
}

export interface DirectoryVolunteer {
  name: string;
  title: string;
  duration: string;
  bio: string;
  image: string;
  linkedIn: string;
  // Every calendar year the volunteer served in; drives the year filter.
  years: number[];
}

const TIME_ZONE = 'Asia/Kathmandu';

function parseDate(value: string | null | undefined): Date | null {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function yearOf(date: Date): number {
  return Number(
    new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      timeZone: TIME_ZONE,
    }).format(date)
  );
}

function formatMonthYear(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: TIME_ZONE,
  }).format(date);
}

function yearRange(start: number, end: number): number[] {
  if (!start || !end || end < start) return start ? [start] : [];
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

// A volunteer has left once the CMS marks them inactive or their end date has passed.
export function isFormerVolunteer(member: Member, now: Date = new Date()) {
  const end = parseDate(member.endDate);
  return member.isActive === false || (end !== null && end < now);
}

function fromMember(
  member: Member,
  former: boolean,
  now: Date
): DirectoryVolunteer {
  const start = parseDate(member.startDate);
  const end = parseDate(member.endDate);
  // A former volunteer without an end date is treated as having left when last updated.
  const effectiveEnd = former
    ? (end ?? parseDate(member.updatedAt) ?? now)
    : now;

  const startLabel = start ? formatMonthYear(start) : '';
  const endLabel = former ? formatMonthYear(effectiveEnd) : 'Present';

  return {
    name: member.name,
    title: [member.role, member.team].filter(Boolean).join(' | '),
    duration: startLabel ? `${startLabel} – ${endLabel}` : '',
    bio: member.bio,
    image: member.photoUrl,
    linkedIn: member.linkedinProfile,
    years: start ? yearRange(yearOf(start), yearOf(effectiveEnd)) : [],
  };
}

// Static records store dates as text, e.g. "Nov 2024 – Nov 2025" or "Jan 2025 – Present".
function fromStatic(
  volunteer: StaticFormerVolunteer,
  now: Date
): DirectoryVolunteer {
  const found = (
    volunteer.volunteerDate.match(/\b(?:19|20)\d{2}\b/g) || []
  ).map(Number);
  const ongoing = /present|current/i.test(volunteer.volunteerDate);
  const start = found[0];
  const end = ongoing ? yearOf(now) : found[found.length - 1];

  return {
    name: volunteer.name,
    title: volunteer.title,
    duration: volunteer.volunteerDate,
    bio: volunteer.bio,
    image: volunteer.image,
    linkedIn: volunteer.linkedIn,
    years: yearRange(start, end),
  };
}

const nameKey = (name: string) =>
  name.trim().toLowerCase().replace(/\s+/g, ' ');

export function buildVolunteerDirectory(
  members: Member[],
  staticFormer: StaticFormerVolunteer[],
  now: Date = new Date()
) {
  const active: DirectoryVolunteer[] = [];
  const former: DirectoryVolunteer[] = [];

  for (const member of members) {
    const isFormer = isFormerVolunteer(member, now);
    (isFormer ? former : active).push(fromMember(member, isFormer, now));
  }

  // CMS records win over the legacy JSON list when the same person is in both.
  const known = new Set([...active, ...former].map((v) => nameKey(v.name)));
  for (const volunteer of staticFormer) {
    if (!known.has(nameKey(volunteer.name))) {
      former.push(fromStatic(volunteer, now));
    }
  }

  // Most recent service first.
  const latestYear = (v: DirectoryVolunteer) =>
    v.years[v.years.length - 1] ?? 0;
  former.sort((a, b) => latestYear(b) - latestYear(a));

  return { active, former };
}

export function collectYears(volunteers: DirectoryVolunteer[]): number[] {
  return [...new Set(volunteers.flatMap((v) => v.years))].sort((a, b) => b - a);
}
