import React from 'react';
import { Instagram, Twitter, Facebook, Youtube, Mail, MessageCircle } from 'lucide-react';

interface SocialLinksProps {
  onContactClick: () => void;
}

export function SocialLinks({ onContactClick }: SocialLinksProps) {
  const socialIcons = [
    { Icon: Instagram, href: '#' },
    { Icon: Twitter, href: '#' },
    { Icon: Facebook, href: '#' },
    { Icon: Youtube, href: '#' },
    { Icon: Mail, onClick: onContactClick },
    { Icon: MessageCircle, onClick: onContactClick }
  ];

  return (
    <div className="pb-12">
      <div className="flex justify-center space-x-8">
        {socialIcons.map(({ Icon, href, onClick }, index) => (
          <a
            key={index}
            href={href || '#'}
            onClick={(e) => {
              if (onClick) {
                e.preventDefault();
                onClick();
              }
            }}
            className="text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <Icon className="w-8 h-8" />
          </a>
        ))}
      </div>
    </div>
  );
}