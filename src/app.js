function getScore(scores) {
  let sum = 0;
  for (let key in scores) {
    sum += scores[key];
  } 
  return sum;
}   

    let scores = {
      Anna: 10,
      Olga: 1,
      Ivan: 5,
    };
    
    console.log(
    getScore(scores)
    );
