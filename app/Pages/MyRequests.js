import { useState, useEffect } from "react";
import { ServiceRequest } from "@/entities/ServiceRequest";
import { User } from "@/entities/User";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, DollarSign, MessageSquare, Phone } from "lucide-react";
import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  reviewed: "bg-blue-100 text-blue-800 border-blue-200",
  scheduled: "bg-green-100 text-green-800 border-green-200",
  completed: "bg-gray-100 text-gray-800 border-gray-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};

const statusLabels = {
  pending: "Pending Review",
  reviewed: "Under Review",
  scheduled: "Scheduled",
  completed: "Completed",
  cancelled: "Cancelled",
};

export default function MyRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const currentUser = await User.me();
      setUser(currentUser);
      
      const allRequests = await ServiceRequest.list("-created_date");
      const userRequests = allRequests.filter(req => 
        req.customer_email === currentUser.email || 
        req.customer_phone === currentUser.phone ||
        req.created_by === currentUser.email
      );
      setRequests(userRequests);
    } catch (error) {
      const allRequests = await ServiceRequest.list("-created_date");
      setRequests(allRequests);
    }
    setLoading(false);
  };

  return (
    <div className="py-12 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              My Service Requests
            </h1>
            <p className="text-lg text-gray-600">
              Track the status of your landscaping service requests
            </p>
          </div>
          <Link to={createPageUrl("RequestService")}>
            <Button className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-lg shadow-emerald-500/30">
              <Calendar className="w-5 h-5 mr-2" />
              New Request
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="space-y-6">
            {Array(3).fill(0).map((_, i) => (
              <Card key={i} className="border-none shadow-xl">
                <CardContent className="p-6">
                  <Skeleton className="h-8 w-64 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : requests.length === 0 ? (
          <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No Requests Yet</h3>
              <p className="text-gray-600 mb-6">
                You haven't submitted any service requests. Ready to get started?
              </p>
              <Link to={createPageUrl("RequestService")}>
                <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-lg shadow-emerald-500/30">
                  <Calendar className="w-5 h-5 mr-2" />
                  Request Service Now
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {requests.map((request, index) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                  <CardHeader className="border-b border-gray-100">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                      <CardTitle className="text-xl">
                        {request.service_type?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </CardTitle>
                      <Badge className={`${statusColors[request.status]} border font-medium`}>
                        {statusLabels[request.status]}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-emerald-600 mt-0.5" />
                          <div>
                            <p className="text-sm text-gray-500">Service Address</p>
                            <p className="font-medium text-gray-900">{request.service_address}</p>
                          </div>
                        </div>

                        {request.preferred_date && (
                          <div className="flex items-start gap-3">
                            <Calendar className="w-5 h-5 text-emerald-600 mt-0.5" />
                            <div>
                              <p className="text-sm text-gray-500">Preferred Date</p>
                              <p className="font-medium text-gray-900">
                                {format(parseISO(request.preferred_date), "MMMM d, yyyy")}
                              </p>
                            </div>
                          </div>
                        )}

                        {request.time_preference && (
                          <div className="flex items-start gap-3">
                            <Clock className="w-5 h-5 text-emerald-600 mt-0.5" />
                            <div>
                              <p className="text-sm text-gray-500">Time Preference</p>
                              <p className="font-medium text-gray-900 capitalize">
                                {request.time_preference}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        {request.estimated_cost && (
                          <div className="flex items-start gap-3">
                            <DollarSign className="w-5 h-5 text-emerald-600 mt-0.5" />
                            <div>
                              <p className="text-sm text-gray-500">Estimated Cost</p>
                              <p className="font-medium text-gray-900 text-lg">
                                ${request.estimated_cost.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        )}

                        {request.scheduled_date && (
                          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                            <p className="text-sm text-emerald-800 font-medium mb-1">Scheduled For:</p>
                            <p className="text-lg font-bold text-emerald-900">
                              {format(parseISO(request.scheduled_date), "MMMM d, yyyy")}
                            </p>
                          </div>
                        )}

                        {request.admin_notes && (
                          <div className="flex items-start gap-3">
                            <MessageSquare className="w-5 h-5 text-blue-600 mt-0.5" />
                            <div>
                              <p className="text-sm text-gray-500">Message from Hollis Williams</p>
                              <p className="text-sm text-gray-700 mt-1">{request.admin_notes}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {request.description && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500 mb-1">Your Request Details:</p>
                        <p className="text-gray-700">{request.description}</p>
                      </div>
                    )}

                    {request.photos && request.photos.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-500 mb-2">Property Photos:</p>
                        <div className="flex flex-wrap gap-2">
                          {request.photos.map((photo, idx) => (
                            <img
                              key={idx}
                              src={photo}
                              alt={`Property ${idx + 1}`}
                              className="w-24 h-24 object-cover rounded-lg border-2 border-gray-200"
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500">
                      Submitted on {format(parseISO(request.created_date), "MMMM d, yyyy 'at' h:mm a")}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}