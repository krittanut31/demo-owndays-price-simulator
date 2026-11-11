import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { optionFilter } from "@/types/pricing";

const yen = (n: number) => n.toLocaleString("th-TH");

export default function TotalPrice({ filter }: { filter: optionFilter }) {
  const extra = filter?.addLens1 + (filter?.addLens2 ?? 0);
  const total = filter.price + extra;

  return (
    <div className="w-full max-w-80 rounded-3xl bg-zinc-100 px-6 py-10 md:max-w-6xl">
      <div className="mx-auto w-full max-w-md">
        <div className="flex items-baseline justify-between border-b border-dashed border-zinc-400">
          <span className="text-xl md:text-[32px] font-extrabold text-black">
            合計価格
          </span>
          <span className="text-[28px] md:text-[40px] font-extrabold text-[#b47e00]">
            ¥{yen(total)}
          </span>
        </div>

        <dl className=" space-y-1 text-zinc-700">
          <div className="flex items-baseline justify-between">
            <dt className="text-[#535353] font-medium text-base">フレーム</dt>
            <dd className="text-base md:text-2xl text-[#535353] font-bold">
              ¥{yen(filter.price)}
            </dd>
          </div>
          <div className="flex items-baseline justify-between">
            <dt className="text-[#535353] font-medium text-base">追加料金</dt>
            <dd className="text-base md:text-2xl text-[#535353] font-bold">
              + ¥{yen(extra)}
            </dd>
          </div>
        </dl>

        <div className="mt-8 space-y-1 text-center text-sm">
          <p className="font-medium text-[#b47e00] ">
            オンラインストアは
            <br />
            3,300円以上で日本全国送料無料
          </p>
          <p className="text-zinc-500 font-medium">※すべて税込価格となります</p>
        </div>

        <Button
          size="lg"
          className="mt-3 h-14 w-full bg-zinc-900 text-base font-bold text-white hover:bg-zinc-800"
        >
          <Search />
          同価格帯のフレームを探す
        </Button>
      </div>
    </div>
  );
}
