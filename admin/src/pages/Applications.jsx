import React, { useState } from 'react';
import Icon from '../components/Icon';
import { apiRequest } from '../utils/api';
import { mapApplicationFromApi } from '../utils/applicationMapper';

const Applications = ({ data, setData, applicationsLoading, applicationsError }) => {
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [actionError, setActionError] = useState('');
  const [busyId, setBusyId] = useState(null);
  const perPage = 5;
  const filtered = filter === 'all' ? data.applications : data.applications.filter(a => a.status === filter);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);
  const update = async (id, status) => {
    setActionError('');
    setBusyId(id);
    try {
      const response = await apiRequest(`/api/applications/${id}/status`, {
        method: 'PUT',
        body: { status },
      });
      const updated = mapApplicationFromApi(response?.data?.application || {});
      setData(d => ({
        ...d,
        applications: d.applications.map(a => a.id === id ? { ...a, ...updated } : a),
      }));
    } catch (err) {
      setActionError(err?.message || 'Unable to update application status.');
    } finally {
      setBusyId(null);
    }
  };
  const statusBadge = { pending: 'badge-yellow', reviewed: 'badge-blue', shortlisted: 'badge-green', rejected: 'badge-red' };

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="breadcrumb"><span>Home</span><span className="sep">›</span><span className="current">Applications</span></div>
          <div className="page-title">Applications</div>
          <div className="page-subtitle">{data.applications.length} total candidates</div>
        </div>
        <button className="btn btn-ghost"><Icon name="download" size={13} /> Export</button>
      </div>
      {(applicationsError || actionError) && (
        <div className="text-sm" style={{ color: '#dc2626', marginBottom: 12 }}>
          {applicationsError || actionError}
        </div>
      )}
      {applicationsLoading && (
        <div className="text-muted text-sm" style={{ marginBottom: 12 }}>
          Loading applications...
        </div>
      )}
      <div className="flex items-center gap-3 mb-4" style={{ flexWrap: 'wrap' }}>
        <div className="tabs">
          {['all', 'pending', 'reviewed', 'shortlisted', 'rejected'].map(f => (
            <div key={f} className={`tab${filter === f ? ' active' : ''}`} onClick={() => { setFilter(f); setPage(1); }}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
              <span style={{ marginLeft: 5, background: 'rgba(255,255,255,0.12)', borderRadius: 10, padding: '0 6px', fontSize: 10 }}>
                {f === 'all' ? data.applications.length : data.applications.filter(a => a.status === f).length}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Candidate</th><th>Applied For</th><th>Score</th><th>Date</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {paginated.map(a => (
                <tr key={a.id} style={{ cursor: 'pointer' }} onClick={() => setSelected(a)}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 , color:'white'}}>
                        {a.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>{a.name}</div>
                        <div className="text-xs text-muted">{a.email}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className="text-dim text-sm">{a.job}</span></td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="progress" style={{ width: 48 }}>
                        <div className="progress-bar" style={{ width: `${a.score}%`, background: a.score > 80 ? '#34d399' : a.score > 60 ? 'var(--blue)' : '#f87171' }} />
                      </div>
                      <span className="text-sm" style={{ color: a.score > 80 ? '#34d399' : a.score > 60 ? '#6b86ff' : '#f87171', fontWeight: 600 }}>{a.score}</span>
                    </div>
                  </td>
                  <td><span className="text-muted text-sm">{a.date}</span></td>
                  <td><span className={`badge ${statusBadge[a.status]}`}>{a.status}</span></td>
                  <td onClick={e => e.stopPropagation()}>
                    <select
                      className="form-control"
                      style={{ width: 120, padding: '4px 8px', fontSize: 12 }}
                      value={a.status}
                      onChange={e => update(a.id, e.target.value)}
                      disabled={busyId === a.id}
                    >
                      {['pending', 'reviewed', 'shortlisted', 'rejected'].map(s => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ padding: '12px 20px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span className="text-muted text-sm">Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, filtered.length)} of {filtered.length}</span>
          <div className="pagination">
            <button className="page-btn" disabled={page === 1} onClick={() => setPage(p => p - 1)}><Icon name="arrow_up" size={12} style={{ transform: 'rotate(-90deg)' }} /></button>
            {Array.from({ length: Math.ceil(filtered.length / perPage) }, (_, i) => (
              <button key={i} className={`page-btn${page === i + 1 ? ' active' : ''}`} onClick={() => setPage(i + 1)}>{i + 1}</button>
            ))}
            <button className="page-btn" disabled={page * perPage >= filtered.length} onClick={() => setPage(p => p + 1)}><Icon name="arrow_down" size={12} style={{ transform: 'rotate(-90deg)' }} /></button>
          </div>
        </div>
      </div>
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-title">Application Details</span>
              <button className="modal-close" onClick={() => setSelected(null)}><Icon name="close" size={14} /></button>
            </div>
            <div className="modal-body">
              <div className="flex items-center gap-4 mb-4">
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, boxShadow: '0 0 20px var(--blue-glow)' , color:'white'}}>
                  {selected.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 18, }}>{selected.name}</div>
                  <div className="text-muted text-sm">{selected.email}</div>
                </div>
              </div>
              <div className="grid grid-2" style={{ gap: 12 }}>
                {[['Applied For', selected.job], ['Date', selected.date], ['Status', selected.status], ['Score', `${selected.score}/100`]].map(([k, v]) => (
                  <div key={k} style={{ background: 'var(--surface2)', borderRadius: 10, padding: '12px 14px', border: '1px solid var(--border)' }}>
                    <div className="text-xs text-muted mb-1" style={{ textTransform: 'uppercase', letterSpacing: 1 }}>{k}</div>
                    <div style={{ fontWeight: 600 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setSelected(null)}>Close</button>
              <button className="btn btn-primary"><Icon name="link" size={13} /> View Full Profile</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Applications;