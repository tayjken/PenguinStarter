var directoryPromise = d3.json("classData.json");
var getIMG = function(image){
    return "imgs/"+image.picture;
}

var quizMeans = function(penguin){
    var studentQuiz = penguin.quizes.map(function(quiz){
        return quiz.grade;
    })
    return d3.mean(studentQuiz).toFixed(2);
}

var hwMeans=function(penguin){
    var studentHw = penguin.homework.map(function(hw){
        return hw.grade;
    })
    return d3.mean(studentHw).toFixed(2)
}
var testMean = function(penguin){
    var studentTest=penguin.test.map(function(test){
        return test.grade;
    })
    return d3.mean(studentTest).toFixed(2)
}
var finalMean = function(penguin){
    var studentFinal = penguin.final.map(function(final){
        return final.grade;
    })
    return d3.mean(studentFinal).toFixed(2)
}
var clearTable = function(){
    d3.selectAll("tbody tr")
    .remove();
}
var drawTable = function(penguins){
    var rows = d3.select(" tbody")
    .selectAll("tr")
    .data(penguins)
    .enter()
    .append("tr");
    
     rows.append("td")
    .append("img")
    .attr("class","pict")
    .attr("src",getIMG);
    
    rows.append("td")
    .attr("class","quiz")
    .text(quizMeans);
    
    rows.append("td")
    .attr("class","hw")
    .text(hwMeans);
    
    rows.append("td")
    .attr("class","test")
    .text(testMean);
    
    rows.append("td")
    .attr("class","finalGrade")
    .text(finalMean);
};

var clearTab;e=function(){
    d3.selectAll("tbody tr")
    .remove();
}

var initHeaders = function(penguins){
    d3.select("#finalGrade")
    .on("click",function(){
        console.log("clicked quiz");
        penguins.sort(function(a,b) {
            var av1 = finalMean(a);
            var av2 = finalMean(b);
            if (av1 < av2) {return 1;}
            else if (av1 > av2){return -1;}
            else {return 0;}
        });
        clearTable();
        drawTable(penguins)
        d3.selectAll(".finalGrade")
        .attr("class","selected");
    });
}

var successFCN = function(penguins){
   console.log("data",penguins);
    drawTable(penguins);
    initHeaders(penguins)
}

var failFCN=function(errMessage){
    console.log("failure", errMessage);
    d3.selectAll("h1")
    .text("File not found");
}
directoryPromise.then(successFCN,failFCN);