let clicCoins = 0;
let gainParSeconde = 0;
let batiments = [];
let outils = [];
let intervalleAutoClic = null;
let vitesseClic = 1000; // Vitesse de clic de base
let multiplicateurPrix = 2; // Multiplicateur pour le prix des bâtiments

// Initialisation des bâtiments avec leur prix initial
batiments.push({ nom: "Mine de Charbon", cout: 10, revenu: 0.5, quantite: 0 });
batiments.push({ nom: "Mine de Cuivre", cout: 50, revenu: 1.5, quantite: 0 });
batiments.push({ nom: "Usine d'Acier", cout: 150, revenu: 2, quantite: 0 });
batiments.push({ nom: "Raffinerie d'Or", cout: 300, revenu: 4, quantite: 0 });
batiments.push({ nom: "Plantation de Diamants", cout: 500, revenu: 5, quantite: 0 });
batiments.push({ nom: "Forage de Pétrole", cout: 1000, revenu: 10, quantite: 0 });
batiments.push({ nom: "Mine de Platine", cout: 2000, revenu: 20, quantite: 0 });
batiments.push({ nom: "Usine de Semi-conducteurs", cout: 5000, revenu: 50, quantite: 0 });
batiments.push({ nom: "Usine de Satellites", cout: 10000, revenu: 100, quantite: 0 });
batiments.push({ nom: "Mine de Neutronium", cout: 50000, revenu: 500, quantite: 0 });

// Initialisation des outils
outils.push({ nom: "Pioche en Bois", cout: 10, vitesse: 900, disponible: true });
outils.push({ nom: "Pioche en Pierre", cout: 50, vitesse: 800, disponible: true });
outils.push({ nom: "Pioche en Fer", cout: 150, vitesse: 700, disponible: true });
outils.push({ nom: "Pioche en Or", cout: 300, vitesse: 600, disponible: true });
outils.push({ nom: "Pioche en Diamant", cout: 500, vitesse: 500, disponible: true });
outils.push({ nom: "Pioche en Rubis", cout: 1000, vitesse: 400, disponible: true });
outils.push({ nom: "Pioche en Émeraude", cout: 2000, vitesse: 300, disponible: true });
outils.push({ nom: "Pioche en Saphir", cout: 5000, vitesse: 200, disponible: true });
outils.push({ nom: "Pioche en Opale", cout: 10000, vitesse: 100, disponible: true });
outils.push({ nom: "Pioche en Adamantium", cout: 50000, vitesse: 1, disponible: true });

document.getElementById("clickButton").addEventListener("click", function() {
    clicCoins++;
    miseAJourClicCoins();
});

// Gestion de l'achat de bâtiments
const conteneurBatiments = document.getElementById("batiments");
for (let i = 0; i < batiments.length; i++) {
    const batimentElement = document.createElement("div");
    batimentElement.classList.add("batiment");
    batimentElement.innerHTML = `
        <span id="nomBatiment${i}" title="Coût : ${batiments[i].cout} 🪙 - Gain par seconde : ${batiments[i].revenu} 🪙">${batiments[i].nom}</span>
        <span id="quantiteBatiment${i}">${batiments[i].quantite}</span>
    `;
    batimentElement.addEventListener("click", function() {
        if (clicCoins >= batiments[i].cout) {
            clicCoins -= batiments[i].cout;
            batiments[i].quantite++;
            gainParSeconde += batiments[i].revenu;
            batiments[i].cout *= multiplicateurPrix; // Doubler le prix du bâtiment
            miseAJourClicCoins();
            // Démarrer les clics automatiques si un bâtiment est acheté
            demarrerAutoClic();
            // Mettre à jour la quantité affichée
            document.getElementById(`quantiteBatiment${i}`).innerText = batiments[i].quantite;
            // Mettre à jour le prix dans le titre
            document.getElementById(`nomBatiment${i}`).title = `Coût : ${batiments[i].cout} 🪙 - Gain par seconde : ${batiments[i].revenu} 🪙`;
        } else {
            alert("Pas assez de ClicCoins !");
        }
    });
    conteneurBatiments.appendChild(batimentElement);
}

// Gestion de l'achat d'outils
const conteneurOutils = document.getElementById("outils");
for (let i = 0; i < outils.length; i++) {
    const outilElement = document.createElement("button");
    outilElement.classList.add("bouton-outil");
    outilElement.innerText = `${outils[i].nom}`;
    outilElement.title = `Coût : ${outils[i].cout} 🪙 - frequence de click en ms${outils[i].vitesse}`;
    outilElement.addEventListener("click", function() {
        if (outils[i].disponible && clicCoins >= outils[i].cout) {
            clicCoins -= outils[i].cout;
            outils[i].cout = "Sold out"; // Mettre à jour le coût de l'outil
            miseAJourClicCoins();
            // Augmenter la vitesse de clic si un outil est acheté
            vitesseClic = outils[i].vitesse;
            
            // Arrêter l'autoclic s'il est en cours
            if (intervalleAutoClic !== null) {
                clearInterval(intervalleAutoClic);
                intervalleAutoClic = null;
                // Redémarrer l'autoclic avec la nouvelle vitesse
                demarrerAutoClic();
            }

            // Désactiver l'outil une fois qu'il est acheté
            outils[i].disponible = false;
            // Mettre à jour le texte du bouton
            outilElement.innerText = `${outils[i].nom} - ${outils[i].cout}`;
        } else if (!outils[i].disponible) {
            alert("Cet outil a déjà été acheté !");
        } else {
            alert("Pas assez de ClicCoins !");
        }
    });
    conteneurOutils.appendChild(outilElement);
}

function miseAJourClicCoins() {
    document.getElementById("clicCoins").innerText = clicCoins;
    document.getElementById("gainParSeconde").innerText = gainParSeconde;
}

function demarrerAutoClic() {
    if (intervalleAutoClic === null) {
        intervalleAutoClic = setInterval(function() {
            let totalGain = 0;
            for (let j = 0; j < batiments.length; j++) {
                totalGain += batiments[j].revenu * batiments[j].quantite;
            }
            clicCoins += totalGain;
            miseAJourClicCoins();
        }, vitesseClic);
    }
}
