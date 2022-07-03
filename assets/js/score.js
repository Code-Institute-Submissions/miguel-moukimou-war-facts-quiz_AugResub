$(document).ready(function () {
    var questionAnswer = {
        ww1start: "1914-1918",
        pandemic: "spanishflu",
        head_protectection: "Hats",
        indians: "50000"
    };

    var score = 0;
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }

    console.log(vars);

    if(questionAnswer.ww1start == vars["ww1start"]){
        score += 1;
    }
    if(questionAnswer.pandemic == vars["pandemic"]){
        score += 1;
    }
    if(questionAnswer.head_protectection == vars["head_protectection"]){
        score += 1;
    }
    if(questionAnswer.indians == vars["indians"]){
        score += 1;
    }
    sessionStorage.setItem("score", score);
    $("#score").text(score+" of 4 answers were correct.")
});