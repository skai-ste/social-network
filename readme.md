React
PART 3 / socialnetwork

-   We are going to need to update start.js to import App and render it where we are not on the /welcome
-   We need to create App!
-   It should be a class based component

-   In componentDidMount() → Make an axios request to a new route on the server. This route should make a DB query that gets us all the information about the user. When we get that data back we need to set it to state.

-   We need to create 2 more components
-   1. ProfilePic
-   2. Uploader
-   ProfilePic should be a "dumb"/presentational (i.e. function) component. It's job is to display a profile pic (we can use the first and last name for the alt tag of the image).

-   We also need to pass it a function as a prop, as when the user clicks on it, the uploader needs to become visible.

-   Uploader → Needs to be a Class based component as it will have state.

-   We need to conditionally render Uploader. To do this we will add something to state. i.e. uploaderIsVisible: false

-   i.e. {this.state.uploaderIsVisible && <Uploader />}

-   Uploader needs to be passed a function as a prop, that will update the state in App when there is a new image, and when it is time to close the modal.

////////////////////////////////////
This Uploader component should display as a modal. Whether or not it is displayed should be determined by a property (called, for example, uploaderIsVisible) of the state of the App component. ProfilePic should be passed a function from App for setting this property to true.

The Uploader component should be passed a function for setting the profilePicUrl of the App component's state. After a successful upload, it should call this function and pass to it the url of the image that was just uploaded (your POST route on the server will have to include this url in the response it sends). This should cause ProfilePic to automatically switch to the new image. The function for setting profilePicUrl should also set uploaderIsVisible to false.
/////////////////////////////////////

-   Uploader will be very similar to what we did in our ImageBoard. i.e. we will need FormData. Make a post request to the server and then use the whole Multer S3 stuff we did in imageBoard.

-   The only difference is that we need to do an UPDATE to our users table rather than in INSERT.
