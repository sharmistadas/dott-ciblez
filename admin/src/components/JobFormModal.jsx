import React from 'react';
import Icon from './Icon';

const JobFormModal = ({ show, onClose, editJob, form, setForm, onSave, error, isSaving }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">{editJob ? 'Edit Job' : 'Add New Job'}</span>
          <button className="modal-close" onClick={onClose}><Icon name="close" size={14} /></button>
        </div>
        <div className="modal-body">
          {error && (
            <div className="text-sm" style={{ color: '#dc2626', marginBottom: 10 }}>
              {error}
            </div>
          )}
          <div className="grid grid-2" style={{ gap: 14 }}>
            <div className="form-group" style={{ gridColumn: '1/-1' }}>
              <label className="form-label">Job Title</label>
              <input className="form-control" placeholder="e.g. Senior React Developer" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Department</label>
              <input className="form-control" placeholder="Engineering" value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Location</label>
              <input className="form-control" placeholder="Remote / City" value={form.location || ''} onChange={e => setForm({ ...form, location: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Salary Range</label>
              <input className="form-control" placeholder="e.g. $120k - $150k" value={form.salary || ''} onChange={e => setForm({ ...form, salary: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Type</label>
              <select className="form-control" value={form.type || 'Full-time'} onChange={e => setForm({ ...form, type: e.target.value })}>
                {['Full-time', 'Part-time', 'Contract', 'Internship'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="form-group" style={{ gridColumn: '1/-1' }}>
              <label className="form-label">Job Description</label>
              <textarea className="form-control" placeholder="Brief job description or requirements..." value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })} style={{ minHeight: 60 }} />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose} disabled={isSaving}>Cancel</button>
          <button className="btn btn-primary" onClick={onSave} disabled={isSaving}><Icon name="check" size={13} /> {editJob ? 'Save Changes' : 'Create Job'}</button>
        </div>
      </div>
    </div>
  );
};

export default JobFormModal;
