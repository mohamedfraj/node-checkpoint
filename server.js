var fs = require("fs")

function help() {
    console.log("node server.js --help \t\t\t\t\t for help")
    console.log("node server.js list \t\t\t\t\t to show the list of data")
    console.log('node server.js add --title your_title --body your_body \t to add a data note')
    console.log('node server.js read --title your_title \t\t\t to read a data note')
    console.log('node server.js remove --title your_title \t\t to remove a data note')
}

function list() {
    let fd = fs.readFileSync('data.json').toString()
    let data = JSON.parse(fd)
    console.log('printing', data.length, 'notes')

    for (const x of data) {
        console.log('-title:', x.Title, '\t- Body:', x.Body)
    }
}

function add() {
    let newdata = {}

    let indexTitle = process.argv.findIndex(el => el === '--title') // bech yverifi ken user kteb '--title' fel blasa el lezma, eli hiya win process.argv[3]... findIndex: ki tabda lement eli tlawej 3lih mawjoud yrajja3lek LINDEX mte3ou, w ken mech mawjoud yraja3lek '-1'
    if (indexTitle === -1 || typeof process.argv[indexTitle + 1] === 'undefined') {
        console.log('Missing required argument: --title')
        return
    }
    else newdata['Title'] = process.argv[indexTitle + 1]

    let indexBody = process.argv.findIndex(el => el === '--body')
    if (indexBody === -1 || typeof process.argv[indexBody + 1] === 'undefined') {
        console.log('Missing required argument: --body')
        return
    }
    else newdata['Body'] = process.argv[indexBody + 1]

    let data = JSON.parse(fs.readFileSync('data.json').toString())

    fs.writeFileSync('data.json', JSON.stringify(data.concat([newdata])))
}

read = () => {
    let title = ''

    let indexTitle = process.argv.findIndex(el => el === '--title')
    if (indexTitle === -1 || typeof process.argv[indexTitle + 1] === 'undefined') {
        console.log('Missing required argument: --title')
        return
    }
    else title = process.argv[indexTitle + 1]

    let data = JSON.parse(fs.readFileSync('data.json').toString())
    let datas = data.find(x => x.Title === title)
    if (datas) console.log('- Title:', datas.Title, '\t- Body:', datas.Body)
    else console.log('datas not found')
}

function remove() {
    let title = ''

    let indexTitle = process.argv.findIndex(el => el === '--title')
    if (indexTitle === -1 || typeof process.argv[indexTitle + 1] === 'undefined') {
        console.log('Missing required argument: --title')
        return
    }
    else title = process.argv[indexTitle + 1]
    let data = JSON.parse(fs.readFileSync('data.json').toString())
    let x = data.find(x => x.Title === title)
    data.splice(data.indexOf(data.find(x => x.Title === title)), 1);

    fs.writeFileSync('data.json', JSON.stringify(data))
    console.log('-Title:',x.Title,'-Body:', x.Body)
}



switch (process.argv[2]) {
    case '--help': help(); break;
    case 'list': list(); break;
    case 'add': add(); break;
    case 'read': read(); break;
    case 'remove': remove(); break;


}

if (process.argv.length < 3) help();