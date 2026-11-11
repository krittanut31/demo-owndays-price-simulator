import type { EyeglassLensGroup } from "@/types/pricing";

const NONE = { compatibleCategories: ["none"], compatibleItems: ["none"] };

// เลนส์สองชั้นที่ใช้ร่วมกับเลนส์เสริม/เลนส์สีได้
const DOUBLE_COMPAT = {
  compatibleCategories: ["functional", "color"],
  compatibleItems: [
    "bluelightcut",
    "uvcut",
    "antifog",
    "antiscratch",
    "transitions",
    "color",
    "bluelightcut-color",
    "uvcut-color",
    "antifog-color",
    "antiscratch-color",
    "uvcut-antifog",
    "uvpc-antiscratch",
  ],
};

// ราคาหน่วยเยน
export const eyeglassLensGroups: EyeglassLensGroup[] = [
  {
    id: "standard",
    title: "เลนส์มาตรฐาน",
    options: [
      {
        id: "aspheric",
        name: "เลนส์แอสเฟริคัลบาง",
        price: 0,
        compatibleCategories: ["all"],
        compatibleItems: ["all"],
      },
      {
        id: "ultrathin",
        name: "เลนส์บางเฉียบ",
        price: 12000,
        compatibleCategories: ["color"],
        compatibleItems: ["color"],
      },
    ],
  },
  {
    id: "double",
    title: "เลนส์สองชั้น",
    options: [
      {
        id: "progressive",
        name: "เลนส์สองชั้น (เลนส์โปรเกรสซีฟ เลนส์ระยะกลาง และเลนส์สำหรับมองใกล้)",
        price: 0,
        ...DOUBLE_COMPAT,
      },
      {
        id: "premium-progressive",
        name: "เลนส์โปรเกรสซีฟระดับพรีเมียม",
        price: 6000,
        ...DOUBLE_COMPAT,
      },
      {
        id: "personalized-progressive",
        name: "เลนส์โปรเกรสซีฟสั่งทำพิเศษ",
        price: 12000,
        ...DOUBLE_COMPAT,
      },
      {
        id: "ultrathin-progressive",
        name: "เลนส์โปรเกรสซีฟแบบบางพิเศษ",
        price: 22000,
        compatibleCategories: ["color"],
        compatibleItems: ["color"],
      },
    ],
  },
  {
    id: "functional",
    title: "สารเคลือบเลนส์ที่มีคุณสมบัติเชิงฟังก์ชัน",
    options: [
      {
        id: "bluelightcut",
        name: "เลนส์กรองแสงสีฟ้า",
        price: 4000,
        compatibleCategories: ["functional", "color"],
        compatibleItems: ["uvcut", "polarised", "color"],
      },
      {
        id: "uvcut",
        name: "เลนส์ป้องกันรังสียูวีและแสงสีฟ้า",
        price: 6000,
        compatibleCategories: ["functional", "color"],
        compatibleItems: ["bluelightcut", "antifog", "antiscratch", "color"],
      },
      {
        id: "antifog",
        name: "สารเคลือบป้องกันการเกิดฝ้า",
        price: 6000,
        compatibleCategories: ["functional", "color"],
        compatibleItems: ["uvcut", "color"],
      },
      {
        id: "antiscratch",
        name: "สารเคลือบป้องกันรอยขีดข่วน",
        price: 6000,
        compatibleCategories: ["functional", "color", "combo"],
        compatibleItems: ["uvcut", "polarised", "color", "uvcut-color"],
      },
      {
        id: "iron-shield",
        name: "เลนส์เคลือบกันเหล็ก",
        price: 12000,
        ...NONE,
      },
      {
        id: "game",
        name: "เลนส์เกมมิ่ง",
        price: 12000,
        ...NONE,
      },
    ],
  },
  {
    id: "color",
    title: "เลนส์สี",
    options: [
      {
        id: "color",
        name: "เลนส์สี",
        price: 4000,
        compatibleCategories: ["functional"],
        compatibleItems: [
          "bluelightcut",
          "uvcut",
          "antifog",
          "antiscratch",
          "ultrathin",
          "uvpc-antiscratch",
        ],
      },
      {
        id: "nuance-color",
        name: "เลนส์ควบคุมสี",
        price: 4000,
        ...NONE,
      },
      {
        id: "polarised",
        name: "เลนส์โพลาไรซ์",
        price: 12000,
        compatibleCategories: ["functional"],
        compatibleItems: ["bluelightcut", "antiscratch"],
      },
      {
        id: "transitions",
        name: "เลนส์เปลี่ยนสีตามแสง",
        price: 6000,
        ...NONE,
      },
      {
        id: "visible-transitions",
        name: "เลนส์เปลี่ยนสีตามแสง",
        price: 9000,
        ...NONE,
      },
    ],
  },
];
