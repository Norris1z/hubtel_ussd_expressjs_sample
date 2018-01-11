This is a demo app built with expressjs to demonstrate how to read and
respond to USSD requests.

Here is the expected workflow of the app:

Begin at STEP 1.

STEP 1:
-------
Display the following menu and wait for a response:  
&nbsp;&nbsp;&nbsp;&nbsp;Welcome to Freebie Service.  
&nbsp;&nbsp;&nbsp;&nbsp;1. Free Food  
&nbsp;&nbsp;&nbsp;&nbsp;2. Free Drink  
&nbsp;&nbsp;&nbsp;&nbsp;3. Free Airtime  
If the user selects option 1, goto [STEP 2](#step-2)  
If the user selects option 2, goto [STEP 4](#step-4)  
If the user selects option 3, goto [STEP 6](#step-6)  
If the selection is none of the above, goto [STEP 9](#step-9)  

STEP 2:
-------
Display the following menu and wait for a response:  
&nbsp;&nbsp;&nbsp;&nbsp;Are you sure you want free food?  
&nbsp;&nbsp;&nbsp;&nbsp;1. Yes  
&nbsp;&nbsp;&nbsp;&nbsp;2. No  
If the user selects option 1, goto [STEP 3](#step-3)  
If the user selects option 2, goto [STEP 8](#step-8)  
If the selection is none of the above, goto [STEP 9](#step-9)

STEP 3:
-------
Display the following message and release the session:  
&nbsp;&nbsp;&nbsp;&nbsp;Thank you. You will receive your free food shortly.

STEP 4:
-------
Display the following menu and wait for a response:  
&nbsp;&nbsp;&nbsp;&nbsp;Are you sure you want free drink?  
&nbsp;&nbsp;&nbsp;&nbsp;1. Yes  
&nbsp;&nbsp;&nbsp;&nbsp;2. No  
If the user selects option 1, goto [STEP 5](#step-5)  
If the user selects option 2, goto [STEP 8](#step-8)  
If the selection is none of the above, goto [STEP 9](#step-9)  

STEP 5:
-------
Display the following message and release the session:  
&nbsp;&nbsp;&nbsp;&nbsp;Thank you. You will receive your free drink shortly.

STEP 6:
-------
Display the following menu and wait for a response:  
&nbsp;&nbsp;&nbsp;&nbsp;Are you sure you want free airtime?  
&nbsp;&nbsp;&nbsp;&nbsp;1. Yes  
&nbsp;&nbsp;&nbsp;&nbsp;2. No  
If the user selects option 1, goto [STEP 7](#step-7)  
If the user selects option 2, goto [STEP 8](#step-8)  
If the selection is none of the above, goto [STEP 9](#step-9)

STEP 7:
-------
Display the following message and release the session:  
&nbsp;&nbsp;&nbsp;&nbsp;Thank you. You will receive your free airtime shortly.

STEP 8:
-------
Display the following message and release the session:  
&nbsp;&nbsp;&nbsp;&nbsp;Order cancelled.

STEP 9:
-------
Display the following message and release the session:  
&nbsp;&nbsp;&nbsp;&nbsp;Invalid selection.

PRO TIP:
-------
Grant only ip addresses from Hubtel access to the application.