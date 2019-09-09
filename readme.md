Social Network - Part 5 OtherProfile

1. BrowserRouter should go in App

2. OtherProfile must be a class!

-   when OtherProfile mounts, make axios request to server to get info about user who's page we're on

    -   we'll get the id of the person who's page we're on by doing this.props.match.params.id

-   when we get response from server, we need to store that info about the user whose page we're on in state

-   once that info is in state, render it onscreen

3. if you're logged in as user 7 and you go to /user/7, you should be redirected back to the / route

-   this.props.history.push('/'); is how to trigger that redirect back to /

4. if user tries to navigate to page of a user who doesn't exist (for example, user tries to go to /user/1928371 but user 1928371 does not exist), you should either: a. render an error message b. redirect back to /

5. IF, in your OtherProfile component, you have Links to other people's profiles, then.... you will encounter a strange bug :)

-   if you're on /user/4/'s page, and on that page you click a link to /user/8's page, React will not rerender the component with user 8's info. The url will change, but onscreen we'll still see user 4's info
-   this is because React is lazy! If you're render OtherProfile and you click a link to someone else's OtherProfile, React won't rerender because it sees you're trying to render the same component!
-   we have to force React to rerender when the url changes. We can do that by using the following syntax:

<Route
path="/user/:id"
render={props => (
<OtherProfile
           key={props.match.url}
           match={props.match}
           history={props.history}
       />
)}
/>

-   this syntax just says, "when the url changes, rerender the component!"
