// 전역 변수
let animationTimer = null;
let currentIndex = 0;
let isAnimating = false;

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    console.log('Spring Boot Web Application 로드됨');
    initializePage();
});

// 페이지 초기화
function initializePage() {
    const currentPath = window.location.pathname;
    console.log('현재 페이지:', currentPath);

    // 페이지별 초기화
    switch(currentPath) {
        case '/animation':
            initializeAnimation();
            break;
        case '/gallery':
            initializeGallery();
            break;
        default:
            initializeHome();
    }
}

// 홈 페이지 초기화
function initializeHome() {
    console.log('홈 페이지 초기화');
    // 링크 클릭 이벤트 추가
    const linkItems = document.querySelectorAll('.link-item');
    linkItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// 애니메이션 페이지 초기화
function initializeAnimation() {
    console.log('애니메이션 페이지 초기화');
    const slidingText = document.getElementById('slidingText');
    if (slidingText) {
        const originalText = slidingText.dataset.text || slidingText.textContent;
        slidingText.dataset.originalText = originalText;
    }
}

// 갤러리 페이지 초기화
function initializeGallery() {
    console.log('갤러리 페이지 초기화');
    // 이미지 로드 완료 체크
    const images = document.querySelectorAll('.image-item img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            console.log('이미지 로드 완료:', this.src);
        });

        img.addEventListener('error', function() {
            console.error('이미지 로드 실패:', this.src);
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuydtOuvuOyngCDsl4bsnYw8L3RleHQ+PC9zdmc+';
        });
    });
}

// 페이지 네비게이션
function navigateTo() {
    const selector = document.getElementById('pageSelector');
    if (selector && selector.value) {
        window.location.href = selector.value;
    }
}

// 애니메이션 제어 함수들
function startAnimation() {
    const slidingText = document.getElementById('slidingText');
    if (!slidingText) return;

    if (isAnimating) {
        console.log('이미 애니메이션이 실행 중입니다.');
        return;
    }

    isAnimating = true;
    currentIndex = 0;

    const originalText = slidingText.dataset.originalText || slidingText.textContent;
    console.log('애니메이션 시작:', originalText);

    animationTimer = setInterval(() => {
        doRotate(slidingText, originalText);
    }, 200);
}

function stopAnimation() {
    if (animationTimer) {
        clearInterval(animationTimer);
        animationTimer = null;
        isAnimating = false;
        console.log('애니메이션 정지');
    }
}

function resetAnimation() {
    stopAnimation();
    const slidingText = document.getElementById('slidingText');
    if (slidingText) {
        const originalText = slidingText.dataset.originalText || '넘나 피곤한거시에오';
        slidingText.innerHTML = `<span>${originalText}</span>`;
        slidingText.classList.remove('sliding');
        currentIndex = 0;
        console.log('애니메이션 리셋');
    }
}

function doRotate(element, text) {
    if (!element || !text) return;

    const chars = text.split('');
    let rotatedText = '';

    // 현재 인덱스를 기준으로 문자 회전
    for (let i = 0; i < chars.length; i++) {
        const charIndex = (i + currentIndex) % chars.length;
        rotatedText += chars[charIndex];
    }

    element.innerHTML = `<span class="sliding">${rotatedText}</span>`;
    currentIndex = (currentIndex + 1) % chars.length;

    // 한 바퀴 돌면 정지
    if (currentIndex === 0) {
        setTimeout(() => {
            stopAnimation();
            element.innerHTML = `<span>${text}</span>`;
        }, 200);
    }
}

// 갤러리 모달 함수들
function openModal(img) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');

    if (modal && modalImg) {
        modal.style.display = 'block';
        modalImg.src = img.src;
        modalImg.alt = img.alt;

        // ESC 키로 모달 닫기
        document.addEventListener('keydown', handleModalKeydown);
        console.log('모달 열림:', img.src);
    }
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.style.display = 'none';
        document.removeEventListener('keydown', handleModalKeydown);
        console.log('모달 닫힘');
    }
}

function handleModalKeydown(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
}

// 모달 외부 클릭 시 닫기
window.addEventListener('click', function(event) {
    const modal = document.getElementById('imageModal');
    if (event.target === modal) {
        closeModal();
    }
});

// 유틸리티 함수들
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 성능 모니터링
function logPerformance() {
    if (performance && performance.timing) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log('페이지 로드 시간:', loadTime + 'ms');
    }
}

// 페이지 로드 완료 시 성능 로그
window.addEventListener('load', logPerformance);

// 에러 핸들링
window.addEventListener('error', function(event) {
    console.error('JavaScript 에러:', event.error);
});

// 서비스 워커 등록 (PWA 지원)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker 등록 성공:', registration.scope);
            })
            .catch(function(error) {
                console.log('ServiceWorker 등록 실패:', error);
            });
    });
}
function splitText() {
    const box = document.getElementById('slidingText');
    const text = box.dataset.text || '';
    box.innerHTML = '';                       // 초기화
    [...text].forEach((ch,i) => {
        const span = document.createElement('span');
        span.textContent = ch;
        span.classList.add('char');
        span.style.animationDelay = `${i*0.05}s`; // 글자마다 지연
        box.appendChild(span);
    });
}

function startSlide() { splitText(); }

function resetSlide() {
    document.getElementById('slidingText').innerHTML = '';
}
document.addEventListener('DOMContentLoaded', splitText);