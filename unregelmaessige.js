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

    // Normalize input while typing
    $(':focus').val(normalize($(':focus').val()))

    praesens = $("#praesens").val() == Verben[i].praesens
    preateri = $("#praeteritum").val() == Verben[i].praeteritum
    perfekt  = $("#perfekt").val() == Verben[i].perfekt

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
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Returns word without capital letters and with replaced umlaut characters
function normalize(string) {
  return string
    .toLowerCase()
  	.replace("ae", "ä")
  	.replace("oe", "ö")
    .replace("ue", "ü")
    .replace("ś",  "ß"); // AltGr + s
//	.replace("ss", "ß") // "isst" vs. "aß" makes problem
}