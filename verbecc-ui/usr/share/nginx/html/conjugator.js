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
    else if (lang == 'ca') {
        title = 'Conjugaci\u00f3 verbal catalana'
        credits = 'Fet amb ';
        conjugate = 'Conjugat';
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
    $.each(xrmap, function (k, v) {
        s = s.replace(k, v);
    });
    return s;
}

function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

//all possible pronoun conjugations
//(ignoring subjunctive, since that always come before)
//note: reflexive first to avoid matching non-reflexive
//also plural first, for same reason (e.g. "vosotros" vs. "vos")

pronounListFr = [];
pronounListFr = pronounListFr.concat(["je me", "tu te", "il se", "elle se", "on se", "nous nous", "vous vous", "ils se", "elles se"]);
pronounListFr = pronounListFr.concat(["je m'", "tu t'", "il s'", "elle s'", "on s'", "ils s'", "elles s'"]);
pronounListFr = pronounListFr.concat(["ils", "elles", "je", "j'", "tu", "il", "elle", "on", "nous", "vous"]);

pronounListEs = []
pronounListEs = pronounListEs.concat(["yo me", "tú te", "vos te", "él se", "ella se", "usted se", "nosotros nos", "vosotros vos", "ellos se", "ellas se", "ustedes se"]);
pronounListEs = pronounListEs.concat(["ellos", "ellas", "ustedes", "yo", "tú", "él", "ella", "usted", "nosotros", "vosotros", "vos"]);

pronounListCa = []
pronounListCa = pronounListCa.concat(["jo me", "tu te", "ell se", "ella se", "nosaltres nos", "vosaltres os", "ells se", "elles se"]);
pronounListCa = pronounListCa.concat(["ells", "elles", "jo", "tu", "ell", "ella", "nosaltres", "vosaltres"]);

pronounListIt = []
pronounListIt = pronounListIt.concat(["io mi", "tu ti", "lui si", "lei si", "noi ci", "voi vi", "loro si"]);
pronounListIt = pronounListIt.concat(["io", "tu", "lui", "lei", "noi", "voi", "loro"]);

pronounListPt = []
pronounListPt = pronounListPt.concat(["eu me", "tu te", "ele se", "ela se", "você se", "nós nos", "vós vos", "eles se", "elas se", "vocês se"]);
pronounListPt = pronounListPt.concat([ "eles", "elas", "vocês", "eu", "tu", "ele", "ela", "você", "nós", "vós"]);

pronounListRo = []
pronounListRo = pronounListRo.concat(["eu mă", "tu te", "el se", "ea se", "noi ne", "voi vă", "ei se", "ele se"]);
pronounListRo = pronounListRo.concat(["eu", "tu", "ele", "el", "ea", "noi", "voi", "ei"]);

langPronounsDict = {
    "fr": [],
    "es": [],
    "ca": [],
    "it": [],
    "pt": [],
    "ro": []
}
langPronounsDict["fr"] = pronounListFr;
langPronounsDict["es"] = pronounListEs;
langPronounsDict["ca"] = pronounListCa;
langPronounsDict["it"] = pronounListIt;
langPronounsDict["pt"] = pronounListPt;
langPronounsDict["ro"] = pronounListRo;

