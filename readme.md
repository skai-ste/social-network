Social Network - Part 4

    -   bioeditor need two things bio editor and function that changes the biostate.
    -   either its in edditing mode or in display mode

-   A new BioEditor component, which will show the user's bio if they have one and allow them to add one if they don't. Also, if the user does already have a bio, the BioEditor component will allow them to edit it.

////// NOTES //////

1. in BioEditor component, we should have a property in state that will determine whether or not the textarea is onscreen or not.
2. if this property (say bioEditorIsVisible) is set to true then the textarea should be visible. Else it should not be visible.
3. What to do when user types in a new bio and hits the "save" button?
4. we're going to handle the user's input in the same way we've done before — listen for change on textarea, store the draft in state, and when the "save" button is clicked make a POST request to server and update our database
5. Next step: get that new bio to show up on screen WITHOUT having to refresh.
6. define a method in App (called setBio) that will take the user's new bio and store it in App's state.
7. Last step: get the button in BioEditor to say edit if the user has a bio, and add if the user doesn't have a bio.

////// NOTES //////
