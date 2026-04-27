import React from 'react';
import Icon from './Icon';

const InquiryModal = ({ selected, onClose }) => {
  if (!selected) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">Inquiry from {selected.name}</span>
          <button className="modal-close" onClick={onClose}><Icon name="close" size={14} /></button>
        </div>
        <div className="modal-body">
          <div style={{ background: 'var(--surface2)', borderRadius: 10, padding: '14px 16px', border: '1px solid var(--border)', marginBottom: 16 }}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted" style={{ textTransform: 'uppercase', letterSpacing: 1 }}>From</span>
              <span className="text-xs text-muted">{selected.date}</span>
            </div>
            <div style={{ fontWeight: 600 }}>{selected.name} · <span className="text-muted" style={{ fontWeight: 400, fontSize: 13 }}>{selected.email}</span></div>
          </div>
          <div style={{ fontWeight: 700, marginBottom: 10, fontSize: 16 }}>{selected.subject}</div>
          <div style={{ color: 'var(--text-dim)', lineHeight: 1.7, fontSize: 14 }}>{selected.message}</div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose}>Close</button>
          <button className="btn btn-primary"><Icon name="inquiries" size={13} /> Reply via Email</button>
        </div>
      </div>
    </div>
  );
};

export default InquiryModal;
