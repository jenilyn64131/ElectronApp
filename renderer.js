var app = require('electron').remote 
var dialog = app.dialog
var fs = require('fs')

const electron = require('electron')
const ipc = electron.ipcRenderer
const ul = document.querySelector('ul')

document.getElementById('open').addEventListener('click', openfile)

function openfile(){
    dialog.showOpenDialog((filenames) =>{
        if(filenames === undefined){
            alert("no files were selected")
            return;    
        }
        readFile(filenames[0]);
    })
}

function readFile(filepath){
   fs.readFile(filepath, 'utf-8', (err, data)) =>{
       if(err){
           alert("There was an error retrieving your file")
           return;
       }
       var textArea = document.getElementById('output')
       textArea.value = data
   }

ipcRenderer.on('item:add', function(e, item){
    const li = document.createElement('li')
    const itemText = document.createTextNode(item)
    li.appendChild(itemText)
    ul.appendChild(li)
}) 

ipcRenderer.on('item:clear', function(){
    ul.innerHTML = ''
}) 
ul.addEventListener('dblclick', removeItem)

function removeItem(e){
    e.target.remove()
}

const form = document.querySelector('form')
form.addEventListener('submit', submitForm)
function submitForm(e){
    e.preventDefault();
    const item = document.querySelector('#item').value
    ipcRenderer.sent('item:add')
}
document.getElementById('btn').addEventListener('click', saveFile)
function saveFile(){
    dialog.showSaveDialog((filename)=>{
        if (filename === undefined){
            alert("You didn't enter in a file name!")
            return;
        }
        var content = document.getElementById('content').value

        fs.writeFile(filename, content, (err)=>{
            if (err) console.log(err)
            alert("The file has been saved successfully!")
        })

    })
}
