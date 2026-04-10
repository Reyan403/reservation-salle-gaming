/*
 * Welcome to your app's main JavaScript file!
 *
 * This file will be included onto the page via the importmap() Twig function,
 * which should already be in your base.html.twig.
 */
import './styles/app.css';

// Reservation System
document.addEventListener('DOMContentLoaded', () => {
    // ─── Step panels ────────────────────────────────────────────────────────
    const step1Content = document.getElementById('step-1-content');
    const step2Content = document.getElementById('step-2-content');
    const step3Content = document.getElementById('step-3-content');

    // ─── Step indicator elements ─────────────────────────────────────────────
    const stepIcon1 = document.getElementById('step-icon-1');
    const stepIcon2 = document.getElementById('step-icon-2');
    const stepIcon3 = document.getElementById('step-icon-3');
    const stepLabel1 = document.getElementById('step-label-1');
    const stepLabel2 = document.getElementById('step-label-2');
    const stepLabel3 = document.getElementById('step-label-3');
    const stepLine1 = document.getElementById('step-line-1');
    const stepLine2 = document.getElementById('step-line-2');

    // ─── Step 1 inputs ───────────────────────────────────────────────────────
    const roomRadios = document.querySelectorAll('input[name="room"]');
    const selects = document.querySelectorAll('#reservation select');
    const timeSelect = selects[0];
    const durationSelect = selects[1];
    const playersSelect = selects[2];
    const continueBtn = document.getElementById('continue-btn');

    // ─── Step 2 inputs ───────────────────────────────────────────────────────
    const userNameInput = document.getElementById('user-name');
    const userEmailInput = document.getElementById('user-email');
    const userPhoneInput = document.getElementById('user-phone');
    const backBtn = document.getElementById('back-btn');
    const confirmBtn = document.getElementById('confirm-btn');

    // ─── Step 3 confirm fields ───────────────────────────────────────────────
    const confirmRoom = document.getElementById('confirm-room');
    const confirmDate = document.getElementById('confirm-date');
    const confirmCreneau = document.getElementById('confirm-creneau');
    const confirmPlayers = document.getElementById('confirm-players');
    const confirmName = document.getElementById('confirm-name');
    const confirmEmail = document.getElementById('confirm-email');
    const confirmPhone = document.getElementById('confirm-phone');
    const confirmPhoneBlock = document.getElementById('confirm-phone-block');
    const confirmTotal = document.getElementById('confirm-total');
    const newReservationBtn = document.getElementById('new-reservation-btn');

    // ─── Summary sidebar (shared) ────────────────────────────────────────────
    const summaryRoom = document.getElementById('summary-room');
    const summaryDate = document.getElementById('summary-date');
    const summaryCreneau = document.getElementById('summary-creneau');
    const summaryPlayers = document.getElementById('summary-players');
    const summaryTotal = document.getElementById('summary-total');

    // ─── Calendar elements ───────────────────────────────────────────────────
    const calendarMonthYear = document.querySelector('#reservation .text-white.font-semibold');
    const calendarGrid = document.querySelector('#reservation .grid.grid-cols-7');
    const prevMonthBtn = document.querySelectorAll('#reservation .p-2.hover\\:bg-zinc-800')[0];
    const nextMonthBtn = document.querySelectorAll('#reservation .p-2.hover\\:bg-zinc-800')[1];

    // ─── State ───────────────────────────────────────────────────────────────
    const today = new Date();
    const state = {
        room: null,
        roomPrice: 0,
        date: null,
        time: null,
        duration: null,
        players: null,
        currentMonth: today.getMonth(),
        currentYear: today.getFullYear(),
        // Step 2
        userName: '',
        userEmail: '',
        userPhone: '',
    };

    // ─── Room data ───────────────────────────────────────────────────────────
    const roomPrices = { retro: 25, montage: 35, vr: 40, streaming: 45 };
    const roomNames = {
        retro: 'Salle Retro-Gaming',
        montage: 'Studio Montage',
        vr: 'Salle VR',
        streaming: 'Studio Streaming',
    };

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
    ];

    // ════════════════════════════════════════════════════════════════════════
    //  STEP NAVIGATION
    // ════════════════════════════════════════════════════════════════════════

    function goToStep(step) {
        // Hide all panels
        [step1Content, step2Content, step3Content].forEach(el => el && el.classList.add('hidden'));

        // Show target panel
        if (step === 1) step1Content && step1Content.classList.remove('hidden');
        if (step === 2) step2Content && step2Content.classList.remove('hidden');
        if (step === 3) step3Content && step3Content.classList.remove('hidden');

        // Update step indicators
        updateStepIndicators(step);

        // Scroll to reservation section smoothly
        document.getElementById('reservation')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function updateStepIndicators(currentStep) {
        // Helper: activate an icon
        const activate = (icon, label) => {
            icon.classList.remove('bg-zinc-800', 'text-zinc-500');
            icon.classList.add('bg-amber-500', 'text-zinc-950');
            label.classList.remove('text-zinc-500');
            label.classList.add('text-white');
        };
        // Helper: complete an icon (checkmark style)
        const complete = (icon, label) => {
            icon.classList.remove('bg-zinc-800', 'text-zinc-500');
            icon.classList.add('bg-amber-500', 'text-zinc-950');
            label.classList.remove('text-zinc-500');
            label.classList.add('text-white');
        };
        // Helper: deactivate
        const deactivate = (icon, label) => {
            icon.classList.remove('bg-amber-500', 'text-zinc-950');
            icon.classList.add('bg-zinc-800', 'text-zinc-500');
            label.classList.remove('text-white');
            label.classList.add('text-zinc-500');
        };
        // Helper: activate line
        const activateLine = (line) => {
            line.classList.remove('bg-zinc-700');
            line.classList.add('bg-amber-500');
        };
        const deactivateLine = (line) => {
            line.classList.remove('bg-amber-500');
            line.classList.add('bg-zinc-700');
        };

        if (currentStep === 1) {
            activate(stepIcon1, stepLabel1);
            deactivate(stepIcon2, stepLabel2);
            deactivate(stepIcon3, stepLabel3);
            deactivateLine(stepLine1);
            deactivateLine(stepLine2);
        } else if (currentStep === 2) {
            complete(stepIcon1, stepLabel1);
            activate(stepIcon2, stepLabel2);
            deactivate(stepIcon3, stepLabel3);
            activateLine(stepLine1);
            deactivateLine(stepLine2);
        } else if (currentStep === 3) {
            complete(stepIcon1, stepLabel1);
            complete(stepIcon2, stepLabel2);
            activate(stepIcon3, stepLabel3);
            activateLine(stepLine1);
            activateLine(stepLine2);
        }
    }

    // ════════════════════════════════════════════════════════════════════════
    //  CALENDAR
    // ════════════════════════════════════════════════════════════════════════

    function generateCalendar() {
        const firstDay = new Date(state.currentYear, state.currentMonth, 1);
        const lastDay = new Date(state.currentYear, state.currentMonth + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startDay = firstDay.getDay();

        calendarMonthYear.textContent = `${monthNames[state.currentMonth]} ${state.currentYear}`;

        calendarGrid.innerHTML = '';

        // Day headers
        ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].forEach(d => {
            const h = document.createElement('div');
            h.className = 'text-center text-xs font-medium text-zinc-500 py-2';
            h.textContent = d;
            calendarGrid.appendChild(h);
        });

        // Empty cells
        for (let i = 0; i < startDay; i++) {
            calendarGrid.appendChild(document.createElement('div'));
        }

        // Day buttons
        const todayDate = new Date();
        for (let day = 1; day <= daysInMonth; day++) {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.textContent = day;

            const cellDate = new Date(state.currentYear, state.currentMonth, day);
            const isPast = cellDate < new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
            const isToday = day === todayDate.getDate()
                && state.currentMonth === todayDate.getMonth()
                && state.currentYear === todayDate.getFullYear();

            if (isPast) {
                btn.className = 'w-9 h-9 flex items-center justify-center rounded-lg text-sm text-zinc-600 cursor-not-allowed';
            } else if (isToday) {
                btn.className = 'w-9 h-9 flex items-center justify-center rounded-lg text-sm bg-cyan-500 text-white font-bold hover:bg-cyan-400 transition-colors';
                const monthName = monthNames[state.currentMonth].substring(0, 3);
                state.date = `${day} ${monthName} ${state.currentYear}`;
            } else {
                btn.className = 'w-9 h-9 flex items-center justify-center rounded-lg text-sm text-white hover:bg-zinc-800 transition-colors';
            }

            if (!isPast) {
                btn.addEventListener('click', (e) => {
                    calendarGrid.querySelectorAll('button').forEach(b => {
                        if (!b.classList.contains('text-zinc-600')) {
                            b.classList.remove('bg-cyan-500', 'bg-amber-500', 'font-bold', 'text-zinc-950');
                            b.classList.add('text-white');
                        }
                    });
                    e.target.classList.add('bg-amber-500', 'text-zinc-950', 'font-bold');
                    e.target.classList.remove('text-white');

                    const monthName = monthNames[state.currentMonth].substring(0, 3);
                    state.date = `${e.target.textContent} ${monthName} ${state.currentYear}`;
                    updateSummary();
                });
            }

            calendarGrid.appendChild(btn);
        }
    }

    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', () => {
            state.currentMonth--;
            if (state.currentMonth < 0) { state.currentMonth = 11; state.currentYear--; }
            generateCalendar();
        });
    }
    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', () => {
            state.currentMonth++;
            if (state.currentMonth > 11) { state.currentMonth = 0; state.currentYear++; }
            generateCalendar();
        });
    }

    generateCalendar();

    // ════════════════════════════════════════════════════════════════════════
    //  SUMMARY SIDEBAR
    // ════════════════════════════════════════════════════════════════════════

    function updateSummary() {
        if (summaryRoom) summaryRoom.textContent = state.room ? roomNames[state.room] : '—';
        if (summaryDate) summaryDate.textContent = state.date || '—';
        if (summaryPlayers) summaryPlayers.textContent = state.players || '—';

        if (summaryCreneau) {
            if (state.time && state.duration) {
                const startH = parseInt(state.time.split(':')[0]);
                const durH = parseInt(state.duration.replace('h', ''));
                summaryCreneau.textContent = `${state.time} – ${startH + durH}:00`;
            } else {
                summaryCreneau.textContent = state.time || '—';
            }
        }

        if (summaryTotal) {
            if (state.roomPrice && state.duration) {
                const hours = parseInt(state.duration.replace('h', ''));
                summaryTotal.textContent = `${state.roomPrice * hours}€`;
            } else {
                summaryTotal.textContent = '—';
            }
        }

        checkStep1Validity();
    }

    // ════════════════════════════════════════════════════════════════════════
    //  STEP 1 VALIDITY
    // ════════════════════════════════════════════════════════════════════════

    function checkStep1Validity() {
        const isValid = state.room && state.date && state.time && state.duration && state.players;
        if (!continueBtn) return;
        if (isValid) {
            continueBtn.disabled = false;
            continueBtn.classList.remove('bg-zinc-700', 'cursor-not-allowed');
            continueBtn.classList.add('bg-amber-600', 'hover:bg-amber-500');
        } else {
            continueBtn.disabled = true;
            continueBtn.classList.remove('bg-amber-600', 'hover:bg-amber-500');
            continueBtn.classList.add('bg-zinc-700', 'cursor-not-allowed');
        }
    }

    // ─── Step 1 listeners ────────────────────────────────────────────────────
    roomRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            state.room = e.target.value;
            state.roomPrice = roomPrices[e.target.value];
            updateSummary();
        });
    });

    if (timeSelect) {
        timeSelect.addEventListener('change', (e) => {
            state.time = e.target.value !== 'Choisir' ? e.target.value : null;
            updateSummary();
        });
    }
    if (durationSelect) {
        durationSelect.addEventListener('change', (e) => {
            state.duration = e.target.value !== 'Choisir' ? e.target.value : null;
            updateSummary();
        });
    }
    if (playersSelect) {
        playersSelect.addEventListener('change', (e) => {
            state.players = e.target.value !== 'Combien' ? e.target.value : null;
            updateSummary();
        });
    }

    // ─── Continue → Step 2 ───────────────────────────────────────────────────
    if (continueBtn) {
        continueBtn.addEventListener('click', () => {
            goToStep(2);
        });
    }


    // ─── Back → Step 1 ───────────────────────────────────────────────────────
    if (backBtn) {
        backBtn.addEventListener('click', () => goToStep(1));
    }

    // ─── Confirm → Step 3 ────────────────────────────────────────────────────
    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
            // Lecture des valeurs (validation gérée par Symfony)
            state.userName = userNameInput?.value.trim() || '';
            state.userEmail = userEmailInput?.value.trim() || '';
            state.userPhone = userPhoneInput?.value.trim() || '';

            // Fill confirmation page
            if (confirmRoom) confirmRoom.textContent = roomNames[state.room] || '—';
            if (confirmDate) confirmDate.textContent = state.date || '—';
            if (confirmPlayers) confirmPlayers.textContent = state.players || '—';

            if (confirmCreneau) {
                if (state.time && state.duration) {
                    const startH = parseInt(state.time.split(':')[0]);
                    const durH = parseInt(state.duration.replace('h', ''));
                    confirmCreneau.textContent = `${state.time} – ${startH + durH}:00`;
                } else {
                    confirmCreneau.textContent = state.time || '—';
                }
            }

            if (confirmName) confirmName.textContent = state.userName;
            if (confirmEmail) confirmEmail.textContent = state.userEmail;

            if (state.userPhone && confirmPhone && confirmPhoneBlock) {
                confirmPhone.textContent = state.userPhone;
                confirmPhoneBlock.classList.remove('hidden');
            } else if (confirmPhoneBlock) {
                confirmPhoneBlock.classList.add('hidden');
            }

            if (confirmTotal && state.roomPrice && state.duration) {
                const hours = parseInt(state.duration.replace('h', ''));
                confirmTotal.textContent = `${state.roomPrice * hours}€`;
            }

            goToStep(3);
        });
    }

    // ─── New reservation ─────────────────────────────────────────────────────
    if (newReservationBtn) {
        newReservationBtn.addEventListener('click', () => {
            // Reset state
            Object.assign(state, {
                room: null, roomPrice: 0, date: null,
                time: null, duration: null, players: null,
                userName: '', userEmail: '', userPhone: '',
                currentMonth: today.getMonth(),
                currentYear: today.getFullYear(),
            });

            // Reset form inputs
            roomRadios.forEach(r => r.checked = false);
            if (timeSelect) timeSelect.selectedIndex = 0;
            if (durationSelect) durationSelect.selectedIndex = 0;
            if (playersSelect) playersSelect.selectedIndex = 0;
            if (userNameInput) userNameInput.value = '';
            if (userEmailInput) userEmailInput.value = '';
            if (userPhoneInput) userPhoneInput.value = '';

            // Reset summary
            updateSummary();
            generateCalendar();

            goToStep(1);
        });
    }
});

