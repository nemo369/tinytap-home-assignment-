# TinyTap Home assignment 

Please complete the following exercise as soon as you can:

Trace and cut a polygon out of an image

You can find a live demo of the assignment here: https://tinytap-home-assignment.netlify.app/

## Getting started

1. Clone this repository
2. Install the dependencies: `npm install`
3. Run the app: `npm start`
4. Open the app in your browser: [http://localhost:5173](http://localhost:5173)


## Goal: The user will be able to trace an area from an image and drag it around.

## Features:
- Load an image and present it
- User should be able to load multiple images
- Display images in thumbnails  (4/3 ratio), and select and image to create a puzzle
Ask the user to trace a shape ("Please draw a path to create a puzzle piece")
- Trace a path freely by pressing the mouse and moving it.
   once mouse is up, close the shape
- The new cut shape should be draggable
- paint the hole (where shape was cut from) in gray
shape will have an x icon attached on it's border
- tapping on the x button will delete the shape and fill the hole back.
before removing the piece, display a dialog to verify the delete action (“Are you sure you want to delete this piece”), with  “delete” or “cancel” options. (entry animation is a bonus)
- Swapping images should not clear the piece

## Guidelines
- Pay attention to the experience, if you have ideas on how to make it awesome, please show us.
- We're leaving you without graphics, you can find icons online, try and choose designs that work together.
- Using React + Canvas
- You may use the  internal react component state
- Think about you reusable hooks and components
- Mind code quality, structure and performance
- Keep it as simple as possible. Support Chrome only
- Use Webpack for frontend toolchain (create-react-app is ok)
- brownie points for use of styled-components





