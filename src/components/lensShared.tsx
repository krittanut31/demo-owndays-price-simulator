import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export type LensItem = {
  id: string;
  name: string;
  price: number;
  // ถ้ามี description จะแสดงเป็นการ์ดแบบละเอียด (ไอคอน, คำอธิบาย, ลิงก์)
  description?: string;
  icon?: string;
  detailUrl?: string;
  icons?: [string, string];
};
export type LensSectionData = {
  id: string;
  title: string;
  items: LensItem[];
  note?: string;
};

// การ์ดบนแท็บเล็ต: 2 ใบต่อแถว (ใบที่ 3 ขึ้นแถวใหม่อยู่กลาง) / เดสก์ท็อป: แถวเดียวแบ่งเท่ากัน
export const cardCell =
  "w-full max-w-80 flex-1 self-center md:max-w-none md:self-auto h-auto md:h-70 md:w-[calc(50%-2rem)] md:flex-none lg:w-auto lg:flex-1 p-0";

export function LensIcon() {
  return (
    <Image
      src="https://preview.storage.owndays.com/images/services/price-simulator/lens-options-icons.webp"
      alt=""
      width={50}
      height={50}
      className="size-7.5 md:size-12.5"
      unoptimized
    />
  );
}

export function Plus() {
  return <span className="self-center text-2xl text-zinc-400 md:text-4xl">+</span>;
}

export function OptionRow({
  selected,
  disabled,
  onClick,
  className,
  children,
}: {
  selected: boolean;
  disabled?: boolean;
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-center rounded-lg border px-4 py-5 font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-30",
        selected ? "border-black" : "border-zinc-200 hover:border-zinc-400",
        className,
      )}
    >
      {children}
    </button>
  );
}

function RichRow({
  item,
  selected,
  disabled,
  onClick,
}: {
  item: LensItem;
  selected: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={cn(
        "relative rounded-lg border transition-colors",
        selected ? "border-black" : "border-zinc-200 hover:border-zinc-400",
        disabled && "opacity-30",
      )}
    >
      <button
        type="button"
        aria-pressed={selected}
        disabled={disabled}
        onClick={onClick}
        className="flex w-full gap-5 p-6 text-left disabled:cursor-not-allowed"
      >
        {item.icon && (
          <Image src={item.icon} alt="" width={40} height={40} className="size-10 shrink-0" unoptimized />
        )}
        <span className="flex-1 space-y-3">
          <span className="block font-bold">{item.name}</span>
          <span className="block text-sm text-zinc-600">{item.description}</span>
          <span className="block font-bold">+ ¥{item.price.toLocaleString("th-TH")}</span>
        </span>
      </button>
      {item.detailUrl && (
        <a
          href={item.detailUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-6 bottom-6 text-sm text-sky-600 hover:underline"
        >
          詳しく見る ›
        </a>
      )}
    </div>
  );
}

// modal มาตรฐาน: หัวข้อกลาง, ปุ่มปิดวงกลม, รายการเลื่อนได้, ปุ่มกลับ/ตกลงตรึงด้านล่าง
export function PickModal({
  open,
  title,
  confirmDisabled,
  onConfirm,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  confirmDisabled?: boolean;
  onConfirm: () => void;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="flex max-h-[85vh] flex-col gap-6 rounded-none p-8 md:max-w-2xl"
      >
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            {title}
          </DialogTitle>
        </DialogHeader>
        <Button
          variant="outline"
          size="icon"
          aria-label="ปิด"
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full"
        >
          <X />
        </Button>

        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto">{children}</div>

        <div className="flex gap-3">
          <Button variant="outline" className="h-12 flex-1" onClick={onClose}>
            戻る
          </Button>
          <Button
            className="h-12 flex-2 bg-zinc-900 text-white hover:bg-zinc-800"
            disabled={confirmDisabled}
            onClick={onConfirm}
          >
            決定する
          </Button>
        </div>
      </DialogContent>
    </Dialog>
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
    <PickModal
      open={open}
      title={title}
      confirmDisabled={!pending}
      onConfirm={onConfirm}
      onClose={onClose}
    >
      {sections.map((section,index) => (
        <section key={section.id} className={`space-y-3 ${index ? 'mt-10': 'mt-0'}`}>
          {section.title && <h3 className="font-bold">{section.title}</h3>}
          {section.items.map((item) =>
            item.description ? (
              <RichRow
                key={item.id}
                item={item}
                selected={pending?.id === item.id}
                disabled={isDisabled?.(item)}
                onClick={() => onPick(item)}
              />
            ) : (
            <OptionRow
              key={item.id}
              selected={pending?.id === item.id}
              disabled={isDisabled?.(item)}
              onClick={() => onPick(item)}
              className="justify-between gap-4 text-left"
            >
              {item.icons && (
                <span className="flex shrink-0 items-center gap-2">
                  <Image src={item.icons[0]} alt="" width={40} height={40} className="size-10" unoptimized />
                  <span className="text-zinc-500">+</span>
                  <Image src={item.icons[1]} alt="" width={40} height={40} className="size-10" unoptimized />
                </span>
              )}
              <span className="flex-1">{item.name}</span>
              {item.price > 0 && (
                <span className="shrink-0">+ ¥{item.price.toLocaleString("th-TH")}</span>
              )}
            </OptionRow>
            ),
          )}
          {section.note && (
            <p className="text-sm text-zinc-500">{section.note}</p>
          )}
        </section>
      ))}
    </PickModal>
  );
}
