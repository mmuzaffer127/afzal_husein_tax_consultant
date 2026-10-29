import { Phone, MessageCircle, MapPin } from 'lucide-react';
import { phoneUrl, whatsappUrl, business } from '../lib/business';

export default function MobileContactBar() {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-border shadow-[0_-2px_10px_rgba(0,0,0,0.06)] safe-area-bottom">
      <div className="grid grid-cols-3 divide-x divide-border">
        <a
          href={phoneUrl}
          className="flex flex-col items-center justify-center py-3 text-teal hover:bg-teal/5 transition-colors"
          aria-label="Call us"
        >
          <Phone className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-1">Call</span>
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-3 text-green-600 hover:bg-green-50 transition-colors"
          aria-label="WhatsApp us"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-1">WhatsApp</span>
        </a>
        <a
          href={business.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-3 text-teal hover:bg-teal/5 transition-colors"
          aria-label="Get directions"
        >
          <MapPin className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-1">Directions</span>
        </a>
      </div>
    </div>
  );
}
