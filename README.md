# JSPets

To avoid copyright issues, I will attempt to duplicate a digivice…but with some slight modifications such as using a duck as your pet that you battle random things like pig bosses, cats and stuff of the sort.

Think of it like a digivice but with a duck as your digimon.

This whole thing would be a lot easier if I could get my own digivice to work…unfortunately I think the battery leaked into the internals and it has stopped working. So I need to go with the power of the internet and rely on what other people have put up. From my observations, it looks like the japanese D-power is a lot harder than the european one.

== 1/4/2017 ==

April FOOLS!

Anyways, so like I have adjusted and optimised the devolving animation and added in a "champion" cooldown and an "utimate" cooldown so that they can be used in battle.

The evolutions are taking a different direction in that you no longer attack immediately after evolving, you actually instead get redirected to the battle menu to make more decisions.

Something that I was thinking of introducing was a stat page to see what the stats were...but that wasn't really in the original game, you sort of needed to track how much damage was being done in your head.

Next step is to look at implementing the actual buff cooldowns. I suspect I need to create some sort of alphabet to display "LIFE", "ATK" and "SPD" boosts on the page.

If this is the case, then maybe I could optimise this further by introducing one black bar with text or something.

== 5/4/2017 ==

Cooldowns are finally implemented. There is a potential bug and that comes from not holding a strict "you must always display a max of three digits"

So if people decide to hack the game, they can easily overflow the screen display.

Something that I will be working on is trying to get intiative to "gain" friends along the way.

Though some thought will need to go into how stats are "retained" through switching in and out.

One thought is to only allow switching when out of battle and this would prevent the issue of "oh I am low on health, let me switch out to someone fresh".

So probably need to figure out a data structure that hold stat values, but also need to also think about taking steps.

As you know, every 100 steps will heal a pet, which means that-

Just fixed up a potential bug, in that it wouldn't heal properly...

Anyways, so every 100 steps will heal a pet, so does this mean it heals all the pets? Or does it only heal the one that is out?

I would say that it heals all of them, it is sort of crappy to send someone out and it is only like 1 hp.

So I would need to figure out how to "heal" all pets in one efficient go.

== 28/3/2017 ==

Some of the boosts (renamed from cooldowns) menus have been implemented. I now need to sort out the logic and the animation of each boost screen.

One idea also comes from random monster encounters say, every 100 steps.

Though it probably doesn't sound very good.

I also built in a set of tests to test out the cooldowns (see cooldownTests.js).

== 23/3/2017 ==

What have I been up to?

- I have finished off the ending screen

- Added a start screen (it is really basic)

- Cleaned up some of the code

Probably the next thing on my to do list is the buff cooldowns.

Need to figure out how to implement those and to test it out.

== 15/3/2017 ==

All sprites have been created and added into the game.

A stat screen has been added.

Steps have been approximated with Google maps and using the ruler. It assumes a bird flying to each point with some deviation due to bridges and lakes.

Various bugs such as the map screen bug has been fixed...not entirely sure what was fixed though as I was just tinkering with the boundaries and it magically fixed itself when I was tinkering around...

Some features which may need to be created:

1. Items which cooldown based on the steps taken

- Healing item which cools down on every 500 steps (note that total steps in the game is 12000)

- Multiplying attack cooldown on 700 steps

- Speed boost on 300 steps

2. Displaying how many steps to the next battle

3. Showing the next city after conquering the city

4. (Way too complicated) Speed up the framerate for fast attacks and slowing the framerate down for slower attacks - easier blocking

5. An intro cut scene to introduce the game

6. A way to pick a pet - sort of tied to the intro screen

7. Figuring out an ending sequence when you defeat a tassie tiger

8. Figuring out how to "earn" various animals

9. Saving the data so that you can reload the game

-10. Controls for touch screens- This has been partially done for now

== 8/3/2017 ==

Added all the animal states, a lake biome and adding in the framework to sprites.

Starting to re-watch some theory on game design.

Depth vs Complexity

https://www.youtube.com/watch?v=jVL4st0blGU&list=PLhyKYa0YJ_5BkTruCmaBBZ8z6cP9KzPiX&index=19

- Depth - tools to allow players to play around various different situations - meaningful choices - players ability to play around the rules of play - if people can’t make a conscious choice then there is no depth - learn from outcomes of choice

- Complexity - mental burden placed on by the game - data that the player has to process or decisions to play - dependent on UI (if complex, more info to process), pace of play (how many decisions are you asking to make by the player per second?) and irreducible complexity (learning the rules)

- Tutorials - help reduce the complexity

- Depth - how the player can play with the game, complexity restricts depth

- Elegant design - high depth to complexity ratio - look for deeper games rather than complexity - look to get the most depth for your complexity

First Move Advantage

https://www.youtube.com/watch?v=TRHdIScOMWQ&list=PLhyKYa0YJ_5BkTruCmaBBZ8z6cP9KzPiX&index=17

- Tricky design problems for turn based games - build mechanics to compensate

- Difficult to balance first turn

- Identify what type of turn based game it is: static resource or developed resource

- Static - players have all the pieces from the start of the game and don’t build up the board over time - FF tactics or chess

- Developed - build resources over time - first turn affects this more

- Build in the tools to fine tune the first move advantage - points in go, hearthstone - whole card or not is quite hard

