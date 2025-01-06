import { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Lock } from 'lucide-react';

interface DraggableLoginButtonProps {
  role: string;
  onLoginSuccess: () => void;
  disabled?: boolean;
}

export function DraggableLoginButton({ role, onLoginSuccess, disabled }: DraggableLoginButtonProps) {
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);
  const progress = useTransform(x, [0, 200], [0, 100]);
  const backgroundColor = useTransform(
    progress,
    [0, 100],
    ['rgb(34, 211, 238)', 'rgb(34, 197, 94)']
  );

  const handleDragEnd = () => {
    setIsDragging(false);
    const currentProgress = progress.get();
    if (currentProgress > 90) {
      onLoginSuccess();
    }
    x.set(0);
  };

  return (
    <div className="relative w-full h-14 bg-gray-800/50 rounded-full overflow-hidden">
      <div className="absolute inset-0 flex items-center px-4">
        <span className="text-gray-400">
          {disabled ? 'Loading...' : `Slide to login as ${role}`}
        </span>
      </div>
      
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 200 }}
        dragElastic={0}
        dragMomentum={false}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        style={{ x }}
        className={`absolute left-2 top-2 bottom-2 flex items-center ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
        {...(disabled ? { drag: false } : {})}
      >
        <motion.div
          style={{ backgroundColor }}
          className="w-10 h-10 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing"
        >
          <Lock className="w-5 h-5 text-black" />
        </motion.div>
      </motion.div>

      <motion.div
        style={{
          width: '100%',
          scaleX: progress.get() / 100,
          backgroundColor,
          opacity: 0.2,
          height: '100%',
          transformOrigin: 'left',
          position: 'absolute',
          top: 0,
          left: 0
        }}
      />
    </div>
  );
}