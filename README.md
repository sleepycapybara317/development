# Development

### Link to Deployed Website
https://sleepycapybara317.github.io/development/

### Goal and Value of the Application
The application displays a list of beverages that a consumer can purchase from the Queen Bean Café. A user can add 1 or more of each beverage to the cart, remove items as they please, and see the total price of all items in their cart. Filtering by beverage temperature (cold, hot) and/or type (coffee, tea, other) will allow users to efficiently locate beverages that fit their vibe depending on how caffinated they want to be, what the weather is like, etc. Sorting by price or by popularity will futher help users find drinks that fit thier budget/suit their tastes.

### Usability Principles Considered
- Layout: My layout encourages a reading path and I put action buttons at the end of the up-to-down scan pattern of each container. For example, the "Add to Cart" and "Remove from Cart" buttons are located at the bottom of each drink card. Similarly, the reset button is located at the bottom of the container of filters and sorting options.
- Heirarchy:  I have used grouping to segment the screen into 3 sections: the drink cards, the filter/sorting container, and the cart. All of the drink cards are aligned in one column and' have equivalent headings, colors, and formatting to show that they are equivalent. Within the filter/sorting container, the possible filters and sorting types are explicitly grouped through an enclosure.
- Consistency: My website also has consistency: all the filters are done with checkboxes, sorting with radio buttons, and other buttons with the same style type in which they can be hovered and clicked. This promotes learnability. 

### Organization of Components
I created the following components: DrinkItem, RadioButton, and Checkbox. RadioButton and Checkbox allow me to easily scale my buttons and control thier values using states.

### How Data is Passed Down Through Components
1) When the user checks a filter checkbox, the value "true" is passed  "false" into the corresponding filter within tempFilters or typeFilters, triggering a change in the "value" prop in the checkbox and thus altering whether or not it is displayed with a checkmark. 
2) When the user clicks on a radio button, the sort state is set to the button's corresponding sort value, which is then passed to the radio button's value prop and altering whether or not the radio button is filled in.
3) The data from the drink-data.json file is passed in as various props to the DrinkItem components. These components are rendered with their name, image, desc, cals, and price props showing. Additionally, the DrinkItem components contain 2 buttons--"Add to Cart" and "Remove from cart"--whose implementation functions are passed through as props. These buttons affect the cart state by adding/removing DrinkItems from the cart dictionary.

### How the User Triggers State Changes
The user can trigger state changes by:
1) Checking/Unchecking a checkbox (which controls filtering of temperature and beverage type)
    - This causes either the tempFilters state (for the "cold" and "hot" checkbox) or the typeFilters state (for the "coffee", "tea", and "other" checkbox), setting the values to true or false based on the user's input.
    - In their corresponding state updating methods, setTempFilters and setTypeFilters, the lst state (a list of DrinkItem components) is also updated so only the drinks that satisfy the filters are rendered.
2) Selecting a radio button (which determines sorting)
     - This causes the sort state to update to either "ascend", "descend", or "none" to instruct the handleSort method on how to sort the list of beverages. The lst state is also updated to reflect the sorting.
3) Pressing the "reset" button (which resets filters and sorting to show all drink, sorted by popularity)
     - This sets all the state values in the tempFilters and typeFilters to false, sets sort to "none", and updates the lst state to reflect these changes.
4) Pressing the "add to cart" button for any DrinkItem component
    - This changes the cart state by adding the selected drink to the cart list. The totalPrice and totalQuantity states are also updated accordingly.
5) Pressing the "remove from cart" button for any DrinkItem component
    - This changes the cart state by removing the selected drink from the cart list. The totalPrice and totalQuantity states are also updated accordingly.
