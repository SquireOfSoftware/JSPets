# JSPets

To avoid copyright issues, I will attempt to duplicate a digivice…but with some slight modifications such as using a duck as your pet that you battle random things like pig bosses, cats and stuff of the sort.

Think of it like a digivice but with a duck as your digimon.

This whole thing would be a lot easier if I could get my own digivice to work…unfortunately I think the battery leaked into the internals and it has stopped working. So I need to go with the power of the internet and rely on what other people have put up. From my observations, it looks like the japanese D-power is a lot harder than the european one.

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

Biased implementation
- I am leaning towards using HTML canvas and emulating the whole LCD screen. But something that I do need to keep in mind is how I draw these things and keeping it quite responsive. http://www.html5gamedevs.com/topic/7735-myths-and-realities-of-canvas-javascript-performance/
- What I find extremely interesting watching these old digivices at work is that there seems to be some sort of “clock” cycle that things operate on, sprites need to be shifted onto the screen, other things are shifted out of focus, the refresh rate it seems needs to be really good and I am wonder if it would be better if I drew in the native size and then stretch the canvas out. However as noted in my previous project that I was part of (in Orion) it seems when you scale the canvas up, there is all this “aliasing” effect that blurs the edges and lines to the background.
Perhaps there is a way to avoid this…
- So I will need some sort of “sprite” reader that reads a sprite and then converts it into an actual image. I will also need to “Create” digimon