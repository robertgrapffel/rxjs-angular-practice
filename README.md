# rxjs-angular-ex1

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/rxjs-angular-presentation-zeatkz)

Every exercise description can be also found in their component.

## Info

- code can also be found on [github](https://github.com/BogdanaZ/rxjs-angular-ex1) and if it is easier for you you can download it local and play with it, then commit it to your git repository
- try to make it also pretty (basic bootstrap already included)
- try to work on it yourself, don't copy others

## For all exercises

- When working with observables please also unsubscribe, don't leave an observable opened
- All the data that exists can be found in mock-memory-data.service
- We get the data from that service by dooing an http call type get. Check user.service, there you can find 2 exemples.

## 1.) Easy exercise

- Get all users with their ages, type of ages and identity and display it in a table
  - The table should contain field id, name, age, ageType, identity
  - If a user doesn't have an age added, please put 'none'
  - If a user doesn't have an agetype added, please put 'none'
  - If a user doens't have an identity added, please add by default IdentityEnum.Personal
- Create three buttons:
  - First button: when click on it, sort by name
  - Second button: when click on it, sort by age
  - Third button: when click on it, display the data in the order it comes from the api

`Bonus points` the use of shareReplay

## 2.) Medium exercise

- Display all users that are not contained in blackList, in a table
  - The table should contain field id and field name
- A click on a user will display in an alert: the age of that user and in what category of age that user is

`HINT` You should not request the whole age database, you should just get the value that you need

## 3.) Hard exercise

- Add an input that accepts as a value a number from 0 to 40
- if the number is not in this range, show an error : "Error: Please pick an user from 0 to 40"
- if the number is in this range, check if this number exists in blackList, and if it does, show an error: "Error: The user that you search can not be displayed. Insufficient permissions."
- if the user doesn't exist in blackList, get the name and age and display it on the screen
- All errors that appear on screen should remain on there for exactly 10 sec.

`HINT` You should not request all the users and ages at once, request just the one you need by id

## 4.) Extreme exercise

- Add an input that accepts only strings
  - Check if the inputed string is contained as one of the user names; ex. (andra exist in Sandra, Alexanda, Andra, etc)
    - If the string is not included in the name of the users, display an error: "Error: The name is not found, Please try a different query"
    - Otherwise if it exists, check if the results found can be displayed by searching in blackList
    - For user id that is found in blackList, show and error: "Error: The user: [name] that you search can not be displayed. Insuficient permissions.
    - If the user doesn't exist in blackList, get the age and display it in a table with the id, the name of the user and a buttons
      - The button will be "More info", and when clicked, it will show in an alert the age type and identity of the user

<table>
  <thead>
    <tr>
      <th>Id</th>
      <th>Name</th>
      <th>Age</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>user id</td>
      <td>user name</td>
      <td>user age</td>
      <td>button: get more info</td>
    </tr>
  </tbody>
</table>

- All errors that appear on screen should remain on there for exactly 15 sec.

`HINT` When the user types again in the input, all the data is refreshed
