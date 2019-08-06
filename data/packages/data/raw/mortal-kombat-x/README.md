# Mortal Kombat X

## Move notation

- 1 - Light punch
- 2 - Heavy punch
- 3 - Light kick
- 4 - Heavy kick
- U - Up or Up and any direction
- D - Down or Down and any direction
- L - Left
- R - Right
- NJ - Up only
- MB - Block input
- Moves assume the character is facing right

## Game mechanics [credits][1]

- 60 frames per second animations mean each frame is about 16.66 milliseconds
- Start-up frames occur before an attack connects
- Active frames occur once an attack connects whether it hits or is blocked
- Recover frames are how long a character has to wait to start another attack
- Block advantage frames opponent has to wait to start an attack after blocking an attack
- Hit advantage frames opponent has to wait to start an attack after getting hit
- Moves with 0 cancel frames cannot be combined to create a combo
- Perform another move after the cancel frames to create a combo
- Combo window - frames within which another move has to start-up to execute a combo
- Combo window = ((Start-up + Active + Recover) - (Cancel)) + (Advantage^)
- ^Advantage depends on hit or block

## Data format [credits][2]

### Labels

- Character name is first cell e.g. A1
- Column A has move type, move name AND variation name
- Move types are "Pokes & Universal Normals", "Normals & Kombos" and "Special Moves
  "
- Character variation names start with "VARIATION - "
- Moves with "(Air)" adds "U" to precede input
- Pokes are the same as Normals so label as Normals
- Armoured attacks have "Armoured" or "Armoured/Invincible" in J column
- MB is Meter Burn which adds Block input to move
- NJ is Neutral Jump

### Strings

- Normals are 1 key input
- Combos are more than 1 input
- Moves with "+" between them must be pressed simultaneously
- Startup frame data for Combos is for the last input. The first Normal in the Combo is the startup of the Combo

### Move ranking

- Lower start-up frames is better than more damage
- Less input strings is better than lower start-up

[1]: https://steamcommunity.com/sharedfiles/filedetails/?id=428638611
[2]: http://testyourmight.com/threads/www-mkxframedata-com-live.53342/
