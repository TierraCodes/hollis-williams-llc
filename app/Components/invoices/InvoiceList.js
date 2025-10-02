import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Calendar, DollarSign } from "lucide-react";
import { format, parseISO } from "date-fns";
import { motion } from "framer-motion";

const statusColors = {
  unpaid: "bg-red-100 text-red-800 border-red-200",
  partial: "bg-yellow-100 text-yellow-800 border-yellow-200",
  paid: "bg-green-100 text-green-800 border-green-200",
};

export default function InvoiceList({ invoices, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {invoices.map((invoice, index) => (
        <motion.div
          key={invoice.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <Card className="p-6 hover:shadow-2xl transition-all duration-300 border-none bg-white/80 backdrop-blur-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg text-gray-900">{invoice.customer_name}</h3>
                {invoice.invoice_number && (
                  <p className="text-xs text-gray-500 mt-1">#{invoice.invoice_number}</p>
                )}
              </div>
              <Badge className={`${statusColors[invoice.payment_status]} border font-medium`}>
                {invoice.payment_status}
              </Badge>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-medium text-gray-700">Amount</span>
                </div>
                <span className="text-lg font-bold text-gray-900">${invoice.amount?.toFixed(2)}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4 text-emerald-600" />
                <span>Issued: {format(parseISO(invoice.invoice_date), "MMM d, yyyy")}</span>
              </div>

              {invoice.due_date && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 text-orange-500" />
                  <span>Due: {format(parseISO(invoice.due_date), "MMM d, yyyy")}</span>
                </div>
              )}

              {invoice.paid_date && (
                <div className="flex items-center gap-2 text-sm text-green-700">
                  <Calendar className="w-4 h-4 text-green-600" />
                  <span>Paid: {format(parseISO(invoice.paid_date), "MMM d, yyyy")}</span>
                </div>
              )}
            </div>

            {invoice.service_description && (
              <p className="text-xs text-gray-600 mb-4 p-2 bg-gray-50 rounded-lg">
                {invoice.service_description}
              </p>
            )}

            <div className="flex gap-2 pt-4 border-t border-gray-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(invoice)}
                className="flex-1 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300"
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(invoice.id)}
                className="hover:bg-red-50 hover:text-red-700 hover:border-red-300"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </motion.div>
      ))}

      {invoices.length === 0 && (
        <div className="col-span-full text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <DollarSign className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500">No invoices found</p>
        </div>
      )}
    </div>
  );
}