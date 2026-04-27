const RecentActivity = ({ jobs, applications, inquiries }) => {
    return (
        <div className="row">
            <div className="col-md-4 mb-4">
                <div className="card h-100">
                    <div className="card-header">Recent Jobs</div>
                    <ul className="list-group list-group-flush">
                        {jobs.slice(0, 3).map(j => <li key={j.id} className="list-group-item">{j.title}</li>)}
                    </ul>
                </div>
            </div>
            <div className="col-md-4 mb-4">
                <div className="card h-100">
                    <div className="card-header">Recent Applications</div>
                    <ul className="list-group list-group-flush">
                        {applications.slice(0, 3).map(a => <li key={a.id} className="list-group-item">{a.applicantName} - {a.status}</li>)}
                    </ul>
                </div>
            </div>
            <div className="col-md-4 mb-4">
                <div className="card h-100">
                    <div className="card-header">Recent Inquiries</div>
                    <ul className="list-group list-group-flush">
                        {inquiries.slice(0, 3).map(i => <li key={i.id} className="list-group-item">{i.name} - {i.subject}</li>)}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default RecentActivity;