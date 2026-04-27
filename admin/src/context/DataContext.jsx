import React, { createContext, useContext, useState, useEffect } from 'react';
import { getInitialData, saveToLocal } from '../utils/mockData';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([]);
    const [team, setTeam] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [inquiries, setInquiries] = useState([]);
    const [blogPosts, setBlogPosts] = useState([]);
    const [subscribers, setSubscribers] = useState([]);
    const [profile, setProfile] = useState({ name: 'Admin User', email: 'admin@example.com' });

    // load initial data
    useEffect(() => {
        const data = getInitialData();
        setJobs(data.jobs);
        setApplications(data.applications);
        setTeam(data.team);
        setBookings(data.bookings);
        setInquiries(data.inquiries);
        setBlogPosts(data.blogPosts);
        setSubscribers(data.subscribers);
    }, []);

    // update helpers
    const updateJobs = (newJobs) => { setJobs(newJobs); saveToLocal('jobs', newJobs); };
    const updateApplications = (newApps) => { setApplications(newApps); saveToLocal('applications', newApps); };
    const updateTeam = (newTeam) => { setTeam(newTeam); saveToLocal('team', newTeam); };
    const updateBookings = (newBook) => { setBookings(newBook); saveToLocal('bookings', newBook); };
    const updateInquiries = (newInq) => { setInquiries(newInq); saveToLocal('inquiries', newInq); };
    const updateBlogPosts = (newPosts) => { setBlogPosts(newPosts); saveToLocal('blogPosts', newPosts); };
    const updateSubscribers = (newSubs) => { setSubscribers(newSubs); saveToLocal('subscribers', newSubs); };
    const updateProfile = (newProfile) => { setProfile(newProfile); saveToLocal('profile', newProfile); };

    const value = {
        jobs, setJobs: updateJobs,
        applications, setApplications: updateApplications,
        team, setTeam: updateTeam,
        bookings, setBookings: updateBookings,
        inquiries, setInquiries: updateInquiries,
        blogPosts, setBlogPosts: updateBlogPosts,
        subscribers, setSubscribers: updateSubscribers,
        profile, setProfile: updateProfile
    };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};