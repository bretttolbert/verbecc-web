var _lang = 'fr';
API_BASE_PATH = '/verbecc';

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
  $("html").attr("lang", lang);
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

function gen_tense(verb_data, tense_name, tense) {
  var html = '<div class="w3-container tense-wrapper">';
  html += '<div class="tense-label">' + capitalize(xr(tense_name)) + '</div>';
  var stem = verb_data['stem']; //e.g. 'parl'
  $.each(tense, function(i) {
    t = tense[i]
    var stem_idx = t.lastIndexOf(stem)
    var beginning = t.substring(0, stem_idx + stem.length); //e.g. 'je parl'
    var ending = t.substring(stem_idx + stem.length);
    html += beginning + 
      "<span class=\"ending\">" + ending + '</span><br/>';
  });
  html += '</div>';
  return html;
}

function gen_mood(verb_data, mood_name, mood) {
  var html = '<div class="w3-container mood-wrapper">';
  html += '<div class="mood-label"><h3>' + 
    xr(mood_name).toUpperCase() + '</h3></div>';
  $.each(mood, function(k, v) {
    html += gen_tense(verb_data, k, v);
  });
  html += '</div>';
  $('#conjugation_div').append(html);
}

function conjugate(verb) {
  $.getJSON(API_BASE_PATH + "/conjugate/" + _lang + "/" + verb, 
    function(data) {
      $('#conjugation_div').html('');
      var verb_data = data['value']['verb'];
      if (verb_data['predicted']) {
        $('#conjugation_div').append('Unknown verb. Predicted conjugation: <br/>');
      }
      var moods = data['value']['moods'];
      $.each(moods, function(k, v) {
        gen_mood(verb_data, k, v);
      });
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    try {
      $('#conjugation_div').html(jqXHR.responseJSON.detail);
    }
    catch (err) {
      $('#conjugation_div').html("Failed to load conjugation");
    }
  })
}

function init_lang_select() {
  $.getJSON(API_BASE_PATH + "/supported-langs", function(data) {
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

/**
 * Hide mobile keyboard
 */
function hideKeyboard(element) {
    element.attr('readonly', 'readonly'); // Force keyboard to hide on input field.
    element.attr('disabled', 'true'); // Force keyboard to hide on textarea field.
    setTimeout(function() {
        element.blur();  //actually close the keyboard
        // Remove readonly attribute after keyboard is hidden.
        element.removeAttr('readonly');
        element.removeAttr('disabled');
    }, 100);
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
    hideKeyboard($(this));
  });
  $("#verb_input").autocomplete({
    source : function(request, response) {
      var query = $("#verb_input").val();
      jQuery.get(API_BASE_PATH + "/search/infinitive/" + _lang + "/" + query, 
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