import { motion } from 'framer-motion';
import { Car, Users, Globe, Bike } from 'lucide-react';

export function AboutSection() {
  const features = [
    {
      icon: Bike,
      title: "tailored solutions",
      description: "At Zappa Rides, we are committed to continually improving how we tackle challenges and delivering solutions tailored to each problem."
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Backed by experienced professionals in mobility and financial solutions to ensure you get the best price and a optimal customer experience"
    },
    {
      icon: Globe,
      title: "Pan India Vision ",
      description: "We are currently operating in telangana state but are focused on Expanding across major cities with localized solutions"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              About ZappaRides
            </h2>
            <p className="text-gray-300 text-lg">
              Founded in 2024, ZappaRides emerged from a simple yet powerful idea: 
              to create a ride-hailing service that truly serves both drivers and riders.
            </p>
            <p className="text-gray-300 text-lg">
              Our team of passionate innovators is dedicated to revolutionizing urban 
              mobility in India through cutting-edge technology, fair practices and transparency.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="grid gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="flex items-start space-x-4 p-6 bg-gray-800/30 rounded-xl border border-cyan-500/20"
              >
                <feature.icon className="w-8 h-8 text-cyan-400 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}