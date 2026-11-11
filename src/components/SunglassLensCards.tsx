import { useState } from "react";
import { CirclePlus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { sunglassLensCombos, sunglassLensGroups } from "@/data/sunglassLens";
import type { OnFilterChange } from "@/types/pricing";
import { LensModal, Plus, type LensItem } from "./lensShared";

const sections = [
  ...sunglassLensGroups.map((g) => ({ id: g.id, title: g.title, items: g.options })),
  { id: "combo", title: "การผสมผสาน", items: sunglassLensCombos },
];

export default function SunglassLensCards({
  onFilterChange,
}: {
  onFilterChange: OnFilterChange;
}) {
  const [lensMode, setLensMode] = useState<"start" | "change">("change");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<LensItem | null>(null);
  const [pending, setPending] = useState<LensItem | null>(null);

  const changeLensMode = (mode: "start" | "change") => {
    setLensMode(mode);
    if (mode === "start") {
      setSelected(null);
      onFilterChange("addLens1", 0);
    }
  };

  const openModal = () => {
    setPending(selected);
    setOpen(true);
  };

  const confirm = () => {
    if (!pending) return;
    setSelected(pending);
    onFilterChange("addLens1", pending.price);
    setOpen(false);
  };

  return (
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
        {lensMode === "change" ? (
          <CardContent className="flex h-full flex-col gap-4 p-8">
            <div className="flex items-center justify-center gap-3 text-2xl font-bold text-black">
              <CirclePlus className="size-9" />
              ตัวเลือกเลนส์
            </div>
            <div className="mt-4 text-center text-4xl font-extrabold text-black">
              +{(selected?.price ?? 0).toLocaleString("th-TH")} เยน
            </div>
            <div className="border-t border-dashed border-zinc-300 pt-2 text-center text-zinc-400">
              รวมค่าบริการล้างเลนส์ 4,400 เยน
            </div>
            <div className="my-auto text-center text-zinc-700">
              {selected?.name ?? "ยังไม่ได้เลือกเลนส์"}
            </div>
            <Button
              size="lg"
              onClick={openModal}
              className="h-14 bg-zinc-700 text-lg text-white hover:bg-zinc-800"
            >
              เลือกตัวเลือก
            </Button>
          </CardContent>
        ) : (
          <CardContent className="flex h-full flex-col gap-4 p-8 align-center justify-center">
            <p className="text-2xl text-center">สีเริ่มต้น</p>
          </CardContent>
        )}
      </Card>

      <LensModal
        open={open}
        title="การเลือกเลนส์"
        sections={sections}
        pending={pending}
        onPick={setPending}
        onConfirm={confirm}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
