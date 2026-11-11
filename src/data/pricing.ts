export type Lens = { id: string; name: string; price: number };
export type Lens2 = Lens & { compatibleWith: string[] }; // ids of Lens 1

// แว่นสายตา: 8,000 – 22,000 ขยับทีละ 1,000
export const eyeglassPriceRanges: number[] = Array.from(
  { length: 15 },
  (_, i) => 7000 + i * 1000,
);

export const eyeglassLens1: Lens[] = [
  { id: "single", name: "เลนส์ชั้นเดียว (Single Vision)", price: 1500 },
  { id: "thin167", name: "เลนส์บางพิเศษ 1.67", price: 3000 },
  { id: "progressive", name: "เลนส์โปรเกรสซีฟ", price: 5000 },
];

// เลนส์ 2 ต้องใช้ร่วมกับเลนส์ 1 ที่เลือกได้เท่านั้น
export const eyeglassLens2: Lens2[] = [
  { id: "bluecut", name: "เคลือบกรองแสงสีฟ้า", price: 1500, compatibleWith: ["single", "thin167", "progressive"] },
  { id: "photochromic", name: "เลนส์เปลี่ยนสีตามแสง", price: 3500, compatibleWith: ["single", "progressive"] },
  { id: "antifatigue", name: "เลนส์ลดอาการล้าสายตา", price: 2000, compatibleWith: ["single"] },
];

// แว่นกันแดด
export const sunglassPriceRanges: number[] = [6000, 8000];

export const sunglassLenses: Lens[] = [
  { id: "polarized", name: "เลนส์โพลาไรซ์", price: 2000 },
  { id: "gradient", name: "เลนส์ไล่เฉดสี", price: 1000 },
  { id: "mirror", name: "เลนส์ปรอท (Mirror)", price: 1500 },
  { id: "prescription", name: "เลนส์สายตา (Prescription)", price: 3000 },
];
