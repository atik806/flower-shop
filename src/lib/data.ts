export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  badge?: string;
  image: string;
  colors: string;
};

export const categories = [
  { name: "Roses", image: "/products/flower-3.jpg" },
  { name: "Romance", image: "/images/category-romance.jpg" },
  { name: "Birthdays", image: "/images/category-birthday.jpg" },
  { name: "Gift sets", image: "/images/category-gift.jpg" },
];

export const products: Product[] = [
  { id: "p1", name: "Lily Rose Melody 5", category: "Roses", price: 5500, rating: 4.9, badge: "Best seller", colors: "Red roses & pink lilies", image: "/products/flower-1.jpg" },
  { id: "p2", name: "Fiery Finesse", category: "Romance", price: 4850, rating: 4.8, badge: "Popular", colors: "Pink lilies & roses", image: "/products/flower-2.jpg" },
  { id: "p3", name: "Steps of Love", category: "Roses", price: 5250, rating: 4.9, colors: "Classic red roses", image: "/products/flower-3.jpg" },
  { id: "p4", name: "Baby Pink Gift Set", category: "Gift sets", price: 7499, rating: 4.8, badge: "Gift set", colors: "Pastel flowers, teddy & balloons", image: "/products/flower-4.jpg" },
  { id: "p5", name: "Country Romance", category: "Romance", price: 4850, rating: 4.7, colors: "Mixed roses & gerbera", image: "/products/flower-5.jpg" },
  { id: "p6", name: "Love and Romance 1", category: "Roses", price: 5950, rating: 4.9, badge: "Best seller", colors: "Premium red roses", image: "/products/flower-6.jpg" },
  { id: "p7", name: "White Orchid Birthday Combo", category: "Birthdays", price: 4999, rating: 4.6, badge: "Combo", colors: "White orchids, balloons & cake", image: "/products/flower-7.jpg" },
  { id: "p8", name: "Lily Rose Melody 2", category: "Roses", price: 5550, rating: 4.8, colors: "Red roses & pink lilies", image: "/products/flower-8.jpg" },
];

export const formatPrice = (price: number) => `৳${price.toLocaleString("en-BD")}`;
