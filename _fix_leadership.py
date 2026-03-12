#!/usr/bin/env python3
# 此脚本将替换 student-life.html 中混乱的团队引领板块
# 范围：第 834 行（团队引领 section 开始）到 第 1253 行（旧内容结束）
# 替换为新的7卡片悬停展开设计 + 干净的统计数据板块

with open('student-life.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"替换前总行数: {len(lines)}")
# 第833行（0-indexed）是 <!-- 照片画廊 --> 的上一行（</section>结束行）
# 我们从 834 行开始（0-indexed: 833），替换到 1253 行（0-indexed: 1252）
# 即 lines[:833] + new_content + lines[1253:]

new_section = '''
        <!-- 照片画廊 / 团队引领 -->
        <div class="photo-gallery-section" id="section-gallery">
            <div class="team-leadership-header">
                <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                    <div>
                        <h2 class="section-title text-zh">团队引领</h2>
                        <h2 class="section-title text-en" style="display: none;">Team Leadership</h2>
                        <p class="gallery-subtitle text-zh">学生事务</p>
                        <p class="gallery-subtitle text-en" style="display: none;">Student Affairs</p>
                    </div>
                    <button class="lang-toggle-professional" id="teamLangToggle">
                        <span class="lang-option active" data-lang="zh">中文</span>
                        <span class="lang-option" data-lang="en">EN</span>
                    </button>
                </div>
            </div>

            <!-- 7张角色卡片：鼠标悬浮展开详情 -->
            <div class="role-cards-grid">

                <!-- 卡片 1: 英语系研究生会主席 -->
                <div class="role-card" data-role="1">
                    <div class="role-card-front">
                        <div class="role-card-icon">🎓</div>
                        <div class="role-card-tag text-zh">校内职务</div>
                        <div class="role-card-tag text-en" style="display:none;">Campus Role</div>
                        <h3 class="role-card-title text-zh">英语系研究生会主席</h3>
                        <h3 class="role-card-title text-en" style="display:none;">Graduate Student Union President</h3>
                        <div class="role-card-meta">
                            <span class="role-card-time">2024-10 ~ 2025-10</span>
                            <span class="role-card-loc text-zh">华北电力大学（保定）</span>
                            <span class="role-card-loc text-en" style="display:none;">NCEPU (Baoding)</span>
                        </div>
                        <div class="role-card-hint text-zh">悬浮查看详情 ↓</div>
                        <div class="role-card-hint text-en" style="display:none;">Hover for details ↓</div>
                    </div>
                    <div class="role-card-back">
                        <div class="role-back-title text-zh">职责和业绩</div>
                        <div class="role-back-title text-en" style="display:none;">Responsibilities</div>
                        <ul class="role-back-list">
                            <li class="text-zh">统筹管理系部官方微信公众号及视频号，负责"研究生学术论坛"、"党团建设"等重大活动宣发，落实"三审三校"机制，确保零舆情风险。</li>
                            <li class="text-en" style="display:none;">Coordinated dept. WeChat & video accounts; managed publicity for major events; implemented strict review mechanism ensuring zero PR risk.</li>
                            <li class="text-zh">带领 10+ 人宣传团队，负责学术会议摄影采编与新闻通稿，将活动报道时效性提升了 50%。</li>
                            <li class="text-en" style="display:none;">Led 10+ member publicity team for academic conferences; improved reporting timeliness by 50%.</li>
                            <li class="text-zh">累计撰写并审核 50+ 篇推文，累计阅读量达 10,000+，赢得老师好评。</li>
                            <li class="text-en" style="display:none;">Wrote & reviewed 50+ articles with 10,000+ total reads; highly praised by faculty.</li>
                        </ul>
                    </div>
                </div>

                <!-- 卡片 2: 党史讲解员 -->
                <div class="role-card" data-role="2">
                    <div class="role-card-front">
                        <div class="role-card-icon">🏛️</div>
                        <div class="role-card-tag text-zh">校内职务</div>
                        <div class="role-card-tag text-en" style="display:none;">Campus Role</div>
                        <h3 class="role-card-title text-zh">反腐倡廉警示教育基地党史讲解员</h3>
                        <h3 class="role-card-title text-en" style="display:none;">Anti-Corruption Education Base Docent</h3>
                        <div class="role-card-meta">
                            <span class="role-card-time">2024-06 ~ 2025-10</span>
                            <span class="role-card-loc text-zh">华北电力大学（保定）</span>
                            <span class="role-card-loc text-en" style="display:none;">NCEPU (Baoding)</span>
                        </div>
                        <div class="role-card-hint text-zh">悬浮查看详情 ↓</div>
                        <div class="role-card-hint text-en" style="display:none;">Hover for details ↓</div>
                    </div>
                    <div class="role-card-back">
                        <div class="role-back-title text-zh">职责和业绩</div>
                        <div class="role-back-title text-en" style="display:none;">Responsibilities</div>
                        <ul class="role-back-list">
                            <li class="text-zh">由华北电力大学纪律检查委员会办公室聘请，作为反腐倡廉警示教育基地讲解员。</li>
                            <li class="text-en" style="display:none;">Appointed by NCEPU's Discipline Inspection Committee as an official docent at the Anti-Corruption Education Base.</li>
                            <li class="text-zh">已为超过 12 个院系和组织的领导及师生党员进行廉政讲解，包含中央八项规定新增版块讲解。</li>
                            <li class="text-en" style="display:none;">Delivered integrity education lectures to leaders and Party members across 12+ departments, including new provisions of the Central Eight-Point Regulation.</li>
                        </ul>
                    </div>
                </div>

                <!-- 卡片 3: 研究生助管 -->
                <div class="role-card" data-role="3">
                    <div class="role-card-front">
                        <div class="role-card-icon">💆</div>
                        <div class="role-card-tag text-zh">校内职务</div>
                        <div class="role-card-tag text-en" style="display:none;">Campus Role</div>
                        <h3 class="role-card-title text-zh">大学生心理健康教育中心研究生助管</h3>
                        <h3 class="role-card-title text-en" style="display:none;">Psychological Health Center Graduate Assistant</h3>
                        <div class="role-card-meta">
                            <span class="role-card-time">2023-09 ~ 2024-05</span>
                            <span class="role-card-loc text-zh">华北电力大学（保定）</span>
                            <span class="role-card-loc text-en" style="display:none;">NCEPU (Baoding)</span>
                        </div>
                        <div class="role-card-hint text-zh">悬浮查看详情 ↓</div>
                        <div class="role-card-hint text-en" style="display:none;">Hover for details ↓</div>
                    </div>
                    <div class="role-card-back">
                        <div class="role-back-title text-zh">职责和业绩</div>
                        <div class="role-back-title text-en" style="display:none;">Responsibilities</div>
                        <ul class="role-back-list">
                            <li class="text-zh">协助处理日常行政事务，负责学生心理档案的保密管理与分类归档，展现极强的保密意识与职业操守。</li>
                            <li class="text-en" style="display:none;">Assisted with admin tasks; managed confidential student psychological records with strong professionalism.</li>
                            <li class="text-zh">协助筹备全校心理健康月系列活动，负责物资统筹与现场秩序维护，确保活动流程标准化。</li>
                            <li class="text-en" style="display:none;">Helped organize campus Mental Health Month events; coordinated materials and on-site logistics.</li>
                        </ul>
                    </div>
                </div>

                <!-- 卡片 4: 广播台主播 -->
                <div class="role-card" data-role="4">
                    <div class="role-card-front">
                        <div class="role-card-icon">🎙️</div>
                        <div class="role-card-tag text-zh">校内职务</div>
                        <div class="role-card-tag text-en" style="display:none;">Campus Role</div>
                        <h3 class="role-card-title text-zh">一校广播台双语部主播</h3>
                        <h3 class="role-card-title text-en" style="display:none;">Campus Radio Bilingual Host</h3>
                        <div class="role-card-meta">
                            <span class="role-card-time">2023-09 ~ 2024-09</span>
                            <span class="role-card-loc text-zh">华北电力大学（保定）</span>
                            <span class="role-card-loc text-en" style="display:none;">NCEPU (Baoding)</span>
                        </div>
                        <div class="role-card-hint text-zh">悬浮查看详情 ↓</div>
                        <div class="role-card-hint text-en" style="display:none;">Hover for details ↓</div>
                    </div>
                    <div class="role-card-back">
                        <div class="role-back-title text-zh">职责和业绩</div>
                        <div class="role-back-title text-en" style="display:none;">Responsibilities</div>
                        <ul class="role-back-list">
                            <li class="text-zh">负责撰写双语稿件，以及每周五"灵动双语"栏目的双语播报和互动。</li>
                            <li class="text-en" style="display:none;">Wrote bilingual scripts and hosted the weekly "Bilingual Highlights" programme every Friday.</li>
                        </ul>
                    </div>
                </div>

                <!-- 卡片 5: 记者团采编部部长 -->
                <div class="role-card" data-role="5">
                    <div class="role-card-front">
                        <div class="role-card-icon">📰</div>
                        <div class="role-card-tag text-zh">社团负责人</div>
                        <div class="role-card-tag text-en" style="display:none;">Club Leader</div>
                        <h3 class="role-card-title text-zh">大学生融媒体中心记者团采编部部长</h3>
                        <h3 class="role-card-title text-en" style="display:none;">Director, Journalism Editorial Dept.</h3>
                        <div class="role-card-meta">
                            <span class="role-card-time">2020-10 ~ 2022-03</span>
                            <span class="role-card-loc text-zh">山东科技大学（青岛）</span>
                            <span class="role-card-loc text-en" style="display:none;">SDUST (Qingdao)</span>
                        </div>
                        <div class="role-card-hint text-zh">悬浮查看详情 ↓</div>
                        <div class="role-card-hint text-en" style="display:none;">Hover for details ↓</div>
                    </div>
                    <div class="role-card-back">
                        <div class="role-back-title text-zh">职责和业绩</div>
                        <div class="role-back-title text-en" style="display:none;">Responsibilities</div>
                        <ul class="role-back-list">
                            <li class="text-zh">在"2019全国大学生酷跑迷你马拉松公益挑战"担任新闻稿撰写员，新闻稿被"大众网·海报新闻"收录。</li>
                            <li class="text-en" style="display:none;">Wrote press releases for the 2019 National University Mini-Marathon; published by DaZhong News.</li>
                            <li class="text-zh">深度参与"十年树木，百年树人"省部级优秀教师采访活动，新闻内容被山东科技大学官网收录。</li>
                            <li class="text-en" style="display:none;">Covered provincial-level outstanding teacher interviews; content published on SDUST official website.</li>
                            <li class="text-zh">参与2017级校十大优秀人物、2020级新生百团纳新等多项采访，多次登上校级刊物《山东科大报》。</li>
                            <li class="text-en" style="display:none;">Covered top-10 student awards, freshman fairs; articles featured in SDUST campus newspaper.</li>
                        </ul>
                    </div>
                </div>

                <!-- 卡片 6: 新闻中心副部长 -->
                <div class="role-card" data-role="6">
                    <div class="role-card-front">
                        <div class="role-card-icon">📡</div>
                        <div class="role-card-tag text-zh">社团负责人</div>
                        <div class="role-card-tag text-en" style="display:none;">Club Leader</div>
                        <h3 class="role-card-title text-zh">外国语学院新闻中心副部长</h3>
                        <h3 class="role-card-title text-en" style="display:none;">Deputy Director, College News Center</h3>
                        <div class="role-card-meta">
                            <span class="role-card-time">2020-10 ~ 2021-10</span>
                            <span class="role-card-loc text-zh">山东科技大学（青岛）</span>
                            <span class="role-card-loc text-en" style="display:none;">SDUST (Qingdao)</span>
                        </div>
                        <div class="role-card-hint text-zh">悬浮查看详情 ↓</div>
                        <div class="role-card-hint text-en" style="display:none;">Hover for details ↓</div>
                    </div>
                    <div class="role-card-back">
                        <div class="role-back-title text-zh">职责和业绩</div>
                        <div class="role-back-title text-en" style="display:none;">Responsibilities</div>
                        <ul class="role-back-list">
                            <li class="text-zh">参与外院日常新闻活动的采写及编辑审核工作。</li>
                            <li class="text-en" style="display:none;">Covered and edited daily news events for the School of Foreign Languages.</li>
                            <li class="text-zh">负责采写的"第二十四届外语文化艺术节开幕式"新闻稿被学院官网收录；"科大春季校园双选会"由"嵙外语·好声音"公众号发布。</li>
                            <li class="text-en" style="display:none;">Press releases for the 24th Foreign Language Arts Festival published on college website; job fair report published on official WeChat.</li>
                        </ul>
                    </div>
                </div>

                <!-- 卡片 7: 青年志愿者协会干事 -->
                <div class="role-card" data-role="7">
                    <div class="role-card-front">
                        <div class="role-card-icon">🤝</div>
                        <div class="role-card-tag text-zh">志愿服务</div>
                        <div class="role-card-tag text-en" style="display:none;">Volunteer</div>
                        <h3 class="role-card-title text-zh">外国语学院青年志愿者协会干事</h3>
                        <h3 class="role-card-title text-en" style="display:none;">Officer, Youth Volunteer Association</h3>
                        <div class="role-card-meta">
                            <span class="role-card-time">2019-09 ~ 2020-10</span>
                            <span class="role-card-loc text-zh">山东科技大学（青岛）</span>
                            <span class="role-card-loc text-en" style="display:none;">SDUST (Qingdao)</span>
                        </div>
                        <div class="role-card-hint text-zh">悬浮查看详情 ↓</div>
                        <div class="role-card-hint text-en" style="display:none;">Hover for details ↓</div>
                    </div>
                    <div class="role-card-back">
                        <div class="role-back-title text-zh">职责和业绩</div>
                        <div class="role-back-title text-en" style="display:none;">Responsibilities</div>
                        <ul class="role-back-list">
                            <li class="text-zh">负责志愿者招募信息发布、报名表收集与筛选，以及活动相关文件的归档。</li>
                            <li class="text-en" style="display:none;">Managed volunteer recruitment, application collection, and document archiving.</li>
                            <li class="text-zh">针对志愿服务项目进行前期调研，协助撰写活动策划方案。</li>
                            <li class="text-en" style="display:none;">Conducted pre-event research and helped draft activity planning proposals.</li>
                            <li class="text-zh">担任现场联络员，负责岗位分配；收集活动后的志愿者和服务对象反馈。</li>
                            <li class="text-en" style="display:none;">Served as on-site coordinator; managed volunteer assignments and collected post-event feedback.</li>
                            <li class="text-zh">协助撰写青志协公众号推送文案，整理历届优秀志愿服务案例。</li>
                            <li class="text-en" style="display:none;">Wrote WeChat articles and compiled outstanding volunteer service case archives.</li>
                        </ul>
                    </div>
                </div>

            </div><!-- /.role-cards-grid -->
        </div><!-- /.photo-gallery-section -->

        <!-- 统计数据 -->
        <div class="stats-section">
            <h2 class="section-title">// 学生时代数据统计</h2>
            <div class="stats-grid">
                <div class="stat-box">
                    <i class="fas fa-calendar-alt"></i>
                    <div class="stat-number" data-target="16">0</div>
                    <div class="stat-label">Years of Learning</div>
                </div>
                <div class="stat-box">
                    <i class="fas fa-trophy"></i>
                    <div class="stat-number" data-target="15">0</div>
                    <div class="stat-label">Awards &amp; Achievements</div>
                </div>
                <div class="stat-box">
                    <i class="fas fa-users"></i>
                    <div class="stat-number" data-target="500">0</div>
                    <div class="stat-label">Friends Made</div>
                </div>
                <div class="stat-box">
                    <i class="fas fa-smile"></i>
                    <div class="stat-number" data-target="999">0</div>
                    <div class="stat-label">Unforgettable Moments</div>
                </div>
            </div>
        </div>

        </div>
'''

# lines[:833] = 第1-833行 (0-indexed 0-832)，即保留到 </section> 那行(第833行即index 832)
# lines[1253:] = 第1254行起（0-indexed 1253），即 </main> 那行
result = lines[:833] + [new_section] + lines[1253:]

with open('student-life.html', 'w', encoding='utf-8') as f:
    f.writelines(result)

print(f"替换后总行数: {len(result)}")
print("完成！")
