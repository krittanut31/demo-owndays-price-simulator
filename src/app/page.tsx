"use client";

import { useState } from "react";
import PriceCards from "@/components/PriceCards";
import TotalPrice from "@/components/TotalPrice";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { GlassType, optionFilter } from "@/types/pricing";
import { eyeglassPriceRanges, sunglassPriceRanges } from "@/data/pricing";

export default function Home() {
  const [glassType, setGlasstype] = useState<GlassType>("glass");
  const [filter, setFilter] = useState<optionFilter>({
    price: 7000,
    addLens1: 0,
    addLens2: 0,
  });

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
    setFilter((prev) => ({
      ...prev,
      price: ranges[0],
      addLens1: 0,
      addLens2: 0,
    }));
  };

  return (
    <main className="flex w-full flex-1 flex-col items-center justify-start  bg-white p-5 md:p-12">
      <div className="flex flex-col align-center">
        <p className=" font-medium text-center text-2xl leading-6 text-black hidden md:block">
          組み合わせ金額がわかる
        </p>
        <p className="text-center font-medium text-black md:hidden block text-sm leading-7">
          フレームとレンズの組み合わせ金額をチェック！
        </p>
        <br />
        <h2 className=" font-bold text-center text-xl leading-8 md:text-[40px] md:leading-10 text-black ">
          価格シミュレーター
        </h2>
      </div>

      <p className="my-10 md:mt-8 text-start text-sm leading-7 md:text-[18px] md:leading-9 md:text-center font-medium">
        OWNDAYSでは1,000種以上のフレームと豊富な種類のレンズを選んで自分だけのメガネを作れます。<br className=" hidden md:block"/> 価格はフレームとレンズの組み合わせに応じて決まります。
      </p>
      <Tabs
        value={glassType}
        onValueChange={(v) => handleGlassTypeChange(v as GlassType)}
        className={'mb-10'}
      >
        <TabsList className="group-data-horizontal/tabs:h-14 p-2 w-80">
          <TabsTrigger value="glass" className=" text-base md:text-lg flex-1">
            メガネ
          </TabsTrigger>
          <TabsTrigger
            value="sunGlass"
            className="text-base md:text-lg flex-1"
          >
            サングラス
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
