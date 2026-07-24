"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function PopularCityList() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Travel Inspiration.
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const placeholderImage = "/destinations/placeholder.svg";

const data = [
  {
    category: "Banff, Canada",
    title: "Turquoise Lakes, Mountain Peaks, & Scenic Drives",
    src: "/destinations/banff.jpg",
    content: <></>,
  },
  {
    category: "Los Angeles, USA",
    title: "Hollywood, Santa Monica, & Malibu Beaches",
    src: "/destinations/los-angeles.jpg",
    content: <></>,
  },
  {
    category: "New York City, USA",
    title: "Times Square, Central Park, & Skyline Views",
    src: "/destinations/new-york.jpg",
    content: <></>,
  },
  {
    category: "San Francisco, USA",
    title: "Golden Gate Bridge, Cable Cars, & Waterfront",
    src: "/destinations/san-francisco.jpg",
    content: <></>,
  },
  {
    category: "Vancouver, Canada",
    title: "Stanley Park, Oceanfront Trails, & Mountains",
    src: "/destinations/vancouver.jpg",
    content: <></>,
  },
  {
    category: "Paris, France",
    title: "Eiffel Tower, Louvre Museum, & Charming Cafés",
    src: "/destinations/paris.jpg",
    content: <></>,
  },
  {
    category: "London, England",
    title: "Big Ben, Westminster, & Historic Streets",
    src: "/destinations/london.jpg",
    content: <></>,
  },
  {
    category: "Rome, Italy",
    title: "Colosseum, Vatican City, & Roman Forum",
    src: "/destinations/rome.jpg",
    content: <></>,
  },
  {
    category: "Amalfi Coast, Italy",
    title: "Cliffside Villages, Coastal Roads, & Mediterranean Views",
    src: "/destinations/amalfi-coast.jpg",
    content: <></>,
  },
  {
    category: "Santorini, Greece",
    title: "Blue Domes, White Villages, & Sunset Views",
    src: "/destinations/santorini.jpg",
    content: <></>,
  },
  {
    category: "Tokyo, Japan",
    title: "Shibuya Crossing, Temples, & Neon Nights",
    src: "/destinations/tokyo.jpg",
    content: <></>,
  },
  {
    category: "Kyoto, Japan",
    title: "Bamboo Forests, Shrines, & Cherry Blossoms",
    src: "/destinations/kyoto.jpg",
    content: <></>,
  },
  {
    category: "Seoul, South Korea",
    title: "Palaces, Trendy Cafés, & Night Markets",
    src: "/destinations/seoul.jpg",
    content: <></>,
  },
  {
    category: "Shanghai, China",
    title: "The Bund, Futuristic Skylines, & Old Town",
    src: "/destinations/shanghai.jpg",
    content: <></>,
  },
  {
    category: "Singapore, Singapore",
    title: "Marina Bay, Gardens by the Bay, & Hawker Food",
    src: "/destinations/singapore.jpg",
    content: <></>,
  },
  {
    category: "Bali, Indonesia",
    title: "Rice Terraces, Beach Clubs, & Tropical Sunsets",
    src: "/destinations/bali.jpg",
    content: <></>,
  },
  {
    category: "Sydney, Australia",
    title: "Opera House, Harbour Bridge, & Bondi Beach",
    src: "/destinations/sydney.jpg",
    content: <></>,
  },
  {
    category: "Dubai, UAE",
    title: "Burj Khalifa, Desert Safaris, & Luxury Resorts",
    src: "/destinations/dubai.jpg",
    content: <></>,
  },
  {
    category: "Reykjavík, Iceland",
    title: "Northern Lights, Waterfalls, & Black Sand Beaches",
    src: "/destinations/reykjavik.jpg",
    content: <></>,
  },
  {
    category: "Interlaken, Switzerland",
    title: "Alpine Lakes, Snowy Peaks, & Scenic Railways",
    src: "/destinations/interlaken.jpg",
    content: <></>,
  },
];
