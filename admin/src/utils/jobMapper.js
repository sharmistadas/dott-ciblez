export const mapJobFromApi = (job) => ({
  id: job?._id || job?.id,
  title: job?.title || '',
  department: job?.department || '',
  location: job?.location || '',
  type: job?.type || 'Full-time',
  salary: job?.salary || '',
  description: job?.description || '',
  status: job?.isActive === false ? 'inactive' : 'active',
  applicants: job?.applicants ?? 0,
  posted: job?.createdAt ? new Date(job.createdAt).toISOString().slice(0, 10) : '',
  createdAt: job?.createdAt || null,
  isActive: job?.isActive ?? true,
  requirements: Array.isArray(job?.requirements) ? job.requirements : [],
  responsibilities: Array.isArray(job?.responsibilities) ? job.responsibilities : [],
});

export const buildJobPayload = (form, isActive = true) => ({
  title: (form?.title || '').trim(),
  department: (form?.department || '').trim(),
  location: (form?.location || '').trim(),
  type: form?.type || 'Full-time',
  salary: (form?.salary || '').trim(),
  description: (form?.description || '').trim(),
  requirements: Array.isArray(form?.requirements) ? form.requirements : [],
  responsibilities: Array.isArray(form?.responsibilities) ? form.responsibilities : [],
  isActive,
});
