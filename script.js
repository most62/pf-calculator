/* ==========================================================
   script.js — PF Calculator (Optimized Final)
   Author: most62 (enhanced for SEO, UX, AdSense)
   ========================================================== */

class PFCalculator {
    constructor() {
        this.chart = null;
        this.initializeListeners();
    }

    initializeListeners() {
        const calculateBtn = document.getElementById('calculateBtn');
        const inputs = document.querySelectorAll('input[type="number"]');

        if (calculateBtn) {
            calculateBtn.addEventListener('click', () => this.calculatePF());
        }

        inputs.forEach(input => {
            input.addEventListener('input', () => this.validateInput(input));
        });
    }

    validateInput(input) {
        const value = parseFloat(input.value);
        const min = parseFloat(input.min);
        const max = parseFloat(input.max);

        if (isNaN(value)) return;
        if (value < min) input.value = min;
        else if (value > max) input.value = max;
    }

    calculatePF() {
        const currentAge = parseInt(document.getElementById('currentAge').value) || 25;
        const retirementAge = parseInt(document.getElementById('retirementAge').value) || 60;
        const currentBalance = parseFloat(document.getElementById('currentBalance').value) || 0;
        const monthlyContribution = parseFloat(document.getElementById('monthlyContribution').value) || 0;
        const interestRate = parseFloat(document.getElementById('interestRate').value) || 8.1;

        // Error handling
        const errorBox = document.getElementById('errorBox');
        if (currentAge >= retirementAge) {
            errorBox.classList.remove('hidden');
            errorBox.innerHTML = "⚠️ रिटायरमेंट उम्र वर्तमान उम्र से अधिक होनी चाहिए।";
            document.getElementById('resultSection').classList.add('hidden');
            return;
        } else {
            errorBox.classList.add('hidden');
        }

        // Calculations
        const years = retirementAge - currentAge;
        const months = years * 12;
        const monthlyRate = interestRate / 100 / 12;

        const futureValueOfCurrent = currentBalance * Math.pow(1 + monthlyRate, months);
        const futureValueOfContribution = monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
        const maturityAmount = futureValueOfCurrent + futureValueOfContribution;
        const totalInvestment = currentBalance + (monthlyContribution * months);
        const totalInterest = maturityAmount - totalInvestment;

        this.displayResults(totalInvestment, totalInterest, maturityAmount);
        this.createChart(totalInvestment, totalInterest);
    }

    displayResults(investment, interest, maturity) {
        const resultSection = document.getElementById('resultSection');
        const totalInvestmentEl = document.getElementById('totalInvestment');
        const totalInterestEl = document.getElementById('totalInterest');
        const maturityAmountEl = document.getElementById('maturityAmount');

        totalInvestmentEl.textContent = this.formatCurrency(investment);
        totalInterestEl.textContent = this.formatCurrency(interest);
        maturityAmountEl.textContent = this.formatCurrency(maturity);

        resultSection.classList.remove('hidden');
        resultSection.scrollIntoView({ behavior: 'smooth' });
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    }

    createChart(investment, interest) {
        const ctx = document.getElementById('resultChart').getContext('2d');
        if (this.chart) this.chart.destroy();

        this.chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['कुल निवेश (Investment)', 'कुल ब्याज (Interest)'],
                datasets: [{
                    data: [investment, interest],
                    backgroundColor: ['#667eea', '#764ba2'],
                    borderWidth: 3,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom', labels: { usePointStyle: true, padding: 15 } },
                    tooltip: {
                        callbacks: {
                            label: (context) => `${context.label}: ₹${this.formatNumber(context.parsed)}`
                        }
                    }
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        });
    }

    formatNumber(num) {
        return new Intl.NumberFormat('en-IN').format(Math.round(num));
    }
}

/* ---------- Initialize ---------- */
document.addEventListener('DOMContentLoaded', () => {
    new PFCalculator();

    const calculateBtn = document.getElementById('calculateBtn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', function () {
            const oldText = this.textContent;
            this.textContent = "Calculating...";
            this.disabled = true;
            setTimeout(() => {
                this.textContent = oldText;
                this.disabled = false;
            }, 1200);
        });
    }
});

/* ---------- Optional: Service Worker (for offline support) ---------- */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('✅ Service Worker Registered', reg))
            .catch(err => console.log('⚠️ Service Worker Failed', err));
    });
}
