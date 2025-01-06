import { motion } from 'framer-motion';
import { GraduationCap, Mail } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { BackButton } from '../components/ui/BackButton';
import { ProgramNotes } from '../components/sections/ProgramNotes';

export function DriverIntakePage() {
  const eligibilityRequirements = [
    "Minimum 2 years experience as a ZappaRides driver",
    "Completed 6,000+ rides successfully",
    "17/24 monthly tasks completed successfully",
    "80% accuracy in performance tests",
    "Minimum 10th pass education or B.Tech with direct interview",
    "70% score in internal examinations",
    "Clean driving record",
    "Excellent customer service ratings"
  ];

  const programBenefits = [
    "Full-time corporate position",
    "Comprehensive health insurance",
    "Retirement benefits",
    "Career development opportunities",
    "Professional training programs",
    "Leadership development",
    "Stock options eligibility",
    "Education assistance"
  ];

  const handleEnroll = () => {
    window.location.href = 'mailto:hr@zapparides.in?subject=Driver Intake Program Enrollment';
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <BackButton />
      </div>

      <section className="py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="text-center mb-16">
            <GraduationCap className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
            <h1 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Driver Intake Program
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Transform your career with our exclusive corporate transition program. 
              Dedicated drivers can now path their way to becoming full-time corporate employees.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-900/50 rounded-3xl p-8 border border-cyan-500/20"
            >
              <h2 className="text-2xl font-bold text-cyan-400 mb-6">Eligibility Requirements</h2>
              <ul className="space-y-4">
                {eligibilityRequirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-300">
                    <span className="text-cyan-400 mt-1">•</span>
                    {req}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-900/50 rounded-3xl p-8 border border-cyan-500/20"
            >
              <h2 className="text-2xl font-bold text-cyan-400 mb-6">Program Benefits</h2>
              <ul className="space-y-4">
                {programBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-300">
                    <span className="text-cyan-400 mt-1">•</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Take the Next Step?</h2>
            <p className="text-gray-300 mb-6">
              Join our corporate team and help shape the future of urban mobility in India.
            </p>
            <Button
              variant="secondary"
              onClick={handleEnroll}
              className="group"
              icon={<Mail className="w-5 h-5" />}
            >
              Enroll Now
            </Button>
          </motion.div>

          <ProgramNotes />
        </motion.div>
      </section>
    </div>
  );
}