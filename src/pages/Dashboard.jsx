import React, { useState, useEffect } from "react";
import { Customer, Job, Invoice } from "@/api/entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase, DollarSign, Calendar, TrendingUp, Clock } from "lucide-react";
import { format, isToday, isTomorrow, parseISO } from "date-fns";

import StatsCard from "../components/dashboard/StatsCard";
import UpcomingJobs from "../components/dashboard/UpcomingJobs";
import RecentCustomers from "../components/dashboard/RecentCustomers";
import RevenueChart from "../components/dashboard/RevenueChart";

export default function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [customersData, jobsData, invoicesData] = await Promise.all([
      Customer.list("-created_date"),
      Job.list("-scheduled_date", 50),
      Invoice.list("-invoice_date", 50)
    ]);
    setCustomers(customersData);
    setJobs(jobsData);
    setInvoices(invoicesData);
    setLoading(false);
  };

  const totalRevenue = invoices
    .filter(inv => inv.payment_status === "paid")
    .reduce((sum, inv) => sum + (inv.amount || 0), 0);

  const pendingRevenue = invoices
    .filter(inv => inv.payment_status === "unpaid")
    .reduce((sum, inv) => sum + (inv.amount || 0), 0);

  const upcomingJobs = jobs
    .filter(job => job.status === "scheduled" || job.status === "in_progress")
    .slice(0, 5);

  const todayJobs = jobs.filter(job => {
    if (!job.scheduled_date) return false;
    return isToday(parseISO(job.scheduled_date));
  });

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">Here's what's happening with your business today</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Customers"
            value={customers.length}
            icon={Users}
            color="emerald"
            subtitle={`${customers.filter(c => c.status === 'active').length} active`}
          />
          <StatsCard
            title="Jobs Today"
            value={todayJobs.length}
            icon={Clock}
            color="blue"
            subtitle={`${upcomingJobs.length} upcoming`}
          />
          <StatsCard
            title="Total Revenue"
            value={`$${totalRevenue.toFixed(0)}`}
            icon={DollarSign}
            color="green"
            subtitle="All time"
          />
          <StatsCard
            title="Pending Payments"
            value={`$${pendingRevenue.toFixed(0)}`}
            icon={TrendingUp}
            color="amber"
            subtitle={`${invoices.filter(i => i.payment_status === 'unpaid').length} invoices`}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <UpcomingJobs jobs={upcomingJobs} loading={loading} />
          </div>
          <div>
            <RecentCustomers customers={customers.slice(0, 5)} loading={loading} />
          </div>
        </div>

        <RevenueChart invoices={invoices} loading={loading} />
      </div>
    </div>
  );
}