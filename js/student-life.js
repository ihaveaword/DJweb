// ========== 学生时代页面交互脚本 ==========

// 返回主页
function goBack() {
    window.location.href = 'index.html';
}

// 时间线筛选功能
document.addEventListener('DOMContentLoaded', function () {

    // ========== 移动端菜单 ==========
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // 点击菜单项时关闭菜单
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // ========== 目录导航跟随主导航状态 ==========
    const navbar = document.getElementById('navbar');
    const timelineNav = document.getElementById('timeline-nav');

    if (navbar && timelineNav) {
        // 监听主导航栏的class变化
        const observer = new MutationObserver(() => {
            if (navbar.classList.contains('nav-hidden')) {
                timelineNav.style.top = '0';
            } else {
                timelineNav.style.top = '60px';
            }
        });
        observer.observe(navbar, { attributes: true, attributeFilter: ['class'] });
    }

    // ========== 目录导航 - 滚动高亮 ==========
    const navLinks = document.querySelectorAll('.timeline-nav .timeline-btn');
    // 包括学校部分和照片墙部分
    const sections = document.querySelectorAll('.university-section[id], .photo-gallery-section[id]');

    // 点击导航链接时更新active状态
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // 移除所有active
            navLinks.forEach(l => l.classList.remove('active'));
            // 添加当前active
            this.classList.add('active');
        });
    });

    // 滚动时自动高亮对应导航
    function updateActiveNav() {
        let currentSection = '';
        const scrollPos = window.scrollY + 160; // 考虑固定导航的高度

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    // 页面加载时也执行一次
    updateActiveNav();

    // ========== 统计数字动画 ==========
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    function animateNumbers() {
        if (animated) return;

        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target')); // 改为 data-target
            let current = 0;
            const increment = target / 100; // 100步完成
            const duration = 2000; // 2秒完成
            const stepTime = duration / 100;

            const counter = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(counter);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, stepTime);
        });

        animated = true;
    }

    // 使用 Intersection Observer 监听统计区域
    const statsSection = document.querySelector('.stats-section');

    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumbers();
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3
        });

        observer.observe(statsSection);
    }

    // ========== 记忆盒子点击效果 ==========
    const memoryBoxes = document.querySelectorAll('.memory-box');

    memoryBoxes.forEach(box => {
        box.addEventListener('click', function () {
            // 添加点击脉冲效果
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);

            // 可以在这里添加弹窗显示详细信息的逻辑
            console.log('Memory clicked:', this.querySelector('h3').textContent);
        });
    });

    // ========== 平滑滚动 ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========== 时间线标记脉冲效果 ==========
    const markerIcons = document.querySelectorAll('.marker-icon');

    markerIcons.forEach((icon, index) => {
        // 添加延迟效果
        icon.style.animationDelay = `${index * 0.2}s`;
    });

    // ========== 页面加载动画 ==========
    window.addEventListener('load', function () {
        // 页面淡入效果
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });

    // ========== 扫描线效果 ==========
    const scanline = document.createElement('div');
    scanline.className = 'scanline-effect';
    scanline.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 255, 0, 0.03) 2px,
            rgba(0, 255, 0, 0.03) 4px
        );
        pointer-events: none;
        z-index: 9999;
    `;
    document.body.appendChild(scanline);

    // ========== 鼠标悬停记忆标签高亮 ==========
    const memoryTags = document.querySelectorAll('.memory-tags span');

    memoryTags.forEach(tag => {
        tag.addEventListener('mouseenter', function () {
            const tagName = this.textContent.replace('#', '');
            // 高亮所有相同标签
            memoryTags.forEach(t => {
                if (t.textContent.includes(tagName)) {
                    t.style.background = 'var(--terminal-green)';
                    t.style.color = 'var(--terminal-bg)';
                }
            });
        });

        tag.addEventListener('mouseleave', function () {
            memoryTags.forEach(t => {
                t.style.background = '';
                t.style.color = '';
            });
        });
    });

    // ========== 终端光标效果 ==========
    const titles = document.querySelectorAll('.timeline-header h2');

    titles.forEach(title => {
        const text = title.textContent;
        title.textContent = '';

        // 添加文本和光标
        const span = document.createElement('span');
        span.textContent = text;
        title.appendChild(span);

        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        cursor.style.cssText = `
            display: inline-block;
            width: 10px;
            height: 1.2em;
            background: var(--terminal-green);
            margin-left: 5px;
            animation: blink 1s infinite;
        `;
        title.appendChild(cursor);
    });

    // ========== 控制台欢迎信息 ==========
    console.log('%c╔═══════════════════════════════════════╗', 'color: #00ff00; font-family: monospace;');
    console.log('%c║   STUDENT LIFE TIMELINE SYSTEM       ║', 'color: #00ff00; font-family: monospace;');
    console.log('%c║   Version: 1.0.0                      ║', 'color: #00ff00; font-family: monospace;');
    console.log('%c║   Status: ONLINE                      ║', 'color: #00ff00; font-family: monospace;');
    console.log('%c╚═══════════════════════════════════════╝', 'color: #00ff00; font-family: monospace;');
    console.log('%c> Loading memories...', 'color: #00ff41; font-family: monospace;');
    console.log('%c> System ready.', 'color: #00ff41; font-family: monospace;');
});

// ========== 键盘快捷键 ==========
document.addEventListener('keydown', function (e) {
    // ESC 键返回主页
    if (e.key === 'Escape') {
        goBack();
    }

    // 数字键 1-5 切换时间线
    if (e.key >= '1' && e.key <= '5') {
        const buttons = document.querySelectorAll('.timeline-btn');
        const index = parseInt(e.key) - 1;
        if (buttons[index]) {
            buttons[index].click();
        }
    }
});

// ========== 交互优化功能 ==========

// 回到顶部按钮
const backToTopBtn = document.getElementById('backToTop');
const timelineProgress = document.getElementById('timelineProgress');

// 滚动事件处理
window.addEventListener('scroll', function () {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    // 更新进度条
    if (timelineProgress) {
        timelineProgress.style.width = scrolled + '%';
    }

    // 显示/隐藏回到顶部按钮
    if (backToTopBtn) {
        if (winScroll > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }
});

// 回到顶部按钮点击事件
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 为时间线项目添加交错动画
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.2}s`;
});

