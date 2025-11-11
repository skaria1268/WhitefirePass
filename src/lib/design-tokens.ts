/**
 * Design tokens - Unified design system
 * 统一的设计规范
 */

/**
 * Border opacity levels
 * 边框透明度
 */
export const BORDER_OPACITY = {
  phase: '40',      // 阶段主题边框
  divider: '30',    // 分隔线
  card: '50',       // 卡片边框
  solid: '100',     // UI组件边框（无透明度）
} as const;

/**
 * Typography scale
 * 字体层级系统
 */
export const TYPOGRAPHY = {
  h1: 'text-2xl font-bold font-cinzel tracking-wider',        // 主标题
  h2: 'text-lg font-bold font-cinzel tracking-wide',          // 区域标题
  h3: 'text-base font-semibold font-cinzel',                  // 小标题
  emphasis: 'text-sm font-bold font-cinzel',                  // 强调文本
  subtitle: 'text-[10px] text-muted-foreground font-normal tracking-widest opacity-60', // 副标题
} as const;

/**
 * Card header styles
 * 卡片头部统一样式
 */
export const CARD_HEADER = 'px-4 py-3 bg-gradient-to-r from-card via-card/50 to-card border-b border-border';

/**
 * Spacing scale
 * 间距系统
 */
export const SPACING = {
  layoutGap: 'gap-4',           // 主布局间距
  cardPadding: 'px-4 py-3',     // 卡片外padding
  contentPadding: 'p-4',        // 卡片内padding
  itemGap: 'gap-2',             // 小元素间距
  listSpacing: 'space-y-3',     // 列表间距
} as const;

/**
 * Shadow levels
 * 阴影层级
 */
export const SHADOWS = {
  container: 'shadow-xl',                          // 主容器
  card: 'shadow-lg',                               // 卡片
  element: 'shadow-md',                            // 小元素
  emphasis: 'shadow-2xl',                          // 特殊强调
  glowYellow: 'shadow-2xl shadow-yellow-500/20',  // 黄色光晕
  glowAmber: 'shadow-xl shadow-amber-500/20',     // 琥珀色光晕
  innerGlow: 'shadow-inner-glow',                 // 内部光晕
} as const;

/**
 * Badge sizes
 * 徽章尺寸
 */
export const BADGE = {
  default: 'text-xs px-2 py-0.5',   // 默认大小
  emphasis: 'text-sm px-3 py-1',     // 强调大小
} as const;

/**
 * Text opacity levels
 * 文字透明度
 */
export const TEXT_OPACITY = {
  primary: '',      // 主文本（无透明度）
  secondary: '80',  // 次要文本
  tertiary: '60',   // 弱化文本
  disabled: '40',   // 禁用文本
} as const;

/**
 * Animation durations
 * 动画时长
 */
export const ANIMATION = {
  fast: 'duration-200',      // 快速交互
  normal: 'duration-300',    // 标准动画
  slow: 'duration-500',      // 慢动画
  verySlow: 'duration-1000', // 背景/氛围动画
} as const;

/**
 * Border radius
 * 圆角
 */
export const RADIUS = {
  card: 'rounded-lg',        // 卡片
  button: 'rounded',         // 按钮
  badge: 'rounded-full',     // 徽章/头像
  none: 'rounded-none',      // 无圆角
} as const;

/**
 * Icon sizes
 * 图标尺寸
 */
export const ICON = {
  xs: 'w-3 h-3',     // 超小图标
  sm: 'w-4 h-4',     // 小图标
  md: 'w-6 h-6',     // 中等图标
  lg: 'w-8 h-8',     // 大图标
  xl: 'w-12 h-12',   // 超大图标
  xxl: 'w-16 h-16',  // 空状态图标
} as const;

/**
 * Helper function to build border classes with opacity
 */
export function getBorderClass(
  side: 'all' | 't' | 'b' | 'l' | 'r' = 'all',
  color: string = 'border',
  opacity: keyof typeof BORDER_OPACITY = 'card',
  width: string = ''
): string {
  const opacityValue = BORDER_OPACITY[opacity];
  const sidePrefix = side === 'all' ? 'border' : `border-${side}`;
  const widthClass = width ? `-${width}` : '';

  if (opacity === 'solid') {
    return `${sidePrefix}${widthClass} ${color}`;
  }

  return `${sidePrefix}${widthClass} ${color}/${opacityValue}`;
}
