const toDateString = (value) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toISOString().slice(0, 10);
};

const computeScore = (skills) => {
  if (!Array.isArray(skills) || skills.length === 0) return null;
  const rated = skills.filter((s) => typeof s?.rating === 'number');
  if (rated.length === 0) return null;
  const total = rated.reduce((sum, s) => sum + s.rating, 0);
  return Math.round((total / rated.length / 5) * 100);
};

export const mapApplicationFromApi = (application) => {
  const score = computeScore(application?.skills);
  return {
    id: application?._id || application?.id,
    name: application?.fullName || '',
    email: application?.email || '',
    phone: application?.phone || '',
    job: application?.job?.title || application?.jobTitle || '',
    jobId: application?.job?._id || application?.job || null,
    status: application?.status || 'pending',
    date: toDateString(application?.createdAt),
    score: score ?? 0,
    raw: application || null,
  };
};

