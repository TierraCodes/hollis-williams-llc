import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Edit, Trash2, Clock, User, CheckCircle, PlayCircle } from "lucide-react";
import { format, parseISO, isToday, isTomorrow, isPast } from "date-fns";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const serviceColors = {
  mowing: "bg-green-100 text-green-800 border-green-200",
  trimming: "bg-blue-100 text-blue-800 border-blue-200",
  edging: "bg-cyan-100 text-cyan-800 border-cyan-200",
  mulching: "bg-amber-100 text-amber-800 border-amber-200",
  leaf_removal: "bg-orange-100 text-orange-800 border-orange-200",
  spring_cleanup: "bg-pink-100 text-pink-800 border-pink-200",
  fall_cleanup: "bg-purple-100 text-purple-800 border-purple-200",
  aeration: "bg-indigo-100 text-indigo-800 border-indigo-200",
  other: "bg-gray-100 text-gray-800 border-gray-200",
};

const statusColors = {
  scheduled: "bg-blue-100 text-blue-800 border-blue-200",
  in_progress: "bg-yellow-100 text-yellow-800 border-yellow-200",
  completed: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};

export default function JobList({ jobs, onEdit, onDelete, onStatusChange }) {
  const getDateLabel = (dateString) => {
    const date = parseISO(dateString);
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    if (isPast(date) && !isToday(date)) return "Past Due";
    return format(date, "MMM d, yyyy");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {jobs.map((job, index) => (
        <motion.div
          key={job.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <Card className="p-6 hover:shadow-2xl transition-all duration-300 border-none bg-white/80 backdrop-blur-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900">{job.customer_name}</h3>
                <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                  <MapPin className="w-3 h-3" />
                  <span className="text-xs">{job.service_address}</span>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Badge className={`${statusColors[job.status]} border font-medium cursor-pointer`}>
                      {job.status?.replace(/_/g, ' ')}
                    </Badge>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => onStatusChange(job, "scheduled")}>
                    <Calendar className="w-4 h-4 mr-2" />
                    Scheduled
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onStatusChange(job, "in_progress")}>
                    <PlayCircle className="w-4 h-4 mr-2" />
                    In Progress
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onStatusChange(job, "completed")}>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Completed
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="space-y-3 mb-4">
              <Badge className={`${serviceColors[job.service_type] || serviceColors.other} border font-medium`}>
                {job.service_type?.replace(/_/g, ' ')}
              </Badge>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  <span className="font-medium">{getDateLabel(job.scheduled_date)}</span>
                </div>
                {job.estimated_duration && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    <span>{job.estimated_duration}h</span>
                  </div>
                )}
              </div>

              {job.assigned_to && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User className="w-4 h-4 text-emerald-600" />
                  <span>{job.assigned_to}</span>
                </div>
              )}

              {job.notes && (
                <p className="text-xs text-gray-600 p-2 bg-gray-50 rounded-lg">
                  {job.notes}
                </p>
              )}

              {job.completion_notes && (
                <p className="text-xs text-green-700 p-2 bg-green-50 rounded-lg border border-green-200">
                  <strong>Completed:</strong> {job.completion_notes}
                </p>
              )}
            </div>

            <div className="flex gap-2 pt-4 border-t border-gray-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(job)}
                className="flex-1 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300"
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(job.id)}
                className="hover:bg-red-50 hover:text-red-700 hover:border-red-300"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </motion.div>
      ))}

      {jobs.length === 0 && (
        <div className="col-span-full text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500">No jobs found</p>
        </div>
      )}
    </div>
  );
}