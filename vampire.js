class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampire = this;

    // climb "up" the tree (using iteration), counting nodes, until no vampire is found
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampires++;
    }

    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal);
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(vampName) {
    
    // Base Case
    if(this.name === vampName) {
      return this;
    } 
    
    // Recursive Case - Mentor Help - Justin Chan
    let output = null;

    for (let i = 0; i < this.offspring.length && output === null ; i++) {
      output = this.offspring[i].vampireWithName(vampName);
    } 
    
    return output;
    
  }

  // Returns the total number of vampires that exist
  // Similar to durian example
  get totalDescendents() {
    let totalVampires = 0; // 1

    // Adds descendants for 'this' vampire
    totalVampires += this.offspring.length;
    
    // Adds descendants to all offspring and also counts them in totalVampires
    for (const offspring of this.offspring) { 
      totalVampires += offspring.totalDescendents; 
    }

    return totalVampires;
  }

  // Returns an array of all the vampires that were converted after 1980
  // Similar to durian example
  get allMillennialVampires() {
    
    let millenials = []; // 1

    if (this.yearConverted > 1980) {
      millenials.push(this); // 2
    }

    for (const offspring of this.offspring) {
      const millenialOffspring = offspring.allMillennialVampires; // 3
      millenials = millenials.concat(millenialOffspring);
    }

    return millenials;

  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    
    let originalVampire = this;
    let thisParentsName = [];
    let thisParents = [];

    let comparisonVampire = vampire;
    let vampireParentsName = [];
    let vampireParents = [];

    // Moves up the tree and populates an array with all parents
    while (comparisonVampire.creator) {
      vampireParentsName.push(comparisonVampire.creator.name);
      vampireParents.push(comparisonVampire.creator);
      comparisonVampire = comparisonVampire.creator;
    }

    // Same as above but for this
    while (originalVampire.creator) {
      thisParentsName.push(originalVampire.creator.name);
      thisParents.push(originalVampire.creator);
      originalVampire = originalVampire.creator;
    }

    if (this === vampire) { // Same
      return this;
    } else if (!this.creator) { // this is root vampire
      return this;
    } else if (!vampire.creator) { // Parameter vampire is root vampire
      return vampire;
    } else if (this.numberOfVampiresFromOriginal === 1 && vampire.numberOfVampiresFromOriginal === 1) { // Both are offspring of root vampire
      return this.creator;
    } else if (this === vampire.creator) { // Parameter vampire is the creator of this
      return this;
    } else if (vampire === this.creator) { // this is the creator of parameter vampire
      return vampire;
    }

    // Loop through both parent arrays and return the earliest common element (i.e earliest descendant)
    for (let i = 0; i < thisParentsName.length; i++) {
      let thisParent = thisParentsName[i];
      for (let j = 0; j < vampireParentsName.length; j++) {
        let vampireParent = vampireParentsName[j];
        if (thisParent === vampireParent) {
          return thisParents[i];
        }
      }
    }
  }
}

module.exports = Vampire;