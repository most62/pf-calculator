// Ads configuration for PopularAds
class AdsManager {
    constructor() {
        this.adSlots = ['ad-top', 'ad-middle', 'ad-bottom'];
        this.init();
    }

    init() {
        this.loadAds();
        this.handleResize();
        this.setupAdRefresh();
    }

    loadAds() {
        // PopularAds implementation
        // Replace with actual PopularAds code
        this.adSlots.forEach(slotId => {
            const adSlot = document.getElementById(slotId);
            if (adSlot) {
                this.loadPopularAd(adSlot, slotId);
            }
        });
    }

    loadPopularAd(adSlot, slotId) {
        // Placeholder for PopularAds code
        // This is where you'll put the actual PopularAds JavaScript code
        
        const adContent = this.createAdPlaceholder(slotId);
        adSlot.innerHTML = adContent;
        
        // Simulate ad loading delay
        setTimeout(() => {
            adSlot.style.border = '2px solid #28a745';
            adSlot.innerHTML = this.createDemoAd(slotId);
        }, 1000);
    }

    createAdPlaceholder(slotId) {
        return `
            <div style="color: #6c757d; font-size: 14px;">
                <div>Advertisement</div>
                <div style="font-size: 12px; margin-top: 5px;">Loading ad...</div>
            </div>
        `;
    }

    createDemoAd(slotId) {
        const ads = {
            'ad-top': {
                title: 'Best Investment Plans',
                desc: 'Get higher returns with secure investments'
            },
            'ad-middle': {
                title: 'PF Management Services',
                desc: 'Professional PF account management'
            },
            'ad-bottom': {
                title: 'Financial Planning',
                desc: 'Expert advice for your retirement'
            }
        };
        
        const ad = ads[slotId];
        return `
            <div style="text-align: center; padding: 10px; background: #f8f9fa; border-radius: 5px;">
                <div style="font-weight: bold; color: #333; margin-bottom: 5px;">${ad.title}</div>
                <div style="font-size: 12px; color: #666; margin-bottom: 8px;">${ad.desc}</div>
                <div style="font-size: 10px; color: #999;">Advertisement</div>
            </div>
        `;
    }

    handleResize() {
        window.addEventListener('resize', () => {
            // Refresh ads on resize for better responsive behavior
            this.refreshAds();
        });
    }

    setupAdRefresh() {
        // Refresh ads every 30 seconds (adjust as per PopularAds policy)
        setInterval(() => {
            this.refreshAds();
        }, 30000);
    }

    refreshAds() {
        this.adSlots.forEach(slotId => {
            const adSlot = document.getElementById(slotId);
            if (adSlot && this.isInViewport(adSlot)) {
                this.loadPopularAd(adSlot, slotId);
            }
        });
    }

    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // GDPR and privacy compliance
    handlePrivacyConsent() {
        // Implement based on PopularAds requirements
        const userConsent = this.getUserConsent();
        if (userConsent) {
            this.loadAds();
        }
    }

    getUserConsent() {
        // Check if user has given consent for ads
        return localStorage.getItem('ad-consent') === 'true';
    }

    setUserConsent(consent) {
        localStorage.setItem('ad-consent', consent);
        if (consent) {
            this.loadAds();
        }
    }
}

// Initialize ads when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const adsManager = new AdsManager();
    
    // Add privacy consent banner (required for ads)
    this.addPrivacyBanner(adsManager);
});

// Privacy consent banner
function addPrivacyBanner(adsManager) {
    if (!localStorage.getItem('ad-consent')) {
        const banner = document.createElement('div');
        banner.style.cssText = `
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: #333;
            color: white;
            padding: 15px;
            text-align: center;
            z-index: 1000;
            font-size: 14px;
        `;
        
        banner.innerHTML = `
            <div style="max-width: 800px; margin: 0 auto;">
                <p>हम आपको बेहतर अनुभव देने के लिए कुकीज़ और विज्ञापनों का उपयोग करते हैं। कृपया सहमति दें।</p>
                <button id="accept-ads" style="background: #28a745; color: white; border: none; padding: 8px 20px; margin: 0 10px; border-radius: 5px; cursor: pointer;">सहमत</button>
                <button id="reject-ads" style="background: #dc3545; color: white; border: none; padding: 8px 20px; margin: 0 10px; border-radius: 5px; cursor: pointer;">असहमत</button>
            </div>
        `;
        
        document.body.appendChild(banner);
        
        document.getElementById('accept-ads').addEventListener('click', () => {
            adsManager.setUserConsent(true);
            document.body.removeChild(banner);
        });
        
        document.getElementById('reject-ads').addEventListener('click', () => {
            adsManager.setUserConsent(false);
            document.body.removeChild(banner);
        });
    }
}

// PopularAds specific requirements
window.addEventListener('load', function() {
    // Ensure ads are loaded after page complete load
    setTimeout(() => {
        if (window.adsManager) {
            window.adsManager.refreshAds();
        }
    }, 2000);
});