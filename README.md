For this task, I had several personal goals as well as the goals outlined in the description of the task. I used d3 for the geobased visualization. I went a bit different for the second visualization and did a custom built table. I purposefully did this because I wanted to show that I could quickly and effectively make custom built components instead of relying on others libraries. I chose to show a bit of range and used a class component with state management and lifecycle methods for the d3 map, and then I have other components using react hooks for state management and lifecycle. I wrote a custom fuzzy search function for this, its not bulletproof by any means, but its a quick, relatively decent working function. I was trying to limit myself to 3 hours for this, but there are a lot of improvements & possibilities I could make to this project. Please see the list below for a few that came to mind. Thanks!

Goals for this:
   show samples of components using old life cycle methods and samples of components using hooks
   show sample algorithm made up for fuzzysearch off text
   show ability to custom make react components instead of using libraries
   show ability to use D3 visualizations
   added sample filtering for total crashes

Improvements:
  ADD COMMENTS ABOUT FUNCTIONALITY
  refactor filtering in combination with fuzzysearch to reduce to one loop
  more advance visualizations
  add click and zoom for d3 visualization
  add interaction from the table to the map (currently its just map to table interaction)
  lots more ui improvements possible
  add type checking through proptypes or typescript


Potential Issues:
  bad ui and styling
  slow with rendering large table list - 
  used react-select which has deprecated react methods and will break in future
  no testing
  not made with tdd

