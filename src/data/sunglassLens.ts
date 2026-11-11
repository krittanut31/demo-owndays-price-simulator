import type {
  SunglassLensCombo,
  SunglassLensGroup,
} from "@/types/pricing";

// เลนส์เดี่ยว แบ่งตามหมวด (ราคาหน่วยเยน)
export const sunglassLensGroups: SunglassLensGroup[] = [
  {
    id: "color",
    title: "เลนส์สี",
    options: [
      {
        id: "color",
        categoryId: "color",
        name: "เลนส์สี",
        price: 4000,
      },
      {
        id: "nuance-color",
        categoryId: "color",
        name: "เลนส์ควบคุมสี",
        price: 4000,
      },
    ],
  },
  {
    id: "functional",
    title: "เลนส์ปรับแก้สายตาผิดปกติ",
    options: [
      {
        id: "pc-color",
        categoryId: "functional",
        name: "เลนส์สีที่ช่วยกรองแสงสีฟ้า",
        price: 4000,
      },
      {
        id: "polarized",
        categoryId: "functional",
        name: "เลนส์โพลาไรซ์",
        price: 12000,
      },
      {
        id: "transitions",
        categoryId: "functional",
        name: "เลนส์เปลี่ยนสีตามแสง",
        price: 6000,
      },
      {
        id: "visible-transitions",
        categoryId: "functional",
        name: "เลนส์เปลี่ยนสีตามแสง",
        price: 9000,
      },
    ],
  },
];

// หมวด "การผสมผสาน" (เลนส์ 2 ชนิดรวมกัน)
export const sunglassLensCombos: SunglassLensCombo[] = [
  {
    id: "color-bluelight",
    name: "เลนส์สี + ฟิลเตอร์กรองแสงสีฟ้า",
    price: 8000,
  },
  {
    id: "color-uvpc",
    name: "เลนส์สี + ป้องกันรังสียูวีและแสงสีฟ้า",
    price: 10000,
  },
  {
    id: "color-kumori",
    name: "เลนส์สี + เคลือบสารกันฝ้า",
    price: 10000,
  },
  {
    id: "color-kizu",
    name: "เลนส์สี + เคลือบสารกันรอยขีดข่วน",
    price: 10000,
  },
  {
    id: "polarized-bluelight",
    name: "เลนส์โพลาไรซ์ + ฟิลเตอร์กรองแสงสีฟ้า",
    price: 16000,
  },
  {
    id: "polarized-kizu",
    name: "เลนส์โพลาไรซ์ + เคลือบสารป้องกันรอยขีดข่วน",
    price: 18000,
  },
];
