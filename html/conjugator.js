var xrmap = {
  'infinitive': 'INFINTIF3',
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
  var html = '<div class="w3-container tense-wrapper">';
  html += '<div class="h-centered">' + xr(tense_name) + '</div>';
  for (var i=0; i<tense.length; ++i) {
    html += tense[i] + '<br/>';
  }
  html += '</div>';
  return html;
}

function gen_mood(mood_name, mood) {
  var html = '<div class="w3-container mood-wrapper">';
  html += '<div class="h-centered"><h3>' + xr(mood_name) + '</h3></div>';
  for ([key, value] of Object.entries(mood)) {
    html += gen_tense(key, value);
  }
  html += '</div>';
  $('#conjugation_div').append(html);
}

function conjugate(verb) {
  $.getJSON("/conjugate/" + verb, 
    function(data) {
    $('#conjugation_div').html('');
    for ([key, value] of Object.entries(data['value']['moods'])) {
      gen_mood(key, value);
    }
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