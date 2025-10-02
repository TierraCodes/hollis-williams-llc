import { useState, useEffect } from "react";
import { Job } from "../Entities/Job";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, parseISO, addMonths, subMonths } from "date-fns";

export default function Calendar() {
  const [jobs, setJobs] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    const data = await Job.list("-scheduled_date");
    setJobs(data);
  };

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getJobsForDate = (date) => {
    return jobs.filter(job => {
      if (!job.scheduled_date) return false;
      return isSameDay(parseISO(job.scheduled_date), date);
    });
  };

  const selectedDayJobs = selectedDate ? getJobsForDate(selectedDate) : [];

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
          <p className="text-gray-600 mt-1">View and manage your job schedule</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold">
                    {format(currentDate, "MMMM yyyy")}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-7 gap-2 mb-2">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                    <div key={day} className="text-center text-xs font-semibold text-gray-500 py-2">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {daysInMonth.map(day => {
                    const dayJobs = getJobsForDate(day);
                    const isSelected = selectedDate && isSameDay(day, selectedDate);
                    
                    return (
                      <button
                        key={day.toString()}
                        onClick={() => setSelectedDate(day)}
                        className={`
                          aspect-square p-2 rounded-xl text-sm transition-all duration-200
                          ${!isSameMonth(day, currentDate) ? "text-gray-300" : "text-gray-900"}
                          ${isSelected ? "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg" : "hover:bg-emerald-50"}
                          ${dayJobs.length > 0 && !isSelected ? "bg-emerald-50 font-semibold" : ""}
                        `}
                      >
                        <div className="flex flex-col items-center justify-center h-full">
                          <span>{format(day, "d")}</span>
                          {dayJobs.length > 0 && (
                            <div className={`w-1 h-1 rounded-full mt-1 ${isSelected ? "bg-white" : "bg-emerald-600"}`} />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-emerald-600" />
                  {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select a date"}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {!selectedDate ? (
                  <p className="text-sm text-gray-500 text-center py-8">
                    Click on a date to view scheduled jobs
                  </p>
                ) : selectedDayJobs.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-8">
                    No jobs scheduled for this day
                  </p>
                ) : (
                  <div className="space-y-3">
                    {selectedDayJobs.map(job => (
                      <div
                        key={job.id}
                        className="p-3 rounded-lg bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-100"
                      >
                        <h4 className="font-semibold text-sm text-gray-900">{job.customer_name}</h4>
                        <Badge className="mt-2 bg-emerald-100 text-emerald-800 border-emerald-200 text-xs">
                          {job.service_type?.replace(/_/g, ' ')}
                        </Badge>
                        {job.assigned_to && (
                          <p className="text-xs text-gray-600 mt-2">Assigned: {job.assigned_to}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}