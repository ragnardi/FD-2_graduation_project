class Features {
    static startClock() {
        setInterval(function() {
            const  date = new Date(),
                   timers = document.getElementsByClassName('time-cell');

            for (let timer in timers) {
                if (timers.hasOwnProperty(timer)) {
                    timers[timer].getElementsByClassName('clock')[0].textContent =
                        date.toLocaleTimeString('ru', {timeZone: timers[timer].getElementsByClassName('city-select')[0].value});
                }
            }
        }, 100);
    }
}

export default Features;