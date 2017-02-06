# JSPets

To avoid copyright issues, I will attempt to duplicate a digivice…but with some slight modifications such as using a duck as your pet that you battle random things like pig bosses, cats and stuff of the sort.

Think of it like a digivice but with a duck as your digimon.

This whole thing would be a lot easier if I could get my own digivice to work…unfortunately I think the battery leaked into the internals and it has stopped working. So I need to go with the power of the internet and rely on what other people have put up. From my observations, it looks like the japanese D-power is a lot harder than the european one.

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