import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, MapPin, Edit, Trash2, Home } from "lucide-react";
import { motion } from "framer-motion";

const propertySizeLabels = {
  small: "Small Lot",
  medium: "Medium Lot",
  large: "Large Lot",
  extra_large: "Estate"
};

export default function CustomerList({ customers, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {customers.map((customer, index) => (
        <motion.div
          key={customer.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <Card className="p-6 hover:shadow-2xl transition-all duration-300 border-none bg-white/80 backdrop-blur-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg text-gray-900">{customer.name}</h3>
                {customer.property_size && (
                  <div className="flex items-center gap-1 mt-1">
                    <Home className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500">{propertySizeLabels[customer.property_size]}</span>
                  </div>
                )}
              </div>
              <Badge className={customer.status === 'active' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gray-100 text-gray-600'}>
                {customer.status}
              </Badge>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4 mt-0.5 text-emerald-600" />
                <span>{customer.phone}</span>
              </div>
              {customer.email && (
                <div className="text-sm text-gray-600">
                  {customer.email}
                </div>
              )}
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 mt-0.5 text-emerald-600" />
                <span className="flex-1">{customer.service_address}</span>
              </div>
            </div>

            {customer.notes && (
              <p className="text-xs text-gray-500 mb-4 p-2 bg-gray-50 rounded-lg">
                {customer.notes}
              </p>
            )}

            <div className="flex gap-2 pt-4 border-t border-gray-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(customer)}
                className="flex-1 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300"
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(customer.id)}
                className="hover:bg-red-50 hover:text-red-700 hover:border-red-300"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </motion.div>
      ))}

      {customers.length === 0 && (
        <div className="col-span-full text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <MapPin className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500">No customers found</p>
        </div>
      )}
    </div>
  );
}