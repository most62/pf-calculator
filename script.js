class PFCalculator {
    constructor() {
        this.initializeEventListeners();
        this.chart = null;
    }

    initializeEventListeners() {
        const calculateBtn = document.getElementById('calculateBtn');
        calculateBtn.addEventListener('click', () => this.calculatePF());
        
        // Add input validation
        const inputs = document.querySelectorAll('input[type="number"]');
        inputs.forEach(input => {
            input.addEventListener('input', () => this.validateInput(input));
        });
    }

    validateInput(input) {
        const value = parseFloat(input.value);
        const min = parseFloat(input.min);
        const max = parseFloat(input.max);

        if (value < min) {
            input.value = min;
        } else if (value > max) {
            input.value = max;
        }
    }

    calculatePF() {
        // Get input values
        const currentAge = parseInt(document.getElementById('currentAge').value) || 25;
        const retirementAge = parseInt(document.getElementById('retirementAge').value) || 60;
        const currentBalance = parseFloat(document.getElementById('currentBalance').value) || 0;
        const monthlyContribution = parseFloat(document.getElementById('monthlyContribution').value) || 0;
        const interestRate = parseFloat(document.getElementById('interestRate').value) || 8.1;

        // Validate ages
        if (currentAge >= retirementAge) {
            alert('रिटायरमेंट उम्र वर्तमान उम्र से अधिक होनी चाहिए');
            return;
        }

        const yearsToRetirement = retirementAge - currentAge;
        const monthlyRate = interestRate / 100 / 12;
        const totalMonths = yearsToRetirement * 12;

        // Calculate future value of current balance
        const futureValueOfCurrent = currentBalance * Math.pow(1 + monthlyRate, totalMonths);

        // Calculate future value of monthly contributions
        const futureValueOfContributions = monthlyContribution * 
            (Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate;

        // Total maturity amount
        const maturityAmount = futureValueOfCurrent + futureValueOfContributions;

        // Calculate totals
        const totalInvestment = currentBalance + (monthlyContribution * totalMonths);
        const totalInterest = maturityAmount - totalInvestment;

        this.displayResults(totalInvestment, totalInterest, maturityAmount);
        this.createChart(totalInvestment, totalInterest);
    }

    displayResults(investment, interest, maturity) {
        const resultSection = document.getElementById('resultSection');
        const totalInvestmentEl = document.getElementById('totalInvestment');
        const totalInterestEl = document.getElementById('totalInterest');
        const maturityAmountEl = document.getElementById('maturityAmount');

        // Format numbers with Indian comma system
        totalInvestmentEl.textContent = this.formatIndianCurrency(investment);
        totalInterestEl.textContent = this.formatIndianCurrency(interest);
        maturityAmountEl.textContent = this.formatIndianCurrency(maturity);

        resultSection.classList.remove('hidden');
        
        // Smooth scroll to results
        resultSection.scrollIntoView({ behavior: 'smooth' });
    }

    formatIndianCurrency(num) {
        const formatter = new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
        return formatter.format(num);
    }

    createChart(investment, interest) {
        const ctx = document.getElementById('resultChart').getContext('2d');
        
        // Destroy previous chart if exists
        if (this.chart) {
            this.chart.destroy();
        }

        this.chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['कुल निवेश', 'कुल ब्याज'],
                datasets: [{
                    data: [investment, interest],
                    backgroundColor: [
                        '#667eea',
                        '#764ba2'
                    ],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const value = context.parsed;
                                return `₹${this.formatNumber(value)}`;
                            }
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

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PFCalculator();
    
    // Add loading animation
    const calculateBtn = document.getElementById('calculateBtn');
    calculateBtn.addEventListener('click', function() {
        const originalText = this.textContent;
        this.textContent = 'Calculating...';
        this.disabled = true;
        
        setTimeout(() => {
            this.textContent = originalText;
            this.disabled = false;
        }, 1000);
    });
});

// Add service worker for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}