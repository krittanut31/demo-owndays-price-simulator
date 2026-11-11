import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { optionFilter } from "@/types/pricing";

const yen = (n: number) => n.toLocaleString("th-TH");

export default function TotalPrice({ filter }: { filter: optionFilter }) {
  const extra = filter?.addLens1 + (filter?.addLens2 ?? 0);
  const total = filter.price + extra;

  return (
    <div className="w-full max-w-6xl rounded-3xl bg-zinc-100 px-6 py-10">
      <div className="mx-auto w-full max-w-md">
        <div className="flex items-baseline justify-between border-b border-dashed border-zinc-400 pb-3">
          <span className="text-2xl sm:text-3xl font-extrabold text-black">ราคารวม</span>
          <span className="text-2xl sm:text-4xl font-extrabold text-amber-700">
            {yen(total)} <span className="text-xl sm:text-2xl">เยน</span>
          </span>
        </div>

        <dl className="mt-3 space-y-1 text-zinc-700">
          <div className="flex items-baseline justify-between">
            <dt>กรอบ</dt>
            <dd className="text-lg sm:text-xl font-bold">{yen(filter.price)} เยน</dd>
          </div>
          <div className="flex items-baseline justify-between">
            <dt>ค่าธรรมเนียมเพิ่มเติม</dt>
            <dd className="text-lg sm:text-xl font-bold">+ {yen(extra)} เยน</dd>
          </div>
        </dl>

        <div className="mt-8 space-y-1 text-center text-sm">
          <p className="font-medium text-amber-700">
            จัดส่งฟรีทั่วประเทศญี่ปุ่นสำหรับคำสั่งซื้อที่มีมูลค่ามากกว่า 3,300
            เยนในร้านค้าออนไลน์ของเรา
          </p>
          <p className="text-zinc-500">*ราคาสินค้าทั้งหมดรวมภาษีแล้ว</p>
        </div>

        <Button size="lg" className="mt-3 h-14 w-full bg-zinc-900 text-base font-bold text-white hover:bg-zinc-800">
          <Search />
          กำลังมองหากรอบรูปในราคาใกล้เคียงกัน
        </Button>
      </div>
    </div>
  );
}
