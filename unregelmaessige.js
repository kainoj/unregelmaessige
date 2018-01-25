$(document).ready(function() {

  // Verbs in JSON
  Verben = getVerben();

  // TODO(Przemek): Verbs permutation

  // Iterate through all verbs
  i = 0;
  setVerb(Verben[i])

  // Check if currently typed word is correctly spelled
  $("#praesens, #praeteritum, #perfekt").on("keyup", function() {
    // TODO(Przemek) But first... do sth with umlauts intput...

    praesens = $("#praesens").val() == Verben[i].praesens
    preateri = $("#praeteritum").val() == Verben[i].praeteritum
    perfekt  = $("#perfekt").val() == Verben[i].perfekt

    // Set input background color
    setCorrectColor("#praesens", praesens);
    setCorrectColor("#praeteritum", preateri);
    setCorrectColor("#perfekt", perfekt);

    // If verbs are correctly typed...
    if (praesens && preateri && perfekt) {
      // ...remove them
      $("#praesens").val("");
      $("#praeteritum").val("");
      $("#perfekt").val("");

      // ...remove colors
      removeColor("#praesens, #praeteritum, #perfekt");

      // ...set a new verb
      i++;
      if (i < Verben.length)
        setVerb(Verben[i]);
      else {
        // TODO(*) do sth with dat, it's lame
        alert("OMG YOU ARE AWESOME")
        location.reload();
      }
      // ...and set focus on "Präsens"
      $("#praesens").focus();
    }
  })
});

// Set "Infinitiv" field to given verb
function setVerb(verb) {
  $("#infinitiv").val(verb.infinitiv);
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
