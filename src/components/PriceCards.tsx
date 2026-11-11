import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { eyeglassPriceRanges, sunglassPriceRanges } from "@/data/pricing";
import type { GlassType, OnFilterChange, optionFilter } from "@/types/pricing";
import { OptionRow, PickModal, cardCell } from "./lensShared";
import GlassLensCards from "./GlassLensCards";
import SunglassLensCards from "./SunglassLensCards";

type PriceCardsProps = {
  glassType: GlassType;
  filter: optionFilter;
  onFilterChange: OnFilterChange;
};

export default function PriceCards({
  glassType,
  filter,
  onFilterChange,
}: PriceCardsProps) {
  const [priceOpen, setPriceOpen] = useState(false);
  const [pendingPrice, setPendingPrice] = useState(filter.price);
  const ranges =
    glassType === "glass" ? eyeglassPriceRanges : sunglassPriceRanges;

  return (
    <div className="flex w-full max-w-6xl flex-col items-stretch ">
      <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:justify-center lg:h-70 lg:flex-nowrap">
        <Card className={cardCell}>
          <CardContent className="flex h-full flex-col gap-5 p-5">
            <div className="flex items-center gap-3 text-xl md:text-2xl font-bold text-black">
              <Image
                src="https://preview.storage.owndays.com/images/services/price-simulator/frame-icon.webp"
                alt=""
                width={50}
                height={50}
                className="size-7.5 md:size-12.5"
                unoptimized
              />
              <p className="text-5 leading-10.5 font-semibold">フレーム</p>
            </div>
            <div className="my-auto text-center text-[32px] font-extrabold text-black">
              ¥{filter.price.toLocaleString("th-TH")}
            </div>
            <Button
              size="lg"
              onClick={() => {
                setPendingPrice(filter.price);
                setPriceOpen(true);
              }}
              className="h-10 md:h-12.5 bg-[#555] text-base md:text-lg text-white"
            >
              価格帯を選ぶ
            </Button>
          </CardContent>
        </Card>
        {glassType === "glass" ? (
          <GlassLensCards onFilterChange={onFilterChange} />
        ) : (
          <SunglassLensCards onFilterChange={onFilterChange} />
        )}
      </div>
      <span className="self-center text-2xl text-zinc-500 my-5">||</span>

      <PickModal
        open={priceOpen}
        title="フレームの価格帯を選ぶ"
        onConfirm={() => {
          onFilterChange("price", pendingPrice);
          setPriceOpen(false);
        }}
        onClose={() => setPriceOpen(false)}
      >
        {ranges.map((p) => (
          <OptionRow
            key={p}
            selected={pendingPrice === p}
            onClick={() => setPendingPrice(p)}
          >
            ¥{p.toLocaleString("th-TH")}
          </OptionRow>
        ))}
      </PickModal>
    </div>
  );
}
