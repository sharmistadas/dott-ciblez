import React from 'react';
import Icon from '../components/Icon';

const InquiryDetailModal = ({ show, inquiry, onClose }) => {
    if (!show || !inquiry) return null;

    const getPriorityBadge = (priority) => {
        switch(priority) {
            case 'high': return 'badge-red';
            case 'medium': return 'badge-yellow';
            case 'low': return 'badge-green';
            default: return 'badge-blue';
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1000 }}>
            <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 640 }}>
                <div className="modal-header">
                    <span className="modal-title">Inquiry from {inquiry.name}</span>
                    <button className="modal-close" onClick={onClose}><Icon name="close" size={14} /></button>
                </div>
                <div className="modal-body" style={{ padding: 24 }}>
                    <div className="grid grid-2" style={{ gap: 16, marginBottom: 24 }}>
                        <div className="card" style={{ padding: 16, border: '1px solid var(--border)' }}>
                            <div className="text-muted text-xs font-bold mb-1" style={{ textTransform: 'uppercase' }}>Contact Info</div>
                            <div className="font-semibold text-sm">{inquiry.name}</div>
                            <a href={`mailto:${inquiry.email}?subject=Re: ${inquiry.subject}`} style={{ color: 'var(--blue)', fontSize: 13, textDecoration: 'none' }}>{inquiry.email}</a>
                        </div>
                        <div className="card" style={{ padding: 16, border: '1px solid var(--border)' }}>
                            <div className="text-muted text-xs font-bold mb-1" style={{ textTransform: 'uppercase' }}>Details</div>
                            <div className="text-sm">Date: <span className="font-semibold">{inquiry.date}</span></div>
                            <div className="text-sm mt-1">Priority: <span className={`badge ${getPriorityBadge(inquiry.priority)}`}>{inquiry.priority}</span></div>
                        </div>
                    </div>
                    
                    <div>
                        <div className="text-muted text-xs font-bold mb-2" style={{ textTransform: 'uppercase' }}>Message Subject</div>
                        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--black)', marginBottom: 16 }}>{inquiry.subject}</div>
                    </div>

                    <div>
                        <div className="text-muted text-xs font-bold mb-2" style={{ textTransform: 'uppercase' }}>Message Content</div>
                        <div style={{ padding: 20, background: 'var(--surface2)', borderRadius: 12, border: '1px solid var(--border)', fontSize: 14, lineHeight: 1.6, color: 'var(--text-dim)', whiteSpace: 'pre-wrap' }}>
                            {inquiry.message}
                        </div>
                    </div>
                </div>
                <div className="modal-footer" style={{ background: 'var(--surface2)' }}>
                    <button className="btn btn-ghost" onClick={onClose}>Close</button>
                    <a className="btn btn-primary" href={`mailto:${inquiry.email}?subject=Re: ${inquiry.subject}`} style={{ textDecoration: 'none' }}>
                        <Icon name="mail" size={13} /> Reply via Mail
                    </a>
                </div>
            </div>
        </div>
    );
};

export default InquiryDetailModal;