import type { SunglassLensGroup } from "@/types/pricing";

const icon = (name: string) =>
  `https://storage.owndays.com/images/services/price-simulator/lens/${name}-lens-icon.webp`;
const detail = (path: string) => `https://www.owndays.com${path}`;

// ราคาหน่วยเยน
export const sunglassLensGroups: SunglassLensGroup[] = [
  {
    id: "color",
    title: "カラーレンズ",
    options: [
      {
        id: "color",
        categoryId: "color",
        name: "カラーレンズ",
        description:
          "お好みのフレームと組み合わせることでファッション性を楽しんだり、サングラスとして使用したりできるレンズです。",
        price: 4000,
        icon: icon("color"),
        detailUrl: detail("/jp/ja/services/lens/color"),
      },
      {
        id: "nuance-color",
        categoryId: "color",
        name: "コントロールカラーレンズ",
        description:
          "黄ぐすみ・シミをカバーするコンシーラー効果をプラスした、アンチエイジング対策におすすめのレンズです。",
        price: 4000,
        icon: icon("nuance-color"),
        detailUrl: detail("/jp/ja/news/nuance-color-lens"),
      },
    ],
  },
  {
    id: "combo",
    title: "組み合わせ",
    options: [
      { id: "color-bluelight", categoryId: "combo", name: "カラーレンズ ＋ ブルーライトカット", price: 8000, icons: [icon("color"), icon("bluelightcut")] },
      { id: "color-uvpc", categoryId: "combo", name: "カラーレンズ ＋ UV＆ブルーライトカット", price: 10000, icons: [icon("color"), icon("uvcut")] },
      { id: "color-kumori", categoryId: "combo", name: "カラーレンズ ＋ くもり止めコート", price: 10000, icons: [icon("color"), icon("antifog")] },
      { id: "color-kizu", categoryId: "combo", name: "カラーレンズ ＋ 傷防止コート", price: 10000, icons: [icon("color"), icon("antiscratch")] },
      { id: "polarized-bluelight", categoryId: "combo", name: "偏光レンズ ＋ ブルーライトカット", price: 16000, icons: [icon("polarised"), icon("bluelightcut")] },
      { id: "polarized-kizu", categoryId: "combo", name: "偏光レンズ ＋ 傷防止コート", price: 18000, icons: [icon("polarised"), icon("antiscratch")] },
    ],
  },
  {
    id: "functional",
    title: "機能性レンズ",
    options: [
      {
        id: "pc-color",
        categoryId: "functional",
        name: "ブルーライトカットカラーレンズ",
        description: "パソコン・スマホの使用時に、ブルーライトから目を守ります。",
        price: 4000,
        icon: icon("bluelightcut"),
        detailUrl: detail("/jp/ja/services/lens/bluelightcut"),
      },
      {
        id: "polarized",
        categoryId: "functional",
        name: "偏光レンズ",
        description: "水面などのギラつく反射光をカットする、アウトドア向きのレンズです。",
        price: 12000,
        icon: icon("polarised"),
        detailUrl: detail("/jp/ja/services/lens/polarised"),
      },
      {
        id: "transitions",
        categoryId: "functional",
        name: "調光レンズ",
        description:
          "メガネにもサングラスにも、紫外線の量に合わせてレンズの色が変化します。",
        price: 6000,
        icon: icon("transitions"),
        detailUrl: detail("/jp/ja/services/lens/transitions"),
      },
      {
        id: "visible-transitions",
        categoryId: "functional",
        name: "可視光調光レンズ",
        description: "紫外線だけでなく可視光にも反応する調光レンズです。",
        price: 9000,
        icon: icon("transitions"),
        detailUrl: detail("/jp/ja/services/lens/transitions"),
      },
    ],
  },
];
