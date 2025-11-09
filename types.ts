export enum Category {
  RESTAURANT = 'Restaurant',
  RETAIL = 'Retail',
  SERVICE = 'Service',
}

export interface Business {
  id: number;
  name: string;
  category: Category;
  location: string;
  description: string;
  phone?: string;
  website?: string;
}
