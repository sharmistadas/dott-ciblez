const toDateString = (value) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toISOString().slice(0, 10);
};

export const mapBookingFromApi = (booking) => ({
  id: booking?._id || booking?.id,
  customer: booking?.fullName || booking?.customer || '',
  service: booking?.service || '',
  date: booking?.bookingDate || booking?.date || toDateString(booking?.createdAt),
  time: booking?.bookingTime || booking?.time || '',
  status: booking?.status || 'pending',
  value: booking?.value || 'N/A',
  email: booking?.email || '',
  company: booking?.company || '',
  phone: booking?.phone || '',
  isRead: booking?.isRead ?? false,
  createdAt: booking?.createdAt || null,
  raw: booking || null,
});