// extracts the pronoun portion from the full verb conjugation
// leaves the helping verb (if present) with the conjugation
// keeps subjective relative pronoun (e.g. "que"/"quando") (if present)
// e.g.
// - es: "yo soy" -> "yo"
// - fr: "j'ai" -> "j'"
// - fr: "je me suis levée" -> "je me"
// - fr: "que nous nous levassions" -> "que nous nous" 
// - fr: "tu t'es levée" -> "tu t'"
// - es: "él sea" -> "él"  (must not match "él se")
// - it: "che lui sia" -> "che lui" (must not match "lui si")
// - es: "por sermos nós" -> "nós" 
// - pt: "quando vós vos eterizardes" -> "quando vós vos"
//
// TODO: The current implementation is overly complex and will be 
// replaced once aux verb stem is added to the verbecc conjugation data.
function extractPronounConjugation(s, pronoun) {
    var ret = ""; //default is no pronoun
    var pronouns = langPronounsDict[_lang];
    for (let idx in pronouns) {
        var p = pronouns[idx];
        var pronounApostrophe = pronoun.slice(0, -1) + "'";
        // Ignore p unless it matches pronoun
        if (!p.includes(pronoun) && !p.includes(pronounApostrophe)) {
            continue;
        }
        // If s ends with p, then we simply return p
        // E.g. "por sermos nós" -> "nós" 
        if (s.endsWith(p)) {
            return p;
        }
        // Otherwise, extraction is bit more complicated
        var pronoun_idx = s.lastIndexOf(p);
        if (pronoun_idx != -1) {
            // "che lui sia" -> "che lui" (must not match "lui si")
            // So if p ends with "i", subsequent char must be space
            if (p.slice(-1) == "i" && s[pronoun_idx + p.length] != ' ') {
                continue;
            }
            // "él sea" -> "él"  (must not match "él se")
            // So if p ends with "e", subsequent char must be space
            if (p.slice(-1) == "e" && s[pronoun_idx + p.length] != ' ') {
                continue;
            }
            // Avoid matching "on" in "levon" or "vous" in "levez-vous"
            // So ignore the match unless at start of string or preceded by space (1) or apostrophe (2)
            // e.g. (1) "quando vós vos"
            // e.g. (2) "qu'il se"
            if (pronoun_idx != 0) {     
                let prevChar = s[pronoun_idx - 1];        
                if (!prevChar in [" ", "'",]) {
                    continue;
                } 
            }

            return s.slice(0, pronoun_idx + p.length);
        }
    }
    return ret;
}

function gen_conjugation(verb_info, conjugation) {
    var gender_class = "";
    if ("g" in conjugation) {
        gender_class += " ";
        if (conjugation["g"] == "m") {
            gender_class += "gender-masculine";
        } else {
            gender_class += "gender-feminine";
        }
    }
    let stems = [];
    let endings = [];
    var conjugatedPronoun = "";
    //iterate through the primary conjugation and one or more alterates
    for (var i=0; i<conjugation["c"].length; ++i) {
        var c = conjugation["c"][i]; //e.g. "je me suis levée"
        let stem = verb_info['stem'] //e.g. 'l' or 'parl' or empty (if irregular)
        var ending = c; // ending defaults to entire conjugation
        var pronounLast = false; // e.g. "por sermos nós"

        if (c != "-") {
            if ("pr" in conjugation && conjugatedPronoun.length == 0) {
                conjugatedPronoun = extractPronounConjugation(c, conjugation["pr"]);
                if (conjugatedPronoun.length > 0) {
                    if (c.endsWith(conjugatedPronoun)) {
                        pronounLast = true;
                    } else {
                        console.log("does not end with pronoun");
                    }
                }
            }
            //first extract the conjugated pronoun e.g. "je me suis levée" -> "je me", "suis levée"
            //then split using stem, if applicable e.g. "suis levée" -> "suis l" and "evée"
            if (conjugatedPronoun.length > 0) {
                if (pronounLast) {
                    // e.g. "por sermos nós" -> "por sermos"
                    c = c.substring(0, c.lastIndexOf(conjugatedPronoun)).trim();
                } else {
                    // e.g. "je me suis levée" -> "suis levée"
                    c = c.substring(conjugatedPronoun.length).trim();
                }
            }

            ending = c; //ending defaults to the whole verb conjugation (except pronoun)
            if (stem.length > 0) {
                var stem_idx = c.lastIndexOf(stem);
                if (stem_idx != -1) {
                    ending = c.slice(stem_idx + stem.length);
                    //include helping verb w/ stem
                    stem = c.slice(0, stem_idx + stem.length).trim();
                }
            }
        }
        stems.push(stem);
        endings.push(ending);
    }
    

    var html = "<tr class=\"conjugation" + gender_class + "\">";
    var pronoun = "";
    if (conjugatedPronoun.length > 0) {
        pronoun = conjugatedPronoun
    }
    else if ("pr" in conjugation) {
        pronoun = "(" + conjugation["pr"] + ")";
    }
    var pronounHtml = "<div>" + pronoun + "</div>";
    var verbHtml = "<div>";
    for (var i=0; i<stems.length; ++i) {
        let stem = stems[i];
        let ending = endings[i];
        verbHtml += stem + "<span class=\"highlight\">" + ending + '</span>';
        if (i < (stems.length-1)) {
            verbHtml += ",&nbsp;";
        }
    }
    verbHtml += '</div>';
    html += "<td>";
    // show number only if pronoun not in conjugation
    if (!("p" in conjugation) && "n" in conjugation) {
        html += "[" + conjugation["n"] + "] ";
    } else {
        if (pronounLast) {
            // e.g. "por sermos nós" -> "por sermos" "nós"
            html += verbHtml;
        } else {
            // e.g. "je me suis levée" -> "je me" "suis levée"
            html += pronounHtml;
        }
    }
    html += "</td>";
    html += "<td>";
    if (pronounLast) {
        // e.g. "por sermos nós" -> "por sermos" "nós"
        html += pronounHtml;
    } else {
        // e.g. "je me suis levée" -> "je me" "suis levée"
        html += verbHtml;
    }
    html += "</td>";
    html += "</tr>";
    return html;
}

