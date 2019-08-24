var _lang = 'fr';

function set_lang(lang) {
  _lang = lang;
  //default: french
  var title = 'La conjugaison des verbes fran\u00e7ais';
  var credits = 'R\u00e9alis\u00e9 avec ';
  var conjugate = 'Conjuguer';
  if (lang == 'es') {
    title = 'La conjugaci\u00f3n de verbos en espa\u00f1ol';
    credits = 'Hecho con ';
    conjugate = 'Conjugar';
  }
  else if (lang == 'it') {
    title = 'Coniugazione di verbi italiani';
    credits = 'Fatto con ';
    conjugate = 'Coniugare';
  }
  else if (lang == 'pt') {
    title = 'Conjuga\u00e7\u00e3o de verbos em portugu\u00eas';
    credits = 'Feito com ';
    conjugate = 'Conjugar';
  } 
  else if (lang == 'ro') {
    title = 'Conjugarea verbelor rom\u00e2ne\u0219ti'
    credits = 'Facut cu ';
    conjugate = 'Conjuga';
  }
  document.title = title;
  $('#credits_span').text(credits);
  $('#conjugate_btn').val(conjugate)
  $('#conjugation_div').html('');
  $('#verb_input').val('');
}

var xrmap = {
  'plus que parfait': 'plus-que-parfait',
  'mais que perfeito': 'mais-que-perfeito'
}

function replacesDashes(s) {
  return s.replace(/-/g, ' ');
}

function xr(s) {
  s = replacesDashes(s);
  $.each(xrmap, function(k, v) {
    s = s.replace(k, v);
  });
  return s;
}

function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

function gen_tense(tense_name, tense) {
  var html = '<div class="w3-container tense-wrapper">';
  html += '<div class="h-centered">' + capitalize(xr(tense_name)) + '</div>';
  $.each(tense, function(i) {
    html += tense[i] + '<br/>';
  });
  html += '</div>';
  return html;
}

function gen_mood(mood_name, mood) {
  var html = '<div class="w3-container mood-wrapper">';
  html += '<div class="h-centered"><h3>' + 
    xr(mood_name).toUpperCase() + '</h3></div>';
  $.each(mood, function(k, v) {
    html += gen_tense(k, v);
  });
  html += '</div>';
  $('#conjugation_div').append(html);
}

function conjugate(verb) {
  $.getJSON("/vcfr/conjugate/" + _lang + "/" + verb, 
    function(data) {
    $('#conjugation_div').html('');
    if (data['value']['verb']['predicted']) {
      $('#conjugation_div').append('Unknown verb. Predicted conjugation: <br/>');
    }
    var moods = data['value']['moods'];
    $.each(moods, function(k, v) {
      gen_mood(k, v);
    });
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    $('#conjugation_div').html(jqXHR.responseJSON.detail);
  })
}

function init_lang_select() {
  $.getJSON("/vcfr/supported-langs", function(data) {
    html = '<select id="lang_select">';
    $.each(data['value'], function(k, v) {
      html += '<option value="'+ k + '">'+ v + '</option>';
    });
    html += '</select>';
    $('#lang_select_div').html(html);
    $('#lang_select_div option[value=' + _lang + ']').attr('selected','selected');
    $('#lang_select').on('change', function() {
      set_lang($(this).val());
    });
  });
}

$(function() {
  var url = new URL(window.location);
  var params = new URLSearchParams(url.search);
  if (params.get('lang') != null) {
    _lang = params.get('lang');
  }
  set_lang(_lang);
  init_lang_select();
  $('#conjugate_btn').click(function() {
    conjugate($('#verb_input').val());
  });
  $('#verb_input').change(function() {
    conjugate($(this).val());
  });
  $("#verb_input").autocomplete({
    source : function(request, response) {
      var query = $("#verb_input").val();
      jQuery.get("/vcfr/search/infinitive/" + _lang + "/" + query, 
        function(data) {
        response(data.value);
      });
    },
    minLength : 1,
    select: function(event, ui) {
      conjugate(ui.item.value);
    }
  });
});