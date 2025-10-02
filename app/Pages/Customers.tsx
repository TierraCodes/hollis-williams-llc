import React, { useState, useEffect } from "react";
import { Customer } from "@/entities/Customer";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

import CustomerList from "../components/customers/CustomerList";
import CustomerDialog from "../components/customers/CustomerDialog";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    const data = await Customer.list("-created_date");
    setCustomers(data);
  };

  const handleSave = async (customerData) => {
    if (editingCustomer) {
      await Customer.update(editingCustomer.id, customerData);
    } else {
      await Customer.create(customerData);
    }
    setShowDialog(false);
    setEditingCustomer(null);
    loadCustomers();
  };

  const handleDelete = async (id) => {
    await Customer.delete(id);
    loadCustomers();
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.service_address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone?.includes(searchTerm)
  );

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
            <p className="text-gray-600 mt-1">Manage your client base</p>
          </div>
          <Button 
            onClick={() => {
              setEditingCustomer(null);
              setShowDialog(true);
            }}
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-lg shadow-emerald-500/30"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Customer
          </Button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search customers by name, address, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/80 backdrop-blur-sm border-gray-200 focus:border-emerald-400"
            />
          </div>
        </div>

        <CustomerList 
          customers={filteredCustomers}
          onEdit={(customer) => {
            setEditingCustomer(customer);
            setShowDialog(true);
          }}
          onDelete={handleDelete}
        />

        <CustomerDialog
          open={showDialog}
          onOpenChange={setShowDialog}
          customer={editingCustomer}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}