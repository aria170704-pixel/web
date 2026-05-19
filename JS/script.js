window.addEventListener('load', () => {
    const intro = document.getElementById('intro');
    const lightSwitch = document.getElementById('lightSwitch'); // 누락되었던 변수 선언 추가
    const container = document.querySelector('.scroll-container');

    // 1. 인트로 연출
    if (lightSwitch && intro) {
        lightSwitch.addEventListener('click', () => {
            // 1. 줄 당기는 모션
            lightSwitch.classList.add('pull');
            
            // 2. 조명 켜지는 효과 (살짝 딜레이)
            setTimeout(() => {
                intro.classList.add('light-on'); // 글자 나타남
                intro.style.backgroundColor = "#fff"; // 배경이 밝아짐
                intro.style.color = "#000";
            }, 200);

            // 3. 인트로 화면 올라가기
            setTimeout(() => {
                intro.style.transform = 'translateY(-100%)';
            }, 800);
        });

        // 페이지 로드 후 2초 뒤에 자동으로 스위치 클릭 실행
        setTimeout(() => { 
            lightSwitch.click(); 
        }, 2000); 
    }

    // 2. Intersection Observer (스크롤 시 각 섹션 텍스트 오픈 애니메이션)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelector('.content')?.classList.add('visible');
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.panel').forEach(panel => {
        observer.observe(panel);
    });
});

// 3. 내비게이션 및 드롭다운 스무스 스크롤 통합 이벤트
document.querySelectorAll('.nav-menu a, .dropdown-content a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        // 의미 없는 dummy 링크(#none)거나 '#'인 경우 이벤트 차단
        if (targetId === '#none' || targetId === '#') {
            e.preventDefault();
            return;
        }
        
        // 인트로 로고를 눌러 가장 위로 갈 때 scroll-container를 0 위치로 스크롤
        if (targetId === '#intro') {
            e.preventDefault();
            const container = document.querySelector('.scroll-container');
            if (container) {
                container.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
            return;
        }

        // 해당 id를 가진 section 요소 찾기
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault(); // 기본 링크 이동 기능 방지
            
            // CSS snap scroll 컨테이너 내부에서 부드럽게 타겟 섹션으로 이동
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});