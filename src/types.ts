export type ScreenType = 
  | 'splash'
  | 'auth'
  | 'services'
  | 'quote'
  | 'offers'
  | 'tracking'
  | 'history'
  | 'profile'
  | 'support';

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  activeBadge?: boolean;
}

export interface Provider {
  id: string;
  name: string;
  title: string;
  rating: number;
  reviewCount: number;
  distance: string;
  eta: string;
  basePrice: number;
  avatar: string;
  verified: boolean;
  category: string;
}

export interface ProviderOffer {
  id: string;
  providerName: string;
  avatar: string;
  rating: number;
  servicesCount: number;
  badge: string;
  price: number;
  originalPrice?: number;
  distance: string;
  eta: string;
  note?: string;
  isCounterOffer?: boolean;
  type?: 'individual' | 'empresa';
}

export interface HistoryItem {
  id: string;
  folio: string;
  title: string;
  category: string;
  date: string;
  time: string;
  status: 'completado' | 'en_garantia' | 'finalizado';
  warrantyDays?: number;
  price: number;
  paymentMethod: string;
  paymentIcon: string;
  videoThumb: string;
  videoDuration: string;
  videoTitle: string;
  provider: {
    name: string;
    avatar: string;
    rating: number;
    reviews: number;
    role: string;
    isFavorite?: boolean;
  };
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'provider' | 'system';
  text: string;
  time: string;
  status?: 'sent' | 'delivered' | 'read';
}
