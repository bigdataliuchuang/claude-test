// TDD Demo: 密码强度评估测试
// 先写测试，代码还不存在

const { evaluatePasswordStrength } = require('./password-strength');

describe('密码强度评估', () => {
  // 测试 1: 弱密码 - 只有小写字母
  it('应该评估短密码为弱', () => {
    const result = evaluatePasswordStrength('abc');
    expect(result.strength).toBe('weak');
    expect(result.score).toBeLessThan(30);
  });

  // 测试 2: 中等密码 - 混合大小写和数字
  it('应该评估中等长度混合密码为中等', () => {
    const result = evaluatePasswordStrength('Abc123');
    expect(result.strength).toBe('medium');
    expect(result.score).toBeGreaterThanOrEqual(30);
    expect(result.score).toBeLessThan(70);
  });

  // 测试 3: 强密码 - 包含特殊字符
  it('应该评估长密码为强', () => {
    const result = evaluatePasswordStrength('MyP@ssw0rd!123');
    expect(result.strength).toBe('strong');
    expect(result.score).toBeGreaterThanOrEqual(70);
  });

  // 测试 4: 边界情况 - 空字符串
  it('应该处理空密码', () => {
    const result = evaluatePasswordStrength('');
    expect(result.strength).toBe('weak');
    expect(result.score).toBe(0);
  });

  // 测试 5: 重复字符惩罚
  it('应该对重复字符进行惩罚', () => {
    const result1 = evaluatePasswordStrength('aaaa1111');
    const result2 = evaluatePasswordStrength('a3b7c9d2');
    expect(result1.score).toBeLessThan(result2.score);
  });
});
