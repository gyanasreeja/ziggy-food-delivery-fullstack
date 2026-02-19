import api from './api';

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  cuisine_type: string[];
  address: string;
  phone: string;
  rating: number;
  image_url: string;
  is_active: boolean;
}

export interface MenuItem {
  id: string;
  restaurant_id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  is_vegetarian: boolean;
  is_available: boolean;
}

class RestaurantService {
  async getAllRestaurants(): Promise<Restaurant[]> {
    const response = await api.get<Restaurant[]>('/restaurants');
    return response.data;
  }

  async getRestaurant(id: string): Promise<Restaurant> {
    const response = await api.get<Restaurant>(`/restaurants/${id}`);
    return response.data;
  }

  async getMenu(restaurantId: string): Promise<MenuItem[]> {
    const response = await api.get<MenuItem[]>(`/restaurants/${restaurantId}/menu`);
    return response.data;
  }
}

export default new RestaurantService();
