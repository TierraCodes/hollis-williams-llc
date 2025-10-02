import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function JobDialog({ open, onOpenChange, job, customers, onSave }) {
  const [formData, setFormData] = useState({
    customer_id: "",
    customer_name: "",
    service_address: "",
    service_type: "mowing",
    scheduled_date: "",
    status: "scheduled",
    estimated_duration: "",
    assigned_to: "",
    notes: "",
    completion_notes: ""
  });

  useEffect(() => {
    if (job) {
      setFormData(job);
    } else {
      setFormData({
        customer_id: "",
        customer_name: "",
        service_address: "",
        service_type: "mowing",
        scheduled_date: "",
        status: "scheduled",
        estimated_duration: "",
        assigned_to: "",
        notes: "",
        completion_notes: ""
      });
    }
  }, [job, open]);

  const handleCustomerChange = (customerId) => {
    const customer = customers.find(c => c.id === customerId);
    if (customer) {
      setFormData({
        ...formData,
        customer_id: customerId,
        customer_name: customer.name,
        service_address: customer.service_address
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {job ? "Edit Job" : "Schedule New Job"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="customer">Customer *</Label>
              <Select
                value={formData.customer_id}
                onValueChange={handleCustomerChange}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select customer" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map(customer => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name} - {customer.service_address}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="service_type">Service Type *</Label>
                <Select
                  value={formData.service_type}
                  onValueChange={(value) => setFormData({...formData, service_type: value})}
                  required
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mowing">Mowing</SelectItem>
                    <SelectItem value="trimming">Trimming</SelectItem>
                    <SelectItem value="edging">Edging</SelectItem>
                    <SelectItem value="mulching">Mulching</SelectItem>
                    <SelectItem value="leaf_removal">Leaf Removal</SelectItem>
                    <SelectItem value="spring_cleanup">Spring Cleanup</SelectItem>
                    <SelectItem value="fall_cleanup">Fall Cleanup</SelectItem>
                    <SelectItem value="aeration">Aeration</SelectItem>
                    <SelectItem value="seeding">Seeding</SelectItem>
                    <SelectItem value="landscape_installation">Landscape Installation</SelectItem>
                    <SelectItem value="tree_service">Tree Service</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="scheduled_date">Scheduled Date *</Label>
                <Input
                  id="scheduled_date"
                  type="date"
                  value={formData.scheduled_date}
                  onChange={(e) => setFormData({...formData, scheduled_date: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="estimated_duration">Est. Duration (hours)</Label>
                <Input
                  id="estimated_duration"
                  type="number"
                  step="0.5"
                  value={formData.estimated_duration}
                  onChange={(e) => setFormData({...formData, estimated_duration: parseFloat(e.target.value)})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="assigned_to">Assigned To</Label>
                <Input
                  id="assigned_to"
                  value={formData.assigned_to}
                  onChange={(e) => setFormData({...formData, assigned_to: e.target.value})}
                  placeholder="Team member name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Job Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                rows={2}
                placeholder="Special instructions..."
              />
            </div>

            {job && (
              <div className="space-y-2">
                <Label htmlFor="completion_notes">Completion Notes</Label>
                <Textarea
                  id="completion_notes"
                  value={formData.completion_notes}
                  onChange={(e) => setFormData({...formData, completion_notes: e.target.value})}
                  rows={2}
                  placeholder="Add notes after completing the job..."
                />
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-emerald-500 to-emerald-600">
              {job ? "Update Job" : "Schedule Job"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}