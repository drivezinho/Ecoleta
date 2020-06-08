function populateUFs() {
    
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {

        for(const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

    })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    const ufValue = event.target.value

    const url =`https://servicodados.ibge.gov.br/api/v1/localidades/estados/33/municipios`

    const indexOfSelectState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectState].text

    citySelect.innerHTML="<option value>Seleciona a cidade</option>"
    citySelect.disabled = true

    fetch(url)
        .then( res => res.json() )
        .then( cities => {
            for(const city of cities){
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

   const itemsToCollect = document.querySelectorAll(".items-grid li")

   for (const item of itemsToCollect){
       item.addEventListener("click", handleSelectedItem)
   }

    const collectedItems = document.querySelector("input[name=items]")

    let selectedItems = []

function handleSelectedItem(event){

    console.log(event.currentTarget.dataset.id)
    const itemLi = event.currentTarget
    itemLi.classList.toggle("selected")
    const itemId = itemLi.dataset.id

    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId
        return itemFound
    })
        

    if( alreadySelected >= 0){
        const filteredItems = selectedItems.filter( item =>{
            const itemIsDiferrent = item != itemId
            return itemIsDiferrent
        })

        selectedItems = filteredItems
    }else{
        selectedItems.push(itemId)
    }
    console.log(selectedItems)
    collectedItems.value = selectedItems

}