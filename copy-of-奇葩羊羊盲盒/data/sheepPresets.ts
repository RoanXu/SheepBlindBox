
import { SheepResponse } from "../types";

export const SHEEP_PRESETS: SheepResponse[] = [
  // --- Common (常规款) ---
  {
    name: "香草冰淇淋羊",
    description: "闻起来有一股淡淡的甜味，夏天最受欢迎。",
    color: "#FFFDD0",
    skinColor: "#FFCC99",
    rarity: "Common",
    accessory: "蛋卷帽子"
  },
  {
    name: "抹茶红豆羊",
    description: "性格温和，喜欢在午后晒太阳。",
    color: "#C5E1A5",
    skinColor: "#D7CCC8",
    rarity: "Common",
    accessory: "红豆项链"
  },
  {
    name: "棉花糖羊",
    description: "软绵绵的，一碰就会陷进去。",
    color: "#FFCDD2",
    skinColor: "#FFEBEE",
    rarity: "Common",
    accessory: "粉色蝴蝶结"
  },
  {
    name: "打工人羊",
    description: "虽然很累，但还是坚持每天早起吃草。",
    color: "#90CAF9",
    skinColor: "#E0E0E0",
    rarity: "Common",
    accessory: "领带和黑眼圈"
  },
  {
    name: "报纸羊",
    description: "身上印满了昨天的新闻，知识渊博。",
    color: "#EEEEEE",
    skinColor: "#BDBDBD",
    rarity: "Common",
    accessory: "黑框眼镜"
  },
  {
    name: "橘子汽水羊",
    description: "充满活力，像气泡一样在那跳来跳去。",
    color: "#FFCC80",
    skinColor: "#FFF3E0",
    rarity: "Common",
    accessory: "吸管"
  },
  {
    name: "水泥灰羊",
    description: "极简主义者，喜欢呆在角落不动。",
    color: "#B0BEC5",
    skinColor: "#78909C",
    rarity: "Common",
    accessory: "无"
  },
  {
    name: "牛仔丹宁羊",
    description: "酷酷的西部风格，永远不会过时。",
    color: "#5C6BC0",
    skinColor: "#FFCCBC",
    rarity: "Common",
    accessory: "红色方巾"
  },

  // --- Rare (稀有款) ---
  {
    name: "珍珠奶茶羊",
    description: "全糖去冰！体内不仅有羊毛还有珍珠。",
    color: "#D7CCC8",
    skinColor: "#3E2723",
    rarity: "Rare",
    accessory: "黑糖珍珠纹理"
  },
  {
    name: "赛博朋克羊",
    description: "来自2077年的霓虹羊，自带发光特效。",
    color: "#CCFF90",
    skinColor: "#212121",
    rarity: "Rare",
    accessory: "全息护目镜"
  },
  {
    name: "草莓大福羊",
    description: "外皮糯糯的，切开里面是粉红色的。",
    color: "#FFFFFF",
    skinColor: "#F48FB1",
    rarity: "Rare",
    accessory: "草莓头饰"
  },
  {
    name: "复古游戏羊",
    description: "由8-bit像素方块组成的小羊。",
    color: "#7E57C2",
    skinColor: "#FFEB3B",
    rarity: "Rare",
    accessory: "手柄挂件"
  },
  {
    name: "海盐芝士羊",
    description: "咸甜适中，清爽的海风味道。",
    color: "#E0F7FA",
    skinColor: "#FFF9C4",
    rarity: "Rare",
    accessory: "蓝色贝壳"
  },
  {
    name: "锦鲤羊",
    description: "转发这只羊，明天会有好运发生。",
    color: "#FFAB91",
    skinColor: "#FFCC80",
    rarity: "Rare",
    accessory: "金色鳞片纹身"
  },

  // --- Epic (典藏款) ---
  {
    name: "星际穿越羊",
    description: "它的羊毛里藏着整个银河系。",
    color: "#311B92",
    skinColor: "#B388FF",
    rarity: "Epic",
    accessory: "土星环"
  },
  {
    name: "蒸汽波羊",
    description: "A E S T H E T I C 风格的迷幻小羊。",
    color: "#F8BBD0",
    skinColor: "#80DEEA",
    rarity: "Epic",
    accessory: "大卫雕像面具"
  },
  {
    name: "黄金矿工羊",
    description: "传说中由纯金打造，非常沉重。",
    color: "#FFD700",
    skinColor: "#FFA000",
    rarity: "Epic",
    accessory: "钻石项链"
  },
  {
    name: "黑森林羊",
    description: "神秘、优雅，散发着可可的香气。",
    color: "#3E2723",
    skinColor: "#D50000",
    rarity: "Epic",
    accessory: "樱桃皇冠"
  },

  // --- Legendary (梦幻款) ---
  {
    name: "独角兽羊",
    description: "只存在于童话中的生物，脚下会生出彩虹。",
    color: "#FFFFFF",
    skinColor: "#F48FB1",
    rarity: "Legendary",
    accessory: "水晶独角"
  },
  {
    name: "机械纪元羊",
    description: "完全机械化，拥有超级计算核心。",
    color: "#ECEFF1",
    skinColor: "#00BCD4",
    rarity: "Legendary",
    accessory: "机械翅膀"
  },
  {
    name: "时间领主羊",
    description: "它可以随意穿梭过去与未来。",
    color: "#1A237E",
    skinColor: "#C5CAE9",
    rarity: "Legendary",
    accessory: "怀表"
  },

  // --- Glitch (隐藏款) ---
  {
    name: "MissingNo.羊",
    description: "数据加载错误...系统崩溃边缘的产物。",
    color: "#212121",
    skinColor: "#00E676",
    rarity: "Glitch",
    accessory: "乱码方块"
  },
  {
    name: "透明羊",
    description: "你看得见我吗？我看不见我自己。",
    color: "#CFD8DC",
    skinColor: "#ECEFF1",
    rarity: "Glitch",
    accessory: "虚无"
  }
];
