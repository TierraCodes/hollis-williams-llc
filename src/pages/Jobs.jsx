import React, { useState, useEffect } from "react";
import { Job, Customer } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import JobList from "../components/jobs/JobList";
import JobDialog from "../components/jobs/JobDialog";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [showDialog, setShowDialog] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [jobsData, customersData] = await Promise.all([
      Job.list("-scheduled_date"),
      Customer.list()
    ]);
    setJobs(jobsData);
    setCustomers(customersData);
  };

  const handleSave = async (jobData) => {
    if (editingJob) {
      await Job.update(editingJob.id, jobData);
    } else {
      await Job.create(jobData);
    }
    setShowDialog(false);
    setEditingJob(null);
    loadData();
  };

  const handleDelete = async (id) => {
    await Job.delete(id);
    loadData();
  };

  const handleStatusChange = async (job, newStatus) => {
    await Job.update(job.id, { ...job, status: newStatus });
    loadData();
  };

  const filteredJobs = activeTab === "all" 
    ? jobs 
    : jobs.filter(job => job.status === activeTab);

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Jobs</h1>
            <p className="text-gray-600 mt-1">Schedule and track service appointments</p>
          </div>
          <Button 
            onClick={() => {
              setEditingJob(null);
              setShowDialog(true);
            }}
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-lg shadow-emerald-500/30"
          >
            <Plus className="w-5 h-5 mr-2" />
            Schedule Job
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="bg-white/80 backdrop-blur-sm border border-gray-200">
            <TabsTrigger value="all">All Jobs</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="in_progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>

        <JobList 
          jobs={filteredJobs}
          onEdit={(job) => {
            setEditingJob(job);
            setShowDialog(true);
          }}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />

        <JobDialog
          open={showDialog}
          onOpenChange={setShowDialog}
          job={editingJob}
          customers={customers}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}