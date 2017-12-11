const electron = require('electron')
const url = require('url')
const path = require('path')


const app = electron.app
const BrowserWindow = electron.BrowserWindow

const Menu = electron.Menu

const ipc = electron.ipcMain
//Listen for app to be ready
let mainWindow;
let addWindow;

app.on('ready', function(){
   //console.log("electron running!")
   mainWindow = new BrowserWindow({})

   mainWindow.loadURL(`file://${__dirname}/index.html`);

   mainWindow.on('closed', function(){
    console.log('closed');
    mainWindow = null
})

   const menu = Menu.buildFromTemplate(template);
   Menu.setApplicationMenu(menu)


   
})
//Handle create add window function
function createAddWindow(){
    addWindow = new BrowserWindow({
        width: 300,
        height:200,
        title:'Add Shopping List Item'
    })
    
       addWindow.loadURL(`file://${__dirname}/addWindow.html`)
       addWindow.on('close',function(){
           addWindow = null;
       })   
}
ipcMain.on('item:add',function(e, item){
    mainWindow.webContents.send('item:add', item)
    addWindow.close();
})

const template = [
    {
        label: electron.app.getName(),
        submenu: [
            
            {label: 'Open File',
            click(){
                click: _=>{
                    app.openfile();
                    app.readfile();
                },
            
            {label: 'Add new item',
            click(){
                createAddWindow()
                }
            },{ type:'separator'},
            {label: 'Clear all items',
            click(){
                mainWindow.webContents.send('item:clear')
            }

            },{type:'separator'},
            {label: 'Quit',
            click: _=>{
                app.quit()
            },
            accelerator: 'Ctrl+Q'}
            

        ]
    },{
        label: "Dev Tools",
        click: function(item, focusedWindow){
            focusedWindow.toggleDevTools()
        },
        accelerator: 'ctrl+i'
    },
    {
        role: 'reload'
    }
]




    





