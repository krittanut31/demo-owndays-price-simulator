import { useState } from "react";
import { CirclePlus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { eyeglassLensGroups } from "@/data/eyeglassLens";
import { eyeglassLens2Groups, noLens2Option } from "@/data/eyeglassLens2";
import type { OnFilterChange } from "@/types/pricing";
import { LensModal, Plus, cardCell, type LensItem } from "./lensShared";

const allLens1 = eyeglassLensGroups.flatMap((g) => g.options);

// เลนส์ 2 เลือกได้เฉพาะตัวที่อยู่ใน compatibleItems ของเลนส์ 1
const canAdd = (lens1Id: string, lens2Id: string) => {
  const items = allLens1.find((o) => o.id === lens1Id)?.compatibleItems ?? [];
  return items.includes("all") || items.includes(lens2Id);
};

const lens1Sections = eyeglassLensGroups.map((g) => ({
  id: g.id,
  title: g.title,
  items: g.options,
}));
const lens2Sections = [
  { id: "none", title: "", items: [noLens2Option] },
  ...eyeglassLens2Groups.map((g) => ({ id: g.id, title: g.title, items: g.options })),
];

function OptionCard({
  title,
  badge,
  badgeClass,
  item,
  onSelect,
}: {
  title: string;
  badge: string;
  badgeClass: string;
  item: LensItem;
  onSelect: () => void;
}) {
  return (
    <Card className={cardCell}>
      <CardContent className="flex h-full flex-col gap-5 p-8">
        <div className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-black">
          <CirclePlus className="size-9" />
          {title}
        </div>
        <div className="flex items-center justify-between">
          <span
            className={`rounded-full px-5 py-2 text-base sm:text-lg font-bold text-white ${badgeClass}`}
          >
            {badge}
          </span>
          <span className="text-2xl sm:text-4xl font-extrabold text-black">
            +¥{item.price.toLocaleString("th-TH")}
          </span>
        </div>
        <div className="border-t border-dashed border-zinc-400 pt-4 text-zinc-500">
          {item.name}
        </div>
        <Button
          size="lg"
          onClick={onSelect}
          className="mt-auto h-14 bg-zinc-700 text-base sm:text-lg text-white hover:bg-zinc-800"
        >
          เลือกตัวเลือก
        </Button>
      </CardContent>
    </Card>
  );
}

export default function GlassLensCards({
  onFilterChange,
}: {
  onFilterChange: OnFilterChange;
}) {
  const [modal, setModal] = useState<"lens1" | "lens2" | null>(null);
  const [lens1, setLens1] = useState<LensItem>(allLens1[0]);
  const [lens2, setLens2] = useState<LensItem>(noLens2Option);
  const [pending, setPending] = useState<LensItem | null>(null);

  const openModal = (m: "lens1" | "lens2") => {
    setPending(m === "lens1" ? lens1 : lens2);
    setModal(m);
  };

  const confirm = () => {
    if (!pending) return;
    if (modal === "lens1") {
      setLens1(pending);
      onFilterChange("addLens1", pending.price);
      // เลนส์ 2 เดิมใช้กับเลนส์ 1 ใหม่ไม่ได้ ให้ล้างเป็น "อย่าเพิ่ม"
      if (lens2.id !== noLens2Option.id && !canAdd(pending.id, lens2.id)) {
        setLens2(noLens2Option);
        onFilterChange("addLens2", 0);
      }
    } else {
      setLens2(pending);
      onFilterChange("addLens2", pending.price);
    }
    setModal(null);
  };

  return (
    <>
      <Plus />
      <OptionCard
        title="ตัวเลือกเลนส์ 1"
        badge="จำเป็น"
        badgeClass="bg-red-700"
        item={lens1}
        onSelect={() => openModal("lens1")}
      />
      <Plus />
      <OptionCard
        title="ตัวเลือกเลนส์ 2"
        badge="อื่นๆ"
        badgeClass="bg-zinc-500"
        item={lens2}
        onSelect={() => openModal("lens2")}
      />

      <LensModal
        open={modal !== null}
        title={modal === "lens2" ? "เพิ่มตัวเลือก" : "การเลือกเลนส์"}
        sections={modal === "lens2" ? lens2Sections : lens1Sections}
        pending={pending}
        onPick={setPending}
        onConfirm={confirm}
        onClose={() => setModal(null)}
        isDisabled={
          modal === "lens2"
            ? (item) => item.id !== noLens2Option.id && !canAdd(lens1.id, item.id)
            : undefined
        }
      />
    </>
  );
}
