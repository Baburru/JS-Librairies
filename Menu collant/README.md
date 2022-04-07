------------------------STICKY ELEMENT------------------------


This code make the div u want sticky (Even when you scroll she stay at the same place) it can be usefull for header or sidebars as in this exemple.

To use this follow the next steps : 

    -Copy/Paste the .js file in your project and rename it as you want.
    -Call the script at the end of the body of your HTML with a div clear:both like this : "<div style="clear:both"></div>
        <script src="fixed.js"></script>"
    - Then choose the element you want to make sticky by add in parameters of "data-fixed" like this for exemple : "<div class="menu" data-fixed>"
    - You can also add an offset (Margin in pixels between the sticky element and the top of the page otherwise it will stick to the top with no margin) by 
    adding :" data-offset="60" " .
    -Then you can also say if you the element stop be sticky when he reach the end of his container box. To use this add
    " data-constraint=".class_of_the_element_you_want"
