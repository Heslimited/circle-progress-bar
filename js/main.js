document.addEventListener('DOMContentLoaded', (event) => {
    // Функция для инициализации блока прогресса
    function initProgress(containerSelector, percentId, animationId, visibilityId) {
        const container = document.querySelector(containerSelector);
        const circle = container.querySelector('.progress__con__circle-ring');
        const radius = circle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        const input = document.getElementById(percentId);

        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = circumference;

        function setProgress(percent) {
            const offset = circumference - percent / 100 * circumference;
            circle.style.strokeDashoffset = offset;
        }

        input.addEventListener('input', function() {
            let value = parseInt(this.value);
            if (isNaN(value) || value < 0) {
                this.value = '';
            } else if (value > 100) {
                this.value = '100';
            }
        });

        input.addEventListener('change', function(){
            const value = parseInt(this.value);
            setProgress(value);
        });

        const animateToggle = document.getElementById(animationId);
        animateToggle.addEventListener('change', function() {
            if (this.checked) {
                circle.classList.add('animation');
                circle.style.animationPlayState = 'running';
            } else {
                circle.style.animationPlayState = 'paused';
            }
        });

        const hideToggle = document.getElementById(visibilityId);
        hideToggle.addEventListener('change', function() {
            if (this.checked) {
                circle.classList.add('hide');
            } else {
                circle.classList.remove('hide');
            }
        });
    }

    initProgress('.progress', 'percent', 'animation', 'visibility');
    initProgress('.progress1', 'percent1', 'animation1', 'visibility1');
});
