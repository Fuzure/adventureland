// Hello readers, it's Fuzure. In this document, I'll be explaining how some of this code stuff works. Keep in mind that I'm not very good at code myself, so ask smart ppl in the discord for harder questions :)

// So the first things first, why so many colors? The colors are used to identify parts of code
// Blue is variables, purple is functions. black and white are part of javascript and syntax stuff, I'm not quite sure, but doesn't matter

// Alright, let's jump right in with dissecting the initial code that is provided for us
// Remember to use ; after your functions (:

//FAQ (read the code first, come here if you have a question. if it's not here, ask in the discord or pm me)
// What are runner functions? ----- Runner functions are predetermined functions that Wizard has coded into the game. You can find all runner functions as well as how they were created here: https://github.com/kaansoral/adventureland/
// How do I create my own function ----- use "function function_name(){}".  function at the beginning creates the function, name it whatever you want, and then put what you want it to do between the brackets.
// Why isn't my code I created working? ---- Share in discord so we can help you out, but look for syntax errors first (e.g. missing ; or closing your brackets or something)
// Agghhhhhh this is frustrating!!! ---- We all started there, just keep at it, it'll all click into place one day and you'll be surprised how much you actually know



var attack_mode=true // This part of the code is defining the variable "attack_mode". Using "var" creates a variable, which can be named anything

setInterval(function(){   //setInterval is the loop part of the code. It follows the format "setInterval(function,time);" In this case, the function is quite large, so the writer uses {} to add more than one function and keep it organized. Think of {} as "everything in between"

	if(character.hp<400 || character.mp<300) use_hp_or_mp();  // you can basicaly read it straight forward. "if character.hp is less than 400 or character.mp is less than 300, use hp or mp pot. the function use_hp_or_mp(); is a runner function, meaning it's already coded into the game

	loot(); // loot stuff. also a runner function
	
	if(!attack_mode || character.moving) return; // if no attack_mode or character is moving, return the code. This is basically just saying that if the variable "attack_mode" that was created at the very top is false, or the character is moving, go back to the start of the loop.

	var target=get_targeted_monster(); // we are creating a variable called "target" and setting that equal to the function "get_targeted_monster();" Again, this is a runner function. The function "get_targeted_monster" ensures that you are targetting the same monster and not just switching between them
	
	if(!target) // if there is no target. the opposite of this would be "if(target)", meaning if there is a target
	{ //brackets indicate "everything in between" remember? this means we are executing all the code in between the brackets if the "if" statement above is met
		target=get_nearest_monster({min_xp:100,max_att:120,path_check:true,no_target:true}); // if there is no target, the target is changed to the nearest monster that meets those conditions. Again, runner function.
		// Sets the minimum xp of a monster as well as the maximum attack. Ensures that your character can walk to the target (path_check) and the target isn't engaging with anyone else (no_target)
		if(target) change_target(target); // if there is a target, that is defined in the equation above, change to that target.
		else // if the if statement isn't met, execute this following. it's a simple if/else statement, just like how it'd be used in english
		{
			set_message("No Monsters"); // set the message as "no monsters" in the bottom right corner
			return;  //go back to the start
		}
	} //always gotta close brackets, remember that
	
	if(!in_attack_range(target)) // if you are not in attack range of target
	{
		move( 
			character.real_x+(target.real_x-character.real_x)/2, //move your character half the x distance
			character.real_y+(target.real_y-character.real_y)/2  //move your character half the y distance
			);
		// Walk half the distance overall
	}
	else if(can_attack(target)) // if the above if condition is not met, and if you can attack the target
	{
		set_message("Attacking"); // set message as attacking
		attack(target); // attack the target
	}

},250); // we finally close that huge function by closing the brackets, back from "function() {" at the very beginning. set the interval to 250 milliseconds, so it loops every 1/4th of a second.
