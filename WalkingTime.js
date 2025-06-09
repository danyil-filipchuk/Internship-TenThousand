document.addEventListener('DOMContentLoaded', () => {
    const data = [
        { from: '2025-06-08T05:56:28+00:00', to: '2025-06-08T05:57:10+00:00' },
        { from: '2025-06-08T06:01:01+00:00', to: '2025-06-08T06:49:31+00:00' },
        { from: '2025-06-08T07:04:21+00:00', to: '2025-06-08T07:05:26+00:00' },
        { from: '2025-06-08T08:27:42+00:00', to: '2025-06-08T08:28:52+00:00' },
        { from: '2025-06-08T08:29:43+00:00', to: '2025-06-08T08:31:28+00:00' },
        { from: '2025-06-08T10:19:15+00:00', to: '2025-06-08T10:21:02+00:00' },
        { from: '2025-06-08T16:22:26+00:00', to: '2025-06-08T16:38:49+00:00' },
        { from: '2025-06-08T17:03:12+00:00', to: '2025-06-08T18:30:24+00:00' },
        { from: '2025-06-08T18:49:11+00:00', to: '2025-06-08T19:05:55+00:00' },
        { from: '2025-06-08T19:29:46+00:00', to: '2025-06-08T22:15:04+00:00' },
        { from: '2025-06-08T22:42:28+00:00', to: '2025-06-08T22:43:31+00:00' }
    ];

    const events = data
        .slice()
        .sort((a, b) => new Date(a.from) - new Date(b.from));

    const dateEl = document.querySelector('.date');
    if (events.length) {
        const d = new Date(events[0].from);
        dateEl.textContent = d.toLocaleDateString('en-GB', {
            weekday: 'long',
            day:     'numeric',
            month:   'long',
            year:    'numeric'
        });
    }

    document.querySelector('.count').textContent = `${data.length} Visits`;

    const timelineEl= document.querySelector('.timeline');
    const trackWidth= timelineEl.clientWidth;
    const totalSeconds= 24 * 3600;
    const pxPerSec= (trackWidth / totalSeconds) * 0.75;
    const minGapPx= 5;
    const circlePx= 24;
    const overlapSec= 15 * 60;

    let prevEndSec = 0;

    events.forEach((ev, i) => {
        const start = new Date(ev.from);
        const end   = new Date(ev.to);

        const startSec = start.getUTCHours() * 3600 +
            start.getUTCMinutes() * 60 +
            start.getUTCSeconds();
        const endSec   = end.getUTCHours()   * 3600 +
            end.getUTCMinutes()   * 60 +
            end.getUTCSeconds();

        let gapPx;
        const delta = startSec - prevEndSec;

        if (i === 0) {
            gapPx = Math.max(startSec * pxPerSec, minGapPx);
        } else if (delta <= overlapSec) {
            gapPx = -circlePx / 2;
        } else {
            gapPx = Math.max(delta * pxPerSec, minGapPx);
        }

        const durationSec = endSec - startSec;
        const widthPx = durationSec > 3600
            ? durationSec * pxPerSec
            : circlePx;

        const dot = document.createElement('div');
        dot.classList.add('walk');
        dot.style.marginLeft = `${gapPx}px`;
        dot.style.width = `${widthPx}px`;
        if (durationSec > 3600) dot.classList.add('duration');

        timelineEl.appendChild(dot);

        prevEndSec = endSec;
    });
});