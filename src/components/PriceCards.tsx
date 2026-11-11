import { useState } from "react";
import { Glasses, CirclePlus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { eyeglassLensGroups } from "@/data/eyeglassLens";
import { eyeglassLens2Groups, noLens2Option } from "@/data/eyeglassLens2";
import { sunglassLensCombos, sunglassLensGroups } from "@/data/sunglassLens";
import { eyeglassPriceRanges, sunglassPriceRanges } from "@/data/pricing";
import type { GlassType, optionFilter } from "@/types/pricing";

function Plus() {
  return <span className="self-center text-4xl text-zinc-400">+</span>;
}

function OptionCard({
  title,
  badge,
  badgeClass,
  desc,
  price,
  onSelect,
}: {
  title: string;
  badge: string;
  badgeClass: string;
  desc: string;
  price: number;
  onSelect: () => void;
}) {
  return (
    <Card className="flex-1">
      <CardContent className="flex h-full flex-col gap-5 p-8">
        <div className="flex items-center gap-3 text-2xl font-bold text-black">
          <CirclePlus className="size-9" />
          {title}
        </div>
        <div className="flex items-center justify-between">
          <span
            className={`rounded-full px-5 py-2 text-lg font-bold text-white ${badgeClass}`}
          >
            {badge}
          </span>
          <span className="text-4xl font-extrabold text-black">
            +{price.toLocaleString("th-TH")} เยน
          </span>
        </div>
        <div className="border-t border-dashed border-zinc-400 pt-4 text-zinc-500">
          {desc}
        </div>
        <Button
          size="lg"
          onClick={onSelect}
          className="mt-auto h-14 bg-zinc-700 text-lg text-white hover:bg-zinc-800"
        >
          เลือกตัวเลือก
        </Button>
      </CardContent>
    </Card>
  );
}

type LensItem = { id: string; name: string; price: number };

function LensSection({
  title,
  items,
  pending,
  onPick,
  isDisabled,
}: {
  title: string;
  items: LensItem[];
  pending: LensItem | null;
  onPick: (item: LensItem) => void;
  isDisabled?: (item: LensItem) => boolean;
}) {
  return (
    <section className="space-y-2">
      {title && <h3 className="font-bold">{title}</h3>}
      {items.map((item) => (
        <Button
          key={item.id}
          disabled={isDisabled?.(item)}
          variant={pending?.id === item.id ? "default" : "outline"}
          className="h-auto w-full justify-between whitespace-normal py-3 text-left"
          onClick={() => onPick(item)}
        >
          <span>{item.name}</span>
          <span className="shrink-0 font-bold">
            +{item.price.toLocaleString("th-TH")} เยน
          </span>
        </Button>
      ))}
    </section>
  );
}

const allLens1 = eyeglassLensGroups.flatMap((g) => g.options);
const defaultLens1 = allLens1[0];

// เลนส์ 2 เลือกได้เฉพาะตัวที่อยู่ใน compatibleItems ของเลนส์ 1
const canAdd = (lens1Id: string, lens2Id: string) => {
  const items = allLens1.find((o) => o.id === lens1Id)?.compatibleItems ?? [];
  return items.includes("all") || items.includes(lens2Id);
};

type Modal = "sun" | "lens1" | "lens2" | null;

type PriceCardsProps = {
  glassType: GlassType;
  filter: optionFilter;
  onFilterChange: <K extends keyof optionFilter>(
    key: K,
    value: optionFilter[K],
  ) => void;
};

export default function PriceCards({
  glassType,
  filter,
  onFilterChange,
}: PriceCardsProps) {
  const [priceOpen, setPriceOpen] = useState(false);
  const [lensMode, setLensMode] = useState<"start" | "change">("change");
  const [modal, setModal] = useState<Modal>(null);
  // เลนส์ที่ยืนยันแล้ว และเลนส์ที่กำลังเลือกอยู่ใน modal
  const [selectedLens, setSelectedLens] = useState<LensItem | null>(null);
  const [lens1, setLens1] = useState<LensItem>(defaultLens1);
  const [lens2, setLens2] = useState<LensItem>(noLens2Option);
  const [pendingLens, setPendingLens] = useState<LensItem | null>(null);

  const changeLensMode = (mode: "start" | "change") => {
    setLensMode(mode);
    if (mode === "start") {
      setSelectedLens(null);
      onFilterChange("addLens1", 0);
    }
  };

  const openModal = (m: Exclude<Modal, null>) => {
    setPendingLens(m === "sun" ? selectedLens : m === "lens1" ? lens1 : lens2);
    setModal(m);
  };

  const confirmLens = () => {
    if (!pendingLens) return;
    if (modal === "sun") {
      setSelectedLens(pendingLens);
      onFilterChange("addLens1", pendingLens.price);
    } else if (modal === "lens1") {
      setLens1(pendingLens);
      onFilterChange("addLens1", pendingLens.price);
      // เลนส์ 2 เดิมใช้กับเลนส์ 1 ใหม่ไม่ได้ ให้ล้างเป็น "อย่าเพิ่ม"
      if (lens2.id !== noLens2Option.id && !canAdd(pendingLens.id, lens2.id)) {
        setLens2(noLens2Option);
        onFilterChange("addLens2", 0);
      }
    } else {
      setLens2(pendingLens);
      onFilterChange("addLens2", pendingLens.price);
    }
    setModal(null);
  };

  const sections =
    modal === "lens1"
      ? eyeglassLensGroups.map((g) => ({ id: g.id, title: g.title, items: g.options }))
      : modal === "lens2"
        ? [
            { id: "none", title: "", items: [noLens2Option] },
            ...eyeglassLens2Groups.map((g) => ({ id: g.id, title: g.title, items: g.options })),
          ]
        : [
            ...sunglassLensGroups.map((g) => ({ id: g.id, title: g.title, items: g.options })),
            { id: "combo", title: "การผสมผสาน", items: sunglassLensCombos },
          ];
  const ranges =
    glassType === "glass" ? eyeglassPriceRanges : sunglassPriceRanges;

  return (
    <div className="flex w-full max-w-6xl flex-col items-stretch gap-4">
      <div className="flex flex-col gap-4 md:flex-row h-90">
        <Card className="flex-1">
          <CardContent className="flex h-full flex-col gap-5 p-8">
            <div className="flex items-center gap-3 text-2xl font-bold text-black">
              <Glasses className="size-9" />
              กรอบ
            </div>
            <div className="my-auto text-center text-5xl font-extrabold text-black">
              {filter.price.toLocaleString("th-TH")} เยน
            </div>
            <Button
              size="lg"
              onClick={() => setPriceOpen(true)}
              className="h-14 bg-zinc-700 text-lg text-white hover:bg-zinc-800"
            >
              เลือกช่วงราคา
            </Button>
          </CardContent>
        </Card>
        {glassType === "glass" ? (
          <>
            <Plus />
            <OptionCard
              title="ตัวเลือกเลนส์ 1"
              badge="ที่จำเป็น"
              badgeClass="bg-red-700"
              desc={lens1.name}
              price={lens1.price}
              onSelect={() => openModal("lens1")}
            />
            <Plus />
            <OptionCard
              title="ตัวเลือกเลนส์ 2"
              badge="ใดๆ"
              badgeClass="bg-zinc-500"
              desc={lens2.name}
              price={lens2.price}
              onSelect={() => openModal("lens2")}
            />
          </>
        ) : (
          <>
            <Plus />
            <Card className="flex-1 border-dashed shadow-none">
              <CardContent className="flex h-full flex-col items-center gap-5 p-8 text-center">
                <p className="text-xl text-zinc-700">โปรดเลือก</p>
                <div className="flex w-full max-w-xs flex-col gap-4">
                  {(
                    [
                      ["start", "เลนส์เริ่มต้น"],
                      ["change", "การเปลี่ยนเลนส์"],
                    ] as const
                  ).map(([value, label]) => (
                    <Button
                      key={value}
                      size="lg"
                      variant={lensMode === value ? "default" : "outline"}
                      onClick={() => changeLensMode(value)}
                      className={`h-14 text-lg font-bold ${
                        lensMode === value
                          ? "bg-zinc-700 text-white hover:bg-zinc-800"
                          : "border-zinc-700 text-zinc-700"
                      }`}
                    >
                      {label}
                    </Button>
                  ))}
                </div>
                <p className="text-zinc-400">
                  สำหรับเลนส์สายตาหรือต้องการเปลี่ยนสีเลนส์
                  <br />
                  โปรดเลือก &quot;เปลี่ยนเลนส์&quot;
                </p>
              </CardContent>
            </Card>
            <Plus />
            <Card className="flex-1">
              {lensMode === 'change' ? (
                <>
                  <CardContent className="flex h-full flex-col gap-4 p-8">
                    <div className="flex items-center justify-center gap-3 text-2xl font-bold text-black">
                      <CirclePlus className="size-9" />
                      ตัวเลือกเลนส์
                    </div>
                    <div className="mt-4 text-center text-4xl font-extrabold text-black">
                      +{(selectedLens?.price ?? 0).toLocaleString("th-TH")} เยน
                    </div>
                    <div className="border-t border-dashed border-zinc-300 pt-2 text-center text-zinc-400">
                      รวมค่าบริการล้างเลนส์ 4,400 เยน
                    </div>
                    <div className="my-auto text-center text-zinc-700">
                      {selectedLens?.name ?? "ยังไม่ได้เลือกเลนส์"}
                    </div>
                    <Button
                      size="lg"
                      onClick={() => openModal("sun")}
                      className="h-14 bg-zinc-700 text-lg text-white hover:bg-zinc-800"
                    >
                      เลือกตัวเลือก
                    </Button>
                  </CardContent>
                </>
              ) : (
                <>
                  <CardContent className="flex h-full flex-col gap-4 p-8 align-center justify-center">
                    <p className="text-2xl text-center">สีเริ่มต้น</p>
                  </CardContent>
                </>
              )}
            </Card>
          </>
        )}
      </div>
      <span className="self-center text-4xl text-zinc-500">=</span>

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
                {p.toLocaleString("th-TH")} เยน
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={modal !== null} onOpenChange={(o) => !o && setModal(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {modal === "lens2" ? "เพิ่มตัวเลือก" : "การเลือกเลนส์"}
            </DialogTitle>
          </DialogHeader>

          {sections.map((section) => (
            <LensSection
              key={section.id}
              title={section.title}
              items={section.items}
              pending={pendingLens}
              onPick={setPendingLens}
              isDisabled={
                modal === "lens2"
                  ? (item) =>
                      item.id !== noLens2Option.id && !canAdd(lens1.id, item.id)
                  : undefined
              }
            />
          ))}

          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setModal(null)}
            >
              กลับ
            </Button>
            <Button
              className="flex-1"
              disabled={!pendingLens}
              onClick={confirmLens}
            >
              ตกลง
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
