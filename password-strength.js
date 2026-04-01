// TDD Demo: 密码强度评估实现
// 根据测试需求实现功能

/**
 * 评估密码强度
 * @param {string} password - 要评估的密码
 * @returns {object} - 包含 strength 和 score 的结果
 */
function evaluatePasswordStrength(password) {
  // 处理空密码
  if (!password || password.length === 0) {
    return { strength: 'weak', score: 0 };
  }

  let score = 0;
  const length = password.length;

  // 1. 长度评分 (最多 50 分)
  if (length < 4) {
    score += 5;
  } else if (length < 8) {
    score += 15;
  } else if (length < 12) {
    score += 25;
  } else if (length < 16) {
    score += 40;
  } else {
    score += 50;
  }

  // 2. 字符多样性评分 (最多 45 分)
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSymbols = /[^a-zA-Z0-9]/.test(password);

  const varietyCount = [hasLowercase, hasUppercase, hasNumbers, hasSymbols].filter(Boolean).length;
  score += varietyCount * 11;  // 增加多样性权重

  // 3. 重复字符惩罚 (最多 -20 分)
  const repeatedChars = password.match(/(.)\1{2,}/g);
  if (repeatedChars) {
    score -= repeatedChars.length * 5;
  }

  // 4. 连续字符惩罚
  const consecutivePattern = /(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|012|123|234|345|456|567|678|789)/i;
  if (consecutivePattern.test(password)) {
    score -= 10;
  }

  // 确保分数在 0-100 范围内
  score = Math.max(0, Math.min(100, score));

  // 根据分数确定强度等级
  let strength;
  if (score < 30) {
    strength = 'weak';
  } else if (score < 70) {
    strength = 'medium';
  } else {
    strength = 'strong';
  }

  return { strength, score };
}

module.exports = { evaluatePasswordStrength };
