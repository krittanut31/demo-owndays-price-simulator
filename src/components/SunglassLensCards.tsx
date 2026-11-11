import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { sunglassLensGroups } from "@/data/sunglassLens";
import type { OnFilterChange } from "@/types/pricing";
import { LensIcon, LensModal, Plus, cardCell, type LensItem } from "./lensShared";

const sections = sunglassLensGroups.map((g) => ({
  id: g.id,
  title: g.title,
  items: g.options,
}));

export default function SunglassLensCards({
  onFilterChange,
}: {
  onFilterChange: OnFilterChange;
}) {
  const [lensMode, setLensMode] = useState<"start" | "change">("start");
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
      <Card className={`${cardCell} border-dashed shadow-none`}>
        <CardContent className="flex h-full flex-col items-center gap-5 p-8 text-center">
          <p className="text-base font-medium text-[#535353]">選択してください
</p>
          <div className="flex w-full max-w-xs flex-col gap-4 items-center">
            {(
              [
                ["start", "デフォルトレンズ"],
                ["change", "レンズ交換"],
              ] as const
            ).map(([value, label]) => (
              <Button
                key={value}
                size="lg"
                variant={lensMode === value ? "default" : "outline"}
                onClick={() => changeLensMode(value)}
                className={`w-full max-w-48.5 md:max-w-none h-10 md:h-12.5 text-sm font-bold ${
                  lensMode === value
                    ? "bg-[#555] text-white hover:bg-[#444]"
                    : "border-zinc-700 text-zinc-700"
                }`}
              >
                {label}
              </Button>
            ))}
          </div>
          <p className="text-[#a5a5a5] font-medium text-sm">
            度付き、カラー変更の場合は
            <br />
            レンズ交換を選択してください
          </p>
        </CardContent>
      </Card>
      <Plus />
      <Card className={cardCell}>
        {lensMode === "change" ? (
          <CardContent className="flex h-full flex-col gap-4 p-5">
            <div className="flex items-center justify-center gap-3 text-xl  font-bold text-black">
              <LensIcon />
              レンズオプション
            </div>
            <div className="mt-4 text-center text-[28px] font-bold text-black">
              +¥{(selected?.price ?? 0).toLocaleString("th-TH")}
            </div>
            <div className="text-sm border-t border-dashed border-zinc-300 pt-2 text-center text-[#a5a5a5] font-medium">
              レンズ加工料金¥4,400を含む
            </div>
            <div className="my-auto text-center text-[#535353] font-medium text-sm">
              {selected?.name ?? "カラーレンズ"}
            </div>
            <Button
              size="lg"
              onClick={openModal}
              className="h-10 md:h-12.5 bg-[#555] text-base md:text-lg text-white hover:bg-[#444]"
            >
              オプションを選ぶ
            </Button>
          </CardContent>
        ) : (
          <CardContent className="flex h-full flex-col gap-4 p-8 align-center justify-center">
            <p className="text-xl text-center font-bold">デフォルトカラー <br/> （度なし）</p>
          </CardContent>
        )}
      </Card>

      <LensModal
        open={open}
        title="レンズを選ぶ"
        sections={sections}
        pending={pending}
        onPick={setPending}
        onConfirm={confirm}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
