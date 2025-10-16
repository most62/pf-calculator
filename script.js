// PF Calculation Logic
function calculatePF() {
    // Get input values
    const currentAge = parseInt(document.getElementById('currentAge').value);
    const basicSalary = parseInt(document.getElementById('basicSalary').value);
    const da = parseInt(document.getElementById('da').value);
    const currentBalance = parseInt(document.getElementById('currentBalance').value);
    const salaryGrowth = parseFloat(document.getElementById('salaryGrowth').value);
    
    // Validation
    if (!currentAge || !basicSalary || !da) {
        alert('कृपया सभी जरूरी फील्ड भरें');
        return;
    }
    
    const retirementAge = 60;
    const workingYears = retirementAge - currentAge;
    
    if (workingYears <= 0) {
        alert('आपकी उम्र 60 साल से ज्यादा है!');
        return;
    }
    
    // PF Calculation
    let totalPF = currentBalance;
    let totalEmployeeContribution = 0;
    let totalEmployerContribution = 0;
    
    const monthlyBasicDA = basicSalary + da;
    const currentInterestRate = 8.25; // Current EPF interest rate
    
    let currentSalary = monthlyBasicDA;
    
    for (let year = 1; year <= workingYears; year++) {
        // Monthly contributions
        const monthlyEmployeeContribution = currentSalary * 0.12; // 12% employee
        const monthlyEmployerContribution = currentSalary * 0.13; // 13% employer (8.33% EPS + 3.67% PF)
        
        // Annual totals
        const annualEmployeeContribution = monthlyEmployeeContribution * 12;
        const annualEmployerContribution = monthlyEmployerContribution * 12;
        const annualTotalContribution = annualEmployeeContribution + annualEmployerContribution;
        
        // Add to totals
        totalEmployeeContribution += annualEmployeeContribution;
        totalEmployerContribution += annualEmployerContribution;
        
        // Calculate interest on opening balance
        const openingBalance = totalPF;
        const interest = (openingBalance + (annualTotalContribution / 2)) * (currentInterestRate / 100);
        
        totalPF += annualTotalContribution + interest;
        
        // Salary growth for next year
        currentSalary *= (1 + salaryGrowth / 100);
    }
    
    // Display results
    displayResults(totalPF, totalEmployeeContribution, totalEmployerContribution);
}

function displayResults(totalPF, employeeContribution, employerContribution) {
    const interestEarned = totalPF - employeeContribution - employerContribution;
    
    // Format numbers in Indian style
    const formatter = new Intl.NumberFormat('en-IN', {
        maximumFractionDigits: 0
    });
    
    document.getElementById('totalPF').textContent = `₹${formatter.format(totalPF)}`;
    document.getElementById('employeeContribution').textContent = `₹${formatter.format(employeeContribution)}`;
    document.getElementById('employerContribution').textContent = `₹${formatter.format(employerContribution)}`;
    document.getElementById('interestEarned').textContent = `₹${formatter.format(interestEarned)}`;
    
    // Show result section
    document.getElementById('result').style.display = 'block';
    
    // Scroll to results
    document.getElementById('result').scrollIntoView({ behavior: 'smooth' });
}

// Share Functions
function shareOnWhatsApp() {
    const totalPF = document.getElementById('totalPF').textContent;
    const text = `मेरा PF रिजल्ट: ${totalPF}! 🎉 आप भी जानें अपना PF कितना होगा: ${window.location.href}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
}

function shareOnTwitter() {
    const totalPF = document.getElementById('totalPF').textContent;
    const text = `मेरा PF रिजल्ट: ${totalPF}! क्या आपने कभी सोचा आपका PF कितना होगा? जानें: ${window.location.href}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
}

function downloadResult() {
    alert('इमेज डाउनलोड फीचर जल्दी ही आ रहा है! अभी के लिए स्क्रीनशॉट ले सकते हैं।');
    // Future implementation for image generation
}

// Mobile menu toggle
function toggleMenu() {
    const nav = document.querySelector('nav');
    nav.classList.toggle('active');
}

// Initialize calculator with some default values
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.querySelector('footer p').innerHTML = `© ${new Date().getFullYear()} Mera PF Calculator | Made with ❤️ for India`;
});