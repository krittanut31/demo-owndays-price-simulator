"use client";

import { useState } from "react";
import PriceCards from "@/components/PriceCards";
import TotalPrice from "@/components/TotalPrice";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { GlassType, optionFilter } from "@/types/pricing";
import { eyeglassPriceRanges, sunglassPriceRanges } from "@/data/pricing";

export default function Home() {
  const [glassType, setGlasstype] = useState<GlassType>("glass");
  const [filter,setFilter] = useState<optionFilter>({
    price:7000,addLens1:0,addLens2:0
  })

  const handleFilterChange = <K extends keyof optionFilter>(
    key: K,
    value: optionFilter[K],
  ) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
  };

  const handleGlassTypeChange = (type: GlassType) => {
    setGlasstype(type);
    // ช่วงราคาของแต่ละประเภทไม่เหมือนกัน จึงรีเซ็ตเป็นราคาแรกของประเภทนั้น
    const ranges = type === "glass" ? eyeglassPriceRanges : sunglassPriceRanges;
    setFilter((prev) => ({ ...prev, price: ranges[0], addLens1: 0, addLens2: 0 }));
  };

  return (
    <main className="flex w-full flex-1 flex-col items-center justify-start  bg-white p-12 gap-4">
      <p className="text-center text-xl font-bold text-black ">
        Price Simulator
      </p>

      <Tabs
        value={glassType}
        onValueChange={(v) => handleGlassTypeChange(v as GlassType)}
      > 
        <TabsList className="group-data-horizontal/tabs:h-14 p-1.5">
          <TabsTrigger value="glass" className="px-8 py-2 text-lg">
            แว่นสายตา
          </TabsTrigger>
          <TabsTrigger value="sunGlass" className="px-8 py-2 text-lg">
            แว่นกันแดด
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <PriceCards
        key={glassType}
        glassType={glassType}
        filter={filter}
        onFilterChange={handleFilterChange}
      />

      <TotalPrice filter={filter} />
    </main>
  );
}
