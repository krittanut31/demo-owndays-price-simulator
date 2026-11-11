import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export type LensItem = { id: string; name: string; price: number };
export type LensSectionData = { id: string; title: string; items: LensItem[] };

// การ์ดบนแท็บเล็ต: 2 ใบต่อแถว (ใบที่ 3 ขึ้นแถวใหม่อยู่กลาง) / เดสก์ท็อป: แถวเดียวแบ่งเท่ากัน
export const cardCell =
  "flex-1 md:h-90 md:w-[calc(50%-2rem)] md:flex-none lg:h-auto lg:w-auto lg:flex-1";

export function Plus() {
  return <span className="self-center text-2xl text-zinc-400 sm:text-4xl">+</span>;
}

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

export function LensModal({
  open,
  title,
  sections,
  pending,
  onPick,
  onConfirm,
  onClose,
  isDisabled,
}: {
  open: boolean;
  title: string;
  sections: LensSectionData[];
  pending: LensItem | null;
  onPick: (item: LensItem) => void;
  onConfirm: () => void;
  onClose: () => void;
  isDisabled?: (item: LensItem) => boolean;
}) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="flex max-h-[85vh] flex-col">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto">
          {sections.map((section) => (
            <LensSection
              key={section.id}
              title={section.title}
              items={section.items}
              pending={pending}
              onPick={onPick}
              isDisabled={isDisabled}
            />
          ))}
        </div>

        <div className="flex gap-2 pt-2">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            กลับ
          </Button>
          <Button className="flex-1" disabled={!pending} onClick={onConfirm}>
            ตกลง
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
