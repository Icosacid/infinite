/**
 * Scripts for project Infinite
 *
 * @since 2016-11-08
 * @author Alexandre Andrieux <alex@icosacid.com>
 */

/* Globals and namespaces */
var Infinite = {};

/** Script executed on start **/
jQuery(document).ready(function() {
    // Loading icon
    Infinite.loadFeedback.on();

    // Load JSON content
    jQuery.getJSON("data.json", function(data) {
        // Retrieve elements
        var bannerBkgPic = data.banner.background_pic_url;
        var splitBkgPic = data.split.background_pic_url;

        // Inject in DOM without parallax (example)
        //jQuery('.banner .mainpic').css('background-image', 'url(' + bannerBkgPic + ')');

        // Parallax effects
        jQuery('.mainpic').parallax({imageSrc: bannerBkgPic});
        jQuery('.split').parallax({imageSrc: splitBkgPic});

        // DOM listeners
        Infinite.buttonListeners();

        // Show content (wait a little for some swag)
        setTimeout(function() {
            Infinite.loadFeedback.off();
        }, 1000);
    });

});

// Functions used when an AJAX request is loading to display loading icon or screen
Infinite.loadFeedback = {
    ajaxPendingCounter: 0,
    on: function() {
        this.ajaxPendingCounter++;
        if (this.ajaxPendingCounter == 1) {
            this.turnOn();
        }
    },
    off: function() {
        // In case .off() is called more often than .on() ...
        this.ajaxPendingCounter--;
        if (this.ajaxPendingCounter == 0) {
            this.turnOff();
        }
        this.ajaxPendingCounter = Math.max(this.ajaxPendingCounter, 0);
    },
    turnOn: function() {
        jQuery('.loading').show();
    },
    turnOff: function() {
        jQuery('.loading').hide();
    }
};

// Simulate load on app buttons
Infinite.buttonListeners = function() {
    // Onclick listeners
    jQuery('.click-loader').on('click', function() {
        Infinite.loadFeedback.on();
        setTimeout(function() {
            Infinite.loadFeedback.off();
        }, 1000);
    });
};
