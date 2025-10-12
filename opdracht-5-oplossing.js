/* DOCENTENOPLOSSING – Bibliotheek */

/* =========================
   Superklasse: Product
   - Bevat gedeelde attributen voor alle producten (Boek/Dvd).
   - publicatieJaar via setter (moet > 1960).
   - productId is read-only (alleen getter).
========================= */
class Product {
  titel;            // publiek, mag rechtstreeks gelezen
  #publicatieJaar;  // privé, via setter bewaken dat jaar > 1960
  #productId;       // privé + read-only (alleen getter)

  constructor(titel, publicatieJaar, productId) {
    this.titel = titel;
    this.#productId = productId;      // read-only: geen setter voorzien
    this.setPublicatieJaar(publicatieJaar);
  }

  getProductId() {
    return this.#productId;
  }

  getPublicatieJaar() {
    return this.#publicatieJaar;
  }

  // Constraint: jaar moet groter zijn dan 1960
  setPublicatieJaar(jaar) {
    if (jaar > 1960) {
      this.#publicatieJaar = jaar;
    }
  }
}

/* =========================
   Subklasse: Boek
   - Erft titel/publicatieJaar/productId van Product.
   - Extra velden: auteur (publiek), paginas (privé met setter > 0).
   - super(...) roept de constructor van Product aan.
========================= */
class Boek extends Product {
  auteur;      // publiek
  #paginas;    // privé met setter

  constructor(titel, publicatieJaar, productId, auteur, paginas) {
    super(titel, publicatieJaar, productId); // altijd eerst super aanroepen
    this.auteur = auteur;
    this.setPaginas(paginas);                // constraint via setter
  }

  getPaginas() {
    return this.#paginas;
  }

  // Constraint: paginas > 0
  setPaginas(n) {
    if (n > 0) {
      this.#paginas = n;
    }
  }
}

/* =========================
   Subklasse: Dvd
   - Erft van Product.
   - Extra velden: regisseur (publiek), duurMinuten (privé met setter > 0).
========================= */
class Dvd extends Product {
  regisseur;      // publiek
  #duurMinuten;   // privé met setter

  constructor(titel, publicatieJaar, productId, regisseur, duurMinuten) {
    super(titel, publicatieJaar, productId);
    this.regisseur = regisseur;
    this.setDuurMinuten(duurMinuten);       // constraint via setter
  }

  getDuurMinuten() {
    return this.#duurMinuten;
  }

  // Constraint: duur > 0
  setDuurMinuten(minuten) {
    if (minuten > 0) {
      this.#duurMinuten = minuten;
    }
  }
}

/* =========================
   Lid
   - lidnummer is read-only (alleen getter).
   - boeteSaldo privé, wijzigen via krijgBoete()/betaalBoete().
   - geleendCount (teller) houdt bij hoeveel items het lid nu heeft (max 5).
   - Lenen/terugbrengen is bewust eenvoudig: enkel op basis van de teller.
========================= */
class Lid {
  naam;            // publiek
  #lidnummer;      // privé + read-only
  #boeteSaldo;     // privé
  #geleendCount;   // privé: aantal gelijktijdige leningen

  constructor(naam, lidnummer) {
    this.naam = naam;
    this.#lidnummer = lidnummer;  // read-only
    this.#boeteSaldo = 0;
    this.#geleendCount = 0;
  }

  getLidnummer() {
    return this.#lidnummer;
  }

  getBoeteSaldo() {
    return this.#boeteSaldo;
  }

  // Boete verhogen met een positief bedrag
  krijgBoete(bedrag) {
    if (bedrag > 0) {
      this.#boeteSaldo += bedrag;
      console.log("Nieuw boete saldo: " + this.#boeteSaldo);
    }
  }

  // Hele boete in één keer betalen (naar 0)
  betaalBoete() {
    this.#boeteSaldo = 0;
    console.log(this.naam + " heeft boete betaald");
  }

  // Lenen: enkel hoeveelheid tellen, geen specifieke items bijhouden
  leen(product) {
    if (this.#geleendCount >= 5) {
      console.log("Heeft al maximale aantal leningen");
      return;
    }
    this.#geleendCount++;
    console.log("Nieuw product geleend");
  }

  // Terugbrengen: gewoon 1 van de teller aftrekken als er iets geleend is
  brengTerug(product) {
    if (this.#geleendCount > 0) {
      this.#geleendCount--;
      console.log("Terug gebracht");
    } else {
      console.log("Had niets geleend");
    }
  }
}

/* =========================
   Bibliotheek
   - Houdt lijsten bij van producten en leden.
   - Simpele overzichten met for-lussen in standaardvorm.
========================= */
class Bibliotheek {
  naam;
  collectie;  // array van Product
  leden;      // array van Lid

  constructor(naam) {
    this.naam = naam;
    this.collectie = [];
    this.leden = [];
  }

  voegProductToe(product) {
    this.collectie.push(product);
    console.log("voegProductToe: " + this.naam);
  }

  registreerLid(lid) {
    this.leden.push(lid);
    console.log("registreerLid: " + this.naam);
  }

  toonCollectie() {
    console.log("toonCollectie bib " + this.naam);
    for (let i = 0; i < this.collectie.length; i++) {
      const p = this.collectie[i];
      console.log(p.titel);
    }
  }

  toonLeden() {
    console.log("toonLeden bib " + this.naam);
    for (let i = 0; i < this.leden.length; i++) {
      const l = this.leden[i];
      console.log(l.naam);
    }
  }
}

/* =========================
   Korte voorbeeldrun (optioneel voor docenten)
   - Laat zien dat de API eenvoudig is en logs uniform zijn.
========================= */
/*
const bib = new Bibliotheek("Stadsbibliotheek");
const b1 = new Boek("Clean Code", 2008, 101, "Robert C. Martin", 464);
const d1 = new Dvd("Inception", 2010, 202, "Christopher Nolan", 148);

bib.voegProductToe(b1);
bib.voegProductToe(d1);

const lid = new Lid("Mike", 5001);
bib.registreerLid(lid);

lid.leen(b1);
lid.leen(d1);
lid.krijgBoete(10);
lid.betaalBoete();
lid.brengTerug(b1);

bib.toonCollectie();
bib.toonLeden();
*/
