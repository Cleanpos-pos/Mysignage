import restaurantData from "@/data/easyfood_restaurants.json";

export interface Restaurant {
  name: string;
  slug: string;
  url: string;
  id: string;
  image: string;
  cuisines: string[];
  rating: string;
  address: string;
  min_order: string;
  delivery_time: string;
  collection_time: string;
}

export interface Area {
  area: string;
  name: string;
  restaurant_count: number;
  restaurants: Restaurant[];
}

const data = restaurantData as Record<string, Area>;

export function getAllAreas(): Area[] {
  return Object.values(data).sort((a, b) => b.restaurant_count - a.restaurant_count);
}

export function getAreaBySlug(slug: string): Area | undefined {
  return data[slug];
}

export function getAllRestaurants(): Restaurant[] {
  return Object.values(data).flatMap((a) => a.restaurants);
}

export function getTotalCount(): { areas: number; restaurants: number } {
  const areas = Object.keys(data).length;
  const restaurants = Object.values(data).reduce(
    (sum, a) => sum + a.restaurant_count,
    0
  );
  return { areas, restaurants };
}
