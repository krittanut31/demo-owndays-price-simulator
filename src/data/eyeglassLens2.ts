import type {
  EyeglassLens2Group,
  EyeglassLens2Option,
} from "@/types/pricing";

const icon = (name: string) =>
  `https://storage.owndays.com/images/services/price-simulator/lens/${name}-lens-icon.webp`;
const detail = (path: string) => `https://www.owndays.com${path}`;

// ตัวเลือก "追加しない" (ไม่เพิ่ม ราคา 0) ใช้ได้เสมอ
export const noLens2Option = { id: "none", name: "追加しない", price: 0 };

// ราคาหน่วยเยน / id ตรงกับ compatibleItems ของเลนส์ตัวเลือกที่ 1
export const eyeglassLens2Groups: EyeglassLens2Group[] = [
  {
    id: "functional",
    title: "機能性追加・コート",
    options: [
      {
        id: "bluelightcut",
        categoryId: "functional",
        name: "ブルーライトカット",
        description: "パソコン・スマホの使用時に、ブルーライトから目を守ります。",
        price: 4000,
        icon: icon("bluelightcut"),
        detailUrl: detail("/jp/ja/services/lens/bluelightcut"),
      },
      {
        id: "uvcut",
        categoryId: "functional",
        name: "UV＆ブルーライトカット",
        description: "UV420で紫外線などの有害な光とブルーライトから目を守ります。",
        price: 6000,
        icon: icon("uvcut"),
        detailUrl: detail("/jp/ja/services/lens/uvcut"),
      },
      {
        id: "antifog",
        categoryId: "functional",
        name: "くもり止めコート",
        description: "表面に施した特殊コーティングでレンズを曇りにくくします。",
        price: 6000,
        icon: icon("antifog"),
        detailUrl: detail("/jp/ja/news/antifog"),
      },
      {
        id: "antiscratch",
        categoryId: "functional",
        name: "傷防止コート",
        description:
          "「レンズの傷が気になる方」におすすめ！ブルーライトカット機能を搭載した、傷に強い特殊コーティング。",
        price: 6000,
        icon: icon("antiscratch"),
        detailUrl: detail("/jp/ja/services/lens/antiscratch"),
      },
      {
        id: "transitions",
        categoryId: "functional",
        name: "調光機能",
        description:
          "メガネにもサングラスにも、紫外線の量に合わせてレンズの色が変化します。",
        price: 6000,
        icon: icon("transitions"),
        detailUrl: detail("/jp/ja/services/lens/transitions"),
      },
      {
        id: "ultrathin",
        categoryId: "functional",
        name: "超極薄加工",
        description:
          "「より薄く」「より軽く」を実現した世界最高屈折率の両面非球面設計レンズです。",
        price: 12000,
        icon: icon("ultrathin"),
        detailUrl: detail("/jp/ja/services/lens/ultrathin"),
      },
      {
        id: "polarised",
        categoryId: "functional",
        name: "偏光機能",
        description: "水面などのギラつく反射光をカットする、アウトドア向きです。",
        price: 12000,
        icon: icon("polarised"),
        detailUrl: detail("/jp/ja/services/lens/polarised"),
      },
    ],
  },
  {
    id: "color",
    title: "カラー",
    options: [
      {
        id: "color",
        categoryId: "color",
        name: "カラー",
        description:
          "お好みのフレームと組み合わせることでファッション性を楽しんだり、サングラスとして使用したりできます。",
        price: 4000,
        icon: icon("color"),
        detailUrl: detail("/jp/ja/services/lens/color"),
      },
    ],
  },
  {
    id: "combo",
    title: "組み合わせ",
    options: [
      { id: "bluelightcut-color", categoryId: "combo", name: "ブルーライトカット ＋ カラー", price: 8000, icons: [icon("bluelightcut"), icon("color")] },
      { id: "uvcut-color", categoryId: "combo", name: "UV＆ブルーライトカット ＋ カラー", price: 10000, icons: [icon("uvcut"), icon("color")] },
      { id: "antifog-color", categoryId: "combo", name: "くもり止めコート ＋ カラー", price: 10000, icons: [icon("antifog"), icon("color")] },
      { id: "antiscratch-color", categoryId: "combo", name: "傷防止コート ＋ カラー", price: 10000, icons: [icon("antiscratch"), icon("color")] },
      { id: "uvcut-antifog", categoryId: "combo", name: "UV＆ブルーライトカット ＋ くもり止めコート", price: 12000, icons: [icon("uvcut"), icon("antifog")] },
      { id: "uvpc-antiscratch", categoryId: "combo", name: "UV＆ブルーライトカット ＋ 傷防止コート", price: 12000, icons: [icon("uvcut"), icon("antiscratch")] },
    ],
  },
];

export const eyeglassLens2Options: EyeglassLens2Option[] =
  eyeglassLens2Groups.flatMap((g) => g.options);
