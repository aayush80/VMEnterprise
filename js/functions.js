/*------------------------------------
	[Table of Content]
	
	## Document Ready
		- Aegis Navigation
		- Menu Responsive Caret
		- Sticky Navigation
		- Banner Slider
		
---------------------------------------*/

(function($) {

	"use strict"
	
	$.noConflict();
	
	
	/* + Responsive Caret */
	function menu_dropdown_open(){
		var width = $(window).width();
		if($(".aegis-navigation .navigation-menu li.ddl-active").length ) {
			if( width > 991 ) {
				$(".aegis-navigation .navigation-menu > li").removeClass("ddl-active");
				$(".aegis-navigation .navigation-menu li .dropdown-menu").removeAttr("style");
			}
		} else {
			$(".aegis-navigation .navigation-menu li .dropdown-menu").removeAttr("style");
		}
	}
	
	function Captcha(){
             var alpha = new Array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');
             var i;
             for (i=0;i<6;i++){
               var a = alpha[Math.floor(Math.random() * alpha.length)];
               var b = alpha[Math.floor(Math.random() * alpha.length)];
               var c = alpha[Math.floor(Math.random() * alpha.length)];
               var d = alpha[Math.floor(Math.random() * alpha.length)];
               var e = alpha[Math.floor(Math.random() * alpha.length)];
               var f = alpha[Math.floor(Math.random() * alpha.length)];
               var g = alpha[Math.floor(Math.random() * alpha.length)];
              }
            var code = a + ' ' + b + ' ' + ' ' + c + ' ' + d + ' ' + e + ' '+ f + ' ' + g;
            
             $('#mainCaptcha').val(code);
      }
      
      function removeSpaces(string){
            return string.split(' ').join('');
      }
	
	/* ## Document Ready */
		$(document).on("ready", function(e) {
	    
	     Captcha();
	    /* Inquiry form validation start */
	    
	    jQuery('#contact-phone').keyup(function () {
        	this.value = this.value.replace(/[^0-9\.]/g,'');					
        });
        
        $( '.inquiry_close' ).on( 'click', function( event ){
            $('#inquiry_success_popup').css('visibility','hidden');
            $('#inquiry_success_popup').css('opacity','0');
            $('.inquiry_popup .content').text(' ');
            window.location.reload();
        });
	    
	    
	    $( '#Inquiryform' ).on( 'click', function( event ){
             event.preventDefault();
             
        	var name = $.trim($("#contact-name").val());
        	var email = $.trim($("#contact-email").val());
        	var	company = $.trim($('#contact-company').val());
            var city = $.trim($("#contact-city").val());
        	var phno = $.trim($("#contact-phone").val());
        	var txtMessage = $.trim($("#txtMessage").val());
            
            var captcha_txt = $('#txtCaptcha').val();
            
            var string1 = removeSpaces(document.getElementById('mainCaptcha').value);
            var string2 = removeSpaces(document.getElementById('txtCaptcha').value);
            
            var filter = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
            
        	if(name.length === 0){
        		var msg = "Name is required.";
        		$("#contact-name").focus();
        	}else if(company.length === 0){
        		var msg = "Company is required.";
        		$("#contact-company").focus();
            }else if(city.length === 0){
        		var msg = "City is required.";
        		$("#contact-city").focus();
            }else if(email.length === 0 || !filter.test(email)){
        		var msg = "Email is required.";
        		$("#contact-email").focus();
            }else if(phno.length === 0){
        		var msg = "Phone number is required.";
        		$("#contact-phone").focus();
        	}else if(phno.length != 10){
        	    var msg = "Please put 10 digit Phone number.";
        		$("#contact-phone").focus();
    	    }else if(txtMessage.length === 0){
        		var msg = "Please enter requirement.";
        		$("#txtMessage").focus();
        	}else if(string2.length === 0){
        	    var msg = "Please enter captcha.";
        		$("#txtCaptcha").focus();
    	    }else if(string2 != string1){
        	    var msg = "Code Verification is wrong.";
        		$("#txtCaptcha").focus();
    	    }else{
        	    var msg = "";
        	}
        	
        	if(msg != ""){
        	    $('#inquiry_msg').show();
        	    $('#inquiry_msg').text(msg);
        	    return false;
        	}else{
        	    $('#inquiry_msg').hide();
        	    $('#inquiry_msg').text(" ");
        	    
        	 $.ajax({                 
                    url:'sendingmail.php',
                    type:'POST',
                    data:$('#product_inquiry_frm').serialize(),
                    success:function(result){
                        var message = '<b>Your mail has been successfully sent!<b>';
                          
                        $('#inquiry_success_popup').css('visibility','visible');
                        $('#inquiry_success_popup').css('opacity','1');
                        $('.inquiry_popup .content').html(message);
                         $('#product_inquiry_frm')[0].reset();
                         
                        Captcha(); 
                        
                    }
                                
	            });
        	}
        	
        	 return true;
        	
        });
        
        $( '#contact_form_submit' ).on( 'click', function( event ){
             event.preventDefault();
             
        	var name = $.trim($("#input_name").val());
        	var email = $.trim($("#input_email").val());
        	var subject = $.trim($("#input_subject").val());
        	var txtMessage = $.trim($("#textarea_message").val());
            
            var captcha_txt = $('#txtCaptcha').val();
            
            var string1 = removeSpaces(document.getElementById('mainCaptcha').value);
            var string2 = removeSpaces(document.getElementById('txtCaptcha').value);
            
            var filter = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
            
        	if(name.length === 0){
        		var msg = "Please enter name.";
        		$("#input_name").focus();
        	}else if(email.length === 0 || !filter.test(email)){
        		var msg = "Please enter email.";
        		$("#input_email").focus();
            }else if(subject.length === 0){
        		var msg = "Please enter subject.";
        		$("#input_subject").focus();
        	}else if(txtMessage.length === 0){
        		var msg = "Please enter message.";
        		$("#textarea_message").focus();
        	}else if(string2.length === 0){
        	    var msg = "Please enter captcha.";
        		$("#txtCaptcha").focus();
    	    }else if(string2 != string1){
        	    var msg = "Code Verification is wrong.";
        		$("#txtCaptcha").focus();
    	    }else{
        	    var msg = "";
        	}
        	
        	if(msg != ""){
        	    $('#contact_msg').show();
        	    $('#contact_msg').text(msg);
        	    return false;
        	}else{
        	    $('#contact_msg').hide();
        	    $('#contact_msg').text(" ");
        	    
        	 $.ajax({                 
                    url:'contact_sendingmail.php',
                    type:'POST',
                    data:$('#contact_frm').serialize(),
                    success:function(result){
                        var message = '<b>Your mail has been successfully sent!<b>';
                          
                        $('#contact_success_popup').css('visibility','visible');
                        $('#contact_success_popup').css('opacity','1');
                        $('.inquiry_popup .content').html(message);
                        $("#contact_frm")[0].reset();
                        Captcha(); 
                        
                    }
                                
	            });
        	}
        	
        	 return true;
        	
        });
        
	  
	  
		/* - Aegis Navigation */
		/* - Menu SubDropdown Toggle */
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			
			$('.aegis-navigation li.dropdown').click(function(e){
				if(!$(this).parent().hasClass('active')) {
					$('li.dropdown').removeClass('active');
					$(this).parent().addClass('active');
					e.preventDefault();
				} else {
					return true;
				} 
			});
		} 
		$(".menuswitch").on("click", function() {
			$(".navigation-menu").toggleClass("active");
		});
		
		/* - Menu Responsive Caret */
		$(".ddl-switch").on("click", function() {
			var li = $(this).parent();
			if ( li.hasClass("ddl-active") || li.find(".ddl-active").length !== 0 || li.find(".dropdown-menu").is(":visible") ) {
				li.removeClass("ddl-active");
				li.children().find(".ddl-active").removeClass("ddl-active");
				li.children(".dropdown-menu").slideUp();
			}
			else {
				li.addClass("ddl-active");
				li.children(".dropdown-menu").slideDown();
			}
		});
		
		/* - Sticky Navigation */
		var nav = $('.header_s');
		$(window).scroll(function () {
			if ($(this).scrollTop() > 120) {
				nav.addClass("navigation-fixed animated fadeInDown");
			} else {
				nav.removeClass("navigation-fixed animated fadeInDown");
			}
		});
		
		/* - Banner Slider */
		$('.bxslider').bxSlider({
			mode: 'fade',
			captions: true,
			auto:true,
		});
		
	});	/* - Document Ready /- */
	
	
	/* + Window On Resize */ 
	$( window ).on("resize",function() {
		var width	=	$(window).width();
		var height	=	$(window).height();
		
		menu_dropdown_open();
	});


	$(document).ready(function() {
		  $('.toggle-btn').click(function(){
			//get collapse content selector
			var collapse_content_selector = $(this).attr('href');

			//make the collapse content to be shown or hide
			var toggle_switch = $(this);
			$(collapse_content_selector).toggle(function(){
			  if($(this).css('display')=='none'){
                                //change the button label to be 'Show'
				toggle_switch.html('Show Technical Diagram');
			  }else{
                                //change the button label to be 'Hide'
				toggle_switch.html('Hide Technical Diagram');
			  }
			});
		  });

		});
})(jQuery);




