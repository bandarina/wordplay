
export async function grabWord(){

 
    const word = await fetch('https://random-word-api.herokuapp.com/word?length=5').then(response => response.json()).then(response => response[0].split(''));
    
    return word;
}

export function isArrayInArray(arr, item){
    var item_as_string = JSON.stringify(item);
  
    var contains = arr.some(function(ele){
      return JSON.stringify(ele) === item_as_string;
    });
    return contains;
  }