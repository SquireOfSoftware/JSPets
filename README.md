# JSPets

To avoid copyright issues, I will attempt to duplicate a digivice…but with some slight modifications such as using a duck as your pet that you battle random things like pig bosses, cats and stuff of the sort.

Think of it like a digivice but with a duck as your digimon.

This whole thing would be a lot easier if I could get my own digivice to work…unfortunately I think the battery leaked into the internals and it has stopped working. So I need to go with the power of the internet and rely on what other people have put up. From my observations, it looks like the japanese D-power is a lot harder than the european one.

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

- Auto Screen - implement the same way as the Escape screen (have it based on some sort of chance of winning) - this has been completed in the auto-screen branch

- Sprite update - things like Escape and Auto, this has been done in the screen-cleanup branch

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