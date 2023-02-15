# rxjs-angular-ex1

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/rxjs-angular-presentation-zeatkz)

Every exercise description can be also found in their component.

## For all exercises

- when working with observables please also unsubscribe, don't leave an observable opened
- code can also be found on [github](https://github.com/BogdanaZ/rxjs-angular-ex1) and if it is easyer for you you can downloaded local and play with it, then commited to your git repo
- try to make it also preaty (basic bootstrap already included)
- try to work on it yourself don't copy

## 1.) Easy exercise

- Get all users with their ages , type of ages and identity and display it in a table
  - The table should contain field id, name, age, ageType, identity
  - If a user doen't have an age added please put 'none'
  - If a user doen't have an identity added please add by default IdentityEnum.Personal
- Create three buttons:
  - First button: when click on it sort by name
  - Second button: when click on it sort by age
  - Third button: when click on it display the data in the order it comes from api

## 2.) Medium exercise

- Display all users that are not in userNotToBeShown in a table
  - The table should contain fild id and name
- When I click on a user I want to see in an alert the age of that user and in what category of age that user is
  - You should not request the whole age database you should just get the value that you are need it

## 3.) Hard exercise

- Add an input that accepts as value a number from 0 to 40
- if the number is not in this range show an error : "Error: Please pick an user from 0 to 40"
- if the number is in this range check if this number exists in userNotToBeShown and if it does show an error: "Error: The user that you search can not be displayed. Insuficient permissions."
- if the user doesn't exist in userNotToBeShown get the name and the age for it and display it on the screen
- All the errors when appear should remain on the screen for only 10 sec.
- You should not request all the users and ages at once, request just the one you need by id

## 4.) Extreme exercise

- Add an input that accepts only strings
  - Check if that name exist in the names of our users or that string is contain in the name of our users (andra exist in Sandra, Alexanda, Andra, etc)
  - If the string was not included in the name of the users it will display an error: "Error: The name is not found, Please search other name"
  - Otherwise if exists a user or more with that string in it we will search in userNotToBeShown if can be displayed
  - If the id of the user exists userNotToBeShown and if it does show an error: "Error: The user that you search can not be displayed. Insuficient permissions."
  - If the user doesn't exist in userNotToBeShown get the age and the age type
  - If all the condition are ok display the info gotten until now (name with age and id) and 2 buttons
  - First button will be "More info", and when the user clicks on it we will show also the age type and identity of the user/users
  - Second button will be "Clear", and all the data will be refreshed
  - All the errors when appear should remain on the screen for only 15 sec.
