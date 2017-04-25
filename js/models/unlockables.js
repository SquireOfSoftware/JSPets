/**
 * Created by JarvisWalker on 6/4/17.
 * This file is to hold how kills are tracked
 */

var party = new Party();
/*
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
}*/

// assume that animals is an array of animals
function Party() {
    // goal: fast look up with ordered arrays...exactly how frequently will i be using the lookup?
    // realistic goal: use an array and just look up when I need to.
    this.collection = [];
    this.currentPet = {};

    function setup() {
        var collection = [];
        for (key in ANIMAL_TYPES) {
            if (ANIMAL_TYPES.hasOwnProperty(key)) {
                var partyMember = getAnimalState(ANIMAL_TYPES[key]);//new PartyMember(getAnimalState(ANIMAL_TYPES[key]), 100);
                partyMember.isPet = true;
                collection.push(partyMember);
            }
        }
        return collection;
    }

    this.collection = setup();

    this.add = function(referenceObject) {
        referenceObject.isPet = true;
        this.collection.push(referenceObject);
    };

    this.heal = function() {
        for(var i = 0; i < this.collection.length; i++) {
            this.collection[i].stats.walkingHeal();
        }
    };

    this.getAnimal = function(state) {
        for(var i = 0; i < this.collection.length; i++) {
            if (this.collection[i].state === state)
                return this.collection[i];
        }
        return undefined;
    };

    this.change = function(state) {
        for(var i = 0; i < this.collection.length; i++) {
            if (this.collection[i].state === state) {
                this.currentPet = this.collection[i];
                game.pet = this.currentPet;
                petSprite = getSprite(state, currentPet);
                break;
            }
        }
    };
}