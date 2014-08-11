/*

Cookify

Requires jquery-cookie: https://github.com/carhartl/jquery-cookie/

*/

(function ( $ ) {
	$.cookify = function( options ) {
		var settings = $.extend({
			useCookie: false,
			width: '100%',
			color: '#fff',
			backgroundColor: '#000',
			borderColor: '#000',
			fontFamily: 'Arial',
			fontSize: '12px',
			linkColor: '#0000ff',
			linkDecoration: 'underline',
			cookieMessage: 'By continuing to use the site, you agree to the use of cookies. For more details refer to our {{cookiePolicyLink}}.',
			cookiePolicy: 'privacy and cookie policy',
			cookiePolicyLink: '',
			cookiePolicyTarget: '_blank',
			bottom: true,
			inlineCSS: true,
			cookieExpires: 365,
			initialShow: 500,
			slideUpAfter: 5000,
			slideUpAfterHover: 5000
		}, options );
		
		var cookieSet;

		if($.cookie && settings.useCookie){
			cookieSet = $.cookie('cookify_cookie_set') == 'cookify_cookie_set';
		}else{
			cookieSet = false;
		}
		
		var position;
		
		if(settings.bottom){
			position = 'bottom';
		}else{
			position = 'top';
		}
		
		if(settings.cookiePolicyLink){
			settings.cookieMessage = settings.cookieMessage.replace('{{cookiePolicyLink}}', '<a href="' + settings.cookiePolicyLink + '" target="' + settings.cookiePolicyTarget + '" style="color: ' + settings.linkColor + '; text-decoration: ' + settings.linkDecoration + ';">' + settings.cookiePolicy + '</a>');
		}else{
			settings.cookieMessage = settings.cookieMessage.replace('{{cookiePolicyLink}}', settings.cookiePolicy);
		}
		
		var cookieHTML = '';
		
		var cookieContainerInlineCSS = '';
		
		if(settings.inlineCSS){
			cookieContainerInlineCSS = 'style="' + position + ': -1px; left: 0; display: none; position: fixed; width: 100%; z-index: 99999;" ';
		}
		
		cookieHTML += '<div id="cookieContainer" ' + cookieContainerInlineCSS + '>';
			
			if(settings.inlineCSS){
				var cookieInnerInlineCSS = 'style="background-color: ' + settings.backgroundColor + ';  color: ' + settings.color + '; margin: 0 auto; opacity: 0.8; padding: 10px 0; text-align: center; width: ' + settings.width + '; border: 1px solid ' + settings.borderColor + '; font-family: ' + settings.fontFamily + '; font-size: ' + settings.fontSize + ';" ';
			}else{
				var customCSS = 'style="';
				
				if(settings.color){
					customCSS += 'color: ' + settings.color + '; border: 1px solid ' + settings.color + ' ';
				}
				
				if(settings.backgroundColor){
					customCSS += 'background-color: ' + settings.backgroundColor + '; ';
				}
				
				customCSS += '" ';
				
				cookieInnerInlineCSS = customCSS;
			}
			
			cookieHTML += '<div id="cookieInner" ' + cookieInnerInlineCSS + '>';
				cookieHTML += settings.cookieMessage;
			cookieHTML += '</div>';
		cookieHTML += '</div>';
		
		if (settings.bottom) {
			$('body').append(cookieHTML);
		} else {
			$('body').prepend(cookieHTML);
		}
		
		if(!cookieSet){
			if($.cookie && settings.useCookie){
				$.cookie('cookify_cookie_set', 'cookify_cookie_set', {
					expires: settings.cookieExpires,
					path: '/'
				});
			}
			
			// Toggle the slide based on its current visibility.
			var container = $('#cookieContainer');
			var cookieTimeout = '';
			
			if(container.is(':visible')){
				// Hide - slide up.
				container.slideUp(settings.initialShow);
			}else{
				// Show - slide down.
				container.slideDown(settings.initialShow)
				cookieTimeout = setTimeout("$('#cookieContainer').slideUp( 500 );", settings.slideUpAfter);
			}
			
			$('#cookieContainer').hover(function(){
				clearTimeout(cookieTimeout);
			}, function(){
				cookieTimeout = setTimeout("$('#cookieContainer').slideUp( 500 );", settings.slideUpAfterHover);
			});
		}
	};
}( jQuery ));