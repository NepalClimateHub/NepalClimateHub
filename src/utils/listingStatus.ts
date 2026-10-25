export type ListingStatus = 'Open' | 'Upcoming' | 'Closed';

const STATUS_MAP: Record<string, ListingStatus> = {
  OPEN: 'Open',
  UPCOMING: 'Upcoming',
  CLOSED: 'Closed',
};

function isPast(isoString: string | null | undefined, now: Date): boolean {
  if (!isoString) return false;
  const time = new Date(isoString).getTime();
  return !Number.isNaN(time) && time < now.getTime();
}

// Mirrors the CMS rule: a listing closes once its deadline passes, otherwise the
// stored status (OPEN / UPCOMING / CLOSED, any casing) is used. Applying it here too
// means a stale status from the CMS never shows an expired listing as open.
export function getListingStatus(
  status: string | null | undefined,
  deadline: string | null | undefined,
  now: Date = new Date()
): ListingStatus {
  const stored = STATUS_MAP[(status || '').trim().toUpperCase()];
  if (stored === 'Closed' || isPast(deadline, now)) return 'Closed';
  if (stored) return stored;
  return deadline ? 'Open' : 'Closed';
}

export function getEventStatus(
  event: {
    status?: string | null;
    registrationDeadline?: string | null;
    startDate?: string | null;
  },
  now?: Date
): ListingStatus {
  return getListingStatus(
    event.status,
    event.registrationDeadline || event.startDate,
    now
  );
}

export function getOpportunityStatus(
  opportunity: {
    status?: string | null;
    applicationDeadline?: string | null;
  },
  now?: Date
): ListingStatus {
  return getListingStatus(
    opportunity.status,
    opportunity.applicationDeadline,
    now
  );
}
