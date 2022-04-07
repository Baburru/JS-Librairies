----------------------------------TABS----------------------------------


Open the HTLM file in your browser to have an exemple of what the code is doing; A test 1000 times better than an explaination.

You can take a look to the CSS to see the transition effect used, this is a good base that u can customize as you want.

!WARNING! The code can add "active","fade","in" on your element so make sure they are not used somewhere else in the code to not have conflicts with your CSS. You also can rename them if you want.

!WARNING! The code can have somes issues if you swap too fast beetween the tabs. If you think you can solve this problemn you can solve it on your side then ask for a commit in the GitHub projects and we will be happy to add it to the main code.

To create your own tabs system follow thoose steps : 

    -Copy/Paste de .js file in your project and rename it as you want .
    -Call the script at the end of the body in your HTML .
    -Create a list with the class : "tabs" where each children is a link. This is going to be the title of your tabs .
    -Create a container for the text with the class : "tabs_content" . Then put items who contain whatever you want but they have to get this class : "tab_content" and an ID who looks like the title of your tabs.