- Build in metrics to observe the advantages are

- First move advantage grows over time - people getting better and better at the game - need to watch for this

- Be aware of first moves in any pvp games that has turn based elements - LoL 

MVP - Minimum Viable Product - Scope Small, Start Right

https://www.youtube.com/watch?v=UvCri1tqIxQ&list=PLhyKYa0YJ_5BkTruCmaBBZ8z6cP9KzPiX&index=15

- Make the first game small

- Make a prototype, find edge cases, find what is engaging and stuff, cut, and cut

- Cut down to core fundamentals of the game, minimum to build and test

- Make sure the core is working first

- Adding additional tools to help you work on the core

- Can be really easy to get bogged down with content

- Hone the foundations rather than content

- Avoid multiplayer, stick to single player - work on foundation and testing things out

Balancing for skill

https://www.youtube.com/watch?v=EitZRLt2G3w&list=PLhyKYa0YJ_5BkTruCmaBBZ8z6cP9KzPiX&index=9

- Can forget skill and just get bogged down with objects rather than player skill

- Give new players something to play with whilst getting better - get people to stick around

- ‘Foo’ strategies need to meet this wall earlier, forcing people to find new strategies, reward players for deviating from ‘Foo’ strategies

How the first 5 minutes draw players in

https://www.youtube.com/watch?v=EFU4tjMndi4&list=PLhyKYa0YJ_5BkTruCmaBBZ8z6cP9KzPiX&index=46

- 1st 5 minutes, strong intro creates a strong first impression

- Either do it via narratives, mechanics or spectacle

- Narrative - story or world or tone you are playing - mystery is a good hook, calls you to explore, interaction rather than observation, make you something wonder what is going on - selling the world, understand whats compelling and not to hold back, use that upfront

- Mechanics - a game feature or feats you can perform, drill down to why the player would want to play your game, could space out tutorials (don’t want to kill pacing of the intro)

- Spectacle - makes you say “woah” hold up least over time, something big or exciting cut scene or play

- Tool - In Medias Res - when you are thrown into the middle rather than the front, start you in the middle - thrown into a story already in progress - FF Tactics - tosses you straight into the action

- Intros go for at least 2 of the three above, need meat to back it up at least

Designing for a touch screen

https://www.youtube.com/watch?v=NBHircZu5EI&list=PLhyKYa0YJ_5BkTruCmaBBZ8z6cP9KzPiX&index=47

- Touch screen can do different things

- Need games that are good in their own right

- Touch screens are a lot better for turn based, strategy, puzzle, card games

- Good for one action at a time, multiple inputs don’t work very well, hold in hand or play on table

- Good for mimicking human actions

- Don’t need precision controls

- Turn based - most satisfying

- If your game requires a virtual joystick or another input from another device then you are doing it wrong

- Design for your platform

- Consider how your hands will cover up your screen - hands will cover things up

- More you can emulate human actions then the better to make it intuitive

== 7/3/2017 ==

Added a bunch of animals.

States have been fixed up (using some duct tape on the update method of animals) temporarily.

