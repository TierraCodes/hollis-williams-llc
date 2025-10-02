import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Leaf, Calendar, Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    title: "Lawn Maintenance",
    description: "Regular mowing, edging, and trimming to keep your lawn pristine",
    icon: "🌱",
    services: ["Mowing", "Edging", "Trimming", "Weed Control"]
  },
  {
    title: "Landscape Design",
    description: "Transform your outdoor space with professional design and installation",
    icon: "🌺",
    services: ["Garden Beds", "Plant Installation", "Mulching", "Hardscaping"]
  },
  {
    title: "Seasonal Services",
    description: "Prepare your property for every season with expert care",
    icon: "🍂",
    services: ["Spring Cleanup", "Fall Cleanup", "Leaf Removal", "Aeration"]
  },
  {
    title: "Tree & Shrub Care",
    description: "Expert pruning and maintenance for healthy, beautiful plants",
    icon: "🌳",
    services: ["Pruning", "Trimming", "Disease Treatment", "Removal"]
  }
];

const testimonials = [
  {
    name: "Sarah Martinez",
    text: "Hollis Williams transformed our backyard into an oasis. Professional, reliable, and stunning results!",
    rating: 5
  },
  {
    name: "Michael Chen",
    text: "Best landscaping service in the area. They're always on time and do exceptional work.",
    rating: 5
  },
  {
    name: "Jennifer Thompson",
    text: "I've used them for three years now. Consistent quality and friendly service every time.",
    rating: 5
  }
];

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-600 via-green-600 to-emerald-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1558904541-efa843a96f01?w=1200')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="w-8 h-8" />
              <span className="text-sm font-semibold tracking-wider uppercase">Professional Landscaping</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Transform Your Outdoor Space
            </h1>
            <p className="text-xl md:text-2xl text-emerald-50 mb-8">
              Expert landscaping services for residential and commercial properties. Quality work, reliable service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to={createPageUrl("RequestService")}>
                <Button size="lg" className="w-full sm:w-auto bg-white text-emerald-700 hover:bg-emerald-50 shadow-2xl text-lg px-8 py-6">
                  <Calendar className="w-5 h-5 mr-2" />
                  Request Service
                </Button>
              </Link>
              <a href="tel:555-123-4567">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6">
                  Call (555) 123-4567
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive landscaping solutions tailored to your property's unique needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 border-none bg-gradient-to-br from-white to-emerald-50/30">
                  <CardContent className="p-6">
                    <div className="text-5xl mb-4">{service.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.services.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to={createPageUrl("RequestService")}>
              <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-lg shadow-emerald-500/30 text-lg px-8">
                Get Started Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 md:px-6 bg-gradient-to-br from-emerald-50 to-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Hollis Williams LLC?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/20">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Licensed & Insured</h3>
                <p className="text-gray-600">
                  Fully licensed and insured for your peace of mind. Professional service you can trust.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/20">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">5-Star Service</h3>
                <p className="text-gray-600">
                  Consistently rated 5 stars by our customers. Quality work and exceptional service.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/20">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Eco-Friendly</h3>
                <p className="text-gray-600">
                  Environmentally conscious practices and sustainable landscaping solutions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-none shadow-xl bg-gradient-to-br from-white to-emerald-50/30">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">
                      {Array(testimonial.rating).fill(0).map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                    <p className="font-semibold text-gray-900">- {testimonial.name}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 bg-gradient-to-br from-emerald-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Landscape?
          </h2>
          <p className="text-xl text-emerald-50 mb-8">
            Schedule your free consultation today and let's bring your vision to life
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl("RequestService")}>
              <Button size="lg" className="w-full sm:w-auto bg-white text-emerald-700 hover:bg-emerald-50 shadow-2xl text-lg px-8 py-6">
                <Calendar className="w-5 h-5 mr-2" />
                Request Service Now
              </Button>
            </Link>
            <a href="tel:555-123-4567">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6">
                Or Call (555) 123-4567
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}