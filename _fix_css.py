#!/usr/bin/env python3
# 删除 student-life.css 中残留的旧 timeline CSS（第2877行至"国际视野"注释之前）

with open('student-life.css', 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"清理前总行数: {len(lines)}")

# 找到 "国际视野 - 垂直正弦波" 所在行（0-indexed）
target = '/* ========== 国际视野 - 垂直正弦波旅行相册 =========='
intl_idx = None
for i, line in enumerate(lines):
    if target in line:
        intl_idx = i
        break

if intl_idx is None:
    print("未找到国际视野注释行，退出！")
    exit(1)

print(f"国际视野部分从第 {intl_idx+1} 行开始（0-indexed: {intl_idx}）")

# lines[:2875] = 保留到 } 的最后一行（新卡片媒体查询结束）
# lines[intl_idx:] = 从国际视野开始保留
result = lines[:2876] + ['\n'] + lines[intl_idx:]

print(f"清理后总行数: {len(result)}")

with open('student-life.css', 'w', encoding='utf-8') as f:
    f.writelines(result)

print("完成！")
