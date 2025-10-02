import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const colorClasses = {
  emerald: "from-emerald-500 to-emerald-600",
  blue: "from-blue-500 to-blue-600",
  green: "from-green-500 to-green-600",
  amber: "from-amber-500 to-amber-600",
};

export default function StatsCard({ title, value, icon: Icon, color, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="relative overflow-hidden border-none shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
        <div className={`absolute top-0 right-0 w-32 h-32 transform translate-x-12 -translate-y-12 bg-gradient-to-br ${colorClasses[color]} rounded-full opacity-10`} />
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-600">{title}</p>
              <CardTitle className="text-3xl font-bold mt-2 text-gray-900">
                {value}
              </CardTitle>
            </div>
            <div className={`p-3 rounded-2xl bg-gradient-to-br ${colorClasses[color]} shadow-lg`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </CardHeader>
        {subtitle && (
          <CardContent className="pt-0">
            <p className="text-xs text-gray-500">{subtitle}</p>
          </CardContent>
        )}
      </Card>
    </motion.div>
  );
}