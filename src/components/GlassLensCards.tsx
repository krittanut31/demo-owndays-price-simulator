import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { eyeglassLensGroups } from "@/data/eyeglassLens";
import { eyeglassLens2Groups, noLens2Option } from "@/data/eyeglassLens2";
import type { OnFilterChange } from "@/types/pricing";
import { LensIcon, LensModal, Plus, cardCell, type LensItem } from "./lensShared";

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
  note: g.note,
}));
// เลนส์ 2: ซ่อนตัวที่ใช้กับเลนส์ 1 ไม่ได้ และซ่อนหมวดที่ไม่เหลือตัวเลือก
const getLens2Sections = (lens1Id: string) => [
  { id: "none", title: "", items: [noLens2Option] },
  ...eyeglassLens2Groups
    .map((g) => ({
      id: g.id,
      title: g.title,
      items: g.options.filter((o) => canAdd(lens1Id, o.id)),
    }))
    .filter((g) => g.items.length > 0),
];

function OptionCard({
  title,
  number,
  badge,
  badgeClass,
  item,
  onSelect,
}: {
  title: string;
  number: number;
  badge: string;
  badgeClass: string;
  item: LensItem;
  onSelect: () => void;
}) {
  return (
    <Card className={cardCell}>
      <CardContent className="flex h-full flex-col gap-5 p-4 justify-between">
        <div className="flex items-center gap-3 text-xl leading-10.5 font-bold text-black">
          <LensIcon />
          {title}
          <span
            aria-label={String(number)}
            className="flex size-5 shrink-0 items-center justify-center text-sm rounded-full border-2 border-black leading-none md:size-6.5 md:text-sm"
          >
            {number}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span
            className={`rounded-full px-4  text-base leading-8 font-bold text-white ${badgeClass}`}
          >
            {badge}
          </span>
          <span className="text-[32px] font-extrabold text-black">
            +¥{item.price.toLocaleString("th-TH")}
          </span>
        </div>
        <div className="border-t border-dashed border-zinc-400 pt-5 text-zinc-500">
          {item.name}
        </div>
        <Button
          size="lg"
          onClick={onSelect}
          className="h-12.5 bg-[#555] text-base text-white hover:bg-[#444] mt-0"
        >
          オプションを選ぶ
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
        title="レンズオプション"
        number={1}
        badge="必須"
        badgeClass="bg-[#bf0000]"
        item={lens1}
        onSelect={() => openModal("lens1")}
      />
      <Plus />
      <OptionCard
        title="レンズオプション"
        number={2}
        badge="任意"
        badgeClass="bg-[#7c7c7c]"
        item={lens2}
        onSelect={() => openModal("lens2")}
      />

      <LensModal
        open={modal !== null}
        title={modal === "lens2" ? "オプションを追加" : "レンズを選ぶ"}
        sections={modal === "lens2" ? getLens2Sections(lens1.id) : lens1Sections}
        pending={pending}
        onPick={setPending}
        onConfirm={confirm}
        onClose={() => setModal(null)}
      />
    </>
  );
}
