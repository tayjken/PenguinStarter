var directoryPromise = d3.json("classData.json");
var getIMG = function(image){
    return "imgs/"+image.picture;
}

var quizMeans = function(penguin){
    //array of quiz grades
    var studentQuiz = penguin.quizes.map(function(quiz){
        return quiz.grade;
    })
    return d3.mean(studentQuiz).toFixed(2);
}

var hwMeans=function(penguin){
    //map selects grades out of the group of objects in the hw array
    var studentHw = penguin.homework.map(function(hw){
        return hw.grade;
    })
    //takes the hw grades and returns the mean
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
var clearTable=function(){
    d3.selectAll("tbody tr")
    .remove();
}

var successFCN = function(penguins){
    console.log(penguins);
    
    var rows=d3.select("tbody")
    .selectAll("tr")
    .data(penguins)
    .enter()
    .append("tr")
    
    rows.append("td")
    .append("img")
    .attr("src",getIMG);
    
    rows.append("td")
    .text(quizMeans);
    
    rows.append("td")
    .text(hwMeans);
    
    rows.append("td")
    .text(testMean);
    
    rows.append("td")
    .attr("class","finalGrade")
    .text(finalMean);
}

var failFCN=function(errMessage){
    console.log("failure", errMessage);
    d3.selectAll("h1")
    .text("File not found");
}
directoryPromise.then(successFCN,failFCN);