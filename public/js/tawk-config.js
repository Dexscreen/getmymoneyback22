// Tawk.to Live Chat Configuration
const TAWK_CONFIG = {
    // Your Tawk.to Property ID
    propertyId: '689a86a70de589192ac53bdd',
    
    // Your Tawk.to Widget ID  
    widgetId: '1j2dps0cp',
    
    // Chat settings
    settings: {
        backgroundColor: '#1E40AF', // Example custom background color
        bubbleColor: '#DC2626',     // Example chat bubble color
        status: 'online',
        greeting: 'Need help with scam recovery? We\'re here to help 24/7.',
        showOnLoad: true,
        position: 'br' // bottom right
    }
};

// Initialize Tawk.to chat widget
(function() {
    // Only load if we have valid IDs configured
    if (!TAWK_CONFIG.propertyId || !TAWK_CONFIG.widgetId) {
        console.log('Tawk.to configuration missing.');
        return;
    }
    
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();
    
    // Configure Tawk.to settings after load
    Tawk_API.onLoad = function() {
        console.log('Tawk.to chat loaded successfully');
        
        // Optional: Set custom greeting inside chat
        if (TAWK_CONFIG.settings.greeting) {
            Tawk_API.addEvent('Greeting', {
                message: TAWK_CONFIG.settings.greeting
            });
        }
    };
    
    // Chat events
    Tawk_API.onChatMessageVisitor = function(message) {
        console.log('Visitor message:', message);
        if (typeof gtag !== 'undefined') {
            gtag('event', 'chat_message_sent', {
                'event_category': 'engagement',
                'event_label': 'visitor_message'
            });
        }
    };
    
    Tawk_API.onChatMessageAgent = function(message) {
        console.log('Agent message:', message);
        if (typeof gtag !== 'undefined') {
            gtag('event', 'chat_response_received', {
                'event_category': 'support',
                'event_label': 'agent_response'
            });
        }
    };
    
    Tawk_API.onChatStarted = function() {
        console.log('Chat session started');
        if (typeof gtag !== 'undefined') {
            gtag('event', 'chat_started', {
                'event_category': 'engagement',
                'event_label': 'new_chat_session'
            });
        }
    };
    
    // Load the Tawk.to widget
    (function() {
        var s1 = document.createElement("script"),
            s0 = document.getElementsByTagName("script")[0];
        
        s1.async = true;
        s1.src = 'https://embed.tawk.to/' + TAWK_CONFIG.propertyId + '/' + TAWK_CONFIG.widgetId;
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');
        
        s0.parentNode.insertBefore(s1, s0);
    })();
})();

// Utility functions for chat management
window.TawkChat = {
    show: function() {
        if (typeof Tawk_API !== 'undefined' && Tawk_API.showWidget) {
            Tawk_API.showWidget();
        }
    },
    hide: function() {
        if (typeof Tawk_API !== 'undefined' && Tawk_API.hideWidget) {
            Tawk_API.hideWidget();
        }
    },
    maximize: function() {
        if (typeof Tawk_API !== 'undefined' && Tawk_API.maximize) {
            Tawk_API.maximize();
        }
    },
    minimize: function() {
        if (typeof Tawk_API !== 'undefined' && Tawk_API.minimize) {
            Tawk_API.minimize();
        }
    },
    setVisitor: function(name, email) {
        if (typeof Tawk_API !== 'undefined' && Tawk_API.setAttributes) {
            Tawk_API.setAttributes({
                name: name,
                email: email
            });
        }
    },
    addTags: function(tags) {
        if (typeof Tawk_API !== 'undefined' && Tawk_API.addTags) {
            Tawk_API.addTags(tags);
        }
    }
};

// Auto-categorize chats based on current page
document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    let chatTags = ['website'];
    
    if (currentPath.includes('crypto-scam')) {
        chatTags.push('crypto-scam');
    } else if (currentPath.includes('pig-butchering')) {
        chatTags.push('pig-butchering');
    } else if (currentPath.includes('ponzi-scheme')) {
        chatTags.push('ponzi-scheme');
    } else if (currentPath.includes('complaints')) {
        chatTags.push('complaint');
    } else if (currentPath.includes('contact')) {
        chatTags.push('general-inquiry');
    }
    
    if (typeof Tawk_API !== 'undefined') {
        Tawk_API.onLoad = function() {
            window.TawkChat.addTags(chatTags);
        };
    } else {
        setTimeout(function() {
            if (window.TawkChat) {
                window.TawkChat.addTags(chatTags);
            }
        }, 2000);
    }
});

// Export config for debugging
window.TawkConfig = TAWK_CONFIG;
