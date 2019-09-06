Social Network - Part 4

-   Make sure that Profile component is on screen (it's child of an App)
-   Make sure bio editor works/is on screen (it's child of Profile)

    -   bioeditor need two things bio editor and function that changes the biostate.
    -   either its in edditing mode or in display mode

Two new components will be required for this part: Profile and BioEditor.

    1. Profile

-   The Profile component will be responsible for laying out the content we want to show: the user's name, profile picture, and bio. Profile will be a direct child of App.

-   The Profile component will itself contain two other components:

-   The existing ProfilePic component, which will show the user's pic in a larger size.

-   A new BioEditor component, which will show the user's bio if they have one and allow them to add one if they don't. Also, if the user does already have a bio, the BioEditor component will allow them to edit it.

-   It is not necessary to create a component to show the user's name. The Profile component can just print the name out in its render function.
