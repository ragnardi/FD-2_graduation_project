class Features {
    static showScrollBtn() {
        const scrollBtn = document.getElementsByClassName('scroll-btn')[0];

        if (document.documentElement.scrollTop > 150) {
            scrollBtn.classList.add('active-btn');
        } else {
            scrollBtn.classList.remove('active-btn');
        }
    }

    static scrollPage() {
        const scrollAnimation = setInterval(() => {
            let scrollPosition = document.documentElement.scrollTop;

            if (scrollPosition <= 0) {
                clearInterval(scrollAnimation);
            } else {
                document.documentElement.scrollTop -= 10;
            }
        }, 10);
    }

    static startClock() {
        Features.checkTimeProperties();

        setInterval(function() {
            const date = new Date(),
                timers = document.getElementsByClassName('time-cell'),
                cities = document.getElementsByClassName('city-select'),
                timeConfig = [];

            for (let timer in timers) {
                if (timers.hasOwnProperty(timer)) {
                    timers[timer].getElementsByClassName('clock')[0].textContent =
                        date.toLocaleTimeString('ru', {timeZone: timers[timer].getElementsByClassName('city-select')[0].value});
                }
            }

            for (let i = 0; i < cities.length; i++) {

                for (let city in cities[i]) {
                    if (cities[i].hasOwnProperty(city)) {
                        if (cities[i][city].selected) {
                            timeConfig[i] = cities[i][city].textContent;
                        }
                    }
                }
            }

            localStorage.setItem('timeConfig', JSON.stringify(timeConfig));
        }, 100);
    }

    static checkTimeProperties() {
        const cities = document.getElementsByClassName('city-select');

        if (localStorage.getItem('timeConfig')) {
            const timeConfig = JSON.parse(localStorage.getItem('timeConfig'));

            for (let i = 0; i < cities.length; i++) {

                for (let city in cities[i]) {
                    if (cities[i].hasOwnProperty(city)) {
                        cities[i][city].selected = cities[i][city].textContent === timeConfig[i];
                    }
                }
            }
        } else {
            const timeConfig = [];

            for (let i = 0; i < cities.length; i++) {

                for (let city in cities[i]) {

                    if (cities[i].hasOwnProperty(city)) {

                        if (cities[i][city].selected) {
                            timeConfig[i] = cities[i][city].textContent;
                        }
                    }
                }
            }

            localStorage.setItem('timeConfig', JSON.stringify(timeConfig));
        }
    }

    static fixTimeBar() {
        const timeBar = document.getElementsByClassName('time-bar')[0],
            triggerPosition = document.getElementsByClassName('header-info')[0].offsetHeight;

        if (document.documentElement.scrollTop > triggerPosition) {
            timeBar.classList.add('sticky-time-bar');
        } else if (document.documentElement.scrollTop < triggerPosition) {
            timeBar.classList.remove('sticky-time-bar');
        }
    }
}

export default Features;