Have made a ToDoList with basic functionality

http://localhost:3000/register  :- register a user
Did password hashing for some more security

http://localhost:3000/login  :- for logging in the user 

http://localhost:3000/dashboard   :- Gives a message "Welcome ToDo List" once the login is done successfully

http://localhost:3000/list  :- In Post:- Add new items in the ToDoList
                               In Get :- Gives a list of all the items in ToDo list
                               
http://localhost:3000/list/id/  :- In Get :- Gives a specific item based on the id of that item
                                   This has been built for personal based use only that is the reason we are searching through id. If it was for a more bigger 
                                   purpose then modification would be required.
                                   One example on how it would work:- http://localhost:3000/list/id/ee6be307967e6f51c38e4425efbf7011
                                   
http://localhost:3000/list/delete/   :- In Delete :- Delete a specific item based on their id.
                                         One example on how it would work:- http://localhost:3000/list/delete/ee6be307967e6f51c38e4425efbf7011

http://localhost:3000/list/logout/    :- In Get:- Shows that user has logged out.

Different status have been set to be given when there is any sort of error while runnning the code!


                                      
