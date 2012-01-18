/**
 * jQuery CSS Popup plugin.
 */
;(function($) {

	var overlay, popup, cont, options;

	var create = function(content, opts) {

		var _options = opts ? $.extend({}, options, opts) : options;

		// Create and append elements
		overlay = $('<div class="csspopup-overlay"></div>');
		popup   = $('<div class="csspopup-popup"><div class="csspopup-content"></div></div>');
		cont    = popup.find('.csspopup-content');
		_options.closeBtn && popup.prepend('<div class="csspopup-close">&times;</div>');
		cont.append(content);

		overlay.append(popup).appendTo('body');

		// IE fix
		if ($.browser.msie && parseInt($.browser.version) < 9) {
			overlay.before('<div class="csspopup-overlay csspopup-overlay-ie"></div>')
				   .append('<div class="csspopup-valignfix"></div>');
			overlay = $('.csspopup-overlay');
		}

		// Bind overlay events
		popup.click(function(e) {
			e.stopPropagation();
			if (_options.hideOnContentClick) {
				$.cssPopup.close(_options.onClose);
			}
		});

		if (_options.hideOnOverlayClick) {
			overlay.click(function() {
				$.cssPopup.close(_options.onClose);
			});
		}

		popup.find('.csspopup-close').click(function() {
			$.cssPopup.close(_options.onClose);
		});

		// Show overlay
		$.cssPopup.show(_options.onShow);
	};

	/**
	 * Plugin code.
	 * @param {Object} opts
	 */
	$.fn.cssPopup = function(opts) {
		var content = $(this).clone();
		create(content, opts);
		return this;
	};

	/**
	 * Global function.
	 * @param {String} content Html content of the popup.
	 */
	$.cssPopup = function(content, opts) {
		create(content, opts);
	};

	/**
	 * Global pubic show popup function.
	 * @param {Function} callback Callback function to be called.
	 */
	$.cssPopup.show = function(callback) {
		overlay.show();
		var cb = callback ? callback : options.onShow;
		cb && cb.call(popup, popup);
	};

	/**
	 * Global public close popup method.
	 */
	$.cssPopup.close = function(callback) {
		var cb = callback ? callback : options.onClose;
		cb && cb.call(popup, popup);
		overlay.remove();
	};

	/**
	 * Default settings.
	 */
	$.cssPopup.defaults = options = {
		closeBtn: true,
		hideOnOverlayClick: false,
		hideOnContentClick: false,
		onShow: null,
		onClose: null
	};

})(jQuery);
