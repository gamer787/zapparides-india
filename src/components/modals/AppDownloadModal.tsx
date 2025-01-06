import { motion } from 'framer-motion';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Apple, Smartphone } from 'lucide-react';

interface AppDownloadModalProps {
  onClose: () => void;
}

export function AppDownloadModal({ onClose }: AppDownloadModalProps) {
  const handleDownload = (platform: 'ios' | 'android') => {
    const urls = {
      ios: 'https://apps.apple.com/app/zapparides',
      android: 'https://play.google.com/store/apps/details?id=com.zapparides'
    };
    window.open(urls[platform], '_blank');
  };

  return (
    <Modal title="Download ZappaRides" onClose={onClose}>
      <div className="space-y-6">
        <p className="text-gray-300 text-center">
          Download the ZappaRides app to get started with your selected plan.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            onClick={() => handleDownload('ios')}
            className="flex items-center justify-center gap-2"
          >
            <Apple className="w-5 h-5" />
            iOS App
          </Button>
          <Button
            variant="outline"
            onClick={() => handleDownload('android')}
            className="flex items-center justify-center gap-2"
          >
            <Smartphone className="w-5 h-5" />
            Android App
          </Button>
        </div>
      </div>
    </Modal>
  );
}