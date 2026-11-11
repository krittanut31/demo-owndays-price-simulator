import type {
  EyeglassLens2Group,
  EyeglassLens2Option,
} from "@/types/pricing";

// ตัวเลือก "อย่าเพิ่ม" (ราคา 0) ใช้ได้เสมอ
export const noLens2Option = { id: "none", name: "ไม่เลือก", price: 0 };

// ราคาหน่วยเยน
export const eyeglassLens2Groups: EyeglassLens2Group[] = [
  {
    id: "functional",
    title: "เพิ่มฟังก์ชันการทำงาน - เสื้อโค้ท",
    options: [
      { id: "bluelightcut", categoryId: "functional", name: "ฟิลเตอร์แสงสีฟ้า", price: 4000 },
      { id: "uvcut", categoryId: "functional", name: "ป้องกันรังสียูวีและแสงสีฟ้า", price: 6000 },
      { id: "antifog", categoryId: "functional", name: "สารเคลือบป้องกันการเกิดฝ้า", price: 6000 },
      { id: "antiscratch", categoryId: "functional", name: "สารเคลือบป้องกันรอยขีดข่วน", price: 6000 },
      { id: "transitions", categoryId: "functional", name: "ฟังก์ชันหรี่แสง", price: 6000 },
      { id: "ultrathin", categoryId: "functional", name: "การประมวลผลแบบบางเฉียบ", price: 12000 },
      { id: "polarised", categoryId: "functional", name: "ฟังก์ชันโพลาไรเซชัน", price: 12000 },
    ],
  },
  {
    id: "color",
    title: "สี",
    options: [
      { id: "color", categoryId: "color", name: "สี", price: 4000 },
    ],
  },
  {
    id: "combo",
    title: "การผสมผสาน",
    options: [
      { id: "bluelightcut-color", categoryId: "combo", name: "การตัดแสงสีฟ้า + สีผม", price: 8000 },
      { id: "uvcut-color", categoryId: "combo", name: "ตัดแสง UV และแสงสีฟ้า + ทำสีผม", price: 10000 },
      { id: "antifog-color", categoryId: "combo", name: "สารเคลือบป้องกันฝ้า + สี", price: 10000 },
      { id: "antiscratch-color", categoryId: "combo", name: "เคลือบป้องกันรอยขีดข่วน + สี", price: 10000 },
      { id: "uvcut-antifog", categoryId: "combo", name: "ป้องกันรังสียูวีและแสงสีฟ้า + เคลือบสารป้องกันการเกิดฝ้า", price: 12000 },
      { id: "uvpc-antiscratch", categoryId: "combo", name: "ป้องกันรังสียูวีและแสงสีฟ้า + เคลือบสารกันรอยขีดข่วน", price: 12000 },
    ],
  },
];

export const eyeglassLens2Options: EyeglassLens2Option[] =
  eyeglassLens2Groups.flatMap((g) => g.options);