Tested with the spawning rates of things like Sandcastle (there was a bug where the number did not equal zero and hence didn't subtract properly).

Though one bit of a concern is that even thhough the difficulty has been shifted, level 2s continue to spawn on the first level.

This has been fixed, for some odd reason it applied randomLevel oddly. See the && randomLevel > 1 under the setupDifficulty code for AnimalStates.

== 3/3/2017 ==

Managed to get a random animal being created.

I created a few sprites as well, noted by the kitten sprite and the start of a dog sprite.

There is one major bug that has been created and that is, having two of the same objects being rendered.

So if you spawn two ducks...then one duck will override the other duck.

I think I need to create throw-away factory objects.

--

A few hours later I did create those objects.

Problem now is several things:

1. The sprite doesnt evolve even though the stats have evolved - created an enemy object to force the stat linkage

2. The sliding animation doesn't play properly, not sure why this is

So the last thing is to test that this works and then this branch can be merged with develop.

The test I need to make is the following:

1. Randomised levelling stats work

2. The sprite matches what the stats reflect

3. The sprite can be generated on a whim and have stats to link to.

== 2/3/2017 ==

Some ideas that came out from today:

- Faster/Multiple attacks

- An attack sequence that the user must memorise and block when receiving damage

- Stats will have to be static or roughly the same to add some sort of "fair" element into the game

- Could use a sliding scale for mobs, have a huge mob table and then have a sliding scale for each "biome" or theme for the respective town that it is at, this would be quite efficient as it would mean you are interacting with the numbers rather than the table

- Another thought was abstracting out the biomes, cities and mobs out into separate json files, though it would sound good to load things as need be, but the downside is that javascript accessing files outside of the browser is a CORS security issue and will be blocked by firefox and chrome

- Also another idea was to split up the rolls into: Biomes then species for that biome and then the animal that belows to that species

Some immediate milestones that need to be completed are:

1. Fill in the rest of the stats

2. Implement the rest of the stats

3. Add in the animals into the game

4. Draw up the sprites for each of the animals

== 1/3/2017 ==

Worked on updating the stat data structures. It operates on a "live" stat structure and it updates itself accordingly.

Note that the stats can now be abstractly reset as well with "devolve" and "evolve" working in accordance.

Note also that devolve will scale the health back down to the original scale. Meaning you "lose" less hp in high evolution stages.

Started also figuring out where all the animals to each biome belong.

These scenarios have been roughly tested in a live battle, though further investigation and testing will need to reveal issues with these changes.

A good change nonetheless for the stats used to be manipulated from all over the system.

A walking heal has also been implemented in which every 100 steps will heal you 1 hp.

== 28/2/2017 ==

I have filled in the biomes for each city, as noted in maps.js.

The problem now is trying to figure out how to link animals to a biome so that when you look up a biome you can then generate an animal.

However the problem that I have is that once you figure out what animal to spawn in, how do you control what level it is at?

I have been poking around and I would like to follow a normal distribution that shifts itself the closer you get to the last stage.

Each value then would correspond to a level in which would reflect what level the animal will be placed into for the given battle.

Unfortunately there isn't a lot of notes on fast normal distributions.

Upon further investigation, I did find one:

https://github.com/bramp/prob.js

This one requires random.min.js which is apparently an independent random library file designed to remove your dependency on the many implementations of Math.random.

I thought I could use a difficulty value but this got quickly complicated.

https://github.com/RichieAHB/normal-distribution

The above seems to be in C++ I think or some other language. Not sure why it is in a JS file.

== 24/2/2017 ==

If you look at the list below I have updated the biomes that are in each of the cities.

It is mainly derived from googling the areas up and guessing what they have in terms of agriculture, landscape and environments.

The groupings summarised here are:

1. Beach

2. Coast

3. Forest

4. Ghost

5. Lakes

6. Plains

8. Rocks

8. Snowy

9. Urban

10. Valley

11. Wetlands

The "Floods", "Bushfires" and a few of the other ones are more around unique little quirks that may occur in the city.

Of course it may not happen, but just as a running total of aspects of the city that I can use, if need be. I doubt I will use it but its part of the whole research process.

Animal locations:

SOURCE: http://www.parks.tas.gov.au/indeX.aspX?base=427

Mammals:

- Tasmanian Devil - (they are like dogs but more viscious) For the most part, they appear to be on the entire island? state? Everywhere basically.

- Tasmanian Tiger (these guys are extinct) - they can appear anywhere except the South West of Tasmania, I am planning that they will appear only at Port Arthur as the last stage.

- Whales - used to be hunted on the South East side of Tasmania, so Hobart is only area which I have "registered" in the game for this - Humpback, Blue, Killer are a few on the list

- Kangaroos (Eastern Grey Kangaroos) - seem to live on the north East of Tasmania, hence the name "Eastern", probably looking at Launceston, Musselroe Bay and Scamander as they are near that area.

- House hold dogs and cats - are probably only around urban areas (hence human pets)

- Platypus - seem to live near wetlands, coasts or lakes, apparently they are in Burnie as well

- Echidnas - found in plains or forests, "open country"

- Wombats - can be seen in national parks like Cradle Mountain

- Bats - are in Tasmania, they generally live in hollowed out trees, some are also urbanised as well

- Rodents - Rats and mice - there are natives (like water rats) and then there are pets which are found in urban areas

- Seals - Tasmania has Seals but they mainly appear on the islands surrounding Tasmania, so I am not sure if its accurate to include them as well. If anything that may pop up on Georgetown but it would have to be quite rare. Strahan has ONE record of an Elephant seal giving birth at Strahan...so yeah not common.

- Rabbits - invasive pests - generally found everywhere, prefer low vegetation or sandy soils so they can burrow into it for their burrow

- Feral pigs - considered to be pests as well, found in wetlands or anywhere where it is wetlands

- Foxes - considered to be pests, they exist but are small in number

- Feral dogs and cats - these are pests, note dingos do not exist on Tasmania

Birds:

- Penguins (Fairy penguins are quite popular) - they appear to occur mainly around the coast lines, noticable cities that have penguins are: Burnie-Somerset, 
SOURCE: https://think-tasmania.com/little-penguins/

- Pelicans - found on Coastlines, Wetlands

- Ducks - also exist, around wetlands or damns

- Geese - live around isolated areas and/or farming lands where they can get food easily

- Pigeons and doves - they are common, pigeons can be found everywhere except for rainforests or "treeless" areas

- Lorikeets - seen in areas where there are a lot of trees or the area isn't too urbanised like suburbia

- Cockatoos - found in urban areas or farmlands with water, non-yellow head cockatoos can be found in forests

- Owls - found in parks or gardens or forests

- Kookaburras - generally any areas where owls and 

Frogs:

- Tree frog - literally only found in the park lands west of Tasmania

Reptiles:

- Crocodiles - Don't live naturally it seems on Tasmania, but are sold as pets, could be used in urban areas, but super rare, it seems the temperatures are not that great for them.
SOURCE: http://www.themercury.com.au/news/tasmania/a-freshwater-croc-seized-during-police-raids-is-on-its-way-north-to-the-tropics/news-story/2140761efae3d04ddb1c1fd731f8d784

- Turtles - are apparently a pest - found mainly in lakes or rivers

- Snakes - generally found in wetlands, generally where frogs are, also rocky areas, places with trees, inactive in winter, avoid urban areas
SOURCE: http://dpipwe.tas.gov.au/wildlife-management/animals-of-tasmania/reptiles-and-frogs/snakes-of-tasmania

Invertebrates:

- Butterflies - enjoy the eastern side of Tasmania as it is warmer than the west

== 23/2/2017 ==

Evolution scales the HP out based on current/max and de-evolution scales the HP back down.

Each mob should have escapability, autoability, blockability and conversion resistance.

Escaping is either perfect escape with no damage or taking damage and not escaping.

Blocking is either perfect block (give on a particular tick of the game) and lose no health or block which means you just halve the damage.

For the enemy they too can block but no perfect block, this should be based on the blockability status.

Remove auto since it is the same as escaping. One day this might get brought back.

The future feature is conversion to convert enemies to your side.

Extending out the evolutions to last beyond a battle.

Restoring 1 HP per 100 steps and have HP last beyond a battle.

Care should just be "revive".

== 22/2/2017 ==

Forgot to mention that I had implemented the evolution system before and that I have hacked together some extra animations which are just copy and pasted animations with different "transition" scenes out to the appropriate locations.

Today I have been trying to figure out how the map system will work.

I think for the sake of simplicity, I will use Tasmania hence the introduction of Tasmanian geographical, climate and temperature maps.

I have mapped out a track though I am unsure on how this whole map would work.

It is a picture of Tasmania with pixels overlayed on top.

I also observed a bit of some of the battle sequences on youtube as well as looking into some of the various sprites that I may need when introducing maps.

What is interesting is the use of different sprites that are surprisingly subtle. I had no idea so much effort had gone into the sprites and animations.

I will stick to my MVP for now.

The cities I will use are:

1. Redpa - Plains, Coast - 4,3

2. Smithton - Coast, Plains, Urban - 8,2

3. Burnie-Somerset - Coast, Urban - 17,6 - Penguins

4. Cradle Mountain - Snowy, Rocks, Lake, Wetlands - 17,12

5. Deloraine - Riverside, Valley, Snowy, Wetlands, Floods - 25,11 

6. George Town - Coast, Wetlands - 27,6 

7. Musselroe Bay - Beach, Coast, Plains - 41,3

8. Scamander - Beach - 42,12

9. Launceston - Urban, Rocks, Plains, Floods - 30,10

10. Campbell Town - Wetlands, Plains, Drought - 34,17

11. Derwent Bridge - Lake, Wetlands, Rainforest - 21,19

12. Queenstown - Rocks, Valley, Snow, Underground - 13,19

13. Strahan - Coast, Urban - 10,22 (10,2)

14. Strathgordon - Forest, Lake, Wetlands, Earthquake - 19,30 (19,10) - Ravens

15. Bothwell - Valley, Plains - 29,25 (29,5)

16. Triabunna - Coast, Wetlands - 39,27 (39,7)

17. Hobart - Coast, Urban - Bushfire - 32,31 (32,11)

18. Port Arthur - Coast, Plains, Wetlands, Ghost - Bushfire - 38,36 (32,16)

I have listed a list of coordinates which roughly map to Google maps and then I will try and map this further to a screen.

The main problem that I have is reading through the whole array but then somehow skipping the cities which are not on the map, so I will need to figure this out.

== 20/2/2017 ==

Started work on the implementation of the evolution system.

- Evolution system (semi related to the stat system)

-1. Sprite drawings- MVP duck drawings have been added

-2. Figure out how the existing architecture will support evolutions- Short term, use the "isEvolved" variable to store the "stage" that it is up to.

3. Implement the evolution

-4. Do some planning post battle on how evolutions will work- for MVP no "post battle evolutions will work" all evolutions will devolve at the end of the battle

5. Implement the evolution screen

I have updated the duckling picture to contain the bare minimums of an idle sprite and an attack sprite.

For MVP, I will have to cut back on the evolution and have evolutions purely for the battle only and devolving back to the basic for walking around.

Evolutions has been hacked together to make it work, it will need further optimisations later down the track, but I probably won't get around to it, the major optimisations would be around how "devolving" works, as you can "devolve" off into multiple different states based on your current evolution state.

Take note that auto, run and normal win conditions trigger supposed different animation states. Due to the poor infrastructure of the code, it inevitably led to some quick clutches which unfortunately has led to less than optimal code.

I would like to optimise, but I would also like to get this project over and done with as well. So optimisation isn't a high priority at the moment.

== 17/2/2017 ==

Things to be done:

- Map System

1. Figure out how to move on to different cities

2. Implementing the cities

3. Drawing up the map sprites

4. Figuring out how to store the cities and how to see what is next

5. (sort of related) Figure out how bosses work

6. Generic enemy generator (Most likely pre-scripted)

7. Incorporate biomes

- Stat System

1. Checking out your stats

2. Mapping out the stat changes between evolutions

~~- Auto Screen - implement the same way as the Escape screen (have it based on some sort of chance of winning) - this has been completed in the auto-screen branch~~

~~- Sprite update - things like Escape and Auto, this has been done in the screen-cleanup branch~~

- Evolution system (semi related to the stat system)

1. Sprite drawings

2. Figure out how the existing architecture will support evolutions

3. Implement the evolution

4. Do some planning post battle on how evolutions will work

5. Implement the evolution screen

- Countering System (really low on the to do list)

1. Accepting certain button combinations to increase dodge or damage

- Sort out how dodge - based on speed, perhaps this can work with attack / speed, need to work out the implications of this

- Power up system

1. Figure out how temporary stat boosters will work (Should it be for a short amount of turns? Or time based?)

2. Figure out how to "regen" the items to encourage play, but reduce item abuse

- Sprite editor or viewer (this might tie together nicely with stat modifier if this works) - could place in the about screen

== 16/2/2017 ==

Something that I have realised that I need is a sprite editor or something that plays animations on the screen without reaching the given position.

I believe some sort of "sprite player" might be needed for testing purposes as at the moment I can only really play it out via acting out the actual sequence of animations.

There needs to be a cleaner way I believe of changing animation sprites.

So just to update on what has happened.

I have added in a secondary canvas called foregroundBoard which is used to draw the fireballs and the health. The blackbar that goes across the screen when calculating the remaining health is dependent on the petSpriteStates which is just a reference to the respective pets that are current engaged in battle.

Note that the secondary canvas can be flipped independently as well.

The disabling and enabling of key presses during the animations has been tidied up as well with specific methods that relate to the respective enabling and disabling of the keypresses as noted by "enableKeyPresses".

I have also tightened up the animations and added in a "Getting damaged" screen which just holds the damage, this separates the timing from the fireballs (which was hell to try and figure out the timings for).

Note that I have added in a dodge mechanism for future extensions on the battle system.

A happy and sad animation have been added in.

Sadly the sad animation doesn't seem to be playing very well as it requires additional things to be put in place to make it run properly.

I suspect this might be due to the poor architecture I have, but I made it work though. Refactor later I guess, another smell tucked under the rug.

== 13/2/2017 ==

I managed to flip the attacks around which is pretty good I think, so that the cat sprite now loads in the correct position.

But I think there might be some issues relating to the flipped canvas, I think when you flip it, the coordinate system I think gets a bit messed up, especially when you try and target the coordinate system of the canvas.

I believe the issue is that the coordinate system that you draw on (is the same) but the canvas system then needs to programmed in such a way that it accepts this new coordinate system.

My previous scaling if you look at the sharedFunctions code, scales the X axis by -1 which is flipping the canvas horizontally, but it means that I need to clear sections of the canvas using the same unchanged coordinate system, whilst the drawing uses the old coordinate system.

To illustrate this, imagine, I drew a picture on the far right of a canvas, this position is like 45x, 20y.

The canvas is then flipped, so the picture is now on the far left of the canvas, but anything else I draw say 0x, 20y will also similarly be flipped (and will appear on the far right post flip).

The clearing however occurs a little differently since its referring to the pixels of the canvas rather than the flipped drawing, hence what I would have cleared with 45x, 20y if I was doing animations, I would then need to clear 0x, 20y, since the coordinates have been flipped but the canvas itself hasnt.

At least that is what I believe is happening...correct me if I am indeed incorrect...

The other thing that I have been working on is the attack sequence. And this is where it gets really big.

I am caught between several things:

1. Making the battles enjoyable - that is, simple, little to no effort to participate in, has some chance of failing

2. Adhering to the original digivice logic as much as possible

These two main ideas or requirements I guess, are starting to conflict with each other as the battle sequence takes shape.

Why?

To understand why, the original battle system has several pieces. (Referring to my knowledge of the D-Ark)

1. You can counter battles by pressing the right buttons at the right times

2. If you digimon is faster you can dodge/block attacks (or at least it has a higher chance of doing so)

3. You can apply "power-ups" which gave you a slight to OP boost in the power/speed of your attack

4. The enemy may choose to digivolve...though that is slightly outside the scope of simplified battle system

One thing that I want to stress in this project is simplicity but also provide some sort of mechanism to allow for this later on down the track.

For now, its making sure the basics are there. This means:

1. No dodging combos, it will make it less fun but I think its a whole lot of complexity removed if I did remove this, note that random dodging probably will be implemented, given that it sort of doesn't impact screen states too much

2. Stats will be restored to normal per battle, there wont need to be any "healing" items or anything, just for simplicity's sake. Though I am unsure on whether this is to later be reimplemented as a "running health" like pokemon, how you need to regularly heal or you wont be able to battle...or that the hp carries over from previous battles.

3. No complex AI for the enemy, they simply attack, they will not power up or digivolve, they simply will attack, but they can dodge/block if their speed is high enough.

This means though that out of these simplicities that I will be implementing, I need to implement a dodge mechanic, which will be interesting.

For now I will implement a battle sequence in which you just trade attacks until you die.

Thinking about the battle sequence will take me a bit of time to map this out.

1. Faster pet initiates the attack - 2 frame attack motion, rest of frames are the attack

2. The attack goes from left to right or right to left

3. The attack is received/dodged

- If received, change the sprite to damage flickering

- If dodged, flip the sprite

4. Show hp remaining

5. If slower pet is still alive, initiates its attack - 2 frame attack motion, rest of frames are the attack (note that this is flipped as well)

6. The attack goes from right to left or left to right (depending on who is counter attacking)

7. The attack is received/dodged

8. Show hp remaining

9. If both are still alive show the menu

10. Otherwise, show win/lose screen for the user's pet - either the pet lost or won the battle

== 10/2/2017 ==

In hopes of preserving much of the architecture already, I have done some interesting hard code hacks to get around some of the more difficult mechanisms to slide in animations and flick between different frames given the approrpriate knowledge of the spritesheet themselves.

You will notice several changes, one is the fact that draw now has an "override"-able closure function and the appropriate screens have "ticks" that helps it "tick" over to the next screen.

There was a slight bug in which the screen switched without fully changing its state, this was overridden by applying the screen update within itself before switching over.

This provides a chance for the screen to update itself before drawing the screen.

Since it is not critical for the stuff to be stored beyond the animation, I decided to keep "screen" logic with the screens rather than share it. After all model.js should only be things that exist beyond a screen.

There is also a potential bug with the replay of the battle animation. If you set the stepCount for Sydney to 2, and walk 6 steps, you will notice that although the animations play, the positionings have not been reset which might prove to be a problem later. But I guess at this point, its too small of a bug to fix, given that it still animations appropriately.

There was also a huge discussion (With Kevin) as to the direction in which I ought to take with the map.

1. Have the user select which city they want to "walk" to - this has an interesting feature but then means I need to know what cities can go where which also creates havoc for the rendering loop as it needs to somehow read out what states it is up to.

- This also has the sub-effect of having someway to get people to "move" to certain cities first, a user may want to go straight to a boss city which might shortcircuit a planned route, which means I need to introduce reasons for people to go to the towns

2. As opposed to how it was originally developed, where the locations were linear and the player had no choice but to go to the next city which was decided by the game (though if I recall correctly, you could choose what region you wanted to do...not sure if I want to do multiple states)

There also tied into Biomes and how it would work (you will notice BIOMES is a new set of constants that I have added)

Note that I have also had a discussion with Kevin about stat growth.

The original game had no stat growth and that you went back to your basic digimon after a battle.

If you applied stat growth then it could be applied to the user selected cities idea as you could move the user to areas which challenged the appropriate level.

However this has a downside for replayability as there will be areas that you will absolutely never visit due to the crap XP that you get from it.

The original had the benefit of never growing beyond what you start. If anything you unlocked the abilities to digivolve higher.

The aim of the battle was to be "just" strong enough to nick the battle over, as digivolving costs DP or digivolving points.

I do not recall how you regain DP but yeah. It could be tied to the number of steps you take, every say 200 steps you regain 1 DP, each evolution costs a certain amount and you can only hold a certain amout of DP.

This would mean people would need to treasure their digivolves and think carefully about their power up selection (I think anyways).

At the end of the battle of the traditional digivice you would devolve back down into your normal state.

My opinion is that since digivolving is so valuable, if you use it, my opinion is that you stay with it for a while after you digivolve (obviously the higher the evolution the shorter it is). Though I am not sure on whether I should put a timelimit on it or a step limit and then have the pet devolve back into their normal state.

Kevin suggested perhaps offering "items" or achievements that could extend the usage of such actions, perhaps something that keeps you in ultimate form or something.

Good ideas which I might implement later.

For now I will continue with just implementing the basics.

== 9/2/2017 ==

The pet may get "sick" or hurt, if the user opts to run from a battle, there is a 50% chance it might happen though since it is based on the default Math.Random library it might be predicted.

Regardless, once the pet gets sick, the user will need to opt to go for the Care menu to "cure" or "heal" the pet

Note that neither "getting hurt" or "getting better" animations have been developed and I would need to look into this sometime later.

== 8/2/2017 ==

Got the screen states ticking over properly, its a bit of a hack as I am forced to disable key presses to prevent any unwanted keypresses from triggering the next time interpretKeypresses is called.

In any case, I can flick between the battle menus as the infrastructure has been set up.

It is just the finishing animation which is a bit of a worry for me, as the it does a screen update, which then switches the screen but then it draws the next state...not sure if that is worrying.

I am lucky that it is just a menu straight after the animation otherwise that would be another worry added to me.

I also worked a bit on the map structure as it's the map structure that determines the next enemy to fight and the amount of steps to the next enemy.

So I need to begin to map out the different states and cities and this would form the basis of what enemies are called and ultimately how many steps it takes to reach said animal to fight.

Though this does raise the question, how do I keep the person invested in the game?

I could try RPG elements and have the pet grow...but then we run the risk of, end game monstrosities where little chicks and smash the end game boss depending on how I play this out.

In the original digivice, it was set stats that never grew, it did make the game play a little stale, but also kept it challenging as every battle could mean that you died.

The combat hence relied heavily on digivolving to the closest match (for efficiency's sake) and then battling it out there.

So I need to figure this out as well.

== 6/2/2017 ==

Trying to do some work on the map.

http://gallivantingoz.com.au/wp-content/uploads/2015/09/Australian_map_all_Routes_2016.png

Could use this as a rough guide to draw an 8 bit map of Australia with all the necessary routes in place with places of interest.

Going to try and divide the map and all the other menus into separate images and try and paste them altogether.

Then going to assign each logical screen state to an image and then trying to glue together a bunch of screens together.

The difference that I need to make is that the pet screen is obviously different from a menu screen.

Hence a menu screen will be static whilst a pet screen or even a battle animation screen or a digi-evolution screen will be different, so some sort of differentiation needs to be made.

I think a generic update method is required, which will update the current screen to the appropriate logical screens.

The problem comes trying to keep the reference screen and the source screen intact, we could try and save a current screen over the source screen.

Note that there is also a potential problem with the step screen.

Basically I originally had it so that the screen was optimised to clear the last digit (if and only if it differed to what was previously recorded) and the redraw the digit.

This had the benefit that it would draw the whole number once, then wait until a step was taken and only the digits that changed say in the number 103 to 104, only the 3rd digit would be redrawn, everything else is kept the same.

The problem now is that because I have broken everything up into render loops, I can't exactly control it.

Though I have worked around this via the introduction of the variable "newScreen". You can see it in the render loop.

Upon changing to the state, it is set to true, draws the whole screen up and then sets the variable to false. After which returns to the comparative check of only drawing what has been changed.

Forgot to mention that I have been moving some of the "floating" variables such as the stepcounter and the screenlogicstate over into the game object.

I think this would help reduce the amount of "floating" variables though it does mean that there is this growing magical object called "game". Not sure if this is best practice.

Milestones for now:

1. Get a game loop going - done

2. Record the framerate - done

3. Register button presses - sort of done - ignored for now

4. Show the idle sprite - done - see petSprite and petState

5. Show the running sprite - done - see petSprite and petState - may need to revisit since timeout is weird

6. Count steps - done

7. Display menu - can display a basic 1st level menu - extravagent features don't exist - see screenState object

- done up to

8. Show battle animation

9. Show battle menu

10.Show attack animations

== 3/2/2017 ==

Added code to get a menu appearing.

This took me the longest to try and figure out how the screens would work.

The simplest solution was to have a hybrid logic/render object that held both the logic of where it was up to in the rendering object but also had the logic "semi" separated out.

See the Map screen.

Still there are a lot more things that I need to figure out, like screen in a screen state. This is a little confusing and is quite hard with no pointers.



== 1/2/2017 ==

Reading up on Shake.JS to see if it can register foot steps.
https://github.com/alexgibson/shake.js

Apparently theres new DOM events for stuff like this now.
http://w3c.github.io/deviceorientation/spec-source-orientation.html

From the looks of it, not all the browsers support this recommendation:
http://caniuse.com/#search=deviceorientation

So it seems third-party is the best way forward for now.

I also got an walking sprite working and it sort of "timesout" when there isn't any more clicks being received.

Though it runs on a timer like thing that decrements on every update (ideally ought to be fast) but if it is decremented below 0 it will stop and revert back to the idle animation.

It is pretty cool.

I can also count steps as well.


== 30/1/2017 ==

Milestones for now:

1. Get a game loop going - done

2. Record the framerate - done

3. Register button presses - realised is this a concern? Do I need to register key presses and key holds?

- Have done up to

4. Show the idle sprite

5. Show the running sprite

6. Count steps

7. Display menu

8. Show battle animation

9. Show battle menu

10.Show attack animations


== 27/1/2017 ==

So after doing a lot of thinking, it might be appropriate to divide the work into several major sections:
1. Game loop - the core and beating heart of the system
2. Logic processing - the bit that records non-animated changes such as stats, walking distances and so forth
3. Rendering processing - the bit that records animation changes such as sprite-changes, timings
4. Input processing - the bit that records what buttons are pressed

These components would force the architecture into one where the framerate is maintained regardless of what the states are at.

What I need to figure out is how these pieces go together and what affects what.

A potential challenge is trying to figure out what the timings are for each animation, as each "sprite" would have no understanding to the surrounding sprites which are also rendered on the screen.

Milestones for now:

1. Get a game loop going

2. Record the framerate - Need a way to actually potential throttle stuff https://www.isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing#timing-problems

3. Register button presses

4. Show the idle sprite

5. Show the running sprite

6. Count steps

7. Display menu

8. Show battle animation

9. Show battle menu

10.Show attack animations

== Before 27/1/2017 ==

New Source:
https://www.youtube.com/watch?v=Ev3NXnDSLKw
- Theres a timeout function to reset back to the walking animation
- Screen button - turns it off
- There is running animation as well - https://www.youtube.com/watch?v=KSYOaRzQ2XY - that might help breakdown the sprite up, birds tilt their bodies and their feet do the moving
- http://www.tamatalk.com/pixelmood/digimon.htm - breakdown of the tamagotchi

Architectural concerns:
As I have slapped things onto this project, it has gotten quite hairy and is now quite fiddly to build upon, so I am going to refactor the code into something better that allows for the separation of logic and rendering.
One of the suggestions made was look into game loops.
A Javascript article on using game loops on browsers
https://www.isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing
A generic article on game loops
http://gameprogrammingpatterns.com/game-loop.html
Digging really deep into loops and tutorials on what people recommend, theres this article
http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
This is another article on their own experiences with game development on JS
https://www.html5rocks.com/en/tutorials/casestudies/onslaught/#toc-the-game-loop

Screen dimensions
- One of the major things that I need to figure out, is how big exactly are the screens.
- Someone on reddit has made a watchface built onto a digivice.
https://www.reddit.com/r/pebble/comments/3mu32v/watchface_request_digimon_original_digivices_clock/
- I also have included numerous other screens that I have collected over the research period, it looks to be like 128 by 128 on some screens (just looking at it by eye (no measurements)). 
The rectangular ones look like 43 by 19 (pendulum picture)? My eyes are horrible and I am pretty sure I missed some pixels out. Maybe round out to 48 by 20 pixels?
- The digivice that I have owned is called D-power, it has a card scanner on the side
- From this ebay image, I am estimating 20 by 20 pixels? http://i.ebayimg.com/00/s/Mzg4WDUwMA==/z/zs4AAOxyUylTVjLr/$_3.JPG?set_id=2
- See digim sprite image in the sprites folder to see my recreation of the d-power digivice. There is some question though whether the top if the D, G and M are actually two pixels high or one pixel high, I have assumed two pixels high but then it doesn’t look like it matches the screenshot. If it is one pixel high it does change the height of the digivice and makes it 20 by 18…so I will assume its a nice square to make things nicer and more “symmetrical”.
- Came across this: https://www.youtube.com/watch?v=kkAheV-mH4M

Screens
- http://wikimon.net/D-Ark_Toy
- This site looked promising…but they appear to have dead links, if they had the original sprites, it would have been so awesome. I checked the web archive and it seems they didn’t save the links. I think it has something to do with the PHP loading dynamic references rather than static references.
- http://www.thedigi-zone.com/D-Power%20Digivice%20Game-Area%201.php
- 32 by 16 pixels for the original digivice - so it seems its definitely some sort of 16 by 16 pixel thing, though the screenshots of the sprites look like they just fit the size of the screen.

Sprites
- I am not sure how to actually implement this, as the bobbing varies from digimon to digimon, if I was dealing with sprites that were similar in sizes (that the last three rows are to kept still) then I could do some weird magic to keep the feet in place whilst bobbing up and down or whatever, however since this is a bit of a problem since I don’t know what sprites I am going to insert, I guess custom sprites will need to be drawn.
1. Bobbing
- They have noticeable “idle” animations, I assume to tell the user know that the digivice is still on. Here is a video that is reviewing a digivice, take note carefully that the digivice on the left has Agumon with a slight animation.
https://youtu.be/3Ept7yBn42U?t=234
A clearer video is here: https://youtu.be/Q53Cx2j30c0?t=23
It like the sprites bob up and down.
2. Happy
- There is a noticeable sun the top right hand corner
3. Sad
- Similarly to Happy, there is a bandaid or the sprite looking defeated

Mechanics
- This site has an extremely good breakdown on the different mechanics and the states that are in the game of digimon
- http://lcd.withthewill.net/DArkGuide1
- I think I may follow the original implementation: http://lcd.withthewill.net/DigiviceIntro
- It is quite simple and very easy to follow, note that every 10 battles unlocks your next “evolution” but you always seem to start at the default child digimon, in the case of this project, probably would be a duckling that can evolve in to the bigger animals. An evolution consumes a DP (digivolving power, I assume)
- Apparently if you defeat digimon, then you get DP back
- Digging around I found this: http://withthewill.net/threads/15183-(COMPLETED*)-DIGIVICE-VER-15th-COMPREHENSIVE-GUIDE
- DP is gained by meat or by walking 100 steps (maybe I should translate this into clicks for PC users) - champion evolution is 3DP consumption whilst, the next up is 7DP

Battle mechanics
- https://www.youtube.com/watch?v=AUdRM14qngo&t=15s
- For the purposes of this project I will not be covering "countering", unless I have time. The reason for this because the countering system in itself is its own system with timings to trigger on particular frames, to figure out what to do and then process the "overwhelming" factor, which is the counter beating the current attack or neutralising the attack or just "overwhelming" the attack and doing damage to the attacker, also note that this counter can be stacked and each counter can get stronger and stronger until someone mistimes the attack or just has no more power ups or whatever. As such I believe it is far too complex since I dont even have a battle sequence working.
- When you arrive at a certain threshold you trigger a battle
- The battle mainly operates whoever is faster (need to record speed per creature), they start the battle first
- The faster pet attacks first, the attack can be "blocked" or taken, blocking is random
- Then the slower pet attacks, repeat until one of them is dead
- If HP of your pet is 0 then devolve and put into hurt sprite and add 500 steps to "boss", in the hurt state the pet cannot walk, you need to "care" for it and then you can walk again.
- "Evolving" costs "evolve power", I need to figure out what to do with this (how you gain power back, how much it costs to "evolve", if max and you choose to "evolve" again, ideally should do nothing)
- Do we also do "evolving outside of battle"? If so, do we put a step counter to it before the "evolution" time runs out? Could allow you to evolve before going into battle, saving a turn or so.
- Need a battle menu - fight, evolve, escape (run), change partners (dont have other partners yet)

Battle animations
- This is a completely different kettle of fish

Biased implementation
- I am leaning towards using HTML canvas and emulating the whole LCD screen. But something that I do need to keep in mind is how I draw these things and keeping it quite responsive. http://www.html5gamedevs.com/topic/7735-myths-and-realities-of-canvas-javascript-performance/
- Turns out you can draw images (see at the bottom of the page on the next link)
- http://www.w3schools.com/TAgs/canvas_drawimage.asp
- What I find extremely interesting watching these old digivices at work is that there seems to be some sort of “clock” cycle that things operate on, sprites need to be shifted onto the screen, other things are shifted out of focus, the refresh rate it seems needs to be really good and I am wonder if it would be better if I drew in the native size and then stretch the canvas out. However as noted in my previous project that I was part of (in Orion) it seems when you scale the canvas up, there is all this “aliasing” effect that blurs the edges and lines to the background.
Perhaps there is a way to avoid this…
- So I will need some sort of “sprite” reader that reads a sprite and then converts it into an actual image. I will also need to “Create” digimon