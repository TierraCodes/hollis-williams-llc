import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, Phone, MapPin } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function RecentCustomers({ customers, loading }) {
  return (
    <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm">
      <CardHeader className="border-b border-gray-100">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">Recent Customers</CardTitle>
          <Users className="w-5 h-5 text-emerald-600" />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {loading ? (
          <div className="space-y-4">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-32" />
              </div>
            ))}
          </div>
        ) : customers.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No customers yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {customers.map((customer) => (
              <div
                key={customer.id}
                className="p-3 rounded-lg bg-gradient-to-r from-slate-50 to-gray-50 hover:shadow-md transition-all duration-200 border border-gray-100"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-900 text-sm">{customer.name}</h4>
                  <Badge variant="outline" className={customer.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-100 text-gray-600'}>
                    {customer.status}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <Phone className="w-3 h-3" />
                    <span>{customer.phone}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{customer.service_address}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}