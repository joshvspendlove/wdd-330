var url = "https://eloquentjavascript.net/author"
var jsonRequest = {method:"GET",headers: {
      'Accept': 'application/json'}}
var textRequest = {method:"GET",headers: {
      'Accept': 'text/plain'}}
var htmlRequest = {method:"GET",headers: {
      'Accept': 'text/html'}}
var specialRequest = {method:"GET",headers: {
      'Accept': 'application/rainbows+unicorns'}}

fetch(url,jsonRequest).then(jresponse => jresponse.text()).then(jcontent => {console.log(jcontent)})
fetch(url,textRequest).then(tresponse => tresponse.text()).then(tcontent => {console.log(tcontent)})
fetch(url,htmlRequest).then(hresponse => hresponse.text()).then(hcontent => {console.log(hcontent)})
fetch(url,specialRequest).then(sresponse => sresponse.text()).then(scontent => {console.log(scontent)})