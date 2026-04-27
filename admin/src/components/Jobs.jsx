import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import JobFormModal from '../components/JobFormModal';

const Jobs = () => {
  const { jobs, setJobs } = useData();
  const [showModal, setShowModal] = useState(false);
  const [editJob, setEditJob] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm('Delete job?')) setJobs(jobs.filter(j => j.id !== id));
  };
  const toggleActive = (id) => {
    setJobs(jobs.map(j => j.id === id ? { ...j, active: !j.active } : j));
  };
  const isNew = (createdAt) => {
    const days = (new Date() - new Date(createdAt)) / (1000 * 3600 * 24);
    return days < 7;
  };
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Jobs Management</h2>
        <button className="btn btn-primary" onClick={() => { setEditJob(null); setShowModal(true); }}>+ Add Job</button>
      </div>
      <div className="table-responsive">
        <table className="table table-hover bg-white rounded">
          <thead><tr><th>Title</th><th>Department</th><th>Location</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {jobs.map(job => (
              <tr key={job.id}>
                <td>{job.title} {isNew(job.createdAt) && <span className="badge badge-new ms-2">New</span>}</td>
                <td>{job.department}</td><td>{job.location}</td>
                <td><span className={`badge bg-${job.active ? 'success' : 'secondary'}`}>{job.active ? 'Active' : 'Inactive'}</span></td>
                <td>
                  <button className="btn btn-sm btn-outline-primary me-1" onClick={() => { setEditJob(job); setShowModal(true); }}><i className="fas fa-edit"></i></button>
                  <button className="btn btn-sm btn-outline-danger me-1" onClick={() => handleDelete(job.id)}><i className="fas fa-trash"></i></button>
                  <button className="btn btn-sm btn-outline-warning" onClick={() => toggleActive(job.id)}><i className="fas fa-toggle-{job.active ? 'off' : 'on'}"></i></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <JobFormModal show={showModal} handleClose={() => setShowModal(false)} job={editJob} />
    </>
  );
};

export default Jobs;