import React, { useState } from 'react';
import Icon from '../components/Icon';
import { apiRequest } from '../utils/api';
import { mapBookingFromApi } from '../utils/bookingMapper';

const Bookings = ({ data, setData, bookingsLoading = false, bookingsError = '' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [updateError, setUpdateError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  const update = async (id, status) => {
    setUpdateError('');
    setUpdatingId(id);
    try {
      const response = await apiRequest(`/api/bookings/${id}/status`, {
        method: 'PUT',
        body: { status },
      });
      const mapped = mapBookingFromApi(response?.data?.booking || { id, status });
      setData((d) => ({
        ...d,
        bookings: d.bookings.map((b) => (b.id === id ? { ...b, ...mapped } : b)),
      }));
    } catch (err) {
      setUpdateError(err?.message || 'Unable to update booking status.');
    } finally {
      setUpdatingId(null);
    }
  };
  const statusBadge = { confirmed: 'badge-green', pending: 'badge-yellow', completed: 'badge-blue', cancelled: 'badge-red' };

  const filteredBookings = data.bookings.filter(b => {
    const query = searchQuery.toLowerCase();
    return b.customer.toLowerCase().includes(query) || 
           b.service.toLowerCase().includes(query) || 
           b.date.includes(query) ||
           (b.email || '').toLowerCase().includes(query) ||
           (b.company || '').toLowerCase().includes(query);
  });

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="breadcrumb"><span>Home</span><span className="sep">›</span><span className="current">Bookings</span></div>
          <div className="page-title">Service Bookings</div>
          <div className="page-subtitle">{data.bookings.filter(b => b.status === 'confirmed').length} confirmed • {data.bookings.filter(b => b.status === 'pending').length} pending</div>
        </div>
        <div className="search-box" style={{ maxWidth: 300, width: '100%', position: 'relative' }}>
          <span style={{ position: 'absolute', left: 15, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', display: 'flex', pointerEvents: 'none' }}>
            <Icon name="search" size={14} />
          </span>
          <input 
            type="text" 
            placeholder="Search by name, service, or date..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '10px 12px 10px 36px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--surface2)', color: 'var(--black)', fontSize: 13 }}
          />
        </div>
      </div>
      <div className="card">
        {(bookingsLoading || bookingsError || updateError) && (
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
            {bookingsLoading && <span className="text-muted">Loading bookings...</span>}
            {!bookingsLoading && bookingsError && <span style={{ color: '#dc2626' }}>{bookingsError}</span>}
            {!bookingsLoading && !bookingsError && updateError && <span style={{ color: '#dc2626' }}>{updateError}</span>}
          </div>
        )}
        <div className="table-wrap">
          <table>
            <thead><tr><th>Customer</th><th>Service</th><th>Date & Time</th><th>Value</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {filteredBookings.map(b => (
                <tr key={b.id}>
                  <td><span style={{ fontWeight: 600, color: 'var(--black)' }}>{b.customer}</span></td>
                  <td><span className="text-dim">{b.service}</span></td>
                  <td><div style={{ fontSize: 13, color: 'var(--text-dim)' }}>{b.date}<br/><span className="text-xs text-muted">{b.time}</span></div></td>
                  <td><span style={{ color: '#34d399', fontWeight: 600 }}>{b.value}</span></td>
                  <td><span className={`badge ${statusBadge[b.status]}`}>{b.status}</span></td>
                  <td>
                    <select
                      className="form-control"
                      style={{ width: 120, padding: '4px 8px', fontSize: 12 }}
                      value={b.status}
                      onChange={e => update(b.id, e.target.value)}
                      disabled={updatingId === b.id}
                    >
                      {['pending', 'confirmed', 'completed', 'cancelled'].map(s => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
              {!bookingsLoading && filteredBookings.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '18px', color: 'var(--text-muted)' }}>
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
