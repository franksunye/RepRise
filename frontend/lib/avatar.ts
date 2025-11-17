/**
 * 头像工具函数
 * 使用真实照片风格的头像API
 */

/**
 * 根据用户名生成确定性的头像URL
 * 使用 seed 参数确保同一用户始终显示相同的头像
 * 
 * @param name - 用户姓名，用作 seed
 * @param gender - 性别 ('male' | 'female')，可选
 * @returns 头像图片URL
 */
export function getAvatarUrl(name: string, gender?: 'male' | 'female'): string {
  const seed = encodeURIComponent(name);
  // 使用 DiceBear 的 avataaars-neutral 风格，提供真实感的头像
  return `https://api.dicebear.com/7.x/avataaars-neutral/svg?seed=${seed}`;
}

/**
 * 获取真实照片风格的头像
 * 使用 DiceBear 的 personas 风格，提供更真实的头像效果
 * 
 * @param name - 用户姓名
 * @returns 头像图片URL
 */
export function getRealisticAvatarUrl(name: string): string {
  const seed = encodeURIComponent(name);
  // personas 风格提供了更真实的3D渲染头像
  return `https://api.dicebear.com/7.x/personas/svg?seed=${seed}`;
}

/**
 * 获取用户姓名的首字母
 * 用于 Avatar Fallback
 * 
 * @param name - 用户姓名
 * @returns 首字母
 */
export function getInitials(name: string): string {
  return name.charAt(0).toUpperCase();
}
