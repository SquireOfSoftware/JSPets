/**
 * Created by JarvisWalker on 6/4/17.
 * This file is to hold how kills are tracked
 */

var party = new Party();

function PartyMember(referenceObject, maxNumberToUnlock) { //, isUnlocked) {
    this.referenceObject = referenceObject; // this is the actual animal object with stats
    var currentNumberToUnlock = 0;

    this.increment = function() {
        if (currentNumberToUnlock < (maxNumberToUnlock)) {
            currentNumberToUnlock++;
        }
    };

    this.numberLeftToUnlock = function() {
        return maxNumberToUnlock - currentNumberToUnlock;
    }
}

// assume that animals is an array of animals
function Party() {
    this.collection = {};
    this.currentPet = {};

    for (key in ANIMAL_TYPES) {
        //var partyMember = new PartyMember(getAnimalState(ANIMAL_TYPES[key]), 100);
        if (ANIMAL_TYPES.hasOwnProperty(key)) {
            var partyMember = new PartyMember(getAnimalState(ANIMAL_TYPES[key]), 100);

            // TODO apparently there is a bug with wombat constantly being set as the variable
            // I think it has something to do with animalstate
            partyMember.isPet = true;
            this.collection[ANIMAL_TYPES[key]] = partyMember;
        }
    }

    this.add = function(state, referenceObject) {
        referenceObject.isPet = true;
        this.collection[state] = referenceObject;
    };

    this.heal = function() {
        // run through heal only those who need healing, this might need to be changed dynamically though
        for(key in this.collection) {
            if (this.collection.hasOwnProperty(key))
                this.collection[key].referenceObject.stats.walkingHeal();
        }
    };

    this.getAnimal = function(state) {
        return this.collection[state];
    };

    this.change = function(state) {
        currentPet = this.collection[state];
        game.pet = currentPet;
        petSprite = getSprite(state, currentPet);
    };
}