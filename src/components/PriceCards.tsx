import { useState } from "react";
import { Glasses } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { eyeglassPriceRanges, sunglassPriceRanges } from "@/data/pricing";
import type { GlassType, OnFilterChange, optionFilter } from "@/types/pricing";
import { cardCell } from "./lensShared";
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
  const ranges =
    glassType === "glass" ? eyeglassPriceRanges : sunglassPriceRanges;

  return (
    <div className="flex w-full max-w-6xl flex-col items-stretch gap-4">
      <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:justify-center lg:h-90 lg:flex-nowrap">
        <Card className={cardCell}>
          <CardContent className="flex h-full flex-col gap-5 p-8">
            <div className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-black">
              <Glasses className="size-9" />
              กรอบ
            </div>
            <div className="my-auto text-center text-3xl sm:text-5xl font-extrabold text-black">
              ¥{filter.price.toLocaleString("th-TH")}
            </div>
            <Button
              size="lg"
              onClick={() => setPriceOpen(true)}
              className="h-14 bg-zinc-700 text-base sm:text-lg text-white hover:bg-zinc-800"
            >
              เลือกช่วงราคา
            </Button>
          </CardContent>
        </Card>
        {glassType === "glass" ? (
          <GlassLensCards onFilterChange={onFilterChange} />
        ) : (
          <SunglassLensCards onFilterChange={onFilterChange} />
        )}
      </div>
      <span className="self-center text-2xl sm:text-4xl text-zinc-500">=</span>

      <Dialog open={priceOpen} onOpenChange={setPriceOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>เลือกช่วงราคา</DialogTitle>
          </DialogHeader>
          <div className="flex flex-wrap gap-2">
            {ranges.map((p) => (
              <Button
                key={p}
                variant={filter.price === p ? "default" : "outline"}
                onClick={() => {
                  onFilterChange("price", p);
                  setPriceOpen(false);
                }}
              >
                ¥{p.toLocaleString("th-TH")}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
