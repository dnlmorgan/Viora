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
        Get to know your iSad.
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                The first rule of Apple club is that you boast about Apple club.
              </span>{" "}
              Keep a journal, quickly jot down a grocery list, and take amazing
              class notes. Want to convert those notes to text? No problem.
              Langotiya jeetu ka mara hua yaar is ready to capture every
              thought.
            </p>
            <img
              src="https://assets.aceternity.com/macbook.png"
              alt="Macbook mockup from Aceternity UI"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            />
          </div>
        );
      })}
    </>
  );
};

const data = [
  {
    category: "Banff, Canada",
    title: "Turquoise Lakes, Mountain Peaks & Scenic Drives",
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    content: <DummyContent />,
  },
  {
    category: "Los Angeles, USA",
    title: "Hollywood, Santa Monica & Malibu Beaches",
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    content: <DummyContent />,
  },
  {
    category: "New York City, USA",
    title: "Times Square, Central Park & Skyline Views",
    src: "https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2",
    content: <DummyContent />,
  },
  {
    category: "San Francisco, USA",
    title: "Golden Gate Bridge, Cable Cars & Waterfront",
    src: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29",
    content: <DummyContent />,
  },
  {
    category: "Vancouver, Canada",
    title: "Stanley Park, Oceanfront Trails & Mountains",
    src: "https://images.unsplash.com/photo-1544720348-4c54b7f3c395",
    content: <DummyContent />,
  },
  {
    category: "Paris, France",
    title: "Eiffel Tower, Louvre Museum & Charming Cafés",
    src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    content: <DummyContent />,
  },
  {
    category: "London, England",
    title: "Big Ben, Westminster & Historic Streets",
    src: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad",
    content: <DummyContent />,
  },
  {
    category: "Rome, Italy",
    title: "Colosseum, Vatican City & Roman Forum",
    src: "https://images.unsplash.com/photo-1552832230-c0197dd311b5",
    content: <DummyContent />,
  },
  {
    category: "Amalfi Coast, Italy",
    title: "Cliffside Villages, Coastal Roads & Mediterranean Views",
    src: "https://images.unsplash.com/photo-1612698093158-e07ac200d917",
    content: <DummyContent />,
  },
  {
    category: "Santorini, Greece",
    title: "Blue Domes, White Villages & Sunset Views",
    src: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff",
    content: <DummyContent />,
  },
  {
    category: "Tokyo, Japan",
    title: "Shibuya Crossing, Temples & Neon Nights",
    src: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf",
    content: <DummyContent />,
  },
  {
    category: "Kyoto, Japan",
    title: "Bamboo Forests, Shrines & Cherry Blossoms",
    src: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
    content: <DummyContent />,
  },
  {
    category: "Seoul, South Korea",
    title: "Palaces, Trendy Cafés & Night Markets",
    src: "https://images.unsplash.com/photo-1549693578-d683be217e58",
    content: <DummyContent />,
  },
  {
    category: "Shanghai, China",
    title: "The Bund, Futuristic Skylines & Old Town",
    src: "https://images.unsplash.com/photo-1548919973-5cef591cdbc9",
    content: <DummyContent />,
  },
  {
    category: "Singapore, Singapore",
    title: "Marina Bay, Gardens by the Bay & Hawker Food",
    src: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd",
    content: <DummyContent />,
  },
  {
    category: "Bali, Indonesia",
    title: "Rice Terraces, Beach Clubs & Tropical Sunsets",
    src: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
    content: <DummyContent />,
  },
  {
    category: "Sydney, Australia",
    title: "Opera House, Harbour Bridge & Bondi Beach",
    src: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9",
    content: <DummyContent />,
  },
  {
    category: "Dubai, UAE",
    title: "Burj Khalifa, Desert Safaris & Luxury Resorts",
    src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
    content: <DummyContent />,
  },
  {
    category: "Reykjavík, Iceland",
    title: "Northern Lights, Waterfalls & Black Sand Beaches",
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    content: <DummyContent />,
  },
  {
    category: "Interlaken, Switzerland",
    title: "Alpine Lakes, Snowy Peaks & Scenic Railways",
    src: "https://images.unsplash.com/photo-1508261305436-4f5f0e5e6c55",
    content: <DummyContent />,
  },
];
