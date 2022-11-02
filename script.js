let Save = document.getElementById("Save")
let myLeads = []
let oldLeads = []
const Input = document.getElementById("Input") 
const Unordered = document.getElementById("Unordered")
let DeleteButton = document.getElementById("DeleteButton")
let Delete = document.getElementById("Delete")
let SaveTab = document.getElementById("SaveTab")

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads",))
console.log(leadsFromLocalStorage)

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

SaveTab.addEventListener("click",function() {
    chrome.tabs.query({active:true,currentWindow: true},function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render(myLeads)
    })
})

function render(leads) {
    let ListItems = ""
for (let i = 0; i < leads.length; i += 1) {
    //ListItems += "<li><a href=' " + myLeads[i] + "' target='_blank'>" + myLeads[i] +"</a></li>" 
    ListItems += `<li><a href="${leads[i]}" target="_blank">
    ${leads[i]}
    </a>
    </li>`

}
Unordered.innerHTML = ListItems  
}


Delete.addEventListener("dblclick", Clear)

function Clear() {
    localStorage.clear()
    myLeads = []
    console.log("Dümbülü")
    render(myLeads)
}

Save.addEventListener("click", saveLoad)

function saveLoad() {
    myLeads.push(Input.value)
    Input.value = ""

    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    JSON.stringify(myLeads)

    render(myLeads)
    console.log(localStorage.getItem("myLeads"))
}