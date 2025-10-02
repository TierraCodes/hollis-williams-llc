import { useState, useEffect } from "react";
import { Invoice, Customer, Job } from "@/entities/all";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import InvoiceList from "../Components/invoices/InvoiceList.js";
import InvoiceDialog from "../Components/invoices/InvoiceDialog.js";

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [showDialog, setShowDialog] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [invoicesData, customersData, jobsData] = await Promise.all([
      Invoice.list("-invoice_date"),
      Customer.list(),
      Job.list()
    ]);
    setInvoices(invoicesData);
    setCustomers(customersData);
    setJobs(jobsData);
  };

  const handleSave = async (invoiceData) => {
    if (editingInvoice) {
      await Invoice.update(editingInvoice.id, invoiceData);
    } else {
      await Invoice.create(invoiceData);
    }
    setShowDialog(false);
    setEditingInvoice(null);
    loadData();
  };

  const handleDelete = async (id) => {
    await Invoice.delete(id);
    loadData();
  };

  const filteredInvoices = activeTab === "all" 
    ? invoices 
    : invoices.filter(inv => inv.payment_status === activeTab);

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Invoices</h1>
            <p className="text-gray-600 mt-1">Track payments and billing</p>
          </div>
          <Button 
            onClick={() => {
              setEditingInvoice(null);
              setShowDialog(true);
            }}
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-lg shadow-emerald-500/30"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Invoice
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="bg-white/80 backdrop-blur-sm border border-gray-200">
            <TabsTrigger value="all">All Invoices</TabsTrigger>
            <TabsTrigger value="unpaid">Unpaid</TabsTrigger>
            <TabsTrigger value="partial">Partial</TabsTrigger>
            <TabsTrigger value="paid">Paid</TabsTrigger>
          </TabsList>
        </Tabs>

        <InvoiceList 
          invoices={filteredInvoices}
          onEdit={(invoice) => {
            setEditingInvoice(invoice);
            setShowDialog(true);
          }}
          onDelete={handleDelete}
        />

        <InvoiceDialog
          open={showDialog}
          onOpenChange={setShowDialog}
          invoice={editingInvoice}
          customers={customers}
          jobs={jobs}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}