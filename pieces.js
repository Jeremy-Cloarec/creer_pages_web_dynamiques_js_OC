
const pieces = await fetch("./pieces-autos.json").then(pieces => pieces.json())
const boutonTrier = document.querySelector(".btn-trier")
const boutonTrierDecroissant = document.querySelector(".btn-trier-decroissant")
const btnFiltrerDescription = document.querySelector(".btn-filtrer-description")
const boutonFiltrer = document.querySelector(".btn-filtrer")
const boutonRange = document.querySelector("#prix")
let afficherPrix = document.querySelector(".prixAffichee")

generatePieces(pieces)

// Trier par range
boutonRange.addEventListener("input", () => {
    genererPiecesDisponibles()
    genererPiecesAbordables()

    const newArray = pieces.filter(piece => piece.prix <= boutonRange.value)
    afficherPrix.setAttribute("value", boutonRange.value)
    document.querySelector(".fiches").innerHTML = ""
    generatePieces(newArray)
})

// Trier par ordre croissant
boutonTrier.addEventListener("click", () => {
    genererPiecesDisponibles()
    genererPiecesAbordables()

    const piecesOrdonnees = [...pieces]
    piecesOrdonnees.sort((a, b) => a.prix - b.prix)
    //On efface l'ecran
    document.querySelector(".fiches").innerHTML = ""
    // On regenere le tableau
    generatePieces(piecesOrdonnees)
})

//Trier decroissant
boutonTrierDecroissant.addEventListener("click", () => {
    genererPiecesDisponibles()
    genererPiecesAbordables()

    const piecesOrdonnees = [...pieces]
    piecesOrdonnees.sort((a, b) => a.prix + b.prix)
    //On efface l'ecran
    document.querySelector(".fiches").innerHTML = ""
    // On regenere le tableau
    generatePieces(piecesOrdonnees)
})

//filtrer pieces pas abordables
boutonFiltrer.addEventListener("click", () => {
    genererPiecesDisponibles()
    genererPiecesAbordables()

    const piecesFiltrees = pieces.filter((piece) => piece.prix >= 35)
    //On efface l'ecran
    document.querySelector(".fiches").innerHTML = ""
    // On regenere le tableau
    generatePieces(piecesFiltrees)
})

//Filtrer pièces avec description
btnFiltrerDescription.addEventListener("click", () => {
    genererPiecesDisponibles()
    genererPiecesAbordables()

    const pieceFiltreeDescription = pieces.filter(piece => piece.description)
    //On efface l'ecran
    document.querySelector(".fiches").innerHTML = ""
    // On regenere le tableau
    generatePieces(pieceFiltreeDescription)
})

function generatePieces(pieces) {
    genererPiecesDisponibles()
    genererPiecesAbordables()

    for (let i = 0; i < pieces.length; i++) {
        const article = pieces[i]
        const imageElement = document.createElement("img")
        imageElement.src = article.image
        const nomElement = document.createElement("h2")
        nomElement.innerText = article.nom
        const prixElement = document.createElement("p")
        prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€"})`
        const categorieElement = document.createElement("p")
        categorieElement.innerText = article.categorie ?? "(aucune categorie)"
        const descriptionElement = document.createElement("p")
        descriptionElement.innerText = article.description ?? "(Pas encore de description)"
        const isStock = document.createElement("p")
        isStock.innerText = `${article.disponibilite ? "En stock" : "Plus en stock"}`
        const constainerFiche = document.createElement("article")
        const sectionFiches = document.querySelector(".fiches")

        sectionFiches.appendChild(constainerFiche)
        constainerFiche.appendChild(imageElement)
        constainerFiche.appendChild(nomElement)
        constainerFiche.appendChild(prixElement)
        constainerFiche.appendChild(categorieElement)
        constainerFiche.appendChild(descriptionElement)
        constainerFiche.appendChild(isStock)
    }
}

function genererPiecesDisponibles() {
    const containerArticle = document.createElement("article")
    const disponibleElement = document.createElement("ul")
    const titleArticle = document.createElement("p")
    const sectionFiches = document.querySelector(".fiches")

    titleArticle.textContent = "Pièces dispo"

    const pieceDisponibles = pieces.filter(piece => piece.description)
    for (let i = 0; i < pieceDisponibles.length; i++) {
        const nomElement = document.createElement("li")
        nomElement.innerText = pieceDisponibles[i].nom
        disponibleElement.appendChild(nomElement)
    }

    containerArticle.appendChild(titleArticle)
    containerArticle.appendChild(disponibleElement)
    sectionFiches.appendChild(containerArticle)
}

function genererPiecesAbordables() {
    const containerArticle = document.createElement("article")
    const abordablesElement = document.createElement("ul")
    const titleArticle = document.createElement("p")
    const sectionFiches = document.querySelector(".fiches")

    titleArticle.textContent = "Pièces abordable"

    const piecesAbordables = pieces.filter(piece => piece.prix < 35)
    for (let i = 0; i < piecesAbordables.length; i++) {
        const nomElement = document.createElement("li")
        nomElement.innerText = ` ${piecesAbordables[i].nom} - ${piecesAbordables[i].prix} €`
        abordablesElement.appendChild(nomElement)
    }
    containerArticle.appendChild(titleArticle)
    containerArticle.appendChild(abordablesElement)
    sectionFiches.appendChild(containerArticle)
}



