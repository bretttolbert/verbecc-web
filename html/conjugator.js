var xrmap = {
  'plus que parfait': 'plus-que-parfait'
}

function replacesDashes(s) {
  return s.replace(/-/g, ' ');
}

function xr(s) {
  s = replacesDashes(s);
  if (xrmap.hasOwnProperty(s)) {
    return xrmap[s];
  } else {
    return s;
  }
}

function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

function gen_tense(tense_name, tense) {
  var html = '<div class="w3-container tense-wrapper">';
  html += '<div class="h-centered">' + capitalize(xr(tense_name)) + '</div>';
  for (var i=0; i<tense.length; ++i) {
    html += tense[i] + '<br/>';
  }
  html += '</div>';
  return html;
}

function gen_mood(mood_name, mood) {
  var html = '<div class="w3-container mood-wrapper">';
  html += '<div class="h-centered"><h3>' + 
    xr(mood_name).toUpperCase() + '</h3></div>';
  for (var key in mood) {
    if (mood.hasOwnProperty(key)) {
      html += gen_tense(key, mood[key]);
    }
  }
  html += '</div>';
  $('#conjugation_div').append(html);
}

function conjugate(verb) {
  $.getJSON("/vcfr/conjugate/" + verb, 
    function(data) {
    $('#conjugation_div').html('');
    var moods = data['value']['moods'];
    for (var key in moods) {
      if (moods.hasOwnProperty(key)) {
        gen_mood(key, moods[key]);
      }
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
  });
  $("#verb_input").autocomplete({
    source : function(request, response) {
      var query = $("#verb_input").val();
      jQuery.get("/vcfr/search/infinitive/" + query, 
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