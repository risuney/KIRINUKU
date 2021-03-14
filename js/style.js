$('label').on('click', function(){
  $('label').removeClass('is-active');
  $(this).addClass('is-active');
});

$('#radius').on('keyup', function(){
  var txt = $(this).val();
  if ( 4 <txt.length ) {
    $(this).val(txt.substr(0,4));
  }
});

$(document).on('click', '#dark', function(){
  $('div.canvas-area').addClass('is-dark');
  $(this).attr('id', 'light');
  $('#tdark').addClass('hidden');
  $('#tlight').removeClass('hidden');
});

$(document).on('click', '#light', function(){
  $('div.canvas-area').removeClass('is-dark');
  $(this).attr('id', 'dark');
  $('#tlight').addClass('hidden');
  $('#tdark').removeClass('hidden');
});

$('#ron').on('click', function(){
  $('#ron-o').removeClass('hidden');
  $('#ron-o').addClass('inline');
});

$('#cir, #ios').on('click', function(){
  $('#ron-o').addClass('hidden');
  $('#ron-o').removeClass('inline');
});
