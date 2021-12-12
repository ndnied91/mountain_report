//mod functions

function finalStr(str){
  let ret = ""
    for (let i =0 ; i < str.length; i++){
      if(str[i+1] !== undefined){
            if( str[i+1] === str[i+1].toUpperCase() && (!parseInt(str[i+1])) && str[i+1] !=='/'){
              ret = ret + str[i] + " "
             }
             else if(str[i] === 'n'){
              ret = ret + str[i] +" "
             }
            else{
              ret = ret + str[i]
            }
      }
      else{
        ret = ret + str[i]
      }
    }
    return ret
}

function cleanString(lifts){
  let str = ""
  for( let i =0 ; i < lifts.length; i++){
    let nums = [0,1,2,3,4,5,6,7,8,9]
     if(lifts[i] === '%'){ str = str + "" }

     else if(parseInt(lifts[i])){
        str = str + parseInt(lifts[i])
     }
      else if(lifts[i] === 't'  && nums.includes( parseInt(lifts[i-1])  ) ){
          str = str +  lifts[i].toUpperCase()
        }
        else if(lifts[i] === lifts[i].toUpperCase()){
          str = str + lifts[i]
        }

        else{
          str = str + lifts[i]}
        }
        return str
}

function cleaner(lifts, letter){ //just for removing duplicate words
  let str = '', count = 0
  lifts.split('').forEach((item, i) => {
    if(item === letter){ count++ }
    if(count > 1){ return str }
      else{ str = str + item }
  });
  return str
}

module.exports = { cube, cleanString, cleaner, finalStr };


//       const getBlue = async()=>{
//         return await rp('https://www.skibluemt.com/')
//           .then(function(htmlString){
//             const $ = cheerio.load(htmlString) // loads cheerio in this url so we can use it like jquery
//               let lifts = $("#trailliftsflex").children().text().toString().replace(/\t/g, '').replace(/\n/g ,'').replace(/ /g ,'').replace(/TrailsOpen/i, "Trails").replace(/LiftsOpen/i, "Lifts")
//               let i,j, temporary, chunk = 2 , data = [];
//                lifts = lifts.match(/[A-Z]+|[^a-z]+/gi);
//
//                for (i = 0,j = lifts.length; i < j; i += chunk) { data.push(lifts.slice(i, i + chunk)) }
//                  return ({"Blue Mountain": data })
//           })
//       }

// var foo = async function() {
//   console.log(await hi());
// };
//
// foo()


// var results = async function() {
//   return await getBlue()
// };
//
// results()
// console.log(results())
//
