export type optionFilter = {
    price:number
    addLens1:number
    addLens2?:number
}

export type GlassType = "glass" | "sunGlass"


export type SunglassLensCategoryId = "color" | "combo" | "functional"

export type SunglassLensOption = {
    id: string
    categoryId: SunglassLensCategoryId
    name: string
    price: number
    description?: string
    icon?: string
    detailUrl?: string
    // เลนส์แบบผสม (2 ไอคอนคั่นด้วย +)
    icons?: [string, string]
}

export type SunglassLensGroup = {
    id: SunglassLensCategoryId
    title: string
    options: SunglassLensOption[]
}


export type EyeglassLensGroupId = "standard" | "double" | "functional" | "color"

export type EyeglassLensOption = {
    id: string
    name: string
    description: string
    price: number
    icon: string
    detailUrl: string
    // เลนส์ที่เลือกเป็นตัวเลือกที่ 2 ได้เมื่อเลือกตัวนี้เป็นตัวเลือกที่ 1
    // ["all"] = ทุกตัว, ["none"] = ใช้ร่วมกับตัวอื่นไม่ได้
    compatibleCategories: string[]
    compatibleItems: string[]
}

export type EyeglassLensGroup = {
    id: EyeglassLensGroupId
    title: string
    options: EyeglassLensOption[]
    note?: string
}


// เลนส์ตัวเลือกที่ 2 (modal "เพิ่มตัวเลือก")
export type EyeglassLens2CategoryId = "functional" | "color" | "combo"

export type EyeglassLens2Option = {
    // id ตรงกับค่าใน compatibleItems ของเลนส์ตัวเลือกที่ 1
    id: string
    categoryId: EyeglassLens2CategoryId
    name: string
    price: number
    description?: string
    icon?: string
    detailUrl?: string
    // เลนส์แบบผสม (2 ไอคอนคั่นด้วย +)
    icons?: [string, string]
}

export type EyeglassLens2Group = {
    id: EyeglassLens2CategoryId
    title: string
    options: EyeglassLens2Option[]
}


export type OnFilterChange = <K extends keyof optionFilter>(
    key: K,
    value: optionFilter[K],
) => void