// 增强的卡片交互
const memoryBoxes = document.querySelectorAll('.memory-box');
memoryBoxes.forEach(box => {
    box.addEventListener('mouseenter', function () {
        // 移除过度的震动效果，保持优雅
        this.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });

    box.addEventListener('mouseleave', function () {
        // 鼠标离开时保持平滑过渡
        this.style.transition = 'all 0.5s ease-out';
    });

    // 点击卡片时的轻微反馈
    box.addEventListener('click', function () {
        this.style.transform = 'translateY(-6px) scale(0.99)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
});

// 移除过度震动的CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes gentle-float {
        0%, 100% { transform: translateY(-8px) scale(1.02); }
        50% { transform: translateY(-10px) scale(1.02); }
    }
    
    .memory-box:hover {
        animation: gentle-float 3s ease-in-out infinite;
    }
`;
document.head.appendChild(style);

// 统计数字动画增强
const statBoxes = document.querySelectorAll('.stat-box');
statBoxes.forEach((box, index) => {
    box.addEventListener('mouseenter', function () {
        const number = this.querySelector('.stat-number');
        if (number) {
            number.style.animation = 'number-pulse 0.6s ease-in-out';
        }
    });

    box.addEventListener('mouseleave', function () {
        const number = this.querySelector('.stat-number');
        if (number) {
            number.style.animation = '';
        }
    });
});

// 添加数字脉动动画
const numberPulseStyle = document.createElement('style');
numberPulseStyle.textContent = `
    @keyframes number-pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
`;
document.head.appendChild(numberPulseStyle);

// ========== 照片画廊筛选功能 ==========
function initPhotoGallery() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const photoItems = document.querySelectorAll('.photo-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const filter = this.getAttribute('data-filter');

            // 更新按钮状态
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // 筛选照片
            photoItems.forEach(item => {
                const category = item.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.classList.remove('hidden');
                    }, 10);
                } else {
                    item.classList.add('hidden');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 400);
                }
            });
        });
    });

    // 添加照片项点击效果
    photoItems.forEach(item => {
        item.addEventListener('click', function () {
            // 为将来的照片查看功能预留
            const photoTitle = this.querySelector('h4')?.textContent || '照片';
            console.log(`点击了照片: ${photoTitle}`);

            // 简单的点击反馈
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// 初始化照片画廊
initPhotoGallery();

// ========== 国际视野 - 纸飞机动画和图片轮播 ==========
// ========== 国际视野 - 垂直滚动纸飞机动画 ==========
function initTravelPlaneAnimation() {
    const flightPath = document.getElementById('flightPathVertical');
    const paperPlane = document.getElementById('paperPlaneVertical');
    const albumSection = document.querySelector('.travel-album-vertical');
    const travelSpots = document.querySelectorAll('.travel-spot-v');
    const progressPath = document.getElementById('flightPathProgress');

    if (!flightPath || !paperPlane || !albumSection) {
        return;
    }

    // 初始化飞机显示 - 等待动画开始
    // paperPlane.classList.add('initialized'); 

    const pathLength = flightPath.getTotalLength();

    // 设置进度路径的 dasharray
    if (progressPath) {
        progressPath.style.strokeDasharray = pathLength;
        progressPath.style.strokeDashoffset = pathLength;
    }

    // 动画配置
    const totalModules = 8;
    const readingTimePerModule = 7.5 * 1000; // 加快速度：7.5秒 (原15秒)
    const totalDuration = totalModules * readingTimePerModule; // 60秒

    let startTime = null;
    let isAnimating = false;
    let animationFrameId;

    function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;

        // 计算进度 (0 到 1)
        let progress = elapsed / totalDuration;

        // 循环播放 or 停止? 用户未指定，通常自动播放会循环或停在末尾。
        // 考虑到阅读体验，播放一次停在末尾比较合理，但为了演示效果，这里设置为停在末尾。
        if (progress > 1) {
            progress = 1;
            // 动画结束
            // return; // 如果想停止
            // 如果想循环：
            // startTime = timestamp; 
            // progress = 0;

            // 这里我们让它停在最后，避免重复打扰
        } else {
            animationFrameId = requestAnimationFrame(animate);
        }

        // 获取路径上的点
        const point = flightPath.getPointAtLength(progress * pathLength);

        // 计算下一个点用于角度
        const nextPointDist = Math.min((progress * pathLength) + 10, pathLength);
        const nextPoint = flightPath.getPointAtLength(nextPointDist);

        // 计算角度
        const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);

        // 映射到 DOM 坐标
        const svgWidth = 1000;
        const svgHeight = 3400;

        const xPercent = (point.x / svgWidth) * 100;
        const yPercent = (point.y / svgHeight) * 100;

        paperPlane.style.left = `${xPercent}%`;
        paperPlane.style.top = `${yPercent}%`;
        paperPlane.style.transform = `translate(-50%, -50%) rotate(${angle + 45}deg)`;

        // 更新进度条路径
        if (progressPath) {
            progressPath.style.strokeDashoffset = pathLength - (progress * pathLength);
        }

        // 触发板块显示
        const domHeight = albumSection.offsetHeight;
        const scaleRatio = domHeight / svgHeight;
        const planeDomY = point.y * scaleRatio;

        travelSpots.forEach(spot => {
            const spotTop = parseInt(spot.style.top);
            // 阈值判断
            if (planeDomY > spotTop - 50) {
                spot.classList.add('visible');
            }
        });
    }

    // 使用 IntersectionObserver 监听进入视口才开始动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !isAnimating) {
                isAnimating = true;
                paperPlane.classList.add('initialized');
                requestAnimationFrame(animate);
                observer.unobserve(entry.target); // 只触发一次
            }
        });
    }, {
        threshold: 0.1 // 只要显露 10% 就开始
    });

    observer.observe(albumSection);

    // 启动图片轮播
    initTravelImageSlideshow();
}

// ========== 国际视野 - 图片轮播 ==========
function initTravelImageSlideshow() {
    const spots = document.querySelectorAll('.travel-spot-v');

    spots.forEach(spot => {
        const images = spot.querySelectorAll('.spot-image');

        // 给所有图片加上 lightbox-trigger，点击即可放大
        images.forEach(img => {
            img.classList.add('lightbox-trigger');
            if (!img.dataset.src) {
                img.dataset.src = img.src; // 让 lightbox 读取原图地址
            }
        });

        if (images.length <= 1) return; // 只有一张图不轮播

        let currentIndex = 0;

        // 设置定时器 2秒切换
        setInterval(() => {
            // 移除当前 active
            images[currentIndex].classList.remove('active');

            // 计算下一个索引
            currentIndex = (currentIndex + 1) % images.length;

            // 添加 active
            images[currentIndex].classList.add('active');
        }, 2000);
    });
}

// 初始化图片轮播
function initImageSliders() {
    const travelSpots = document.querySelectorAll('.travel-spot');

    travelSpots.forEach(spot => {
        const images = spot.querySelectorAll('.spot-image');
        if (images.length <= 1) return;

        let currentIndex = 0;

        function showNextImage() {
            images[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex].classList.add('active');
        }

        // 每2秒切换一次
        setInterval(showNextImage, 2000);
    });
}

// 初始化国际视野语言切换
function initTravelLanguageToggle() {
    const toggle = document.getElementById('travelLangToggle');
    if (!toggle) return;

    const options = toggle.querySelectorAll('.lang-option');
    let currentLang = 'zh';

    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        currentLang = currentLang === 'zh' ? 'en' : 'zh';

        options.forEach(option => {
            const lang = option.getAttribute('data-lang');
            if (lang === currentLang) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });

        const section = document.getElementById('section-elementary');
        if (!section) return;

        const zhTexts = section.querySelectorAll('.text-zh');
        const enTexts = section.querySelectorAll('.text-en');

        if (currentLang === 'zh') {
            zhTexts.forEach(el => { el.style.display = 'block'; });
            enTexts.forEach(el => { el.style.display = 'none'; });
        } else {
            zhTexts.forEach(el => { el.style.display = 'none'; });
            enTexts.forEach(el => { el.style.display = 'block'; });
        }
    });
}

// ========== 团队引领 - 时间轴交互 ==========
function initTeamLanguageToggle() {
    const toggle = document.getElementById('teamLangToggle');
    if (!toggle) return;

    const options = toggle.querySelectorAll('.lang-option');
    let currentLang = 'zh';

    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        currentLang = currentLang === 'zh' ? 'en' : 'zh';

        options.forEach(option => {
            const lang = option.getAttribute('data-lang');
            if (lang === currentLang) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });

        const section = document.getElementById('section-gallery');
        if (!section) return;

        const zhTexts = section.querySelectorAll('.text-zh');
        const enTexts = section.querySelectorAll('.text-en');

        if (currentLang === 'zh') {
            zhTexts.forEach(el => { el.style.display = 'block'; });
            enTexts.forEach(el => { el.style.display = 'none'; });
        } else {
            zhTexts.forEach(el => { el.style.display = 'none'; });
            enTexts.forEach(el => { el.style.display = 'block'; });
        }
    });
}

function initTeamTimelineInteraction() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const detailContents = document.querySelectorAll('.detail-content');

    timelineItems.forEach(item => {
        item.addEventListener('mouseover', () => {
            const index = item.getAttribute('data-index');
            detailContents.forEach(detail => {
                detail.classList.remove('active');
            });
            const targetDetail = document.querySelector(`.detail-content.detail-${index}`);
            if (targetDetail) {
                targetDetail.classList.add('active');
            }
        });

        item.addEventListener('mouseout', () => {
            const index = item.getAttribute('data-index');
            const targetDetail = document.querySelector(`.detail-content.detail-${index}`);
            if (targetDetail) {
                targetDetail.classList.remove('active');
            }
        });
    });
}

// 在DOMContentLoaded中初始化
document.addEventListener('DOMContentLoaded', function () {
    initTravelPlaneAnimation();
    initImageSliders();
    initTravelLanguageToggle();
    initTeamLanguageToggle();
    initTeamTimelineInteraction();
    initLightbox(); // 初始化图片放大功能
});

// ========== 实习高光 - 双语切换 ==========
let internshipLang = 'zh'; // 默认中文

function toggleInternshipLang(lang) {
    // 如未传参则取反（向后兼容）
    if (lang) {
        internshipLang = lang;
    } else {
        internshipLang = internshipLang === 'zh' ? 'en' : 'zh';
    }
    const isEn = internshipLang === 'en';

    // 更新按钮高亮（lang-option active）
    const btn = document.getElementById('internshipLangToggle');
    if (btn) {
        btn.querySelectorAll('.lang-option').forEach(opt => {
            opt.classList.toggle('active', opt.dataset.lang === internshipLang);
        });
    }

    // 切换实习高光时间线中的双语元素
    const timeline = document.querySelector('.internship-timeline');
    if (!timeline) return;

    timeline.querySelectorAll('.text-zh').forEach(el => el.style.display = isEn ? 'none' : '');
    timeline.querySelectorAll('.text-en').forEach(el => el.style.display = isEn ? '' : 'none');

    // 同时切换 header 部分
    const header = timeline.closest('section')?.querySelector('.university-header');
    if (header) {
        header.querySelectorAll('.text-zh').forEach(el => el.style.display = isEn ? 'none' : '');
        header.querySelectorAll('.text-en').forEach(el => el.style.display = isEn ? '' : 'none');
    }
}

// ========== 全局 Lightbox（点击放大图片） ==========
function initLightbox() {
    // 创建 lightbox 容器
    if (document.getElementById('image-lightbox')) return;

    const lightbox = document.createElement('div');
    lightbox.id = 'image-lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-overlay">
            <button class="lightbox-close" aria-label="关闭">&times;</button>
            <img class="lightbox-img" src="" alt="放大查看">
        </div>
    `;
    document.body.appendChild(lightbox);

    // 点击关闭
    lightbox.addEventListener('click', (e) => {
        if (!e.target.classList.contains('lightbox-img')) {
            closeLightbox();
        }
    });

    // 键盘 ESC 关闭
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });

    // 绑定所有触发器（包括后来动态添加的）
    document.body.addEventListener('click', (e) => {
        const trigger = e.target.closest('.lightbox-trigger');
        if (trigger) {
            const src = trigger.dataset.src || trigger.src || trigger.getAttribute('href');
            if (src) openLightbox(src, trigger.alt || '');
        }
    });
}

function openLightbox(src, alt) {
    const lightbox = document.getElementById('image-lightbox');
    if (!lightbox) return;
    const img = lightbox.querySelector('.lightbox-img');
    img.src = src;
    img.alt = alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('image-lightbox');
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}