function gen_tense(verb_info, tense_name, tense_conjugation) {
    var html = '<div class="w3-container tense-wrapper">';
    html += '<div class="tense-label">' + capitalize(xr(tense_name)) + '</div>';
    html += '<table>';
    $.each(tense_conjugation, function (i) {
        conjugation = tense_conjugation[i]
        html += gen_conjugation(verb_info, conjugation)
    });
    html += '</table>';
    html += '</div>';
    return html;
}

function gen_mood(verb_info, mood_name, mood_conjugation) {
    var html = '<div class="w3-container mood-wrapper">';
    html += '<div class="mood-label"><h3>' +
        xr(mood_name).toUpperCase() + '</h3></div>';
    $.each(mood_conjugation, function (k, v) {
        html += gen_tense(verb_info, k, v);
    });
    html += '</div>';
    $('#conjugation_div').append(html);
}

function conjugate(verb) {
    $.getJSON(API_BASE_PATH + "/conjugate/" + _lang + "/" + verb,
        function (data) {
            $('#conjugation_div').html('');
            var verb_info = data['value']['verb'];
            if (verb_info['predicted']) {
                $('#conjugation_div').append('Unknown verb. Predicted conjugation: <br/>');
            }
            var moods = data['value']['moods'];
            $.each(moods, function (k, v) {
                gen_mood(verb_info, k, v);
            });
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            try {
                $('#conjugation_div').html(jqXHR.responseJSON.detail);
            }
            catch (err) {
                $('#conjugation_div').html("Failed to load conjugation");
            }
        })
}

function init_lang_select() {
    $.getJSON(API_BASE_PATH + "/supported-langs", function (data) {
        html = '<select id="lang_select">';
        $.each(data['value'], function (k, v) {
            html += '<option value="' + k + '">' + v + '</option>';
        });
        html += '</select>';
        $('#lang_select_div').html(html);
        $('#lang_select_div option[value=' + _lang + ']').attr('selected', 'selected');
        $('#lang_select').on('change', function () {
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
    setTimeout(function () {
        element.blur();  //actually close the keyboard
        // Remove readonly attribute after keyboard is hidden.
        element.removeAttr('readonly');
        element.removeAttr('disabled');
    }, 100);
}

$(function () {
    var url = new URL(window.location);
    var params = new URLSearchParams(url.search);
    if (params.get('lang') != null) {
        _lang = params.get('lang');
    }
    set_lang(_lang);
    init_lang_select();
    $('#conjugate_btn').click(function () {
        conjugate($('#verb_input').val());
    });
    $('#verb_input').change(function () {
        conjugate($(this).val());
        hideKeyboard($(this));
    });
    $("#verb_input").autocomplete({
        source: function (request, response) {
            var query = $("#verb_input").val();
            jQuery.get(API_BASE_PATH + "/search/infinitive/" + _lang + "/" + query,
                function (data) {
                    response(data.value);
                });
        },
        minLength: 1,
        select: function (event, ui) {
            conjugate(ui.item.value);
        }
    });
});