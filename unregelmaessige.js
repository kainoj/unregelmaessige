$(document).ready(function() {

  // Verbs in JSON
  Verben = getVerben();

  // #verbs
  v = Verben.length

  // Get random verb
  i = rand(0, v);
  setVerb(Verben[i])

  // Check if currently typed word is correctly spelled
  $("#praesens, #praeteritum, #perfekt").on("keyup", function() {
    // TODO(Przemek) But first... do sth with umlauts intput...

    praesens = $("#praesens").val().toLowerCase() == Verben[i].praesens
    preateri = $("#praeteritum").val().toLowerCase() == Verben[i].praeteritum
    perfekt  = $("#perfekt").val().toLowerCase() == Verben[i].perfekt

    // Set input background color
    setCorrectColor("#praesens", praesens);
    setCorrectColor("#praeteritum", preateri);
    setCorrectColor("#perfekt", perfekt);

    // Mobile experience: when verb is spelled correctly then focus next input
    if (praesens && $("#praesens").is(":focus"))
      $("#praeteritum").focus();
    if (preateri && $("#praeteritum").is(":focus"))
      $("#perfekt").focus();

    // If verbs are correctly typed...
    if (praesens && preateri && perfekt) {
      // ...remove them
      $("#praesens").val("");
      $("#praeteritum").val("");
      $("#perfekt").val("");

      // ...remove colors
      removeColor("#praesens, #praeteritum, #perfekt");

      // ...set a new verb
      i = rand(0, v);
      setVerb(Verben[i]);

      // ...and set focus on "Präsens"
      $("#praesens").focus();
    }
  })
});

// Set "Infinitiv" field to given verb
function setVerb(verb) {
  $("#infinitiv").val(verb.infinitiv);

  $("#ansinfi").html(verb.infinitiv);
  $("#anspres").html(verb.praesens);
  $("#anspret").html(verb.praeteritum);
  $("#ansperf").html(verb.perfekt);
}

// Sets background color of a typed verb
// I've heard that passing bool as function parameter
// is lame, but...
function setCorrectColor(verb, isok = false) {
  if (isok)
    $(verb).css("background-color", "palegreen");
  else
    $(verb).css("background-color", "");
}

// Removes background color of input if word is mistyped
function removeColor(verb) {
  $(verb).css("background-color", "");
}

// Returns random number in [min, max)
function rand(min, max) {
  return min + Math.floor(Math.random()*100000000)%(max-min);
}
