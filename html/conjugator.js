var xrmap = {
  'infinitive': 'INFINTIF',
  'indicative': 'INDICATIF',
  'imperative': 'IMPÉRATIF',
  'conditional': 'CONDITIONNEL',
  'subjunctive': 'SUBJONCTIF',
  'participle': 'PARTICIPE',
  'present': 'Présent',
  'imperfect': 'Imparfait',
  'future': 'Futur',
  'simple-past': 'Passé simple',
  'infinitive-present': 'Présent',
  'imperative-present': 'Présent',
  'present-participle': 'Présent',
  'past-participle': 'Passé'
}
function xr(s) {
  return xrmap[s];
}

function gen_tense(tense_name, tense) {
  var html = '<div class="w3-cell-row tense-wrapper">';
  html += '<div class="h-centered">' + xr(tense_name) + '</div>';
  $.each(tense, function(i, val) {
    html += val + '<br/>';
  });
  html += '</div>';
  return html;
}

function gen_mood(mood_name, mood) {
  var html = '<div class="w3-cell-row mood-wrapper">';
  html += '<div class="h-centered"><h3>' + xr(mood_name) + '</h3></div>';
  $.each(mood, function(tense_name, tense) {
    html += gen_tense(tense_name, tense);
  });
  html += '</div>';
  $('#conjugation_div').append(html);
}

function conjugate(verb) {
  $.getJSON("http://localhost:8000/conjugate/" + verb, 
    function(data) {
    $.each(data['value']['moods'], function(mood_name, mood) {
      gen_mood(mood_name, mood);
    });
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    $('#conjugation_div').html(jqXHR.responseJSON.detail);
  })
}

$(function() {
  $('#conjugate_btn').click(function() {
    conjugate($('#verb_input').val());
  });
  $('#verb_input').change(function() {
    conjugate($(this).val());
  })
});