import type { EyeglassLensGroup } from "@/types/pricing";

const icon = (name: string) =>
  `https://storage.owndays.com/images/services/price-simulator/lens/${name}-lens-icon.webp`;
const detail = (path: string) => `https://www.owndays.com${path}`;

const NONE = { compatibleCategories: ["none"], compatibleItems: ["none"] };

// 遠近両用レンズが機能性レンズ・カラーと併用できる組み合わせ
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

const PROGRESSIVE_DESC =
  "メガネをかけ替えることなく遠・中・近を見ることができる便利なレンズです。";

// ราคาหน่วยเยน
export const eyeglassLensGroups: EyeglassLensGroup[] = [
  {
    id: "standard",
    title: "標準レンズ",
    options: [
      {
        id: "aspheric",
        name: "薄型非球面レンズ",
        description: "フレーム価格に追加料金なしで作れる、高品質なスタンダードレンズです。",
        price: 0,
        icon: icon("aspheric"),
        detailUrl: detail("/jp/ja/services/lens/aspheric"),
        compatibleCategories: ["all"],
        compatibleItems: ["all"],
      },
      {
        id: "ultrathin",
        name: "超極薄レンズ",
        description:
          "「より薄く」「より軽く」を実現した世界最高屈折率の両面非球面設計レンズです。",
        price: 12000,
        icon: icon("ultrathin"),
        detailUrl: detail("/jp/ja/services/lens/ultrathin"),
        compatibleCategories: ["color"],
        compatibleItems: ["color"],
      },
    ],
  },
  {
    id: "double",
    title: "遠近両用レンズ",
    note: "オンラインストアでは遠近両用レンズのお取り扱いはございません。お近くの店舗までお買い求めください",
    options: [
      {
        id: "progressive",
        name: "遠近両用レンズ（遠近・中近・近近）",
        description: PROGRESSIVE_DESC,
        price: 0,
        icon: icon("progressive"),
        detailUrl: detail("/jp/ja/services/lens/progressive"),
        ...DOUBLE_COMPAT,
      },
      {
        id: "premium-progressive",
        name: "プレミアム遠近両用レンズ",
        description: PROGRESSIVE_DESC,
        price: 6000,
        icon: icon("premium-progressive"),
        detailUrl: detail("/jp/ja/news/progressive"),
        ...DOUBLE_COMPAT,
      },
      {
        id: "personalized-progressive",
        name: "カスタムメイド遠近両用レンズ",
        description:
          "フレーム角度や目とレンズの距離など、お客様一人ひとり合わせたカスタムメイドでこれまで以上に快適な視野を実現します。",
        price: 12000,
        icon: icon("personalized-progressive"),
        detailUrl: detail("/jp/ja/services/lens/personalized-progressive"),
        ...DOUBLE_COMPAT,
      },
      {
        id: "ultrathin-progressive",
        name: "超極薄遠近両用レンズ",
        description:
          "薄型で軽量な設計なので、ユレ・ユガミが少なくよりクリアな視界を実現したレンズ。",
        price: 22000,
        icon: icon("aspheric"),
        detailUrl: detail("/jp/ja/services/lens/ultrathin-progressive"),
        compatibleCategories: ["color"],
        compatibleItems: ["color"],
      },
    ],
  },
  {
    id: "functional",
    title: "機能性レンズ・コート",
    note: "ゲーミングレンズはオンラインストアのみお取り扱いしております。",
    options: [
      {
        id: "bluelightcut",
        name: "ブルーライトカットレンズ",
        description: "パソコン・スマホの使用時に、ブルーライトから目を守ります。",
        price: 4000,
        icon: icon("bluelightcut"),
        detailUrl: detail("/jp/ja/services/lens/bluelightcut"),
        compatibleCategories: ["functional", "color"],
        compatibleItems: ["uvcut", "polarised", "color"],
      },
      {
        id: "uvcut",
        name: "UV＆ブルーライトカットレンズ",
        description: "UV420で紫外線などの有害な光とブルーライトから目を守ります。",
        price: 6000,
        icon: icon("uvcut"),
        detailUrl: detail("/jp/ja/services/lens/uvcut"),
        compatibleCategories: ["functional", "color"],
        compatibleItems: ["bluelightcut", "antifog", "antiscratch", "color"],
      },
      {
        id: "antifog",
        name: "くもり止めコート",
        description: "表面に施した特殊コーティングでレンズを曇りにくくします。",
        price: 6000,
        icon: icon("antifog"),
        detailUrl: detail("/jp/ja/news/antifog"),
        compatibleCategories: ["functional", "color"],
        compatibleItems: ["uvcut", "color"],
      },
      {
        id: "antiscratch",
        name: "傷防止コート",
        description:
          "「レンズの傷が気になる方」におすすめ！ブルーライトカット機能を搭載した、傷に強い特殊コーティング。",
        price: 6000,
        icon: icon("antiscratch"),
        detailUrl: detail("/jp/ja/services/lens/antiscratch"),
        compatibleCategories: ["functional", "color", "combo"],
        compatibleItems: ["uvcut", "polarised", "color", "uvcut-color"],
      },
      {
        id: "iron-shield",
        name: "鉄壁コートレンズ",
        description:
          "紫外線やブルーライトなどの有害な光から眼を守り、キズ・汚れ・ホコリにも強いレンズです。",
        price: 12000,
        icon: icon("aspheric"),
        detailUrl: detail("/jp/ja/services/lens/iron-shield"),
        ...NONE,
      },
      {
        id: "game",
        name: "ゲーミングレンズ",
        description:
          "e-スポーツ選手も使用するゲームシーンに適したレンズです。フラッシュ＆ブルーライトから目を守ります。",
        price: 12000,
        icon: icon("game"),
        detailUrl: detail("/jp/ja/services/lens/game"),
        ...NONE,
      },
    ],
  },
  {
    id: "color",
    title: "カラーレンズ",
    options: [
      {
        id: "color",
        name: "カラーレンズ",
        description:
          "お好みのフレームと組み合わせることでファッション性を楽しんだり、サングラスとして使用したりできるレンズです。",
        price: 4000,
        icon: icon("color"),
        detailUrl: detail("/jp/ja/services/lens/color"),
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
        name: "コントロールカラーレンズ",
        description:
          "黄ぐすみ・シミをカバーするコンシーラー効果をプラスした、アンチエイジング対策におすすめのレンズです。",
        price: 4000,
        icon: icon("nuance-color"),
        detailUrl: detail("/jp/ja/news/nuance-color-lens"),
        ...NONE,
      },
      {
        id: "polarised",
        name: "偏光レンズ",
        description: "水面などのギラつく反射光をカットする、アウトドア向きのレンズです。",
        price: 12000,
        icon: icon("polarised"),
        detailUrl: detail("/jp/ja/services/lens/polarised"),
        compatibleCategories: ["functional"],
        compatibleItems: ["bluelightcut", "antiscratch"],
      },
      {
        id: "transitions",
        name: "調光レンズ",
        description:
          "メガネにもサングラスにも、紫外線の量に合わせてレンズの色が変化します。",
        price: 6000,
        icon: icon("transitions"),
        detailUrl: detail("/jp/ja/services/lens/transitions"),
        ...NONE,
      },
      {
        id: "visible-transitions",
        name: "可視光調光レンズ",
        description: "紫外線だけでなく可視光にも反応する調光レンズです。",
        price: 9000,
        icon: icon("transitions"),
        detailUrl: detail("/jp/ja/services/lens/transitions"),
        ...NONE,
      },
    ],
  },
];
