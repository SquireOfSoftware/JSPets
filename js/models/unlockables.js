/**
 * Created by JarvisWalker on 6/4/17.
 * This file is to hold how kills are tracked
 */

var party = new Party();
//{
    // either an array or object or some sort, is there such things as pairs?
    // needs to:
    // 1. pick out what animal you want
    // 2.

    // can push and pop objects on and off

//};

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

function Party(animals) {
    this.collection = {};

    this.add = function(state, referenceObject) {
        //this.collection.push(animal);
        this.collection[state] = referenceObject;
    };

    this.heal = function() {
        // run through heal only those who need healing, this might need to be changed dynamically though
    };

    this.getAnimal = function(state) {
        return this.collection[state];
    };
}