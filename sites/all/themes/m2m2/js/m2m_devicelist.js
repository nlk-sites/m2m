var m2mmulttot = 0, m2mmultcount = 0;

function m2m_mult_fx(i, id) {
	var m2msel = jQuery('#'+id);
	if ( m2msel.data('m2msfx') != 'ready') {
		jQuery('.ui-multiselect-checkboxes:eq('+i+')').jScrollPane();
		m2msel.data('m2msfx', 'ready');
	}
}
function m2m_mult_created() {
	m2mmultcount++;
	if ( m2mmultcount == m2mmulttot ) m2m_mult_fx();
}

if((typeof view_type === 'undefined')) {
	var view_type = 'thumbs';
}
function toggle_devices(view_details) {
	if(view_details) {
		$('#device_details').show();
		$('#results').hide();
	} else {
		$('#device_details').hide();
		$('#results').show();
	}
}
function show_grid() {
	$('div.view-content').hide();
	$('div.view div.attachment').show();
	$('div.view div.attachment div.view-content').show();
	$('.grid-view').addClass('active');
	$('.list-view').removeClass('active');
	view_type = 'thumbs';
}
function hide_grid() {
	$('div.view div.attachment').hide();
	$('div.view-content').show();
	$('.grid-view').removeClass('active');
	$('.list-view').addClass('active');
	view_type = 'list';
}

(function($) {
	Drupal.behaviors.m2m_devicelist = function(context) {
    // initial scroll to top of menu
    if ( $('body').hasClass('front') ) {
      // dont scroll for now on front page? quickfix..
      $('html,body').addClass('scrolld');
      // unless htere was already some filtering going on..
      if ( location.search != '' ) {
        $('html,body').scrollTop(527);
      }
      // and make the Cellular Modules link scroll instead anyways
      $('#block-menu-primary-links .menu a:first').click(function() {
        var wscrollTop = $(window).scrollTop();
        if ( wscrollTop < 527 ) {
          $('html,body').animate({scrollTop: "527px"});
        }
        return false;
      });
    } else {
      $('html,body').addClass('scrolld').scrollTop(527);
    }
    
    // search form focus trick
    $('#edit-search-block-form-1').bind('focus', function() {
      $('#block-search-0').addClass('focusd');
      $(this).attr('placeholder','Search Modules');
    }).bind('blur', function() {
      $('#block-search-0').removeClass('focusd');
      $(this).attr('placeholder','').val('').prev().fadeIn('fast');
    });
    
		if ( $('.devicelist').size() > 0 ) {
      if ( $('body').hasClass('page-featured') == false ) {
        if(view_type == 'thumbs') {
          show_grid();
        } else {
          hide_grid();
        }
      }
      // expand/collapse filters too?
      if ( $('.views-exposed-form').size() > 0 ) {
        // first add trigger to check if the last submit should show..
        $('.views-exposed-widgets').bind('m2mcheckcollapsed',function() {
          if ( $(this).children(':not(.collapsed)').size() > 0 ) {
            $(this).addClass('hidesub');
          } else {
            $(this).removeClass('hidesub');
          }
        });
        
        $('.views-exposed-form > div > div:not(.mchkd)').each(function(i) {
          $(this).addClass('mchkd');
          if ( i == 0 ) {
            $(this).addClass('first');
          }
          var flabel = $(this).children(':first');
          var flnext = flabel.next();
          if ( flabel.is('label') ) {
            // functionality for check all/none & expand/collapse..
            flabel.wrap('<div class="flfx" />');
            var fcheckall = flabel.addClass('flabel').before('<input type="checkbox" name="'+ flabel.attr('for') +'" id="'+ flabel.attr('for') +'" />').prev().bind('change', function() {
              flnext.find('.bef-toggle').click();
            });
            var chksize = flnext.find(':checkbox').size();
            if ( chksize > 0 ) {
              if ( flnext.find(':checked').size() == chksize ) {
                fcheckall.attr('checked',true);
              }
            }
            flabel.siblings('input').bind('change', function(event) {
              if ( $(this).is(':checked') ) {
                $(this).parent().parent().removeClass('collapsed');//.siblings(':not(.views-submit-button)').addClass('collapsed');
              } else {
                $(this).parent().parent().addClass('collapsed');
              }
              // and check about last submit btn too..
              $(this).parents('.views-exposed-widgets').trigger('m2mcheckcollapsed');
            }).parent().bind('click', function(event) {
              $(this).parent().toggleClass('collapsed');
              // and check about last submit btn too..
              $(this).parents('.views-exposed-widgets').trigger('m2mcheckcollapsed');
            });
            flnext.append('<input type="submit" value="Apply Filter" class="form-submit apply" />');
            
            if ( flnext.find('input:checked').size() == 0 ) {
              $(this).addClass('collapsed');
            }
            
            if ( flnext.find('input:checkbox').size() > 8 ) {
              $(this).addClass('scrollem');
            }
          } else {
            // the last one..
            $(this).addClass('collapsed');
          }
        });
        
        // and check about last submit btn too..
        $('.views-exposed-widgets').trigger('m2mcheckcollapsed');
      }
		}
    
    // expand/collapse for ABOUT block(s) ?
    var m2mablock = $('.aboutblock');
    if ( m2mablock.size() > 0 ) {
      m2mablock.find('.opener a, .closer a').click(function() {
        $('body').toggleClass('closedabout');
        return false;
      });
    }
    
    // some device details magics :
    // cant figure out setting menu active so another temp quickfix..
    if ( $('body').hasClass('node-type-device') ) {
      $('#block-menu-primary-links a.item_cellular').addClass('active').parent().addClass('active-trail');
      $('.group-product-details > div > div:even').addClass('stripe');
    }
    if ( $('body').hasClass('node-type-connectivity-module') ) {
      $('#block-menu-primary-links a.item_connectivity').addClass('active').parent().addClass('active-trail');
      $('.group-product-details > div > div:even').addClass('stripe');
    }
    if ( $('body').hasClass('node-type-featured-product') ) {
      $('#block-menu-primary-links a.item_featured').addClass('active').parent().addClass('active-trail');
      $('.group-product-details > div > div:even').addClass('stripe');
    }
    if ( $('body').hasClass('node-type-router') ) {
      $('#block-menu-primary-links a.item_wireless').addClass('active').parent().addClass('active-trail');
      $('.group-product-details > div > div:even').addClass('stripe');
    }
	};
})(jQuery);