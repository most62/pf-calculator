// PropellerAds Integration
document.addEventListener('DOMContentLoaded', function() {
    // PropellerAds Display Code
    const adScript = document.createElement('script');
    adScript.type = 'text/javascript';
    adScript.src = 'https://go.oclaserver.com/apu.php?zoneid=YOUR_ZONE_ID';
    document.getElementById('propeller-ad').appendChild(adScript);
    
    // Popunder ad on page load (follows PropellerAds policies)
    setTimeout(function() {
        const popScript = document.createElement('script');
        popScript.type = 'text/javascript';
        popScript.src = 'https://go.oclaserver.com/apu.php?zoneid=YOUR_POP_ZONE_ID';
        document.body.appendChild(popScript);
    }, 2000);
});

// Ad event tracking
function trackAdEvent(event) {
    // Track user interactions for better ad performance
    console.log('Ad event:', event);
}