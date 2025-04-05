

var notes = ["A", "Bb", "B", "C", "C#", "D", "Eb", "E", "F", "F#", "G", "G#"];

function transposeUp() {
  el = document.getElementById("transp");
  tv = parseInt(el.value);
  tv += 1;
  el.value = tv;
  transposeChords(tv);
}

function transposeDown() {
  el = document.getElementById("transp");
  tv = parseInt(el.value);
  tv += -1;
  el.value = tv;
  transposeChords(tv);
}

function buildChord(bases, mods, transpose) {
  res = "";
  nb = bases.length;
  for (var i=0; i<nb; i++) {
    if (i > 0) {
      res += "/";
    }
    var newbase = (parseInt(bases[i]) + transpose) % 12;
    if (newbase < 0) {
      newbase += 12;
    }
    res += notes[newbase] + mods[i];
  }
  return res;
}

function transposeChords(transpose) {
  allchords = document.getElementsByClassName("chordlist");
//  console.log(nc);
  for (var x=0; x<allchords.length; x++) {
      el = allchords[x];
//      console.log(el.id);
      var result = [];
      nc = 0;                   // last filled position in result
      chs = el.children;
      nch = chs.length;
//      console.log(x + " " + el.id + " " + nch);
      for (var y=0; y<nch; y++) { // loop over all chords in this line
        child = chs[y];
        bases = child.getAttribute("base").split(",");
        mods = child.getAttribute("mod").split(",");
        pos = parseInt(child.getAttribute("pos"));
        chord = buildChord(bases, mods, transpose);
        if (nc == 0) {
          cp = pos;
        } else {
          cp = Math.max(nc + 1, pos);    // we want at least one space between chords
        }
        while (nc < cp) {
          result.push(" ");
          nc += 1;
        }
        for (var i=0; i<chord.length; i++) {
          p = chord[i];
          result.push(p);
          nc += 1;
        }
      }
      for (var i=0; i<10; i++) {
        result.push(" ");
        nc += 1;
      }
      row = result.join("");
      dest = document.getElementById(el.id + "text");
      dest.innerText = row;
  }
}
