// 전역 변수
let animationTimer = null;
let currentIndex = 0;
let isAnimating = false;

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    console.log('Spring Boot Web Application 로드됨');
    initializePage();
    setCurrentPageInSelector(); // 페이지 선택자 초기화
});

// 현재 페이지에 맞는 선택자 설정
function setCurrentPageInSelector() {
    const selector = document.getElementById('pageSelector');
    const currentPath = window.location.pathname;

    if (selector) {
        // 현재 경로에 맞는 옵션 선택
        for (let option of selector.options) {
            if (option.value === currentPath) {
                option.selected = true;
                break;
            }
        }
        console.log('페이지 선택자 설정됨:', currentPath);
    }
}

// 페이지 네비게이션 함수 (수정됨)
function navigateTo() {
    const selector = document.getElementById('pageSelector');
    if (selector && selector.value) {
        console.log('페이지 이동:', selector.value);
        window.location.href = selector.value;
    } else {
        console.error('페이지 선택자를 찾을 수 없습니다.');
    }
}

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
        splitText(); // 초기 텍스트 분할
    }
}

// 갤러리 페이지 초기화
function initializeGallery() {
    console.log('갤러리 페이지 초기화');
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

// 텍스트 분할 함수 (수정됨)
function splitText() {
    const box = document.getElementById('slidingText');
    if (!box) return;

    const text = box.dataset.text || box.textContent.trim();
    box.innerHTML = ''; // 초기화

    [...text].forEach((ch, i) => {
        const span = document.createElement('span');
        span.textContent = ch;
        span.classList.add('char');
        span.style.animationDelay = `${i * 0.05}s`;
        box.appendChild(span);
    });
}

// 슬라이드 시작
function startSlide() {
    console.log('슬라이드 애니메이션 시작');
    splitText();
}

// 슬라이드 리셋
function resetSlide() {
    const box = document.getElementById('slidingText');
    if (box) {
        const originalText = box.dataset.text || '다람쥐 헌 쳇바퀴에 타고파';
        box.innerHTML = originalText;
        console.log('슬라이드 애니메이션 리셋');
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