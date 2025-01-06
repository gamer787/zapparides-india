import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Phone, Mail, MessageCircle } from 'lucide-react';

interface ContactModalProps {
  onClose: () => void;
}

export function ContactModal({ onClose }: ContactModalProps) {
  const contactMethods = [
    {
      icon: Phone,
      label: 'Call Us',
      action: () => window.open('tel:+919876543210'),
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      action: () => window.open('https://wa.me/919876543210'),
    },
    {
      icon: Mail,
      label: 'Email',
      action: () => window.open('mailto:support@zapparides.com'),
    },
  ];

  return (
    <Modal title="Contact Our Team" onClose={onClose}>
      <div className="space-y-6">
        <p className="text-gray-300 text-center">
          Choose your preferred way to connect with our team.
        </p>
        <div className="space-y-4">
          {contactMethods.map(({ icon: Icon, label, action }) => (
            <Button
              key={label}
              variant="outline"
              onClick={action}
              className="w-full flex items-center justify-center gap-2"
            >
              <Icon className="w-5 h-5" />
              {label}
            </Button>
          ))}
        </div>
      </div>
    </Modal>
  );
}