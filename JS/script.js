window.addEventListener('load', () => {

    const intro = document.getElementById('intro');

    const container = document.querySelector('.scroll-container');



    // 1. 인트로 연출

    lightSwitch.addEventListener('click', () => {
        // 1. 줄 당기는 모션
        lightSwitch.classList.add('pull');
        
        // 2. 조명 켜지는 효과 (살짝 딜레이)
        setTimeout(() => {
            intro.classList.add('light-on'); // 글자 나타남
            intro.style.backgroundColor = "#fff"; // 배경이 갑자기 밝아지거나 그대로 검정색 유지 가능
            intro.style.color = "#000";
        }, 200);

        // 3. 인트로 화면 올라가기
        setTimeout(() => {
            intro.style.transform = 'translateY(-100%)';
        }, 800);
    });

    setTimeout(() => { lightSwitch.click(); }, 2000); 

    // 2. 휠 이벤트로 섹션 전환 시 추가 애니메이션 (옵션)

    // Intersection Observer를 쓰면 각 섹션에 도달했을 때 텍스트가 슥 올라오는 효과를 줄 수 있습니다.

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



// 3. 내비게이션 스무스 스크롤 (Container 방식)
document.querySelectorAll('.nav-menu a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 기존 JS 코드에 이 부분이 포함되어 있다면 그대로 두셔도 됩니다.
document.querySelectorAll('.nav-menu a, .dropdown-content a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        // 드롭다운 부모 메뉴 클릭 시 페이지 이동을 막고 싶다면 아래 조건문 추가
        if(this.classList.contains('dropbtn')) {
            // e.preventDefault(); // 부모 메뉴 클릭 시 이동을 막으려면 주석 해제
        }
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

