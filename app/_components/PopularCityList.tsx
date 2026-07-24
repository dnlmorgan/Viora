"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function PopularCityList() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <h2 className="text-2xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-200 font-sans tracking-tight">
          Popular Travel Destinations
        </h2>
        <p className="text-muted-foreground text-sm md:text-base mt-1">
          Explore top-rated spots curated for your next escape
        </p>
      </div>
      <Carousel items={cards} />
    </div>
  );
}

const DestinationContent = ({ 
  description, 
  bestTime, 
  budget, 
  highlights 
}: { 
  description: string; 
  bestTime: string; 
  budget: string; 
  highlights: string[];
}) => (
  <div className="space-y-6 max-w-2xl">
    <p className="text-neutral-600 dark:text-neutral-300 text-base md:text-lg leading-relaxed">
      {description}
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 p-4 rounded-2xl">
        <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold block mb-1">
          Best Time to Visit
        </span>
        <span className="text-base font-semibold text-neutral-800 dark:text-neutral-200">
          {bestTime}
        </span>
      </div>
      <div className="bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 p-4 rounded-2xl">
        <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold block mb-1">
          Est. Daily Budget
        </span>
        <span className="text-base font-semibold text-neutral-800 dark:text-neutral-200">
          {budget}
        </span>
      </div>
    </div>

    <div>
      <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">
        Top Highlights
      </h4>
      <ul className="flex flex-wrap gap-2">
        {highlights.map((item, idx) => (
          <li 
            key={idx} 
            className="bg-primary/10 text-primary border border-primary/20 text-xs md:text-sm font-medium px-3 py-1.5 rounded-full"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const data = [
  {
    category: "Banff, Canada",
    title: "Turquoise Lakes, Mountain Peaks, & Scenic Drives",
    src: "/destinations/banff.jpg",
    content: (
      <DestinationContent
        description="Nestled in the Canadian Rockies, Banff features crystal-clear glacial waters at Lake Louise, dramatic alpine peaks, and rich wilderness trails."
        bestTime="June – September (Summer) & Dec – March (Skiing)"
        budget="$180 - $280 / day"
        highlights={["Lake Louise", "Moraine Lake", "Banff Gondola", "Icefields Parkway"]}
      />
    ),
  },
  {
    category: "Los Angeles, USA",
    title: "Hollywood, Santa Monica, & Malibu Beaches",
    src: "/destinations/los-angeles.jpg",
    content: (
      <DestinationContent
        description="California's coastal metropolis combines vibrant entertainment history, sun-kissed beaches, creative culinary scenes, and iconic sunsets."
        bestTime="March – May & September – November"
        budget="$150 - $260 / day"
        highlights={["Griffith Observatory", "Santa Monica Pier", "Getty Center", "Venice Beach"]}
      />
    ),
  },
  {
    category: "New York City, USA",
    title: "Times Square, Central Park, & Skyline Views",
    src: "/destinations/new-york.jpg",
    content: (
      <DestinationContent
        description="The city that never sleeps offers world-class Broadway shows, historic architecture, diverse culinary neighborhoods, and iconic landmarks."
        bestTime="April – June & September – November"
        budget="$200 - $350 / day"
        highlights={["Central Park", "Metropolitan Museum", "Brooklyn Bridge", "Empire State Building"]}
      />
    ),
  },
  {
    category: "San Francisco, USA",
    title: "Golden Gate Bridge, Cable Cars, & Waterfront",
    src: "/destinations/san-francisco.jpg",
    content: (
      <DestinationContent
        description="Famous for rolling hills, foggy bay views, historic cable cars, and proximity to Napa Valley wine country."
        bestTime="September – November"
        budget="$170 - $300 / day"
        highlights={["Golden Gate Bridge", "Alcatraz Island", "Fisherman's Wharf", "Chinatown"]}
      />
    ),
  },
  {
    category: "Vancouver, Canada",
    title: "Stanley Park, Oceanfront Trails, & Mountains",
    src: "/destinations/vancouver.jpg",
    content: (
      <DestinationContent
        description="A coastal seaport city where majestic snowcapped mountains meet the Pacific Ocean with vibrant Asian-fusion dining."
        bestTime="May – September"
        budget="$160 - $260 / day"
        highlights={["Stanley Park", "Capilano Suspension Bridge", "Granville Island", "Gastown"]}
      />
    ),
  },
  {
    category: "Paris, France",
    title: "Eiffel Tower, Louvre Museum, & Charming Cafés",
    src: "/destinations/paris.jpg",
    content: (
      <DestinationContent
        description="The City of Light captivates visitors with romantic boulevards, iconic art museums, high fashion, and exquisite bakeries."
        bestTime="June – August & September – October"
        budget="€140 - €250 / day"
        highlights={["Eiffel Tower", "Louvre Museum", "Notre-Dame Cathedral", "Montmartre"]}
      />
    ),
  },
  {
    category: "London, England",
    title: "Big Ben, Westminster, & Historic Streets",
    src: "/destinations/london.jpg",
    content: (
      <DestinationContent
        description="A historic world capital blending royal palaces, legendary theaters, world-class free museums, and vibrant pub culture."
        bestTime="May – September"
        budget="£130 - £240 / day"
        highlights={["Big Ben", "Tower of London", "British Museum", "Covent Garden"]}
      />
    ),
  },
  {
    category: "Rome, Italy",
    title: "Colosseum, Vatican City, & Roman Forum",
    src: "/destinations/rome.jpg",
    content: (
      <DestinationContent
        description="Walk through millennia of living history, ancient amphitheaters, Vatican treasures, and unbeatable gelato."
        bestTime="April – May & September – October"
        budget="€120 - €220 / day"
        highlights={["Colosseum", "Vatican Museums", "Trevi Fountain", "Pantheon"]}
      />
    ),
  },
  {
    category: "Amalfi Coast, Italy",
    title: "Cliffside Villages, Coastal Roads, & Mediterranean Views",
    src: "/destinations/amalfi-coast.jpg",
    content: (
      <DestinationContent
        description="Dramatic cliffside towns overlooking turquoise Tyrrhenian waters, pastel-colored houses, lemon groves, and yacht cruises."
        bestTime="May – June & September"
        budget="€180 - €350 / day"
        highlights={["Positano Cliffs", "Ravello Gardens", "Path of the Gods", "Capri Day Trip"]}
      />
    ),
  },
  {
    category: "Santorini, Greece",
    title: "Blue Domes, White Villages, & Sunset Views",
    src: "/destinations/santorini.jpg",
    content: (
      <DestinationContent
        description="Famous for whitewashed cliffside villas, volcanic black beaches, stunning Aegean Sea sunsets, and fine local wines."
        bestTime="Late April – October"
        budget="€160 - €320 / day"
        highlights={["Oia Village Sunsets", "Red Beach", "Akrotiri Ruins", "Fira Cliffside Trail"]}
      />
    ),
  },
  {
    category: "Tokyo, Japan",
    title: "Shibuya Crossing, Temples, & Neon Nights",
    src: "/destinations/tokyo.jpg",
    content: (
      <DestinationContent
        description="Ultra-modern technology meets ultra-traditional culture in Japan's sprawling capital, famous for Michelin dining and anime culture."
        bestTime="March – May (Cherry Blossom) & Sept – Nov"
        budget="¥15,000 - ¥28,000 / day"
        highlights={["Shibuya Crossing", "Senso-ji Temple", "Tokyo Skytree", "Akihabara"]}
      />
    ),
  },
  {
    category: "Kyoto, Japan",
    title: "Bamboo Forests, Shrines, & Cherry Blossoms",
    src: "/destinations/kyoto.jpg",
    content: (
      <DestinationContent
        description="Japan's cultural heart filled with thousands of classical Buddhist temples, traditional wooden houses, and serene bamboo groves."
        bestTime="March – May & October – November"
        budget="¥14,000 - ¥25,000 / day"
        highlights={["Arashiyama Bamboo Grove", "Fushimi Inari Shrine", "Kinkaku-ji (Golden Pavilion)", "Gion District"]}
      />
    ),
  },
  {
    category: "Seoul, South Korea",
    title: "Palaces, Trendy Cafés, & Night Markets",
    src: "/destinations/seoul.jpg",
    content: (
      <DestinationContent
        description="A bustling high-tech metropolis where modern skyscrapers and K-pop culture mingle with historic Joseon Dynasty palaces."
        bestTime="March – May & September – November"
        budget="₩120,000 - ₩220,000 / day"
        highlights={["Gyeongbokgung Palace", "Myeongdong Night Market", "N Seoul Tower", "Hongdae Street Culture"]}
      />
    ),
  },
  {
    category: "Shanghai, China",
    title: "The Bund, Futuristic Skylines, & Old Town",
    src: "/destinations/shanghai.jpg",
    content: (
      <DestinationContent
        description="China's financial powerhouse featuring the historic colonial waterfront of The Bund across from Pudong's sci-fi skyline."
        bestTime="October – November & April – May"
        budget="¥800 - ¥1,500 / day"
        highlights={["The Bund", "Yu Garden", "Shanghai Tower", "French Concession"]}
      />
    ),
  },
  {
    category: "Singapore, Singapore",
    title: "Marina Bay, Gardens by the Bay, & Hawker Food",
    src: "/destinations/singapore.jpg",
    content: (
      <DestinationContent
        description="A lush tropical garden city known for futuristic Supertree structures, luxury shopping, and legendary street food markets."
        bestTime="Year-round (Best: Feb – April)"
        budget="S$150 - S$280 / day"
        highlights={["Gardens by the Bay", "Marina Bay Sands", "Jewel Changi Airport", "Lau Pa Sat Hawker Centre"]}
      />
    ),
  },
  {
    category: "Bali, Indonesia",
    title: "Rice Terraces, Beach Clubs, & Tropical Sunsets",
    src: "/destinations/bali.jpg",
    content: (
      <DestinationContent
        description="The Island of the Gods offers spiritual yoga retreats, volcanic mountain hikes, lush jungle waterfalls, and world-class surfing."
        bestTime="April – October (Dry Season)"
        budget="IDR 1,000,000 - 2,200,000 / day"
        highlights={["Ubud Rice Terraces", "Uluwatu Temple", "Canggu Beach Clubs", "Nusa Penida"]}
      />
    ),
  },
  {
    category: "Sydney, Australia",
    title: "Opera House, Harbour Bridge, & Bondi Beach",
    src: "/destinations/sydney.jpg",
    content: (
      <DestinationContent
        description="Famous for its iconic harbor sail roofs, golden ocean beaches, coastal walking paths, and sun-drenched outdoor lifestyle."
        bestTime="September – November & February – May"
        budget="A$180 - A$320 / day"
        highlights={["Sydney Opera House", "Sydney Harbour Bridge", "Bondi to Coogee Walk", "Manly Beach Ferry"]}
      />
    ),
  },
  {
    category: "Dubai, UAE",
    title: "Burj Khalifa, Desert Safaris, & Luxury Resorts",
    src: "/destinations/dubai.jpg",
    content: (
      <DestinationContent
        description="An oasis of architectural marvels, artificial islands, world-record skyscrapers, dune bashing, and luxury shopping."
        bestTime="November – March"
        budget="AED 600 - AED 1,200 / day"
        highlights={["Burj Khalifa", "Dubai Mall & Fountains", "Desert Safari Dunes", "Palm Jumeirah"]}
      />
    ),
  },
  {
    category: "Reykjavík, Iceland",
    title: "Northern Lights, Waterfalls, & Black Sand Beaches",
    src: "/destinations/reykjavik.jpg",
    content: (
      <DestinationContent
        description="The gateway to geothermal wonders, dancing Aurora Borealis displays, roaring waterfalls, and volcanic landscapes."
        bestTime="Sept – March (Aurora) & June – Aug (Midnight Sun)"
        budget="ISK 25,000 - ISK 45,000 / day"
        highlights={["Blue Lagoon Geothermal Spa", "Golden Circle Waterfalls", "Reynisfjara Black Sand Beach", "Northern Lights Tour"]}
      />
    ),
  },
  {
    category: "Interlaken, Switzerland",
    title: "Alpine Lakes, Snowy Peaks, & Scenic Railways",
    src: "/destinations/interlaken.jpg",
    content: (
      <DestinationContent
        description="Tucked between Lake Thun and Lake Brienz, Interlaken is Europe's adventure capital and gateway to the majestic Eiger and Jungfrau peaks."
        bestTime="June – September (Hiking) & Dec – March (Skiing)"
        budget="CHF 180 - CHF 320 / day"
        highlights={["Jungfraujoch Top of Europe", "Harder Kulm Viewpoint", "Lake Brienz Boat Cruise", "Grindelwald First Alpine Zipline"]}
      />
    ),
  },
];

