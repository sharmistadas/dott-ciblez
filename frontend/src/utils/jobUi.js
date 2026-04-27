export const mapJobForUi = (job = {}) => ({
  id: job?._id || job?.id || '',
  title: job?.title || '',
  dept: job?.department || job?.dept || '',
  location: job?.location || '',
  type: job?.type || 'Full-time',
  salary: job?.salary || '',
  icon: job?.icon || 'bi-briefcase',
  color: job?.color || '#2563eb',
  para: job?.description || job?.para || '',
  posted: job?.postedAgo || job?.posted || '',
  new: job?.isNew ?? job?.new ?? false,
  description: job?.description || job?.para || '',
});
