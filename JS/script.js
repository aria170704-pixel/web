window.addEventListener('load', () => {
    const intro = document.getElementById('intro');
    const lightSwitch = document.getElementById('lightSwitch');
    const container = document.querySelector('.scroll-container');

    // 1. 인트로 연출
    if (lightSwitch && intro) {
        lightSwitch.addEventListener('click', () => {
            lightSwitch.classList.add('pull');
            setTimeout(() => {
                intro.classList.add('light-on');
                intro.style.backgroundColor = "#fff";
                intro.style.color = "#000";
            }, 200);
            setTimeout(() => {
                intro.style.transform = 'translateY(-100%)';
            }, 800);
        });
        setTimeout(() => { lightSwitch.click(); }, 2000); 
    }

    // 2. Intersection Observer (메인 텍스트 오픈 애니메이션)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('page-open')) {
                entry.target.querySelector('.content')?.classList.add('visible');
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.panel').forEach(panel => {
        observer.observe(panel);
    });

    // 3. 상세 페이지 레이아웃 제어 로직
    
    // [자세히 보기] 클릭 시 열기
    document.querySelectorAll('.open-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const panel = this.closest('.panel');
            openSubPage(panel);
        });
    });

    // [돌아가기] 클릭 시 닫기
    document.querySelectorAll('.back-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const panel = this.closest('.panel');
            closeSubPage(panel);
        });
    });

    function openSubPage(panel) {
        panel.classList.add('page-open');
        container.classList.add('scroll-lock'); // 다른 섹션 스크롤 차단
    }

    function closeSubPage(panel) {
        panel.classList.remove('page-open');
        container.classList.remove('scroll-lock'); // 스크롤 차단 해제
        setTimeout(() => {
            panel.querySelector('.content')?.classList.add('visible');
        }, 300);

        // 세미나 5장 슬라이드의 경우, 닫힐 때 첫 번째 슬라이드로 강제 리셋 (스크롤 꼬임 방지)
        if (panel.classList.contains('seminar')) {
            const deckContainer = panel.querySelector('.seminar-deck-container');
            if (deckContainer) deckContainer.scrollTop = 0;
        }
    }

    // 4. 네비게이션 메뉴 클릭 스무스 이동 + 상세창 연출
    document.querySelectorAll('.nav-menu a, .dropdown-content a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#none' || targetId === '#') {
                e.preventDefault();
                return;
            }
            
            if (targetId === '#intro') {
                e.preventDefault();
                document.querySelectorAll('.panel').forEach(p => p.classList.remove('page-open'));
                container.classList.remove('scroll-lock');
                container.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                document.querySelectorAll('.panel').forEach(p => p.classList.remove('page-open'));
                container.classList.remove('scroll-lock');

                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // 스크롤 완료 후(600ms 뒤) 서브 상세 페이지 바로 오픈
                setTimeout(() => {
                    openSubPage(targetElement);
                }, 600);
            }
        });
    });

    /* ====================================================
       [5] 세 번째 크리에이팅 섹션: EmailJS 익명 문의 전송 로직
       ==================================================== */
    // 💡 안전하게 window load 블록 안쪽으로 격리 수용하여 제이쿼리 충돌을 예방합니다.
    if (typeof emailjs !== 'undefined') {
        emailjs.init("W0CxpVk-I2a-Cyg_K"); // 적어주신 Public Key 고정
    }

    $('#inquiryForm').on('submit', function(e) {
        e.preventDefault(); // 페이지 새로고침 방지

        var $form = $(this);
        var submitBtn = $form.find('.submit-btn');
        var nickname = $('#nickname').val();
        var message = $('#message').val();

        // 전송 중 버튼 비활성화 (연타 도배 방지)
        submitBtn.prop('disabled', true).text('전송 중...');

        // EmailJS에 보낼 데이터 가공
        var templateParams = {
            from_name: nickname, 
            message: message     
        };

        // 지메일 계정 API로 발송 요청
        emailjs.send('service_c7tc6lh', 'template_qpdh9g2', templateParams)
            .then(function(response) {
                // 🟢 전송 성공 시
                alert('[' + nickname + ']님, 소중한 문의 내용이 지메일로 안전하게 전송되었습니다!');
                $form[0].reset(); // 입력창 비우기
            }, function(error) {
                // ❌ 전송 실패 시
                alert('메일 전송에 실패했습니다. 키 값을 다시 확인해 주세요.');
                console.log('FAILED...', error);
            })
            .then(function() {
                // 버튼 상태 복구
                submitBtn.prop('disabled', false).text('전송하기');
            });
    }); // 🟢 누락되었던 닫는 괄호들 완벽 조립

}); // window load 끝
