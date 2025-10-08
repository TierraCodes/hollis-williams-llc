import Layout from "./Layout.jsx";

import Dashboard from "./Dashboard";

import Customers from "./Customers";

import Jobs from "./Jobs";

import Calendar from "./Calendar";

import Invoices from "./Invoices";

import Home from "./Home";

import RequestService from "./RequestService";

import MyRequests from "./MyRequests";

import Contact from "./Contact";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    
    Dashboard: Dashboard,
    
    Customers: Customers,
    
    Jobs: Jobs,
    
    Calendar: Calendar,
    
    Invoices: Invoices,
    
    Home: Home,
    
    RequestService: RequestService,
    
    MyRequests: MyRequests,
    
    Contact: Contact,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                
                    <Route path="/" element={<Dashboard />} />
                
                
                <Route path="/Dashboard" element={<Dashboard />} />
                
                <Route path="/Customers" element={<Customers />} />
                
                <Route path="/Jobs" element={<Jobs />} />
                
                <Route path="/Calendar" element={<Calendar />} />
                
                <Route path="/Invoices" element={<Invoices />} />
                
                <Route path="/Home" element={<Home />} />
                
                <Route path="/RequestService" element={<RequestService />} />
                
                <Route path="/MyRequests" element={<MyRequests />} />
                
                <Route path="/Contact" element={<Contact />} />
                
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}