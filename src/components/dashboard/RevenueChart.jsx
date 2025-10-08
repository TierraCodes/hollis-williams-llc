import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";
import { format, parseISO, startOfMonth } from "date-fns";

export default function RevenueChart({ invoices, loading }) {
  const getMonthlyRevenue = () => {
    const monthlyData = {};
    
    invoices.forEach(invoice => {
      if (invoice.payment_status === "paid" && invoice.paid_date) {
        const month = format(startOfMonth(parseISO(invoice.paid_date)), "MMM yyyy");
        monthlyData[month] = (monthlyData[month] || 0) + invoice.amount;
      }
    });

    return Object.entries(monthlyData)
      .map(([month, revenue]) => ({ month, revenue }))
      .slice(-6);
  };

  const data = getMonthlyRevenue();

  return (
    <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm">
      <CardHeader className="border-b border-gray-100">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">Revenue Overview</CardTitle>
          <TrendingUp className="w-5 h-5 text-emerald-600" />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {data.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <TrendingUp className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No revenue data yet</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 12 }} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value) => `$${value.toFixed(2)}`}
              />
              <Bar dataKey="revenue" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
                  <stop offset="100%" stopColor="#059669" stopOpacity={1} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}