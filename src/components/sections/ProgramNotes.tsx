import { motion } from 'framer-motion';
import { AlertCircle, FileText, Clock, Shield } from 'lucide-react';

export function ProgramNotes() {
  const notes = [
    {
      icon: FileText,
      title: "Program Terms",
      points: [
        "Initial 3-month probation period in corporate role",
        "Performance reviews every quarter",
        "Commitment to continuous learning and development",
        "Adherence to corporate policies and procedures",
        "Maintaining professional conduct standards"
      ]
    },
    {
      icon: Clock,
      title: "Timeline & Process",
      points: [
        "Application review: 2-4 weeks",
        "Initial assessment and interviews: 2-3 weeks",
        "Department placement based on skills and interests",
        "Customized training program: 1-2 months",
        "Regular progress monitoring and feedback"
      ]
    },
    {
      icon: Shield,
      title: "Legal Considerations",
      points: [
        "Employment contract terms as per labor laws",
        "Non-disclosure agreement requirement",
        "Benefits and compensation structure",
        "Leave and attendance policies",
        "Intellectual property rights"
      ]
    }
  ];

  return (
    <div className="mt-24 bg-gray-900/50 rounded-3xl p-8 border border-cyan-500/20">
      <div className="flex items-center gap-3 mb-8">
        <AlertCircle className="w-8 h-8 text-cyan-400" />
        <h2 className="text-2xl font-bold text-cyan-400">Important Program Notes</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {notes.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <section.icon className="w-5 h-5 text-cyan-400" />
              <h3 className="font-semibold text-white">{section.title}</h3>
            </div>
            <ul className="space-y-3">
              {section.points.map((point, pointIndex) => (
                <li key={pointIndex} className="text-gray-400 text-sm flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 p-4 bg-cyan-500/10 rounded-xl text-sm text-gray-400"
      >
        <p className="mb-2">
          <span className="text-cyan-400 font-semibold">Note:</span> This program is subject to 
          availability and company requirements. Meeting eligibility criteria does not guarantee 
          selection. The company reserves the right to modify program terms and conditions.
        </p>
        <p>
          For detailed program information and current openings, please contact our HR department 
          at <a href="mailto:hr@zapparides.in" className="text-cyan-400 hover:underline">
            hr@zapparides.in
          </a>
        </p>
      </motion.div>
    </div>
  );
}