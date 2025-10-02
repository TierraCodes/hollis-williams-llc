import React, { useState } from "react";
import { ServiceRequest } from "@/entities/ServiceRequest";
import { UploadFile } from "@/integrations/Core";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, CheckCircle, Upload, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";

export default function RequestService() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    service_address: "",
    property_size: "medium",
    service_type: "",
    preferred_date: "",
    time_preference: "flexible",
    description: "",
    photos: []
  });
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    setUploading(true);
    
    try {
      const uploadPromises = files.map(file => UploadFile({ file }));
      const results = await Promise.all(uploadPromises);
      const urls = results.map(r => r.file_url);
      
      setFormData({
        ...formData,
        photos: [...formData.photos, ...urls]
      });
    } catch (error) {
      console.error("Error uploading files:", error);
    }
    
    setUploading(false);
  };

  const removePhoto = (index) => {
    setFormData({
      ...formData,
      photos: formData.photos.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      await ServiceRequest.create(formData);
      setSubmitted(true);
      setTimeout(() => {
        navigate(createPageUrl("MyRequests"));
      }, 2000);
    } catch (error) {
      console.error("Error submitting request:", error);
    }
    
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Request Submitted!</h2>
          <p className="text-xl text-gray-600 mb-2">We'll review your request and contact you shortly.</p>
          <p className="text-sm text-gray-500">Redirecting to your requests...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Request a Service
          </h1>
          <p className="text-lg text-gray-600">
            Tell us about your landscaping needs and we'll get back to you within 24 hours
          </p>
        </div>

        <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Calendar className="w-6 h-6 text-emerald-600" />
              Service Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="customer_name">Full Name *</Label>
                  <Input
                    id="customer_name"
                    value={formData.customer_name}
                    onChange={(e) => setFormData({...formData, customer_name: e.target.value})}
                    required
                    placeholder="John Smith"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customer_phone">Phone Number *</Label>
                  <Input
                    id="customer_phone"
                    type="tel"
                    value={formData.customer_phone}
                    onChange={(e) => setFormData({...formData, customer_phone: e.target.value})}
                    required
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="customer_email">Email Address</Label>
                <Input
                  id="customer_email"
                  type="email"
                  value={formData.customer_email}
                  onChange={(e) => setFormData({...formData, customer_email: e.target.value})}
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="service_address">Service Address *</Label>
                <Input
                  id="service_address"
                  value={formData.service_address}
                  onChange={(e) => setFormData({...formData, service_address: e.target.value})}
                  required
                  placeholder="123 Main Street, City, State ZIP"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="property_size">Property Size</Label>
                  <Select
                    value={formData.property_size}
                    onValueChange={(value) => setFormData({...formData, property_size: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small (Under 5,000 sq ft)</SelectItem>
                      <SelectItem value="medium">Medium (5,000-10,000 sq ft)</SelectItem>
                      <SelectItem value="large">Large (10,000-20,000 sq ft)</SelectItem>
                      <SelectItem value="extra_large">Estate (20,000+ sq ft)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service_type">Service Needed *</Label>
                  <Select
                    value={formData.service_type}
                    onValueChange={(value) => setFormData({...formData, service_type: value})}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mowing">Lawn Mowing</SelectItem>
                      <SelectItem value="trimming">Trimming & Edging</SelectItem>
                      <SelectItem value="mulching">Mulching</SelectItem>
                      <SelectItem value="leaf_removal">Leaf Removal</SelectItem>
                      <SelectItem value="spring_cleanup">Spring Cleanup</SelectItem>
                      <SelectItem value="fall_cleanup">Fall Cleanup</SelectItem>
                      <SelectItem value="aeration">Lawn Aeration</SelectItem>
                      <SelectItem value="seeding">Seeding</SelectItem>
                      <SelectItem value="landscape_installation">Landscape Installation</SelectItem>
                      <SelectItem value="tree_service">Tree Service</SelectItem>
                      <SelectItem value="consultation">Free Consultation</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="preferred_date">Preferred Date</Label>
                  <Input
                    id="preferred_date"
                    type="date"
                    value={formData.preferred_date}
                    onChange={(e) => setFormData({...formData, preferred_date: e.target.value})}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time_preference">Time Preference</Label>
                  <Select
                    value={formData.time_preference}
                    onValueChange={(value) => setFormData({...formData, time_preference: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning (8am-12pm)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (12pm-5pm)</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Additional Details</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={4}
                  placeholder="Tell us more about what you need... any special requirements, concerns, or questions?"
                />
              </div>

              <div className="space-y-3">
                <Label>Property Photos (Optional)</Label>
                <p className="text-sm text-gray-500">Upload photos to help us better understand your needs</p>
                
                <div className="flex flex-wrap gap-3">
                  {formData.photos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={photo} 
                        alt={`Property ${index + 1}`}
                        className="w-24 h-24 object-cover rounded-lg border-2 border-emerald-200"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  
                  <label className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50 transition-all">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                    {uploading ? (
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-600" />
                    ) : (
                      <Upload className="w-6 h-6 text-gray-400" />
                    )}
                  </label>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <Button
                  type="submit"
                  size="lg"
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-lg shadow-emerald-500/30 text-lg py-6"
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Calendar className="w-5 h-5 mr-2" />
                      Submit Request
                    </>
                  )}
                </Button>
                <p className="text-center text-sm text-gray-500 mt-3">
                  We'll review your request and contact you within 24 hours
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}