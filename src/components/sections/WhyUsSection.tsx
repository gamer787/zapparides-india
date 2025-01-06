import { motion } from 'framer-motion';
import { whyUsReasons } from '../../data/why-us-reasons';

export function WhyUsSection() {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
        >
          Why We Do What We Do
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-12">
          {whyUsReasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="text-center group hover:transform hover:scale-105 transition-all duration-300"
            >
              <reason.icon className="w-16 h-16 text-cyan-400 mx-auto mb-6 group-hover:animate-bounce" />
              <h3 className="text-2xl font-bold text-white mb-4">{reason.title}</h3>
              <p className="text-gray-400">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}