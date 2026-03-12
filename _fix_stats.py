#!/usr/bin/env python3
import sys

with open('student-life.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_block = [
    '\n',
    '        <!-- 统计数据 -->\n',
    '        <div class="stats-section">\n',
    '            <h2 class="section-title">// 学生时代数据统计</h2>\n',
    '            <div class="stats-grid">\n',
    '                <div class="stat-box">\n',
    '                    <i class="fas fa-calendar-alt"></i>\n',
    '                    <div class="stat-number" data-target="16">0</div>\n',
    '                    <div class="stat-label">Years of Learning</div>\n',
    '                </div>\n',
    '                <div class="stat-box">\n',
    '                    <i class="fas fa-trophy"></i>\n',
    '                    <div class="stat-number" data-target="15">0</div>\n',
    '                    <div class="stat-label">Awards &amp; Achievements</div>\n',
    '                </div>\n',
    '                <div class="stat-box">\n',
    '                    <i class="fas fa-users"></i>\n',
    '                    <div class="stat-number" data-target="500">0</div>\n',
    '                    <div class="stat-label">Friends Made</div>\n',
    '                </div>\n',
    '                <div class="stat-box">\n',
    '                    <i class="fas fa-smile"></i>\n',
    '                    <div class="stat-number" data-target="999">0</div>\n',
    '                    <div class="stat-label">Unforgettable Moments</div>\n',
    '                </div>\n',
    '            </div>\n',
    '        </div>\n',
    '\n',
    '        </div>\n',
]

# Keep lines 0-1070 (1-indexed lines 1-1071)
# Delete lines 1071-1252 (1-indexed lines 1072-1253)
# Keep lines 1253+ (1-indexed 1254+)
result = lines[:1071] + new_block + lines[1253:]

with open('student-life.html', 'w', encoding='utf-8') as f:
    f.writelines(result)

print(f"Done! Before: {len(lines)} lines, After: {len(result)} lines")
