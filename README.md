# idea-box

##Intro

Ideabox is an application that allows a user to record and archive their ideas. The user inputs the title of their idea followed by its description into the designated input areas. Once the user clicks the 'save' button the idea is stored locally on their computer. If they refresh the browser their idea will remain on the page. If the user is dissatisfied with their idea after saving it they can delete the idea from the page by clicking on the 'x' button in the upper right hand corner. The user can edit their idea body or title by clicking on either field. Once they click away, or press enter, the edits are stored.

##How the Application Works

On page load, any previously stored ideas are retrieved from LocalStorage and written to the page. LocalStorage is a method in which webpages locally store named key/value pairs inside a client's web browser. There's no expiration time for items in localStorage, but there is a maximum of 5MB per app per browser localStorage space. Exceeding the 5MB limit results in the browser prompting the user for more space.  

When the user inputs their idea's title and description into the input fields, then clicks save, the idea is stored as an object in an array, and then the array is stored in LocalStorage. In order for an object to be stored in localStorage it needs to be a string, so when the item is stored we use 'JSON.stringify' to convert it to a string before storage and we use 'JSON.parse' to convert the stored string back to an array.  

We created a constructor called 'Idea' with unique identifiers in order to render items from localStorage. When users create a new idea, they are creating a new instance of Idea using the generateNewIdea() function.   Each 'Idea' has a unique title, body, and id. The id is a unique number generated with the Date.now() function, which returns the milliseconds elapsed since 1/1/1970. The id allows us to target individual items in the array and make changes to them.    

The steps to have an idea rendered onto the page are: generating and saving an idea, storing the idea in localStorage, retrieving the idea from localStorage, and finally rendering the idea to the page. All of these steps are initiated on the 'save' button with an event handler.  

The user can use the search bar to quickly find an idea on the page. The search bar is triggered on keyup after each letter is typed in. The search function uses a 'regexp' expression to filter out pieces of text that match the user's search input. Any articles that do not match the input text are hidden. Once the search bar is cleared all the ideas reappear on the page.
