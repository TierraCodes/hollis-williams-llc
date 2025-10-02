import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Contact() {
  return (
    <div className="py-12 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Get In Touch
          </h1>
          <p className="text-lg text-gray-600">
            We're here to answer your questions and schedule your service
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Phone</p>
                    <a href="tel:555-123-4567" className="text-emerald-600 hover:text-emerald-700 text-lg">
                      (555) 123-4567
                    </a>
                    <p className="text-sm text-gray-500 mt-1">Call us during business hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Email</p>
                    <a href="mailto:info@holliswilliams.com" className="text-emerald-600 hover:text-emerald-700">
                      info@holliswilliams.com
                    </a>
                    <p className="text-sm text-gray-500 mt-1">We'll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Business Hours</p>
                    <p className="text-gray-700">Monday - Saturday</p>
                    <p className="text-gray-700">7:00 AM - 6:00 PM</p>
                    <p className="text-sm text-gray-500 mt-1">Closed Sundays</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Service Area</p>
                    <p className="text-gray-700">Greater Metropolitan Area</p>
                    <p className="text-sm text-gray-500 mt-1">Serving residential & commercial properties</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl bg-gradient-to-br from-emerald-600 to-green-600 text-white">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold">Quick Service Request</h2>
              </div>
              
              <p className="text-emerald-50 mb-6 text-lg">
                Need landscaping services? Submit a request online and we'll contact you with a free estimate within 24 hours.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-emerald-50">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <span className="font-bold">1</span>
                  </div>
                  <span>Fill out the service request form</span>
                </div>
                <div className="flex items-center gap-3 text-emerald-50">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <span className="font-bold">2</span>
                  </div>
                  <span>We'll review and contact you</span>
                </div>
                <div className="flex items-center gap-3 text-emerald-50">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <span className="font-bold">3</span>
                  </div>
                  <span>Schedule your service</span>
                </div>
              </div>

              <Link to={createPageUrl("RequestService")} className="block mt-8">
                <Button size="lg" className="w-full bg-white text-emerald-700 hover:bg-emerald-50 shadow-2xl text-lg py-6">
                  Request Service Now
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <Card className="border-none shadow-xl bg-gradient-to-br from-emerald-50 to-green-50">
          <CardContent className="p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Emergency Services Available
            </h2>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              For urgent landscaping needs like storm damage or fallen trees, call us immediately. 
              We offer emergency services to protect your property.
            </p>
            <a href="tel:555-123-4567">
              <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-lg shadow-emerald-500/30 text-lg px-8">
                <Phone className="w-5 h-5 mr-2" />
                Call Now: (555) 123-4567
              </Button>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}