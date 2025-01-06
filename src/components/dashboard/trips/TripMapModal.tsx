import { useEffect, useRef } from 'react';
import { Modal } from '../../ui/Modal';
import { Trip } from '../../../types/trip';

interface TripMapModalProps {
  trip: Trip;
  onClose: () => void;
}

export function TripMapModal({ trip, onClose }: TripMapModalProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const googleMapsUrl = `https://www.google.com/maps/embed/v1/directions?key=YOUR_GOOGLE_MAPS_API_KEY&origin=${trip.pickUpLatLng.latitude},${trip.pickUpLatLng.longitude}&destination=${trip.dropOffLatLng.latitude},${trip.dropOffLatLng.longitude}&mode=driving`;

    const iframe = document.createElement('iframe');
    iframe.src = googleMapsUrl;
    iframe.width = '100%';
    iframe.height = '400';
    iframe.style.border = '0';
    iframe.allowFullscreen = true;

    mapRef.current.innerHTML = '';
    mapRef.current.appendChild(iframe);
  }, [trip]);

  return (
    <Modal title="Trip Route" onClose={onClose}>
      <div className="space-y-4">
        <div className="bg-gray-800 rounded-xl overflow-hidden" ref={mapRef} />
        <div className="space-y-2 text-sm text-gray-400">
          <p>From: {trip.pickUpAddress}</p>
          <p>To: {trip.dropOffAddress}</p>
        </div>
      </div>
    </Modal>
  );
}