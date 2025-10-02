import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock } from "lucide-react";
import { format, parseISO, isToday, isTomorrow } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

const serviceColors = {
  mowing: "bg-green-100 text-green-800 border-green-200",
  trimming: "bg-blue-100 text-blue-800 border-blue-200",
  mulching: "bg-amber-100 text-amber-800 border-amber-200",
  leaf_removal: "bg-orange-100 text-orange-800 border-orange-200",
  other: "bg-gray-100 text-gray-800 border-gray-200",
};

type ServiceType = "mowing" | "trimming" | "mulching" | "leaf_removal" | "other";

type Job = {
  id: string | number;
  customer_name: string;
  service_address: string;
  service_type: ServiceType;
  scheduled_date: string;
  estimated_duration?: number;
};

interface UpcomingJobsProps {
  jobs: Job[];
  loading: boolean;
}

export default function UpcomingJobs({ jobs, loading }: UpcomingJobsProps) {
  const getDateLabel = (dateString: string) => {
    const date = parseISO(dateString);
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    return format(date, "MMM d");
  };

  return (
    <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm">
      <CardHeader className="border-b border-gray-100">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">Upcoming Jobs</CardTitle>
          <Calendar className="w-5 h-5 text-emerald-600" />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {loading ? (
          <div className="space-y-4">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-16 w-full" />
              </div>
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No upcoming jobs scheduled</p>
          </div>
        ) : (
          <div className="space-y-4">
                  <Badge className={`${serviceColors[job.service_type as ServiceType] || serviceColors.other} border font-medium`}>
                    {job.service_type?.replace(/_/g, ' ')}
                  </Badge>
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-xl bg-gradient-to-r from-emerald-50/50 to-green-50/50 border border-emerald-100 hover:shadow-md transition-all duration-200"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{job.customer_name}</h4>
                    <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                      <MapPin className="w-3 h-3" />
                      <span className="text-xs">{job.service_address}</span>
                    </div>
                  </div>
                  <Badge className={`${serviceColors[job.service_type] || serviceColors.other} border font-medium`}>
                    {job.service_type?.replace(/_/g, ' ')}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{getDateLabel(job.scheduled_date)}</span>
                  </div>
                  {job.estimated_duration && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{job.estimated_duration}h</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}