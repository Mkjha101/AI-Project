// Shared types for tourist tracking
export interface Tourist {
  blockchainId: string;
  phoneNumber: string;
  touristInfo?: {
    name?: string;
    email?: string;
    nationality?: string;
  };
  location: {
    latitude: number;
    longitude: number;
  };
  status: string;
  lastUpdated: string;
  issuedAt?: string;
}

export interface LocationUpdate {
  blockchainId: string;
  latitude: number;
  longitude: number;
  accuracy?: number;
  altitude?: number;
  speed?: number;
  heading?: number;
}

export interface TrackingStats {
  totalActive: number;
  statusActive: number;
  statusSuspicious: number;
  statusEmergency: number;
}
